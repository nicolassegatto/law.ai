import { Loader } from 'lucide-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { IsMobileContext } from '@/_context/isMobileContext'
import AlgarLogo from '@/assets/algarLogo.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})
type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { isMobile } = useContext(IsMobileContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    console.log(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success('Logado com sucesso!')

    navigate('/')
  }

  return (
    <>
      <div className="w-full p-8">
        <div
          className={`flex ${isMobile ? 'w-full' : 'm-auto w-[340px]'} flex-col justify-center gap-6`}
        >
          <div className="flex flex-col gap-2 text-center">
            <img
              src={AlgarLogo}
              className="m-auto h-12 w-12"
              alt="partner logo"
            />
            <h1 className="text-2xl font-semibold tracking-tight text-algar-teal-900">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe seus contratos pelo painel.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button
              disabled={isSubmitting}
              className="w-full bg-algar-teal-700 text-algar-teal-900 text-background"
              type="submit"
            >
              {isSubmitting ? (
                <Loader className="animate-spin text-algar-teal-900" />
              ) : (
                'Acessar Painel'
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
