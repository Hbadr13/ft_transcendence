// // import { Inter } from 'next/font/google'
// // import { Navbar } from '@/components/model'
// // import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// // import UserInfo from '@/components/user/UserInfo';
// // import { io } from 'socket.io-client';


// // export default function Home() {
// //   // const router = useRouter();
// //   const [socket, setsocket] = useState<any>();


// //   useEffect(() => {
// //     const socketUrl = "http://localhost:8001";
// //     // const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://e2r9p2.1337.ma:8000";
// //     const newSocket = io(socketUrl);
// //     setsocket(newSocket);
// //     return () => {
// //       newSocket.disconnect();
// //     };
// //   }, []);

// //   const router = useRouter();
// //   useEffect(() => {
// //     try {
// //       async () => {
// //         const response = await fetch('http://localhost:3333/auth/user', {
// //           credentials: 'include',
// //         });

// //         // console.log(response.status)
// //         if (response.status != 200) {
// //           router.push('/auth/login');
// //           return;
// //         }
// //         const content = await response.json();
// //       };
// //     } catch (error) {

// //     }
// //   });


// //   return (
// //     <>
// //       <div></div>
// //       <div><UserInfo /></div>
// //     </>

// //   )
// // }








// // 'use client';
// // import { useState, useEffect } from 'react';

// // function FriendsPage() {
// //   const [userId, setUserId] = useState(null);
// //   const [friendId, setFriendId] = useState('');
// //   const [friendRequests, setFriendRequests] = useState([]);
// //   const [friends, setFriends] = useState([]);

// //   // استرداد معرف المستخدم عند التحميل
// //   useEffect(() => {
// //     async () => {
// //       const response = await fetch('http://localhost:3333/auth/user', {
// //         credentials: 'include',
// //       }); // قم بتغيير هذا العنوان إلى المسار الصحيح لاسترداد معرف المستخدم
// //       const data = await response.json();  
// //       console.log("ssddddddddd")
// //       setUserId(data.id);

// //     }
// //   }, []);

// //   // استرداد طلبات الصداقة الواردة عندما يتغير معرف المستخدم
// //   useEffect(() => {
// //     if (userId) {
// //       fetch(`/api/friends/requests/${userId}`)
// //         .then((response) => {
// //           if (!response.ok) {
// //             throw new Error('Network response was not ok');
// //           }
// //           return response.json();
// //         })
// //         .then((data) => {
// //           setFriendRequests(data.friendRequests);
// //         })
// //         .catch((error) => {
// //           console.error('Error fetching friend requests:', error);
// //         });
// //     }
// //   }, [userId]);

// //   // استرداد قائمة الأصدقاء عندما يتغير معرف المستخدم
// //   useEffect(() => {
// //     if (userId) {
// //       fetch(`/api/friends/list/${userId}`)
// //         .then((response) => {
// //           if (!response.ok) {
// //             throw new Error('Network response was not ok');
// //           }
// //           return response.json();
// //         })
// //         .then((data) => {
// //           setFriends(data.friends);
// //         })
// //         .catch((error) => {
// //           console.error('Error fetching friends list:', error);
// //         });
// //     }
// //   }, [userId]);

// //   // إرسال طلب صداقة
// //   const sendFriendRequest = () => {
// //     console.log(userId);
// //     fetch(`http://localhost:3333/friends/send-request/${friendId}`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ senderId: userId }),
// //     })
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         console.log('Friend request sent successfully');
// //         // يمكنك أيضًا تحديث القائمة أو إعادة استرداد طلبات الصداقة هنا
// //       })
// //       .catch((error) => {
// //         console.error('Error sending friend request:', error);
// //       });
// //   };

// //   return (
// //     <div>
// //       <h1>Friends</h1>
// //       <div>
// //         <h2>Friend Requests</h2>
// //         <ul>
// //           {friendRequests.map((request) => (
// //             <li key={request.id}>
// //               {request.sender.name} sent you a friend request
// //               <button onClick={() => acceptFriendRequest(request.id)}>Accept</button>
// //               <button onClick={() => refuseFriendRequest(request.id)}>Refuse</button>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //       <div>
// //         <h2>Friends</h2>
// //         <ul>
// //           {friends.map((friend) => (
// //             <li key={friend.id}>{friend.name}</li>
// //           ))}
// //         </ul>
// //       </div>
// //       <div>
// //         <h2>Send Friend Request</h2>
// //         <input
// //           type="text"
// //           placeholder="Friend's ID"
// //           value={friendId}
// //           onChange={(e) => setFriendId(e.target.value)}
// //         />
// //         <button onClick={sendFriendRequest}>Send Request</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default FriendsPage;


