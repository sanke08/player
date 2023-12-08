"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '../Input'
import Button from '../Button'
import ModalWrapper from './ModalWrapper'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { registerAction } from '@/redux/actions/user.actions'
import {  CLOSE_REGISTER_MODAL, OPEN_LOGIN_MODAL } from '@/redux/constance'




export default function Register() {


    const dispatch = useDispatch()
    const { openRegister } = useSelector((state: any) => state.toggle)
    const { user, error } = useSelector((state: any) => state.user)
    const [loading, setLoadig] = useState(false)
    const router = useRouter()
    const [detail, setDetail] = useState({
        email: "",
        name: "",
        password: ""
    })
    const handleRegister = async () => {
        if (!detail.email || !detail.password || !detail.email.includes("@")) {
            return toast("Please enter all fields")
        }
        setLoadig(true)
        await registerAction({ email: detail.email, password: detail.password, name: detail.name })(dispatch)
        setLoadig(false)
        router.refresh()
    }
    useEffect(() => {
        if (user?._id) {
            dispatch({ type: CLOSE_REGISTER_MODAL })
            setDetail({ email: "", password: "", name: "" })
        }
    }, [user?._id, dispatch, error])
    const handleClose = () => {
        dispatch({ type: CLOSE_REGISTER_MODAL })
        setDetail({ email: "", password: "", name: "" })
    }
    const moveToRegister = () => {
        setDetail({ email: "", password: "", name: "" })
        dispatch({ type: CLOSE_REGISTER_MODAL })
        dispatch({ type: OPEN_LOGIN_MODAL })
    }
    return (

        <ModalWrapper isOpen={openRegister} close={handleClose} disable={loading} headertext='Register Here'>
            <div className='  flex flex-col justify-center items-center w-full relative'>
                <div className=' w-full bg-neutral-900 px-10 rounded-xl flex flex-col justify-center items-center'>
                    <div className='flex flex-col justify-center items-center gap-4 w-full'>
                        <Input disable={loading} type={"text"} placeholder='Enter Name' value={detail.name} onChange={(e) => { setDetail({ ...detail, name: e.target.value }) }} className=' w-full' />
                        <Input disable={loading} type={"email"} placeholder='Enter Email' value={detail.email} onChange={(e) => { setDetail({ ...detail, email: e.target.value }) }} />
                        <Input disable={loading} type={"password"} placeholder='Enter Password' value={detail.password} onChange={(e) => { setDetail({ ...detail, password: e.target.value }) }} />
                        <Button disable={loading} onclick={handleRegister} title='Register' style className='mt-5' />
                    </div>
                    <div className=' flex flex-col items-start justify-center w-full mt-10'>
                        <p className='opacity-60' style={{ font: "100 0.7rem normal" }}>
                            Already Hane Account
                        </p>
                        <button disabled={loading} onClick={moveToRegister} className=' shadow-lg'>Login</button>
                    </div>
                </div>
            </div>

        </ModalWrapper>
    )
}
