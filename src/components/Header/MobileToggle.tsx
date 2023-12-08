"use client"
import { loadUser } from '@/redux/actions/user.actions'
import { CLOSE_MOBILE_TOGGLE, OPEN_LOGIN_MODAL, OPEN_MOBILE_TOGGLE, OPEN_REGISTER_MODAL } from '@/redux/constance'
import axios from 'axios'
import { ChevronLeft, ChevronRight, Heart, Home, LucideSheet, Menu, PlayCircle, Search, Sheet, UserCircle, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button'
import { twMerge } from 'tailwind-merge'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'




const MobileToggle = ({ children, userId, userImage }: { children: React.ReactNode, userId: any, userImage: string }) => {

    const dispatch = useDispatch()
    const { openMobile } = useSelector((state: any) => state.toggle)
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className=''>
            <div className={twMerge(' fixed left-0 w-[0%] h-full top-16 bottom-0 lgt z-10 overflow-x-hidden sm:hidden', openMobile && "w-[100%] px-1 lgt")}>
                <div className=' bg-neutral-900 h-full rounded-xl'>
                    {children}
                </div>
            </div>
            <div className=' relative pb-32 bg-gradient-to-b from-green-800 w-full rounded-t-lg py-5 pr-5 pl-3 flex justify-between'>
                <div className='gap-4 hidden sm:flex items-center'>
                    <Button onclick={() => router.back()} circle icon={<ChevronLeft size={35} />} className=' bg-neutral-900 h-fit p-1 rounded-full' />
                    <Button onclick={() => router.forward()} circle icon={<ChevronRight size={35} />} className=' bg-neutral-900 h-fit p-1 rounded-full' />
                </div>
                <div className=' flex gap-2 items-center sm:hidden'>
                    <div className=' flex relative items-center z-30 sm:hidden'>
                        <Button icon={<X />} onclick={() => dispatch({ type: CLOSE_MOBILE_TOGGLE })} className={twMerge('cursor-pointer min-w-fit lgt p-0.5 fixed ', openMobile ? "translate-x-0 rotate-0" : "-translate-x-10  rotate-45")} />
                        <Button icon={<Menu />} onclick={() => dispatch({ type: OPEN_MOBILE_TOGGLE })} className={twMerge('cursor-pointer min-w-fit p-0.5 lgt', openMobile ? " -translate-x-10 rotate-45" : " translate-x-0 rotate-0")} />
                    </div>
                    <Button onclick={() => router.push("/")} icon={<Home />} className=' p-0.5 min-w-fit' />
                    <Button onclick={() => router.push("/search")} icon={<Search />} className=' p-0.5 min-w-fit' />
                </div>
                {
                    userId ?
                        <div className=' flex items-center gap-5'>
                            <Button title='Logout' style onclick={() => { signOut(); router.refresh() }} />
                            {
                                userImage ?
                                    <div className=' relative w-10 h-10 aspect-square rounded-full overflow-hidden'>
                                        <Image src={userImage} alt='img' fill className=' object-contain' />
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
                <button onClick={() => router.push("/liked")} title='liked' className={twMerge(' absolute group bottom-10 left-10 gap-2 w-56 flex items-center bg-green-900/40 hover:bg-green-700/90 transition-all duration-500 rounded-lg py-2', pathname === "/liked" && " outline outline-1 scale-[110%] bg-green-700/90")}>
                    <p className='font-medium text-lg w-full'>Liked</p>
                    <div className=' w-1/3'>
                        <Heart size={40} color='' className=' group-hover:scale-110 fill-green-500 transition-all duration-200' />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default MobileToggle