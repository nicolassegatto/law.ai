import { Bot, ChevronDown, History, Home } from 'lucide-react'

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
import { NavLink } from './navlink'
import { PartnerImage, PartnerLogo } from './partnerLogo'
import { Dialog, DialogTrigger } from './ui/dialog'

export function Header() {
  return (
    <div className="shadow-lg">
      <nav className="m-auto flex h-24 w-full items-center justify-between px-4 md:max-w-screen-md lg:max-w-screen-lg">
        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center">
            <PartnerLogo>
              <PartnerImage className="h-8 w-8" />
            </PartnerLogo>
            <ApplicationLogo className="text-xs text-background" />
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="h-24 border-b-4 border-algar-teal-800 px-4 text-background transition-all duration-100 hover:rounded-t-lg hover:border-algar-teal-300 hover:bg-algar-teal-800 data-[active=true]:rounded-t-lg data-[active=true]:border-algar-teal-100 data-[active=true]:bg-algar-teal-900"
            >
              <Home size={20} />
              Inicio
            </NavLink>
            <NavLink
              to="/history"
              className="h-24 border-b-4 border-algar-teal-800 px-4 text-background transition-all duration-100 hover:rounded-t-lg hover:border-algar-teal-300 hover:bg-algar-teal-800 data-[active=true]:rounded-t-lg data-[active=true]:border-algar-teal-100 data-[active=true]:bg-algar-teal-900"
            >
              <History size={20} /> Histórico
            </NavLink>

            <Dialog>
              <DialogTrigger className="w-full outline-none">
                <span className="flex h-24 items-center gap-1 border-b-4 border-algar-teal-800 px-4 text-sm font-bold text-background transition-all duration-100 hover:rounded-t-lg hover:border-algar-teal-300 hover:bg-algar-teal-800 data-[active=true]:rounded-t-lg data-[active=true]:border-algar-teal-100 data-[active=true]:bg-algar-teal-900">
                  <Bot size={20} /> Chat
                </span>
              </DialogTrigger>
              <ChatComponent />
            </Dialog>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="group flex items-center justify-center gap-2 outline-none">
                <Avatar className="border-2 border-algar-teal-100">
                  <AvatarImage src="https://github.com/nicolassegatto.png" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <ChevronDown className="text-background transition duration-200 group-data-[state=open]:rotate-180" />
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
        </div>
      </nav>
    </div>
  )
}
