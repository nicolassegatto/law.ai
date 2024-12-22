import { Bot, EllipsisVertical, History, Home } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ApplicationLogo } from './applicationLogo'
import { ChatComponent } from './chat'
import { Footer } from './footer'
import { NavLink } from './navlink'
import { PartnerCopy } from './partnerCopy'
import { PartnerImage, PartnerLogo } from './partnerLogo'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'
import { Separator } from './ui/separator'

export function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false) // Controla o Drawer
  const [isDialogOpen, setIsDialogOpen] = useState(false) // Controla o Dialog

  // Função para fechar o Drawer e abrir o Dialog
  const handleOpenChat = () => {
    setIsOpen(false) // Fecha o Drawer

    setTimeout(() => {
      setIsDialogOpen(true) // Abre o Dialog após o Drawer fechar
    }, 400) // Ajuste o tempo conforme necessário
  }

  const openDrawer = () => {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ChatComponent />
      </Dialog>
      <div className="flex items-center justify-between border-b-4 border-algar-teal-100 px-4 py-4 shadow-lg outline-none">
        <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger
            onClick={openDrawer}
            className="flex items-center outline-none"
          >
            <EllipsisVertical className="text-background" />

            <div className="items-center">
              <PartnerLogo>
                <PartnerImage className="h-8 w-8" />
              </PartnerLogo>
            </div>
          </DrawerTrigger>

          <DrawerContent className="flex h-full w-[95%] flex-row rounded-r-2xl outline-none">
            <div className="flex flex-1 flex-col justify-between">
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle className="mx-auto">
                    <PartnerLogo className="text-muted-foreground">
                      <PartnerImage className="h-8 w-8" />
                    </PartnerLogo>
                  </DrawerTitle>

                  <DrawerDescription className="text-center">
                    Lawriana, sua gestora de contratos por IA.
                  </DrawerDescription>
                </DrawerHeader>

                <div className="mt-4 flex flex-col gap-4 pl-10">
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    to="/"
                    className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
                  >
                    <Home size={20} />
                    Inicio
                  </NavLink>

                  <Separator />

                  <NavLink
                    to="/history"
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
                  >
                    <History size={20} /> Histórico
                  </NavLink>

                  <Separator />

                  <DialogTrigger
                    onClick={handleOpenChat} // Função que fecha o Drawer e abre o Dialog
                    className="flex w-full items-center gap-1 text-sm font-bold text-muted-foreground outline-none hover:text-foreground data-[active=true]:text-foreground"
                  >
                    <Bot size={20} /> Chat
                  </DialogTrigger>

                  <Separator />
                </div>
              </div>

              <DrawerFooter>
                <Footer className="flex flex-col items-center justify-center gap-2 p-10 text-muted-foreground">
                  <PartnerCopy />
                  <ApplicationLogo />
                </Footer>
              </DrawerFooter>
            </div>

            <div className="my-auto mr-4 h-[100px] w-2 rounded-full bg-muted-foreground" />
          </DrawerContent>
        </Drawer>

        <div className="flex flex-col items-end gap-2">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center gap-2 outline-none">
                <Avatar className="border-2 border-algar-teal-100">
                  <AvatarImage src="https://github.com/nicolassegatto.png" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Nicolas Segatto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Prompts</DropdownMenuItem>
                <DropdownMenuItem>Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ApplicationLogo className="text-xs text-background" />
        </div>
      </div>
    </>
  )
}
