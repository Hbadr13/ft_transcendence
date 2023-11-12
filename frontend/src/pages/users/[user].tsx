
import Friends from '@/components/user/Friend';
import Rank from '@/components/user/Rank';
import { fetchAllAmis, fetchCurrentUser } from '@/hooks/userHooks';
import { AppProps, userProps } from '@/interface/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import path from 'path';
import { send } from 'process';
import { useEffect, useState } from 'react';
import { NullLiteral, isDoStatement } from 'typescript';

interface LevelBarpros {
    value: number
}
function LevelBar({ value }: LevelBarpros) {

    const progressWidth = `${value}%`;

    return (
        <div className="bg-white h-5  drop-shadow-lg  shadow-indigo-500/40    w-80 rounded-2xl">
            <div className="bg-[#0ea5e9] h-5 rounded-full " style={{ width: progressWidth }}>
                {/* <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
              {`${value}%`} */}
                {/* </span> */}
            </div>
        </div>
    );
}

const YourComponent = ({ currentFileName, currentUser }: any) => {
    const [flag, setFlag] = useState(true)
    const [flag1, setFlag1] = useState(true)
    const [flag2, setFlag2] = useState(true)
    const [username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [foto_user, setFoto_user] = useState("");
    const [check, setCheck] = useState(0);
    const [check_blocked1, setCheck_bloked1] = useState(true);
    const [check_blocked2, setCheck_bloked2] = useState(true);
    const [check1, setCheck1] = useState(0);
    const [check2, setCheck2] = useState(0);
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(0)
    const [isfriend, setisfriend] = useState(false)
    // const [id, setid] = useState(0)
    const [query, setQuery] = useState('')
    const [amis, setAmis] = useState<Array<userProps>>([])
    const [amis_id, setAmisid] = useState<Array<userProps>>([])
    const [delete_request, setdelete_request] = useState<any>([])

    const [received, setreceived] = useState<Array<any>>([]);
    const [sendr, setsendr] = useState<Array<any>>([]);
    const [received_blocked, setreceived_blocked] = useState<Array<any>>([]);
    const [sendr_blocked, setsendr_blocked] = useState<Array<any>>([]);
    const router = useRouter()
    const parts = currentFileName.split('.');
    const numberPart: number = Number(parts[1]);
    const usernamePart: string = parts[0];
    const [number, setNumber] = useState(0);

    useEffect(() => {


        if (numberPart === currentUser.id) {
            router.push("/profile")

        }
    }, [currentUser.id, numberPart]);
    const toggleDropdown = () => {
        // setisfriend(!isfriend);
        setIsOpen(false);
    };
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/accepted-friends/${numberPart}`, {
                    credentials: 'include',
                });
                const content = await response.json();

                setAmisid(Array.from(content));

            }
        )();
    }, [query, numberPart, isfriend, check, check1, check2]);
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/accepted-friends/${currentUser.id}`, {
                    credentials: 'include',
                });
                const content = await response.json();

                setAmis(Array.from(content));

            }
        )();
    }, [query, numberPart, isfriend, check, check1, isOpen, check2]);
    useEffect(() => {
        (
            async () => {
                setCheck1(0);
                setCheck2(0);
                setIsOpen(false)
            }
        )();
    }, [query, numberPart, send, received]);
    const freind_ranck = async (fd: number) => {
        setCheck(fd)
        if (check1 == 0) {
            setCheck1(1);
            setCheck2(0);

        }
        // else if (fd == 2 && check1 == 1)
        //     setCheck1(2);
        // else if (fd == 2 && check1 == 2)
        //     setCheck1(0);
        else if (check1 == 1) {

            setCheck2(0);
            setCheck1(0);
        }

    }
    const freind_ranck1 = async (fd: number) => {
        setCheck(fd)
        if (check2 == 0) {
            setCheck2(1);
            setCheck1(0);
        }
        // else if (fd == 2 && check1 == 1)
        //     setCheck1(2);
        // else if (fd == 2 && check1 == 2)
        //     setCheck1(0);
        else if (check2 == 1) {
            setCheck2(0);
            setCheck1(0);
        }

    };


    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/users/one/${usernamePart}/${numberPart}`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {

                    setUsername(counte.username)
                    setEmail(counte.email)
                    setFoto_user(counte.foto_user)
                    // setrequestt(cont)
                    return;
                }
            }
        )();
    });
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${currentUser.id}/received-blocked`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setreceived_blocked(counte)
                    console.log("counte", counte)
                    return;
                }
            }
        )();
    }, [currentUser.id, numberPart, isOpen, isOpen1, currentFileName]);
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${currentUser.id}/received-requests`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setreceived(counte)
                    return;
                }
            }
        )();
    }, [currentUser.id, numberPart, isOpen1, currentFileName]);
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${numberPart}/send-requests`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setFlag2(counte);
                    // setrequestt(cont)
                    return;
                }
            }
        )();
    }, [sendr, received, currentUser.id, numberPart, isOpen]);
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${numberPart}/send-requests`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setFlag2(counte);
                    // setrequestt(cont)
                    return;
                }
            }
        )();
    }, [sendr, received, currentUser.id, numberPart, isOpen]);
    useEffect(() => {
        (
            async () => {
                setCheck(0);
            }
        )();
    }, [numberPart]);
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${currentUser.id}/send-blocked`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setsendr_blocked(counte)
                    return;
                }
            }
        )();
    }, [currentUser.id, numberPart, received, check, check1, isOpen, isOpen1, check2, currentFileName]);
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${currentUser.id}/send-requests`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setsendr(counte)
                    return;
                }
            }
        )();
    }, [currentUser.id, numberPart, received, check, check1, isOpen, check2, currentFileName]);
    const sendRequestForaccpet = async () => {
        try {

            const response = await fetch(`http://localhost:3333/friends/accept-friend-request/${numberPart}/${currentUser.id}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Friend request sent successfully.');
                setisfriend(!isfriend);
            } else {
                setIsOpen(false);
                console.error('Failed to send friend request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };
    const blockedfriend = async () => {
        try {

            const response = await fetch(`http://localhost:3333/friends/blocked-friend-request/${currentUser.id}/${numberPart}`, {
                method: 'POST',
                credentials: 'include',
            });
            console.log(isOpen)

            if (response.ok) {
                setIsOpen1(1);
                console.log(isOpen)
                console.log('Friend blocked sent successfully.');
            } else {
                setIsOpen(true);
                console.error('Failed to send friend request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };
    const Unblockedfriend = async () => {
        try {
            const response = await fetch(`http://localhost:3333/friends/delete-friend-request/${numberPart}/${currentUser.id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            console.log(isOpen1)
            
            if (response.ok) {
                router.push(`/user`)
                // setIsOpen1(0);
                // console.log(isOpen1)
                // setIsOpen(true);
                console.log('Friend Unblocked sent successfully.');
            } else {

                setIsOpen1(2);

                console.error('Failed to Unblock friend request.');
            }

        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };
    const sendRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3333/friends/send-request/${numberPart}/${currentUser.id}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setIsOpen(true);

                console.log('Friend request sent successfully.');
            } else {
                console.error('Failed to send friend request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };
    const CanacelRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3333/friends/delete-friend-request/${numberPart}/${currentUser.id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setIsOpen(false);
                console.log('delete-friend-request sent successfully.');
            } else {
                console.error('Failed to delete-friend-request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/accepted-friends/${currentUser.id}`, {
                    credentials: 'include',
                });
                const content = await response.json();
                setAmis(content);
            }
        )();
    }, [query, currentUser.id, check, check1, check2, numberPart, isOpen, isOpen1, currentFileName]);

    useEffect(() => {
        setFlag(true)
        setFlag1(true)

    }, [numberPart, currentFileName])
    useEffect(() => {
        setCheck_bloked1(true)
        setCheck_bloked2(true)



    }, [numberPart, currentFileName, isOpen1])

    useEffect(() => {

        amis.filter((usr: any) => {

            if (usr.id == numberPart)
                setFlag(false)

        })
        // useEffect(() => {
        if (Array.isArray(received_blocked)) {
            received_blocked.map((user: any) => {
                // Your mapping logic here
                if (user.sender.id == numberPart) {

                    console.log("check_blocked1")
                    setCheck_bloked1(false)
                }
            });
        } else { }
        if (Array.isArray(sendr_blocked)) {
            sendr_blocked.map((user: any) => {
                console.log("check_blocked2")
                // Your mapping logic here
                if (user.receiver.id == numberPart) {
                    setCheck_bloked2(false)
                }
            });
        } else {
            // Handle the case when 'received' is not an array (e.g., show an error message)
        }
        if (Array.isArray(received)) {
            received.map((user: any) => {
                // Your mapping logic here
                if (user.sender.id == numberPart) {

                    setFlag1(false)
                }
            });
        } else { }
        if (Array.isArray(sendr)) {
            sendr.map((user: any) => {
                // Your mapping logic here
                if (user.receiver.id == numberPart) {


                    setIsOpen(true)
                }
            });
        } else {
            // Handle the case when 'received' is not an array (e.g., show an error message)
        }
    

    }, [sendr, numberPart, isfriend, received, sendr_blocked, received_blocked, currentFileName, amis, amis_id, setFlag1, flag2, isOpen, delete_request])

    return (
        <>
            {
                (!check_blocked1 || !check_blocked2) ?
                    (
                        (
                            (!check_blocked1) ?
                                (
                                    <div> hada li bolcka</div>
                                ) :

                                <div className=' flex z-10  h-screen w-screen  justify-center items-center '>

                                    <div className='flex  justify-center flex-col  h-80  w-[500px]  ml-12 z-20  drop-shadow-2xl  border-2 border-blue-500 rounded-2xl  items-center text-white bg-black '>
                                        <p className=' text-xl  -mt-10'> Unblock @{username} ?</p>
                                        <span className=' text-sm mt-6'> They will  be able to follow you and view your Tweets </span>
                                        <button>
                                            <div className=' flex justify-center items-center text-black  bg-white  w-56  rounded-2xl h-10 mt-8 border-2  border-blue-500 hover:scale-110 duration-300' onClick={Unblockedfriend}>Unblock</div>
                                        </button>
                                        <button>
                                            <div className=' flex justify-center items-center text-white mt-6 w-56 h-10 rounded-2xl  border-2  border-blue-500 hover:scale-110 duration-300'>Canecel</div>
                                        </button>
                                    </div>
                                </div>

                        )
                    ) :

                    (<div className={`flex  flex-wrap  justify-center min-h-screen  min-w-screen   items-start   p-6 `}>
                        <div className='  flex-none     w-96 mt-[120px] mb-10  h-[100%]    drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]     shadow-blue-600 justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[40px] p-6  text-white'>
                            <div className="text-center">
                                <span>Profile {username}</span>
                                <div className="mt-6">
                                    <img
                                        src={foto_user}
                                        alt="Your Image Alt Text"
                                        className=" w-52 h-52   border-2 border-[#E3E8EC]  rounded-[40px] inline-block" // Adjust the width as needed
                                    // className="w-44 h-auto   border-2 border-[#E3E8EC]  rounded-full inline-block" // Adjust the width as needed
                                    />
                                </div>
                                <div className='mt-6'>
                                    <h1 className="text-xl font-bold uppercase">{username}</h1>
                                    <span className="text-sm  font-serif italic flex justify-center mt-3">{Email}</span>
                                </div>
                                <div className="mt-8">
                                    <LevelBar value={60} />
                                    <p className=' mt-4 text-blue-200 font-serif italic uppercase'>level 8-86%</p>
                                </div>
                                <div className='mt-6'>
                                    <div className="text-base font-bold flex justify-around items-center text-[#2c4d82]">
                                        {

                                            (!flag) ?
                                                (
                                                    <div className="text-base font-bold flex items-center  space-x-2  text-[#2c4d82]">
                                                        <div className=" py-2 px-5 bg-[#dbeafe]  flex  items-center  space-x-1  border rounded-full hover:scale-110 duration-300">
                                                            <svg width="20" height="20" fill="black" enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><polyline clip-rule="evenodd" fill="none" fill-rule="evenodd" points="  23,7.5 17.7,13 14.9,10.2 " stroke="#000000" stroke-miterlimit="10" stroke-width="2" /><circle cx="9" cy="8" r="4" /><path d="M9,14c-6.1,0-8,4-8,4v2h16v-2C17,18,15.1,14,9,14z" /></svg>
                                                            <span className='normal-case'>Friends</span>
                                                        </div>
                                                        <Link href='/game' content='play' className="py-2 px-7 bg-[#dbeafe] border rounded-full hover:scale-110 duration-300" >Message</Link>
                                                        <Link href='/game' content='play' className="py-2 px-7 bg-[#dbeafe]  border rounded-full hover:scale-110 duration-300" >play</Link>


                                                    </div>
                                                ) :
                                                (!flag1) ?
                                                    (
                                                        (!isfriend) ?
                                                            (
                                                                <div className="text-base font-bold flex items-center  space-x-2  text-[#2c4d82]">
                                                                    <div className=" py-2 px-4 bg-[#dbeafe]  flex  items-center  border rounded-full hover:scale-110 duration-300">
                                                                        <svg width="20" height="20" fill="black" enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><polyline clip-rule="evenodd" fill="none" fill-rule="evenodd" points="  23,7.5 17.7,13 14.9,10.2 " stroke="#000000" stroke-miterlimit="10" stroke-width="2" /><circle cx="9" cy="8" r="4" /><path d="M9,14c-6.1,0-8,4-8,4v2h16v-2C17,18,15.1,14,9,14z" /></svg>
                                                                        <button className="py-0 px-4 bg-[#dbeafe] border rounded-full " onClick={sendRequestForaccpet} >Confrim</button>
                                                                    </div>
                                                                    <button className="py-2 px-7 bg-[#dbeafe] border rounded-full  hover:scale-110 duration-300 " onClick={CanacelRequest}>Delete request</button>

                                                                </div>) :
                                                            (<div className="text-base font-bold flex items-center  space-x-2  text-[#2c4d82]">
                                                                <div className=" py-2 px-5 bg-[#dbeafe]  flex  items-center  space-x-1  border rounded-full hover:scale-110 duration-300">
                                                                    <svg width="20" height="20" fill="black" enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><polyline clip-rule="evenodd" fill="none" fill-rule="evenodd" points="  23,7.5 17.7,13 14.9,10.2 " stroke="#000000" stroke-miterlimit="10" stroke-width="2" /><circle cx="9" cy="8" r="4" /><path d="M9,14c-6.1,0-8,4-8,4v2h16v-2C17,18,15.1,14,9,14z" /></svg>
                                                                    <span className='normal-case'>Friends</span>
                                                                </div>
                                                                <Link href='/game' content='play' className="py-2 px-7 bg-[#dbeafe] border rounded-full hover:scale-110 duration-300" >Message</Link>
                                                                <Link href='/game' content='play' className="py-2 px-7 bg-[#dbeafe]  border rounded-full hover:scale-110 duration-300" >play</Link>
                                                            </div>)
                                                    ) :

                                                    (

                                                        (
                                                            (!isOpen) ?
                                                                (
                                                                    <button className="py-0 px-4 bg-[#dbeafe] border rounded-full " onClick={sendRequest} >Add friend</button>
                                                                ) :
                                                                (<button className="py-0 px-4 bg-[#dbeafe] border rounded-full " onClick={CanacelRequest} >Canacel requset</button>)
                                                        )
                                                    )

                                        }

                                    </div>
                                    <h1 className="flex  mt-[50px] ">Recent Activities</h1>

                                    <img
                                        src="https://w0.peakpx.com/wallpaper/616/177/HD-wallpaper-table-tennis-neon-icon-blue-background-neon-symbols-table-tennis-neon-icons-table-tennis-sign-sports-signs-table-tennis-icon-sports-icons.jpg"
                                        alt="Your"
                                        className="w-80 mt-6 h-60  rounded-[32px] inline-block"
                                    />
                                    {/* <button className="flex justify-center  items-center mt-6  bg-[#f4f5f8] transition-all active:scale-100 rounded-xl text-[#2c4d82] py-2 px-12 hover:scale-105 ">Login</button> */}
                                </div>
                                <div className="mt-8" onClick={blockedfriend}>
                                    <button className="bg-[#dbeafe]   transition-all active:scale-100 rounded-xl  text-[#2c4d82] py-2 px-32 hover:scale-105 ">Blocked</button>
                                </div>
                            </div>
                        </div>
                        <div className="">

                            <div className=" flex flex-col gap-8    h-full w-64 items-center   drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-[#f9fafb]  mt-[150px] min-h-[845px] rounded-r-[80px] rounded-[0px] p-6">
                                {(!check || check == 2 || !check1) ? (<div>
                                    <button onClick={() => freind_ranck(1)} className=" mt-60 px-[101px] py-2 text-base font-bold    bg-black   hover:bg-[#3b82f6] hover:scale-110 duration-300 text-white">Friends</button>
                                </div>) : null}
                                {(check && check != 2 && check1) ? (<div>
                                    <button onClick={() => freind_ranck(1)} className=" mt-60 px-[101px] py-2   text-base font-bold   bg-[#3b82f6]  hover:bg-black hover:scale-110 duration-300 text-white">Friends</button>
                                </div>) : null}
                                {(!check || check == 1 || !check2) ? (<div>
                                    <button onClick={() => freind_ranck1(2)} className=" mt-60 px-[110px] py-2   text-base font-bold  bg-black   hover:bg-[#3b82f6]  hover:scale-110 duration-300 text-white">Rank</button>
                                </div>) : null}
                                {(check && check != 1 && check2) ? (<div>
                                    <button onClick={() => freind_ranck1(2)} className=" mt-60 px-[110px] py-2 text-base font-bold  bg-[#3b82f6]  hover:bg-black  hover:scale-110 duration-300 text-white">Rank</button>
                                </div>) : null}


                            </div>

                        </div>
                        {(check && (check1 || check2)) ? (<div className=" flex   justify-start     md:opacity-150 bg mt-[160px] min-h-[845px]    w-[400px] h-16 rounded-r-[50px] p-6"  >
                            {
                                check === 1 && <Friends amis_id={amis_id} amis={amis} currentUser={currentUser} />

                            }
                            {
                                check === 2 && <Rank />
                            }


                        </div>) : null
                        }
                    </div>
                    )
            }
        </>
    );
};




export async function getServerSideProps(context: any) {
    // const currentFileName = path.basename(__filename);
    const currentFileName = context.query.user;

    return {
        props: {
            currentFileName,
        },
    };
}

export default YourComponent;

function setreceived(counte: any) {
    throw new Error('Function not implemented.');
}