import Image from 'next/image'


import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks';
import { useEffect, useState } from 'react';

function Index() {


  const [users, setUsers] = useState<Array<any>>([]);
  const [friendId, setFriendId] = useState(0);
  const [accept, setaccept] = useState(0);

  const [received, setreceived] = useState<Array<any>>([]);
  const [requestt, setrequestt] = useState(0);
  const [id, setid] = useState(0);
  const [Email, setEmail] = useState("");
  const [query, setquery] = useState("22");
  // const [users, setUsers] = useState<any>([])

  const [amis, setAmis] = useState<any>([])
  fetchCurrentUser(setid)
  fetchAllUsers(setUsers, "", id)
  fetchAllAmis({ setAmis, query, id })

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:3333/friends/${id}/received-requests`, {
          credentials: 'include',
        });
        const counte = await response.json();
        if (response.status == 200) {
          setreceived(counte)
          console.log(counte[0]?.sender);
          // setrequestt(cont)
          return;
        }
      }
    )();
  }, [id]);

  const sendRequest = async () => {
    try {
      const response = await fetch(`http://localhost:3333/friends/send-request/${friendId}/${id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Friend request sent successfully.');
      } else {
        console.error('Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };
  const sendRequestForaccpet = async () => {
    try {

      const response = await fetch(`http://localhost:3333/friends/accept-friend-request/${accept}/${id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Friend request sent successfully.');
      } else {
        console.error('Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };



  return (
    <div className='flex flex-col space-y-10 p-10 font-thin text-3xl items-center text-white'>

      <div className='bg-blue-400 p-5  rounded-md'>

        <h1>Send Friend Request</h1>
        <div>
          <label htmlFor="friendId">Friend's ID:</label>
          <input className='text-black'
            type="number"
            id="friendId"
            value={friendId}
            onChange={(e) => setFriendId(Number(e.target.value))}
          />
        </div>
        <button className='bg-blue-800 p-2 rounded-xl' onClick={sendRequest}>Send</button>
      </div>

      <div className='bg-blue-400 p-5  rounded-md'>

        <h1>accept Friend Request</h1>
        <div>
          <label htmlFor="acceptId">accept's ID:</label>
          <input
            className='text-black'
            type="number"
            id="accept"
            value={accept}
            onChange={(ee) => setaccept(Number(ee.target.value))}
          />
        </div>
        <button className='bg-blue-800   p-2 rounded-xl' onClick={sendRequestForaccpet}>accept</button>
      </div>
      <div className="flex justify-around w-full ">
        <div className="">
          <h1 className=''>all users</h1>
          {
            (users.length) ? users.map((user: any) => (
              <div className=' bg-slate-200 rounded-2xl items-start  '>
                <img
                  src={user.foto_user}
                  alt="Your Image Alt Text"
                  className="w-20 h-auto  rounded-full inline-block" // Adjust the width as needed
                />
                <samp className='bg-black  rounded-2xl   '>{`${user.username}.${user.id}`}</samp>

              </div>
            )) : null
          }
        </div>
        <div className="">
          <h1 className=''>amis</h1>

          {
            (amis.length) ? amis.map((user: any) => (
              <div className=' bg-slate-200 rounded-2xl items-start  '>
                <img
                  src={user.foto_user}
                  alt="Your Image Alt Text"
                  className="w-20 h-auto  rounded-full inline-block" // Adjust the width as needed
                />
                <samp className='bg-black  rounded-2xl   '>{`${user.username}.${user.id}`}</samp>

              </div>
            )) : null
          }
        </div>
        <div className="">
          <h1 className=''>request</h1>
          {
            (received.length) ? received.map((user: any) => (
              <div className=' bg-slate-200 rounded-2xl items-start  '>
                <img

                  src={user.sender.foto_user}
                  alt="Your Image Alt Text"
                  className="w-20 h-auto  rounded-full inline-block" // Adjust the width as needed
                />
                <samp className='bg-black  rounded-2xl   '>{`${user.sender.username}.${user.sender.id}`}</samp>

              </div>
            )) : null
          }
        </div>
      </div>
    </div >
  );
}

export default Index;


