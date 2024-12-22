import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'

import { IsMobileContext } from '@/_context/isMobileContext'
import lawAnaly from '@/assets/lawAnaly.jpg'
import lawriana from '@/assets/Lawriana.jpg'
import { ChatComponent } from '@/components/chat'
import { NavLink } from '@/components/navlink'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

export function Home() {
  const { isMobile } = useContext(IsMobileContext)

  return (
    <div className="py-12">
      <Helmet title="home" />

      <div className="flex flex-col gap-4">
        <div className="px-6">
          <h1 className="text-3xl font-extrabold text-algar-teal-900">
            Serviços
          </h1>
          <p className="text-sm text-muted-foreground">
            Escolha o que deseja fazer!
          </p>
        </div>

        <div
          className={`${isMobile ? 'grid-rows-5' : 'grid-cols-5'} grid gap-6 px-6`}
        >
          <Card
            className={` ${isMobile ? 'row-span-2' : 'col-span-3'} group flex flex-col justify-between border-4 pt-6 shadow-lg`}
          >
            <CardContent className={`items-center justify-center`}>
              <img
                src={lawAnaly}
                alt="lawImage"
                className={`${!isMobile && 'h-96'} w-auto rounded-2xl object-cover transition duration-300 ease-in-out group-hover:scale-105`}
              />
            </CardContent>

            <CardHeader className="pt-0">
              <CardTitle className="text-algar-teal-900">
                Analise por IA
              </CardTitle>
              <CardDescription>
                Vamos juntos revisar e analisar um documento jurídico?
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button
                asChild
                className="w-full bg-algar-teal-500 font-bold text-background hover:text-algar-teal-500"
              >
                <NavLink to="/analy">Fazer analise</NavLink>
              </Button>
            </CardFooter>
          </Card>

          <Card
            className={` ${isMobile ? 'row-span-3' : 'col-span-2'} group flex flex-col justify-between border-4 pt-6 shadow-lg`}
          >
            <CardContent className="w-full items-center justify-center">
              <img
                src={lawriana}
                alt="lawImage"
                className="h-96 w-full rounded-2xl object-cover transition duration-300 ease-in-out group-hover:scale-105"
              />
            </CardContent>

            <CardHeader className="pt-0">
              <CardTitle className="text-algar-teal-900">Ai Chat</CardTitle>
              <CardDescription>
                Possui uma dúvida jurídica? A Lawriana te ajuda!
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Dialog>
                <DialogTrigger asChild className="w-full">
                  <Button className="w-full bg-algar-teal-500 font-bold text-background hover:text-algar-teal-500">
                    Falar com a Lawriana
                  </Button>
                </DialogTrigger>
                <ChatComponent />
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
