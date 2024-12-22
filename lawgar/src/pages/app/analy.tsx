import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

import { IsMobileContext } from '@/_context/isMobileContext'
import { Completion, Completions } from '@/api/completions'
import initialData from '@/assets/docs.json'
import { AnalyPromptProps, analyPrompts } from '@/assets/prompts/analyPrompts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  prompt: z.string({
    required_error: 'Por favor escolha uma tipo de contrato a ser analisado.',
  }),
})

type FormSchema = z.infer<typeof formSchema>

export function Analy() {
  const { isMobile } = useContext(IsMobileContext)

  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfText, setPdfText] = useState<string | null>(null)

  const [aiPrompt, setAiPrompt] = useState<Completion[]>([
    {
      role: 'system',
      content: `BASE DE CONHECIMENTOS NORMATIVOS: ${JSON.stringify(initialData)}`,
    },
    {
      role: 'system',
      content: `Você é uma assistente Juridica da Algar telecom, e deve analisar contratos e documentos.
      
      Sua resposta deve ser um JSON para que eu faça o parse. Sempre deve conter apenas as chaves "status" e "data". 
      
      A chave "status" pode ser "valid", "attention" ou "invalid"
      Para valid quer dizer que a analise feita retornou um resultado positivo.
      Para attention quer dizer que a analise feita retornou um resultado que deve ser verificado pois não é negativo mas pode melhorar.
      Para invalid quer dizer que a analise feita retornou um resultado negativo, e deve ser ajustado.  
      
      A chave "data" é a resposta da pergunta com sua analise feita.

      EXEMPLO DE ANALISE: "o contrato deve possuir assinatura do contratante e do contratado";
      EXEMPLO DE RETORNO: { "status": "invalid", "data": "O contrato possui a assinatura do contratante mas nao tem a assinatura do contratado" }
      `,
    },
  ])

  const [contract, setContract] = useState<AnalyPromptProps | undefined>(
    undefined,
  )

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  function extractJSON(content: string): string | null {
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)
    return jsonMatch ? jsonMatch[1].trim() : content.trim()
  }

  async function onSubmit(data: FormSchema) {
    setProgress(0)

    if (data.prompt === contract?.id) {
      const totalPrompts = contract.prompts.length
      const progressIncrement = 100 / totalPrompts
      let currentProgress = 0

      const updatedPrompts = [...contract.prompts]

      const isLoading = contract.prompts.map((prompt) => {
        prompt.analysis = {
          status: 'pending',
        }
        return prompt
      })

      setContract((prev) => ({
        ...prev!,
        prompts: isLoading,
      }))

      for (const obj of updatedPrompts) {
        const aiAsk: Completion = {
          role: 'user',
          content: obj.prompt,
        }
        const aiPromptsReply = [...aiPrompt, aiAsk]

        try {
          const response = await Completions({ completions: aiPromptsReply })

          if (response.isLeft()) {
            alert(`Erro ao processar o prompt: ${obj.title}`)
          }

          if (response.isRight() && response.value.content) {
            try {
              const jsonContent = extractJSON(response.value.content)
              const aiData = JSON.parse(jsonContent!)

              // Atualiza o item específico na cópia
              obj.analysis = {
                ...obj.analysis,
                status: aiData.status,
                data: JSON.stringify(aiData.data),
              }

              // Verifica se o status é "pending" e solicita reformulação
              if (
                aiData.status === 'attention' ||
                aiData.status === 'invalid'
              ) {
                const reformulatePrompt: Completion = {
                  role: 'user',
                  content: `Reescreva as clausulas analisada com as correções sujeridas. LEMBRE-SE DE TRAZER A RESPOSTA FORMATADA COMO SOLICITADO.`,
                }

                const reformulateResponse = await Completions({
                  completions: [
                    ...aiPrompt,
                    {
                      role: 'assistant',
                      content: response.value.content,
                    },
                    reformulatePrompt,
                  ],
                })

                if (
                  reformulateResponse.isRight() &&
                  reformulateResponse.value.content
                ) {
                  const reformulatedJsonContent = extractJSON(
                    reformulateResponse.value.content,
                  )
                  const reformulatedData = JSON.parse(reformulatedJsonContent!)

                  obj.analysis = {
                    ...obj.analysis,
                    dataRefined: JSON.stringify(reformulatedData.data),
                  }
                }
              }

              // Atualiza o estado do contrato
              setContract((prev) => ({
                ...prev!,
                prompts: updatedPrompts,
              }))

              // Incrementa o progresso e atualiza o estado
              currentProgress += progressIncrement
              setProgress(Math.min(currentProgress, 100))
            } catch (error) {
              console.error(
                `Erro ao fazer o parse do conteúdo: ${obj.title}`,
                error,
              )
            }
          }
        } catch (error) {
          console.error(`Erro ao processar o prompt: ${obj.title}`, error)
        }
      }
    }
  }

  function handleContractChange(value: string) {
    const prompt = analyPrompts.find((prompt) => prompt.id === value)
    setContract(prompt)
  }

  const handlePDFUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post(
        'http://localhost:3000/extract-text',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      setPdfText(response.data.text)

      const documentMessage: Completion = {
        role: 'system',
        content: `Abaixo está o documento a ser analisado:
        ${response.data.text}`,
      }

      setAiPrompt((prevMessages) => [...prevMessages, documentMessage])
    } catch (error) {
      console.error('Erro ao Extrair Texto:', error)
      alert('Erro ao processar o arquivo. Veja o console para mais detalhes.')
    }
  }

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!pdfFile) {
      form.setValue('prompt', '') // Reseta o valor do prompt para o estado inicial
      setContract(undefined) // Opcional: reseta o estado local do contrato
      setPdfText(null) // Opcional: reseta o texto do PDF
    }
  }, [pdfFile, form, pdfText]) // Inclua `form` como dependência

  useEffect(() => {
    console.log(contract)
  }, [contract]) // Inclua `form` como dependência

  return (
    <div className="flex w-full flex-col gap-8 px-4 py-14">
      <div className="flex flex-col gap-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center justify-between gap-4 space-y-6"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-2xl text-algar-teal-900">
                      Contrato:
                    </FormLabel>

                    <FormDescription>
                      Este é o tipo de contrato que a IA irá analisar de acordo
                      com o prompt criado.
                    </FormDescription>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={!pdfFile}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'max-w-[400px] justify-between',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? analyPrompts.find(
                                  (prompt) => prompt.id === field.value,
                                )?.title
                              : 'Selecione o contrato'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="max-w-[400px] p-0">
                        <Command>
                          <CommandInput placeholder="Procure pelo contrato..." />
                          <CommandList>
                            <CommandEmpty>
                              Não encontramos este contrato.
                            </CommandEmpty>
                            <CommandGroup>
                              {analyPrompts.map((prompt) => (
                                <CommandItem
                                  value={prompt.title}
                                  key={prompt.id}
                                  onSelect={() => {
                                    form.setValue('prompt', prompt.id) // Define o valor no formulário
                                    handleContractChange(prompt.id) // Atualiza o contrato selecionado
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      prompt.id === form.getValues('prompt')
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                  {prompt.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={!contract || !pdfFile}
                type="submit"
                className="border-4 border-algar-teal-100 bg-algar-teal-500 hover:text-algar-teal-100"
              >
                Analizar
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex w-full items-center justify-center">
          <Progress value={progress} className="w-full border-2" />
        </div>
      </div>

      <Separator />

      <div
        className={`${isMobile ? 'flex flex-col items-center justify-center' : 'flex justify-between'} mt-8 w-full gap-4 py-4`}
      >
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label
                htmlFor="pdfUpload"
                className="text-xl font-medium text-algar-teal-900"
              >
                Upload do Arquivo PDF:
              </label>

              <input
                id="pdfUpload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0]
                    setPdfFile(file)
                    await handlePDFUpload(file)
                  }
                }}
              />

              <Button
                asChild
                disabled={!!pdfFile}
                className={cn(
                  'border-2 px-4 py-2 text-algar-teal-900',
                  pdfFile
                    ? 'cursor-not-allowed border-gray-200 bg-gray-200 text-gray-500'
                    : 'bg-algar-teal-50 cursor-pointer border-algar-teal-500 hover:bg-algar-teal-100',
                )}
              >
                <label
                  htmlFor="pdfUpload"
                  className={cn(
                    pdfFile ? 'cursor-not-allowed' : 'cursor-pointer',
                  )}
                  onClick={(e) => {
                    if (pdfFile) {
                      e.preventDefault() // Impede o clique de abrir a janela de arquivos
                    }
                  }}
                >
                  Escolher Arquivo
                </label>
              </Button>
            </div>

            {pdfFile && (
              <div className="mt-2 flex items-center gap-6">
                <p className="flex items-center gap-2 text-lg text-algar-teal-800">
                  <span className="font-semibold">Arquivo Selecionado:</span>
                  <span className="max-w-40 truncate">{pdfFile.name}</span>
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setPdfFile(null)
                    setContract(undefined)
                  }}
                  className="rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            )}
          </div>

          <div className="flex-1">
            {pdfFile ? (
              <iframe
                src={URL.createObjectURL(pdfFile)}
                className="h-full min-h-[40rem] w-full rounded-xl"
                title="Visualização do PDF"
              ></iframe>
            ) : (
              <p className="text-center text-gray-500">
                Nenhum arquivo selecionado
              </p>
            )}
          </div>
        </div>

        <ScrollArea className={`${isMobile ? 'mt-12' : 'max-h-[50rem]'}`}>
          <div className="flex max-w-96 flex-col justify-center gap-6 px-1">
            {contract &&
              contract.prompts.map((prompt, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row justify-between gap-4">
                    <div>
                      <CardTitle className="break-all text-algar-teal-800">
                        {prompt.title}
                      </CardTitle>
                    </div>
                    <div>
                      {prompt.analysis?.status === 'valid' ? (
                        <Badge className="bg-algar-teal-500 hover:text-algar-teal-100">
                          Validado
                        </Badge>
                      ) : prompt.analysis?.status === 'invalid' ? (
                        <Badge className="bg-red-600 hover:text-red-100">
                          Inválido
                        </Badge>
                      ) : prompt.analysis?.status === 'attention' ? (
                        <Badge className="bg-algar-yellow-500 hover:text-algar-yellow-100">
                          Atenção
                        </Badge>
                      ) : prompt.analysis?.status === 'pending' ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        <Skeleton className="m-2 h-[20px] w-[100px] rounded-full" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <ScrollArea className="h-[10rem] w-full rounded-md border p-4">
                      {prompt.analysis?.data ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {JSON.stringify(prompt.analysis.data)}
                        </ReactMarkdown>
                      ) : (
                        <>
                          <Skeleton className="m-2 h-[20px] w-[280px] rounded-full" />
                          <Skeleton className="m-2 h-[20px] w-[220px] rounded-full" />
                          <Skeleton className="m-2 h-[20px] w-[200px] rounded-full" />
                        </>
                      )}
                    </ScrollArea>

                    {prompt.analysis?.dataRefined && (
                      <Dialog>
                        <DialogTrigger className="rounded-xl bg-algar-teal-500 p-2 text-algar-gray-100">
                          Ver sugestão
                        </DialogTrigger>
                        <DialogContent
                          className={`${isMobile ? 'max-w-[100vw]' : 'max-w-[70vw]'} max-h-[75vh] overflow-auto`}
                        >
                          <DialogHeader className="flex flex-col gap-4">
                            <DialogTitle className="text-start">
                              Sugestão de melhoria:
                            </DialogTitle>

                            <DialogDescription
                              className={`${isMobile ? 'max-w-[90vw]' : 'max-w-[65vw]'} max-h-[75vh] overflow-x-auto`}
                            >
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                className={cn('text-start')}
                              >
                                {`\`\`\`json ${JSON.stringify(JSON.parse(prompt.analysis.dataRefined), null, 2)}`}
                              </ReactMarkdown>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
