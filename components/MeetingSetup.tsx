'use client'

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false)

    const call  = useCall()

    if (!call) throw new Error("use call must be used in stream call")

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable()
            call?.microphone.disable()
        } else {
            call.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone])

    return (
        <div className='flex flex-col items-center justify-center gap-3 h-screen w-full text-white'>
            <h1 className='text-2xl font-bold'>Setup</h1>
            <VideoPreview />
            <div className='flex h-16 items-center justify-center gap-3'>
                <label className='flex items-center justify-center gap-2 font-medium'>
                    <input
                        type="checkbox"
                        checked={isMicCamToggledOn}
                        onChange={(e) => setisMicCamToggledOn(e.target.checked)}
                    />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button className='rounded-md bg-purple-500 px-4 py-2.5'
                onClick={() => {
                    call.join()
                    setIsSetupComplete(true)
                }}>
                Join Meeting
            </Button>
        </div >
    )
}

export default MeetingSetup
