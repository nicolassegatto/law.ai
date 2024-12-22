import { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

import { IsMobileContext } from '@/_context/isMobileContext'
import { Completion, Completions } from '@/api/completions'
import initialData from '@/assets/docs.json'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { PartnerImage } from './partnerLogo'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'

const messageForm = z.object({
  message: z.string(),
})

type MessageForm = z.infer<typeof messageForm>

export function ChatComponent() {
  const { isMobile } = useContext(IsMobileContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setFocus,
  } = useForm<MessageForm>()

  const [messages, setMessages] = useState<Completion[]>([
    {
      role: 'system',
      content: `Você é uma assistente Juridica da Algar telecom, e deve auxiliar os advogados da empresa com respostas as duvidas normativas baseadas nos documentos normativos. Os documentos normativos sao:
      ${JSON.stringify(initialData)}`,
    },
    {
      role: 'assistant',
      content: 'Olá! Como posso ajudar você hoje?',
    },
  ])

  const [isLoading, setIsLoading] = useState(false) // Estado de carregamento

  const scrollRef = useRef<HTMLDivElement | null>(null) // Referência para o scroll

  async function handleMessage(data: MessageForm) {
    if (!data.message.trim()) return

    const newMessage: Completion = {
      role: 'user',
      content: data.message,
    }

    // Adiciona a mensagem do usuário ao estado
    setMessages((prevMessages) => [...prevMessages, newMessage])

    // Inicia o carregamento
    setIsLoading(true)

    try {
      // Chama a API com as mensagens atualizadas
      const updatedMessages = [...messages, newMessage]
      const response = await Completions({ completions: updatedMessages })

      if (response.isLeft()) {
        console.error(response.value)
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'assistant',
            content: 'Erro ao processar a mensagem',
          },
        ])
        return
      }

      // Atualiza as mensagens com a resposta da API
      const aiResponseContent = response.value.content
      if (typeof aiResponseContent === 'string') {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'assistant',
            content: `${aiResponseContent}`,
          },
        ])
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'assistant',
            content: 'Erro ao processar a mensagem',
          },
        ])
      }
    } catch (error) {
      console.error(error)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: 'Erro ao processar a mensagem',
        },
      ])
    } finally {
      // Finaliza o carregamento
      setIsLoading(false)
    }

    reset()
    setFocus('message') // Foca no campo após o reset
  }

  const scrollBotton = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' }) // Adiciona o comportamento suave
  }
  // Efeito para rolar automaticamente para a última mensagem
  useEffect(() => {
    scrollBotton()
  }, [messages]) // O efeito será chamado sempre que 'messages' for atualizado

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center justify-start gap-2">
          <PartnerImage className="h-8" /> Lawriana 👩🏻‍⚖️
        </DialogTitle>
        <DialogDescription className="flex items-center justify-start">
          Tire suas dúvidas institucionais!
        </DialogDescription>
      </DialogHeader>

      <ScrollArea
        className={`${isMobile ? 'max-h-[420px]' : 'h-[600px]'} w-full rounded-lg bg-white pr-4 shadow-lg`}
      >
        {messages.map((message, index) =>
          message.role === 'assistant' ? (
            <div
              key={index}
              className="mb-4 flex gap-3 p-4 text-sm text-slate-600"
            >
              <Avatar>
                <AvatarFallback>{'AI'}</AvatarFallback>
                <AvatarImage
                  src={
                    'https://yt3.googleusercontent.com/YZHA15d-NrZl2Ak0h2lvC8Fc6Ml9iDc5ddXL50f-p8qv1k4QUovP2BqUq6wLHLMEaiyhkxul7Q=s900-c-k-c0x00ffffff-no-rj'
                  }
                />
              </Avatar>
              <div className="flex max-w-[70%] flex-col gap-2">
                <span className="flex justify-start font-bold text-slate-700">
                  {'Assistente'}
                </span>
                <div className="flex justify-start rounded-lg bg-algar-gray-100 p-4">
                  <ReactMarkdown
                    className="prose w-full flex-1 leading-relaxed"
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            message.role === 'user' && (
              <div
                key={index}
                className="mb-4 flex justify-end gap-3 p-4 text-sm text-slate-600"
              >
                <p className="max-w-[70%] leading-relaxed">
                  <span className="flex justify-end font-bold text-slate-700">
                    {'Nicolas'}
                  </span>
                  <span className="flex justify-end rounded-lg bg-algar-teal-100 p-4">
                    {message.content}
                  </span>
                </p>
                <Avatar>
                  <AvatarFallback>
                    {message.role === 'user' ? 'NS' : 'AI'}
                  </AvatarFallback>
                  <AvatarImage src={'https://github.com/nicolassegatto.png'} />
                </Avatar>
              </div>
            )
          ),
        )}
        <div ref={scrollRef} />
      </ScrollArea>

      <DialogFooter>
        <form
          className="flex w-full gap-2"
          onSubmit={handleSubmit(handleMessage)}
        >
          <Input
            placeholder="Em que posso te ajudar hoje?"
            id="message"
            type="text"
            disabled={isSubmitting || isLoading} // Desabilita o input quando estiver carregando
            {...register('message')}
          />
          <Button
            type="submit"
            className="bg-algar-teal-400 hover:text-algar-teal-400"
            disabled={isSubmitting || isLoading} // Desabilita o botão quando estiver carregando
          >
            {isSubmitting || isLoading ? 'Carregando...' : 'Perguntar'}
          </Button>
        </form>
      </DialogFooter>
    </DialogContent>
  )
}
