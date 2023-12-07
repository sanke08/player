"use client"
import { loadUser } from '@/redux/actions/user.actions'
import { CLOSE_MOBILE_TOGGLE, OPEN_LOGIN_MODAL, OPEN_MOBILE_TOGGLE, OPEN_REGISTER_MODAL } from '@/redux/constance'
import axios from 'axios'
import { ChevronLeft, ChevronRight, Home, Menu, Search, UserCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button'
import { twMerge } from 'tailwind-merge'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'




const MobileToggle = ({ children, user }: { children: React.ReactNode, user: { email?: string | undefined | null, name?: string | undefined | null, _id?: string | undefined | null, image: string | undefined | null } | null | undefined }) => {

    const dispatch = useDispatch()
    const { openMobile } = useSelector((state: any) => state.toggle)
    const router = useRouter()
    return (
        <div className=''>
            <div className={twMerge(' fixed left-0 w-[0%] h-full top-16 bottom-0 lgt z-10 overflow-x-hidden sm:hidden', openMobile && "w-[100%] px-1 lgt")}>
                <div className=' bg-neutral-900 h-full rounded-xl'>
                    {children}
                </div>
            </div>
            <div className=' pb-32 bg-gradient-to-b from-green-800 w-full rounded-t-lg py-5 pr-5 pl-3 flex justify-between'>
                <div className='gap-4 hidden md:flex items-center'>
                    <Button onclick={() => router.back()} circle icon={<ChevronLeft size={35} />} className=' bg-neutral-900 h-fit p-1 rounded-full' />
                    <Button onclick={() => router.forward()} circle icon={<ChevronRight size={35} />} className=' bg-neutral-900 h-fit p-1 rounded-full' />
                </div>
                <div className=' flex gap-2 items-center md:hidden'>
                    <div className=' flex relative  items-center z-30 sm:hidden'>
                        <button onClick={() => { dispatch({ type: CLOSE_MOBILE_TOGGLE }); console.log("hhhh") }} className={twMerge('cursor-pointer lgt fixed ', openMobile ? "translate-x-0 rotate-0" : "-translate-x-10  rotate-45")}><X /> </button>
                        <button onClick={() => { dispatch({ type: OPEN_MOBILE_TOGGLE }) }} className={twMerge('cursor-pointer lgt', openMobile ? " -translate-x-10 rotate-45" : " translate-x-0 rotate-0")}><Menu /></button>
                    </div>
                    <Home onClick={() => router.push("/")} />
                    <Search onClick={() => router.push("/search")} />
                </div>
                {
                    user?._id ?
                        <div className=' flex items-center gap-5'>
                            <Button title='Logout' style onclick={() => { signOut(); router.refresh() }} />
                            {
                                user.image ?
                                    <div className=' relative w-10 h-10 aspect-square rounded-full overflow-hidden'>
                                        <Image src={user.image} alt='img' fill className=' object-contain' />
                                    </div>
                                    :
                                    <UserCircle />
                            }
                        </div>
                        :
                        <div className=' flex gap-3'>
                            {/* <Button title='Login' onclick={() => { dispatch({ type: OPEN_LOGIN_MODAL }) }} style />
                            <Button title='Register' onclick={() => { dispatch({ type: OPEN_REGISTER_MODAL }) }} outline /> */}
                            <Button title='Login' style onclick={() => { signIn("google") }} />
                        </div>
                }
            </div>
            {/* <div className=' flex gap-1 px-3 group w-56 items-center bg-green-900/40 hover:bg-green-700/90 transition-all duration-500 cursor-pointer absolute bottom-10 left-10  rounded-md'>
                <div className=' py-3 px-3 w-[80%]'>Play Random</div>
                <PlayCircle className=' group-hover:scale-125 transition-all duration-300' />
            </div> */}
        </div>
    )
}

export default MobileToggle