

import Image from 'next/image'


import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AppProps, userData, userProps } from '@/interface/data';
import History from '@/components/game/history';
import Leaderboard from '@/components/game/leaderboard';
import OnlineUserss from '@/components/user/onlineUserss';
import UserProgress from '@/components/user/userProgress';
import { getLevel } from '@/components/game/listOfFriends';




const StatusCard = ({ currentUser }: { currentUser: userProps }) => {
  return (
    <>
      <div className=" h-[30%] flex flex-col items-center justify-center bg-[#FF9A3E] rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg  relative overflow-hidden">
        <div className="text-xl lg:text-3xl">
          TOTAL WON
        </div>
        <div className="text-lg lg:text-2xl">
          {currentUser.won ? currentUser.won : 0} Matchs
        </div>
        <div className=" absolute w-[70%] h-full bg-[#FFFEFE] opacity-30  rounded-full -top-[40%] -right-[30%]" />
        <div className=" absolute w-[70%] h-full bg-[#FFFEFE] opacity-30  rounded-full top-[40%] -right-[30%] rotate-[30deg]" />
        <div className=" absolute w-[70%] h-[120%]  opacity-30  rounded-full  rotate-90 -top-[60%] border-2 border-[#FFFEFE]" />
      </div>
      <div className=" h-[30%] flex flex-col items-center justify-center bg-[#F44771] rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg relative overflow-hidden">
        <div className="text-xl lg:text-3xl">
          TOTAL LOST
        </div>
        <div className="text-lg lg:text-2xl">
          {currentUser.lost ? currentUser.lost : 0} Matchs
        </div>
        <div className=" absolute w-[70%] h-full bg-[#FFFEFE] opacity-30  rounded-full -top-[40%] -right-[30%] -rotate-[30deg]" />
        <div className=" absolute w-[70%] h-full bg-[#FFFEFE] opacity-30  rounded-full top-[40%] -right-[30%] rotate-[30deg]" />
        <div className=" absolute w-[70%] h-[120%]  opacity-30  rounded-full  rotate-90 -top-[60%] border-2 border-[#FFFEFE]" />
      </div>
      <div className=" h-[30%] flex flex-col items-center justify-center bg-[#332A7C] rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg relative overflow-hidden">
        <div className="text-xl lg:text-3xl">
          YOUR LEVEL
        </div>
        <div className="text-lg lg:text-2xl">
          {getLevel(currentUser.level)} LEVEL
        </div>
        <div className=" absolute w-[70%] h-full bg-[#FFFEFE] opacity-30  rounded-full -top-[40%] -right-[30%]" />
        <div className=" absolute w-[70%] h-full bg-[#FFFEFE] opacity-30  rounded-full top-[40%] -right-[25%] rotate-[45deg]" />
        <div className=" absolute w-[70%] h-[120%]  opacity-30  rounded-full  rotate-90 -top-[60%] border-2 border-[#FFFEFE]" />
      </div>
    </>
  )
}


function Index({ onlineUsersss }: AppProps) {
  const [amis, setAmis] = useState<any>([])
  const [users, setUsers] = useState<Array<any>>([]);
  const [currentUser, setCurrentUser] = useState<userProps>(userData);

  fetchCurrentUser({ setCurrentUser })
  fetchAllUsers({ setUsers, currentUser })
  fetchAllAmis({ setAmis, currentUser })

  return (
    <menu className="w-full    Dashboard   mt-14 flex  flex-col md:flex-row gap-5md: gap-5 p-5  ">
      <div className=" w-full md:w-[50%]  h-full rounded-xl flex flex-col gap-5 ">
        <div className="w-full h-[100px] md:h-[20%] bg-slate-300 rounded-xl p-2">
          <OnlineUserss onlineUsersss={onlineUsersss} amis={amis} />
        </div>
        <div className="w-full  h-[500px] md:h-[80%]  bg-[#f7f7f7   shadow-md rounded-xl flex p-5  overflow-hidden" >
          <Leaderboard currentUser={currentUser} />
        </div>
      </div>
      <div className=" w-full md:w-[50%]  h-[800px] md:h-full rounded-xl flex flex-col gap-5   mb-10">
        <div className="h-[50%] w-full flex gap-5">
          <div className="w-[40%] h-full  rounded-xl space-y-3 mt-2 text-[#FFFEFE]">
            <StatusCard currentUser={currentUser} />
          </div>
          <div className="w-[60%] h-full ">
            <UserProgress currentUser={currentUser} />
          </div>
        </div>
        <div className="hideScroll overflow-auto h-[50%] w-full bg-blue-400 rounded-xl ">
          <History currentUser={currentUser} users={users} />
        </div>
      </div>
    </menu>
  )
}

export default Index;


