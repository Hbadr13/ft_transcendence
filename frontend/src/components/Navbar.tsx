
import { useRouter } from 'next/navigation'

import { Combobox, Transition } from '@headlessui/react'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Fragment, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { CustomLinkNavbarProps, BoxSearchrProps } from './model'
import { arabicNames } from '../components/data'
import UserInfo from './user/UserInfo'
import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks'






const BoxSearch = ({ searchUser, setSearchUser }: BoxSearchrProps) => {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [id, setid] = useState(0)
    // const [User, setUser] = useState('')
    const [users, setUsers] = useState<any>([])
    const [amis, setAmis] = useState<any>([])
    const [LastArrow, setLastArrow] = useState("")
    const [isfriends, setisfriends] = useState<boolean>(false)
    const handlingQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
        // setSearchUser(event.target.value)
    }
    const empy: Array<string> = []
    let filterUser = empy;
    fetchCurrentUser(setid);
    fetchAllUsers(setUsers, query);
    fetchAllAmis({ setAmis, query, id });

    if (query.replace(/\s+/g, '')) {
        filterUser = users.filter((user: any) => {
            user.flag = true
            amis.filter((usr: any) => {
                console.log(`cur: ${user.username} | ami: ${usr.username}`)
                if (usr.id == user.id)
                    user.flag = false
            })
            return user.username?.toLowerCase().includes(query.trimStart().trimEnd().replace(/\s+/g, ' ').toLowerCase())
        }
        )
    }
    const handelOnChange = (name: any) => {
        setSearchUser(name)
        router.replace(`/users/${name}`);
    }
    return (
        <>
            <form className='w-full' action="">
                <Combobox value={searchUser} onChange={handelOnChange} >
                    <div className='relative flex justify-center items-center  h-10 w-[100%]'>
                        <Combobox.Input
                            type="text"
                            className='absolute focus:outline-none bg-slate-800 w-[100%] py-2 text-yellow-400 px-8 rounded-xl hover:bg-slate-900'
                            placeholder='typing..'
                            onChange={handlingQuery}
                            autoComplete='off'
                            value={query}
                        // displayValue={(item) => item}
                        >
                        </Combobox.Input>
                        <Image src='/search.svg' className='absolute left-2' alt='search' width={20} height={20}></Image>
                        <Combobox.Button className='absolute right-3'>
                            <Image src='/arrow-up.svg' className='w-[auto] ' alt='search' width={20} height={20}></Image>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className='absolute flex justify-center mt-5 w-[50%]'>
                        <div className={`text-center rounded-2xl m-2 shadow-slate-800 shadow-md font-light flex flex-col justify-center w-[100%] bg-red-200 overflow-hidden`}>
                            {
                                filterUser.map((item: any, index: number) => (

                                    index < 10 && (
                                        < Combobox.Option value={item.username} key={index}
                                            className={({ active }) => `flex justify-around  ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}`}
                                            onClick={() => setQuery(item.username)}
                                        // onMouseEnter={() => setIndex(index)}
                                        >
                                            <Image src={"/man.png"} alt='man profiel' width={60} height={40}></Image>
                                            <CustomLinkNavbar href='/' content={item.username} ></CustomLinkNavbar>
                                            {

                                                (!item.flag) ?
                                                    (<CustomLinkNavbar href='/game' moreStye="bg-yallow-700" content='play' ></CustomLinkNavbar>) :
                                                    (<CustomLinkNavbar href='/' content=' add friend' ></CustomLinkNavbar>)
                                            }

                                        </Combobox.Option>
                                    )
                                ))
                            }
                        </div>
                    </Combobox.Options>
                </Combobox >
            </form >
        </>
    )
}

const CustomLinkNavbar = ({ href, content, moreStye }: CustomLinkNavbarProps) => {
    return (
        <div className={`rounded justify-between flex items-center ${moreStye}`}>
            <Link className='hover:bg-orange-400 hover:text-cyan-100 p-1 px-2 rounded-xl' href={String(href)}>
                {content}
            </Link>
        </div>
    )
}

const Navbar = () => {
    const router = useRouter();


    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:3333/auth/user', {
                    credentials: 'include',
                });
                if (response.status != 200) {
                    router.push('/auth/login');
                    return;
                }
                const content = await response.json();
            }
        )();
    });
    const [searchUser, setSearchUser] = useState("")

    return (
        <>
            <div className='bg-slate-600 px-5 py-2 w-full flex justify-between item-center font-light shadow-md shadow-slate-700'>
                <div className="w-[20%] hidden  sm:flex flex-row item-center justify-between text-[#1ba098]">
                    <CustomLinkNavbar moreStye="" href="/" content="Home" />
                    <CustomLinkNavbar moreStye="" href="/" content="Chat" />
                    <CustomLinkNavbar moreStye="" href="/game" content="PongGame" />
                </div>
                <div className="flex item-center justify-center sm:w-[60%] w-[100%] py-4 ">
                    <BoxSearch searchUser={searchUser} setSearchUser={setSearchUser} />
                </div>
                <div className="hidden w-[20%] pl-10 sm:flex justify-between item-center text-[#1ba098]">
                    <CustomLinkNavbar moreStye='' href="/" content="logOut" />
                    <CustomLinkNavbar moreStye='' href="/" content="more" />
                </div>
                <UserInfo />
            </div>
        </>
    )
}

export default Navbar;

