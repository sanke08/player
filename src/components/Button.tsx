

import { Loader2 } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'


interface Props {
  title?: string
  onclick: () => void,
  icon?: any,
  className?: string,
  style?: boolean
  outline?: boolean
  disable?: boolean
  circle?: boolean,
  loading?: boolean
}

export default function Button({ title, onclick, icon, className, style, loading, outline, disable, circle }: Props) {
  return (
    <>
      <button onClick={onclick} disabled={(disable || loading)} className={twMerge('px-5 py-1.5 rounded-lg flex active:scale-95 justify-center items-center min-w-[5rem]', circle && "min-w-fit", style && "bg-white/90 hover:bg-white text-black transition-all", outline && " border-neutral-500 border-2 text-white", className)}>
        {
          loading ?
            <Loader2 className=' animate-spin' color='black' />
            :
            <>

              {title} {icon && icon}
            </>
        }
      </button>
    </>
  )
}
