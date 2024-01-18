import React, { useState } from 'react'
import DirectConversationList from './direct/directConversationList'
import ChannelsList from './channels/channelsList'
import { AppProps, channelProps, userProps } from '@/interface/data';


export default function ConversationList({ amis, setReceiver, setButton, currentUser, Receiver, users, setRoom, setjoinchannel, setStatus_Tow_User, status_tow_user }: { amis: userProps[], setReceiver: (value: any) => void, setButton: (value: boolean) => void, currentUser: userProps, Receiver: userProps, users: userProps[], setRoom: (value: channelProps) => void, setjoinchannel: (value: boolean) => void, setStatus_Tow_User: (value: boolean) => void, status_tow_user: boolean }) {

    const [click, setClick] = useState(true)

    return (
        <div className="  bg-gray-100 p-4 sm:ml-7 ml-2  mt-12 w-[130px]   md:w-[300px] lg:w-[350px] h-[820px]    flex-col justify-start items-start gap-5 inline-flex rounded-xl border  border-sky-500">

            <div className=" bg-bdlack self-stretch  h-20 flex  justify-center items-center gap-3">
                <button onClick={() => setClick(true)} className={` w-40 h-10 ${click ? ' bg-blue-400 text-white' : 'bg-white text-blue-500'} rounded-full justify-center items-center inline-flex duration-1000 hover:bg-blue-400 border border-sky-500`}>
                    <div className="justify-start items-center gap-2 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="" >
                            <path d="M8.00011 11C7.80233 11 7.60899 11.0586 7.44454 11.1685C7.28009 11.2784 7.15192 11.4346 7.07623 11.6173C7.00054 11.8 6.98074 12.0011 7.01932 12.1951C7.05791 12.3891 7.15315 12.5673 7.293 12.7071C7.43286 12.847 7.61104 12.9422 7.80502 12.9808C7.999 13.0194 8.20007 12.9996 8.38279 12.9239C8.56552 12.8482 8.7217 12.72 8.83158 12.5556C8.94146 12.3911 9.00011 12.1978 9.00011 12C9.00011 11.7348 8.89475 11.4804 8.70722 11.2929C8.51968 11.1054 8.26533 11 8.00011 11ZM12.0001 11C11.8023 11 11.609 11.0586 11.4445 11.1685C11.2801 11.2784 11.1519 11.4346 11.0762 11.6173C11.0005 11.8 10.9807 12.0011 11.0193 12.1951C11.0579 12.3891 11.1532 12.5673 11.293 12.7071C11.4329 12.847 11.611 12.9422 11.805 12.9808C11.999 13.0194 12.2001 12.9996 12.3828 12.9239C12.5655 12.8482 12.7217 12.72 12.8316 12.5556C12.9415 12.3911 13.0001 12.1978 13.0001 12C13.0001 11.7348 12.8948 11.4804 12.7072 11.2929C12.5197 11.1054 12.2653 11 12.0001 11ZM16.0001 11C15.8023 11 15.609 11.0586 15.4445 11.1685C15.2801 11.2784 15.1519 11.4346 15.0762 11.6173C15.0005 11.8 14.9807 12.0011 15.0193 12.1951C15.0579 12.3891 15.1532 12.5673 15.293 12.7071C15.4329 12.847 15.611 12.9422 15.805 12.9808C15.999 13.0194 16.2001 12.9996 16.3828 12.9239C16.5655 12.8482 16.7217 12.72 16.8316 12.5556C16.9415 12.3911 17.0001 12.1978 17.0001 12C17.0001 11.7348 16.8948 11.4804 16.7072 11.2929C16.5197 11.1054 16.2653 11 16.0001 11ZM12.0001 2C10.6869 2 9.38653 2.25866 8.17328 2.7612C6.96002 3.26375 5.85763 4.00035 4.92904 4.92893C3.05368 6.8043 2.00011 9.34784 2.00011 12C1.99137 14.3091 2.7909 16.5485 4.26011 18.33L2.26011 20.33C2.12135 20.4706 2.02736 20.6492 1.98998 20.8432C1.95261 21.0372 1.97353 21.2379 2.05011 21.42C2.13317 21.5999 2.26781 21.7511 2.43696 21.8544C2.6061 21.9577 2.80211 22.0083 3.00011 22H12.0001C14.6523 22 17.1958 20.9464 19.0712 19.0711C20.9465 17.1957 22.0001 14.6522 22.0001 12C22.0001 9.34784 20.9465 6.8043 19.0712 4.92893C17.1958 3.05357 14.6523 2 12.0001 2ZM12.0001 20H5.41011L6.34011 19.07C6.4346 18.9774 6.50977 18.8669 6.56126 18.7451C6.61276 18.6232 6.63956 18.4923 6.64011 18.36C6.63635 18.0962 6.52852 17.8446 6.34011 17.66C5.0307 16.352 4.21528 14.6305 4.0328 12.7888C3.85032 10.947 4.31205 9.09901 5.33934 7.55952C6.36662 6.02004 7.8959 4.88436 9.66663 4.34597C11.4374 3.80759 13.34 3.8998 15.0503 4.60691C16.7607 5.31402 18.173 6.59227 19.0465 8.22389C19.9201 9.85551 20.201 11.7395 19.8412 13.555C19.4815 15.3705 18.5034 17.005 17.0736 18.1802C15.6439 19.3554 13.8509 19.9985 12.0001 20Z" fill="white" />
                        </svg>
                        {/* <div className=" md:hidden">Direct</div> */}
                    </div>
                </button>
                <button onClick={() => setClick(false)} className={`w-40  h-10 ${!click ? ' bg-blue-400 text-white' : 'bg-white text-blue-500'} rounded-full justify-center items-center inline-flex duration-1000 hover:bg-blue-400 border border-sky-500`}>
                    <div className="justify-start  items-center gap-2 flex">
                        {/* <div className="">Channels</div> */}
                    </div>
                </button>
            </div>
            <div className='w-full h-ful'>
                {click ? (
                    setButton(false),

                    <DirectConversationList setReceiver={setReceiver} users={users} Receiver={Receiver} amis={amis} currentUser={currentUser} setStatus_Tow_User={setStatus_Tow_User} status_tow_user={status_tow_user} />
                ) : (
                    setButton(true),
                    <ChannelsList users={users} currentUser={currentUser} setRoom={setRoom} setjoinchannel={setjoinchannel} />
                )}
            </div>
        </div>
    )
}