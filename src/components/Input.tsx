import React from 'react'
import { twMerge } from 'tailwind-merge'


interface Props {
    type: any
    placeholder?: string
    className?: string
    value?: any
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    disable?: boolean
    accept?: any
}


export default function Input({ type, placeholder, className, value, onChange, disable, accept }: Props) {
    return (
        <input type={type} accept={accept ? accept : ""} placeholder={placeholder} disabled={disable} value={value} onChange={onChange} className={twMerge(' w-full px-4 py-1.5 rounded-lg border border-neutral-400 text-black', className)} />
    )
}
