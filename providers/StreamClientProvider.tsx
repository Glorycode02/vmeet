'use client'

import { tokenProvider } from '@/actions/steam.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
    StreamVideoClient, StreamVideo,
} from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>()
    const { user, isLoaded } = useUser()
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!apiKey) throw new Error("No api key provided")

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl
            },
            tokenProvider,
        })
        setVideoClient(client)
    }, [user, isLoaded])

    if (!videoClient) return <Loader />

    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};

export default StreamVideoProvider