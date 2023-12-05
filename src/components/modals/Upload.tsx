"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import app from '@/lib/firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import ModalWrapper from './ModalWrapper'
import { Loader2 } from 'lucide-react'
import { CLOSE_UPLOAD_FILE_MODAL } from '@/redux/constance'






export default function Upload() {


    const router = useRouter()
    const dispatch = useDispatch()

    const { user } = useSelector((state: any) => state.user)
    const { openUpload } = useSelector((state: any) => state.toggle)

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState("")
    const [song, setSong] = useState("")
    const [loading, setLoading] = useState(false)


    const [imageUrl, setImageUrl] = useState("")
    const [songUrl, setSongUrl] = useState("")


    const [imageUrlPath, setImageUrlPath] = useState("")
    const [songUrlPath, setSongUrlPath] = useState("")


    const [imageUrlProgress, setImageUrlProgress] = useState(0)
    const [songUrlProgress, setSongUrlProgress] = useState(0)

    const [disable, setDisable] = useState(true)


    const handleSubmin = async () => {
        if (!title || !songUrl || !imageUrl || !author) {
            return toast.info("Please enter all field")
        }
        setLoading(true)
        // const response = await uploadFile(title, author, imageUrl, songUrl, imageUrlPath, songUrlPath)
        // if (response.success) {
        //     setLoading(false)
        //     toast.success(response.message)
        //     router.push("/")
        //     return
        // }
        // if (!response.success) {
        //     setLoading(false)
        //     return toast.error(response.message)
        // }
    }

    const handleUpload = async (file: any, urlType: string) => {

        const storage = getStorage(app);
        let storageRef
        if (urlType === "image") {
            const imagepath = `image/${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}-${file.name}`
            await setImageUrlPath(imagepath)
            storageRef = await ref(storage, imagepath);
        } else {
            const songpath = `song/${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}-${file.name}`
            await setSongUrlPath(songpath)
            storageRef = await ref(storage, songpath);
        }

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "image" ? setImageUrlProgress(progress) : setSongUrlProgress(progress);
                switch (snapshot.state) {
                    case 'paused':
                        toast.warn("Upload Is paused")
                        break;
                    case 'running':
                        console.log(progress)
                        break;
                    default:
                        break;
                }
            },
            (error: any) => {
                console.log(error)
                toast.error(error)
            },
            async () => {
                // Upload completed successfully, now we can get the download URL
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if (urlType === "image") {
                        setImageUrl(downloadURL)
                        toast.success("Image Uploaded Successfully")
                        console.log("image", downloadURL)
                    }
                    if (urlType === "song") {
                        setSongUrl(downloadURL)
                        toast.success("song Uploaded Successfully")
                        console.log("song", downloadURL)
                    }
                })
            },
        );
    }


    useEffect(() => {
        imageUrl && songUrl && toast.success("Upload Now")
    }, [imageUrl, songUrl])


    useEffect(() => {
        image && handleUpload(image, "image")
    }, [image])

    useEffect(() => {
        song && handleUpload(song, "song")
    }, [song])

    useEffect(() => {
        if (imageUrl && songUrl) {
            setDisable(false)
        }
    }, [imageUrl, songUrl])


    useEffect(() => {
        if (!user) {
            toast.error("Please Login First")
            return
        }

    }, [user, router])
    const handleClose = () => {
        dispatch({ type: CLOSE_UPLOAD_FILE_MODAL })
    }
    return (
        <ModalWrapper isOpen={openUpload} headertext='Add Song' classname=' sm:w-[40rem]' close={handleClose}>
            <div className=' p-5 flex justify-center items-center w-full'>
                {/* <div className='  sm:px-10 pt-4 rounded-xl flex flex-col justify-center items-center w-full'>
                    {loading ? <Loader2 className=' animate-spin' /> :
                        <>
                            <div className='flex flex-col justify-center items-center gap-4 w-full'>
                                <input type="text" placeholder='Song title' value={title} onChange={(e) => setTitle(e.target.value)} className=' px-3 py-1 rounded-lg bg-neutral-700  w-full' />
                                <input type="text" placeholder='Song author' value={author} onChange={(e) => setAuthor(e.target.value)} className=' px-3 py-1 rounded-lg bg-neutral-700  w-full' />
                                <div className=' px-2 w-full'>
                                    {
                                        imageUrlProgress > 0 ?
                                            <div>
                                                {imageUrlProgress === 100 ?
                                                    <>
                                                        Uploaded
                                                    </> :
                                                    <>
                                                        Uploading... {Math.round(imageUrlProgress)}%
                                                    </>
                                                }
                                            </div>
                                            :
                                            <>
                                                <div className=''>
                                                    Song image :
                                                </div>
                                                <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} className='w-full px-3 py-1 rounded-lg bg-neutral-700 cursor-pointer' />
                                            </>
                                    }
                                </div>
                                <div className=' px-2 w-full'>
                                    {
                                        songUrlProgress > 0 ?
                                            <div>
                                                {songUrlProgress === 100 ?
                                                    <>Uploaded </> :
                                                    <>
                                                        Uploading...{Math.round(songUrlProgress)}%
                                                    </>
                                                }
                                            </div>
                                            :
                                            <>
                                                <div className=''>
                                                    Song file :
                                                </div>

                                                <input type="file" accept='.mp3' onChange={(e) => setSong(e.target.files[0])} className='w-full px-3 py-1 rounded-lg bg-neutral-700 cursor-pointer' />
                                            </>
                                    }
                                </div>

                                <button onClick={handleSubmin} disabled={disable} className='px-10 mt-5 bg-green-500 text-black  py-1 rounded-lg'>
                                    {imageUrl && songUrl ? <>Create</> : <>wait...</>}
                                </button>
                            </div>
                        </>
                    }
                </div> */}
                <div className=' text-center'>
                    Extreamly sorry you can't Add your song right now because developer's  data storage limit has been reach
                    <div className=' mt-5'>
                        You can contact to developer for this
                    </div>
                    <div className=' text-green-600 font-bold text-lg'>
                        sanketgawande08@gmail.com
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}
