'use client'

import { useState } from 'react';
import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
import { Textarea } from './ui/textarea';
import Loader from './Loader';
import ReactDatePicker from "react-datepicker"
import { Input } from './ui/input';

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const { user } = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: ""
  })

  const [callDetails, setCallDetails] = useState<Call>()
  const { toast } = useToast()
  const createMeeting = async () => {
    if (!client || !client) return;
    try {

      if (!values.dateTime) {
        toast({ title: "Please select date and time" })
        return;

      }
      const id = crypto.randomUUID()
      const call = client.call("default", id)
      if (!call) throw new Error("Failed to create call")
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || "Instant Meeting"
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })
      setCallDetails(call)
      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }
      toast({ title: "Meeting created successfully" })
    } catch (error) {
      console.log(error);
      toast({ title: "Failed  to create meeting" })
    }
  };
  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        className='bg-orange-1'
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-purple-1"
        handleClick={() => router.push('/recordings')}
      />


      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-yellow-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Prepare a Meeting"
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base text-normal leading[22px] text-sky-2'>Add a description</label>
            <Textarea
              className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className='flex flex-col w-full gap-2.5'>
            <label className='text-base text-normal leading[22px] text-sky-2'>Select date and time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />

          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({ title: "Link copied" })
          }}
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
          buttonText="Copy meeting link"
          className='text-center'
        />
      )
      }
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant Meeting"
        buttonText='Start Meeting'
        handleClick={createMeeting}
        className='text-center'
      />

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        buttonText='Join Meeting'
        handleClick={() => router.push(values.link)}
        className='text-center'
      >
        <Input
          placeholder='Meeting link'
          className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
