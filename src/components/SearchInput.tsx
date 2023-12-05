"use client"
import React, { useEffect, useState } from 'react'
import Input from './Input'
import { useRouter } from 'next/navigation'

const SearchInput = () => {
    const [name, setName] = useState("")
    const router = useRouter()
    const handleChnge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    useEffect(() => {
        const time = setTimeout(() => {
            if(name){
               router.push("/search?name=" + name)
            }else{
                router.push("/search")
            }
        }, 600);
        return () => clearTimeout(time)
    }, [name, router])

    return (
        <div className=' md:w-1/3'>
            <Input value={name} placeholder='Search Here' type={"text"} onChange={handleChnge} />
        </div>

    )
}

export default SearchInput