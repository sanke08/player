"use client"
import { OPEN_UPLOAD_FILE_MODAL } from '@/redux/constance'
import {  FolderPlus, Heart } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, } from 'react-redux'
import Button from '../Button'

export default function LibraryHeader({ user }: any) {
    const dispatch = useDispatch()
    const pathname=usePathname()
    const router = useRouter()
    return (
        <div className=' flex justify-between w-full'>
            <div className=' w-max'>
                <p>Your library</p>
            </div>
            {
                // @ts-ignore
                user?._id &&
                <div className=' flex items-center gap-2 '>
                    {
                      pathname==="/liked" ?
                            <Heart size={23} onClick={() => router.push("/")} color='' className=' cursor-pointer fill-green-500' />
                            :
                            <Heart size={20} onClick={() => router.push("/liked")} className=' cursor-pointer opacity-50 hover:opacity-100' />
                    }
                    <Button onclick={() => { dispatch({ type: OPEN_UPLOAD_FILE_MODAL }) }} icon={<FolderPlus size={23} />} className=' cursor-pointer opacity-50 p-0 m-0 min-w-fit hover:opacity-100 transition' />
                </div>
            }
        </div>
    )
}
