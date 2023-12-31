import PulseLoader from '@/components/PulseLoader'
import SongCard from '@/components/SongCard'
import { getAuthSession } from '@/lib/auth'
import { File } from '@/lib/models/file'
import { User } from '@/lib/models/user'
import { Metadata } from 'next'
import React, { Suspense ,memo} from 'react'

export const metadata: Metadata = {
  title: 'Player',
  description: 'Generated by create next app',
}


const page = async () => {
  const songs = await File.find()
  const session = await getAuthSession()
  // @ts-ignore
  const user = await User.findById(session?.user?._id)
  if (songs.length < 1) {
    return (
      <div className=' w-fit mx-auto mt-5 text-neutral-500'>
        No songs Yet
      </div>
    )
  }

  return (
    <Suspense fallback={<PulseLoader />}>
      <div className='  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[400px]:grid-cols-3 w-full gap-5 px-3 sm:px-10 bg-neutral-900 rounded-xl pt-5'>
        {
          songs && songs.map((song) => {
            const isliked = user?.liked?.includes(song._id)
            return <SongCard key={song._id} song={song} isLiked={isliked} userId={user?._id} />
          })
        }
      </div>
    </Suspense>
  )
}

export default memo(page)