"use client"
import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import ModalWrapper from './ModalWrapper'
import Input from '../Input'
import Button from '../Button'
import { loginAction } from '@/redux/actions/user.actions'
import { CLEAR_ERROR, CLOSE_LOGIN_MODAL, OPEN_REGISTER_MODAL } from '@/redux/constance'

export default function Login() {

    const router = useRouter()
    const dispatch = useDispatch()
    const { openLogin } = useSelector((state: any) => state.toggle)
    const { user, error } = useSelector((state: any) => state.user)

    const [loading, setLoadig] = useState(false)
    const [detail, setDetail] = useState({
        email: "",
        password: ""
    })




    const handleLogin = async () => {
        if (!detail.email || !detail.password || !detail.email.includes("@")) {
            return toast("Please enter all fields")
        }
        setLoadig(true)
        await loginAction({ email: detail.email, password: detail.password })(dispatch)
        setLoadig(false)
        router.refresh()
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: CLEAR_ERROR })
            return
        }
    }, [error,dispatch])
    useEffect(() => {
        if (user?._id) {
            dispatch({ type: CLOSE_LOGIN_MODAL })
            setDetail({ email: "", password: "" })
        }
    }, [user?._id, dispatch])
    const handleClose = () => {
        dispatch({ type: CLOSE_LOGIN_MODAL })
        setDetail({ email: "", password: "" })
    }
    const moveToRegister = () => {
        setDetail({ email: "", password: "" })
        dispatch({ type: CLOSE_LOGIN_MODAL })
        dispatch({ type: OPEN_REGISTER_MODAL })
    }

    return (
        <div className=' relative'>
            <ModalWrapper isOpen={openLogin} close={handleClose} disable={loading} headertext='Welcome back'>
                <div className=' flex flex-col justify-center items-center w-full '>
                    <div className=' bg-neutral-900 rounded-xl px-10 flex flex-col justify-center items-center w-full'>
                        <div className='flex flex-col justify-center items-center gap-4 w-full'>
                            <Input disable={loading} type={"email"} placeholder=' Enter Email' value={detail.email} onChange={(e) => { setDetail({ ...detail, email: e.target.value }) }} />
                            <Input disable={loading} type={"password"} placeholder=' Enter Password' value={detail.password} onChange={(e) => { setDetail({ ...detail, password: e.target.value }) }} />
                            <Button disable={loading} title='Login' onclick={handleLogin} style className='mt-5' />
                        </div>
                        <div className=' flex flex-col items-start justify-center w-full mt-10 py-3 '>
                            <p className='opacity-60' style={{ font: "100 0.7rem normal" }}>
                                Create a Account
                            </p>
                            <button disabled={loading} onClick={moveToRegister} className=' shadow-lg'>Register</button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    )
}
