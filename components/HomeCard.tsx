import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    img: string
    title: string
    description: string
    handleClick?: () => void
    className?: string
    buttonText?: string
}

const HomeCard = ({ img, title, description, handleClick, className }: HomeCardProps) => {
    return (
        <div
            className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', className)}
            onClick={handleClick} // Attach handleClick to onClick event
        >
            <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <Image
                    src={img}
                    width={27}
                    height={27}
                    alt='icon'
                    className=''
                />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl'>{title}</h1>
                <p className='text-lg font-normal'>{description}</p>
            </div>
        </div >
    )
}

export default HomeCard
