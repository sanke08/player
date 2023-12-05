"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname, useSearchParams } from "next/navigation"
import { twMerge } from 'tailwind-merge'
import { useDispatch, useSelector } from 'react-redux'
import { FolderPlus, Heart, Home, Save, Search } from 'lucide-react'
import { OPEN_UPLOAD_FILE_MODAL } from '@/redux/constance'


export default function Sidebar() {
    const pathname = usePathname()
    return (
        <div className='flex w-full'>
            <div className=' w-[250px] p-1 flex-col gap-2 sticky top-0 sm:flex hidden'>
                <div className=' h-[100px] bg-neutral-900 rounded-xl p-2 flex flex-col justify-evenly gap-2'>
                    <Link href={"/"} prefetch={false} className={twMerge(' w-full hover:text-white transition flex items-center gap-2', pathname === "/" ? " opacity-100" : " opacity-50")}>
                        <Home size={25} />  Home
                    </Link>
                    <Link href={"/search"} prefetch={false} className={twMerge(' w-full hover:text-white transition flex items-center gap-2', pathname === "/search" ?  " opacity-100" : " opacity-50")}>
                        <Search size={25} /> Search
                    </Link>
                </div>
            </div>
        </div>
    )
}
