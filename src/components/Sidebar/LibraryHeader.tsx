"use client"
import { OPEN_UPLOAD_FILE_MODAL } from '@/redux/constance'
import { ChevronLeft, FolderPlus, Heart, HeartIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function LibraryHeader() {
    const {data:session}=useSession()
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const router = useRouter()
    return (
        <div className=' flex justify-between w-full'>
            <div className=' w-max'>
                {
                    searchParams.get("liked") ?
                        <p>Liked Songs</p> :
                        <p>Your library</p>
                }
            </div>
            {
                // @ts-ignore
                session?.user?.id &&
                <div className=' flex items-center gap-2 '>

                    {
                        searchParams.get("liked") ?
                            <Heart size={23} onClick={() => router.push("/")} color='' className=' cursor-pointer fill-green-500' />
                            :
                            <Heart size={20} onClick={() => router.push("?liked=true")} className=' cursor-pointer opacity-50 hover:opacity-100' />
                    }
                    <button onClick={() => { dispatch({ type: OPEN_UPLOAD_FILE_MODAL }) }} className=' cursor-pointer opacity-50 hover:opacity-100 transition'><FolderPlus size={23} />  </button>
                </div>
            }
        </div>
    )
}
