"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import ModalWrapper from './ModalWrapper'
import { X } from 'lucide-react'
import { CLOSE_UPLOAD_FILE_MODAL, OPEN_LOGIN_MODAL } from '@/redux/constance'
import FileUploader from '../FileUploader'
import Input from '../Input'
import Image from 'next/image'
import Button from '../Button'
import axios from 'axios'
import { useSession } from 'next-auth/react'






export default function Upload() {

    const router = useRouter()
    const dispatch = useDispatch()
    const {data:session}=useSession()
    const { openUpload } = useSelector((state: any) => state.toggle)
    const [file, setfile] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [fileName, setFileName] = useState<string>("")
    const [artistName, setArtistName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)



    const handleUpload = async () => {
        setLoading(true)
        // @ts-ignore
        const { data } = await axios.post("/api/file/upload", { file, image, fileName, artistName }, { headers: { "Authorization": session?.user?._id } })
        setLoading(false)
    }

    const handleClose = () => {
        setfile("")
        setImage("")
        setFileName("")
        setArtistName("")
        dispatch({ type: CLOSE_UPLOAD_FILE_MODAL })
    }
    
    const changeToLogin=()=>{
        dispatch({ type: CLOSE_UPLOAD_FILE_MODAL })
        dispatch({type:OPEN_LOGIN_MODAL})
    }

    useEffect(()=>{

    },[])

    return (
        <ModalWrapper isOpen={openUpload} headertext='Add Song' classname=' sm:w-[40rem]' close={handleClose}>
            {
                // @ts-ignore
                session?.user?._id ?
                    <div className=' p-5 flex gap-4 flex-col justify-center w-full h-fit'>
                        <div className=' flex gap-4'>
                            <p className=' w-[30%]'>
                                Name :
                            </p>
                            <Input placeholder='Enter Song Name' value={fileName} onChange={(e) => setFileName(e.target.value)} type={"text"} className=' w-[60%]' />
                        </div>
                        <div className=' flex gap-4'>
                            <p className=' w-[30%]'>
                                Artist :
                            </p>
                            <Input placeholder='Enter Singer Name' value={artistName} onChange={(e) => setArtistName(e.target.value)} type={"text"} className=' w-[60%]' />
                        </div>
                        <div className=' flex gap-4'>
                            <p className=' w-[30%]'>
                                Thumbnail :
                            </p>
                            {
                                image ?
                                    <div className=' relative w-28 h-28  rounded-lg overflow-hidden'>
                                        <Image src={image} alt='Img' fill />
                                        <Button onclick={() => setImage("")} className=' absolute right-1 top-1 bg-rose-500 rounded-full' icon={<X size={20} /> } />
                                    </div>
                                    :
                                    <FileUploader endpoint={"imageUploader"} onchange={(value: any) => setImage(value)} />
                            }
                        </div>
                        <div className=' flex gap-4'>
                            <p className=' w-[30%]'>
                                Song :
                            </p>
                            {
                                file ?
                                    <Button title='Cancle' onclick={() => setfile("")} className=' bg-red-500 px-12 rounded-md' style />
                                    :
                                    <FileUploader endpoint={"audioUploader"} onchange={(value: any) => setfile(value)} />
                            }
                        </div>
                        <Button title='Upload' style onclick={handleUpload} loading={loading} disable={!fileName || !artistName || !file || !image} />
                        {/* <div className=' text-center'>
                    Extreamly sorry you can't Add your song right now because developer's  data storage limit has been reach
                    <div className=' mt-5'>
                    You can contact to developer for this
                    </div>
                    <div className=' text-green-600 font-bold text-lg'>
                    sanketgawande08@gmail.com
                    </div>
                </div> */}
                    </div>
                    :
                    <div className=' w-full space-y-3'>
                        <p className=' w-max mx-auto text-neutral-500'>Login to upload song</p>
                        <Button title='Login' onclick={changeToLogin} style className=' mx-auto' />

                    </div>
            }
        </ModalWrapper>
    )
}
