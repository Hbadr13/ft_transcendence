import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
const MatchingCard = () => {
    const router = useRouter();
    const handelButtonPlayOnline = async () => {
        try {

            const response = await fetch('http://localhost:3333/auth/user', {
                credentials: 'include',
            });
            if (response.status == 200) {

                const content = await response.json()
                if (content.isOnline === false)
                    router.push('/game/online?search=true')
                else {
                    console.log('cant play')
                    // setCantPlayOnline(true)
                }
            }

        } catch (error) {

        }

    }
    return (
        <div className='w-full h-full'>
            <div className="w-full h-full flex justify-center items-center">
                <div className="MatchingCard  relative  overflow-hidden w-[90%] sm:w-[80%] h-[70%] bg-CusColor_grey flex flex-col justify-center items-center rounded-xl">
                    <div id='Bottom' className={`w-[500px] h-[500px] -right-[300px] md:-right-[240px] xl:-right-[140px] absolute  rotate-[-45deg] `} />
                    <div className=" w-full h-[90%] flex justify-center  z-40">
                        <div className="w-[50%] h-full  ">
                            <div className=" relative w-[170px] md:w-[200px] h-[50%] md:h-[70%]    bottom-[8px] md:bottom-[15px]">
                                <Image className=' absolute ' src={'/game/MatchingCardStar.svg'} fill alt='l'></Image>
                            </div>
                        </div>
                        <div className="w-[50%] h-full  flex flex-col items-center justify-center  p-4  space-y-10">
                            <div className="w-full text-center   text-[#FFB800] space-y-2">
                                <h1 className='text-3xl'>
                                    Online Quick Match
                                </h1>
                                <div className="w-full text-[#A6881C] text-center text-xl">
                                    <div className="">Play against users online</div>
                                </div>
                            </div>
                            <button onClick={handelButtonPlayOnline} className=' bg-[#c3a64e] hover:bg-[#e2c867] text-[#55461f] hover:py-3 hover:px-14 hover:text-xl duration-150  py-2 px-12 rounded-md'>
                                Play
                            </button>
                        </div>
                    </div>
                    <div id='Bottom' className="w-full h-[10%] "></div>
                </div>
            </div>
        </div>
    )
}

export default MatchingCard