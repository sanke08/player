import PulseLoader from '@/components/PulseLoader'
import SongCard from '@/components/SongCard'
import { File } from '@/lib/models/file'
import React, { Suspense } from 'react'

const page = async () => {
  const songs = await File.find()
  const g={
    _id:"34",
    title:"ss",
    author:"333"
  }
  return (
    <Suspense fallback={<PulseLoader />}>
      <div className='  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[400px]:grid-cols-3 w-full gap-5 px-3 sm:px-10 bg-neutral-900 rounded-xl pt-5'>
        {
          songs && songs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))
        }
        <SongCard song={g} />
      </div>
    </Suspense>
  )
}

export default page