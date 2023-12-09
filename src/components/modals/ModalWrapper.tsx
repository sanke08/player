"use client"
import React, { useEffect, useState } from 'react'
import { X } from "lucide-react"
import { twMerge } from "tailwind-merge"
import Button from '../Button'



interface Props {
    children: React.ReactNode
    headertext?: string
    hilighttext?: string
    subtext?: string
    close: () => void
    isOpen: boolean
    classname?: string
    disable?: boolean
}



const ModalWrapper: React.FC<Props> = ({ children, headertext, disable, hilighttext, subtext, close, isOpen, classname }) => {

    const [show, setShow] = useState(false)

    const handleclose = () => {
        setShow(false)
        setTimeout(() => {
            close()
        }, 300);
    }
    useEffect(() => {
        setTimeout(() => {
            setShow(isOpen)
        }, 0);
    }, [isOpen])

    return (
        <div className={twMerge(' w-full h-screen fixed  hidden justify-center items-center top-0 bg-neutral-900/50 z-30 px-2 md:px-0', isOpen && "flex")}>
            <div className={twMerge(' bg-neutral-900 rounded-xl p-5 w-[95%] sm:w-[25rem] translate lgt shadow-2xl shadow-green-700/20', show ? "translate-y-0 opacity-100" : "opacity-0 translate-y-40", classname)}>
                <div className=' w-full flex justify-end'>
                    <Button onclick={handleclose} disable={disable} icon={<X color='white' />} className=' min-w-max px-1' />
                </div>
                <div className=' md:px-10 flex flex-col items-center justify-center w-full'>
                    <div className=' font-semibold text-2xl'>{headertext}</div>
                    <p className=' text-neutral-400 text-xs sm:text-base md:w-5/6 w-full text-center mt-1'>{subtext} <span className=' text-indigo-500'>{hilighttext}</span> </p>
                </div>
                <div className=' w-full h-full mt-5'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalWrapper