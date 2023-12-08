"use client"
import { CLOSE_MOBILE_TOGGLE, OPEN_UPLOAD_FILE_MODAL } from '@/redux/constance'
import { FolderPlus } from 'lucide-react'
import React from 'react'
import { useDispatch, } from 'react-redux'
import Button from '../Button'

export default function LibraryHeader({ userId }: any) {
    const dispatch = useDispatch()
    return (
        <div className=' flex justify-between w-full'>
            <div className=' w-max'>
                <p>Your library</p>
            </div>
            {
                userId &&
                <Button onclick={() => { dispatch({ type: OPEN_UPLOAD_FILE_MODAL }); dispatch({ type: CLOSE_MOBILE_TOGGLE }) }} icon={<FolderPlus size={23} />} className=' cursor-pointer opacity-50 p-0 m-0 min-w-fit hover:opacity-100 transition' />
            }
        </div>
    )
}