import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
import { Analy } from '@/pages/app/analy'
import { History } from '@/pages/app/history'
// import { Chat } from '@/pages/app/chat'
import { Home } from '@/pages/app/home'
import { SignIn } from '@/pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/history', element: <History /> },
      { path: '/analy', element: <Analy /> },
      // { path: '/chat', element: <Chat /> },
    ],
  },

  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
