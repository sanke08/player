import './globals.css'
import Login from '@/components/modals/Login'
import Register from '@/components/modals/Register'
import Sidebar from '@/components/Sidebar/SideBar'
import Header from '@/components/Header/Header'
import ReduxProvider from '@/redux/ReduxProvider'
import ToastProvider from '@/components/ToastProvider'
import { Toaster } from 'react-hot-toast'
import Upload from '@/components/modals/Upload'
import Library from '@/components/Sidebar/LibrarySidebar'
import Player from '@/components/Player'
import { getAuthSession } from '@/lib/auth'
import { User } from '@/lib/models/user'



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()
  // @ts-ignore
  const user = await User.findById(session?.user._id)
  console.log(user)
  return (
    <ReduxProvider>
      <html lang="en" >
        <body className=' bg-black'>
          <div>
            <ToastProvider>
              <Toaster toastOptions={{ duration: 3000, position: "top-center" }} />
            </ToastProvider>
            <Upload />
            <Login />
            <Register />
            <div className=' flex w-full h-full'>
              <div className=' fixed top-0 h-full w-[250px] hidden sm:block'>
                <Sidebar />
                <div className=' h-full bg-neutral-900 rounded-lg'>
                  <Library userId={user._id} />
                </div>
              </div>
              <div className=' w-full py-1 h-full sm:pl-[253px]'>
                <div className='  bg-neutral-900 rounded-xl pb-20'>
                  <Header userId={user._id} userImage={user.image} />
                  <div className=' w-full h-full min-h-[75vh] rounded-xl '>
                    {children}
                  </div>
                </div>
              </div>
            </div>
            <Player />
          </div>
        </body>
      </html>
    </ReduxProvider>
  )
}
