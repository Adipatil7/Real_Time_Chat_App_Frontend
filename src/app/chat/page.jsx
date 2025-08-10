"use client";

import { baseURL } from "@/config/AxiosHelper";
import useChatContext from "@/context/ChatContext";
import { getMessages } from "@/services/RoomService";
import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdAttachment, MdSend } from "react-icons/md";
import SockJS from "sockjs-client";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/config/helper";

export default function Home() {
  const { roomId, currentUser, connected ,setConnected, setRoomId , setCurrentUser} = useChatContext();

  useEffect(() => {
    if (!connected) {
      Router.push("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(()=>{
    async function loadMessages(){
      try{
        const messages = await getMessages(roomId)
        // console.log(messages)
        setMessages(messages);
      }catch(e){

      }
    }
    if(connected){
      loadMessages();
    }
  },[]);

  useEffect(()=>{
      if(chatBoxRef.current){
        chatBoxRef.current.scroll({
          top: chatBoxRef.current.scrollHeight,
          behavior: "smooth"
        })
      }
  },[messages])

  useEffect(() => {
    const connectWebSocket = () => {
      // sockJS
      const socket = new SockJS(`${baseURL}/chat`);

      const client = Stomp.over(socket);

      client.connect({}, () => {
        setStompClient(client);

        toast.success("connected");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);

          const newMessage = JSON.parse(message.body);

          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if(connected){
      connectWebSocket();
    }
    
  }, [roomId]);

  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);

      const message={
        sender:currentUser,
        content:input,
        roomId:roomId
      }

      stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message));
      setInput("");

    }
  };

  function handleLogOut(){
     stompClient.disconnect();
     setConnected(false);
     setCurrentUser("");
     setRoomId("");
     Router.push("/")
  }

  return (
    <div className="">
      {/* This is Header */}
      <header className="h-20 dark:bg-gray-900 fixed w-full  flex justify-around items-center dark:border-gray-700 shadow border py-5 rounded-br-3xl">
        {/* room id (later we might be adding room creator's name) */}
        <div>
          <h1 className="text-xl font-semibold">
            Room : <span>{roomId}</span>
          </h1>
        </div>
        {/* UserName container */}
        <div>
          <h1 className="text-xl font-semibold">
            User : <span>{currentUser}</span>
          </h1>
        </div>
        {/* button : leave room */}
        <div>
          <button onClick={handleLogOut} className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">
            Leave Room
          </button>
        </div>
      </header>

      <main ref={chatBoxRef} className="pt-20 w-2/3 mx-auto dark:bg-slate-600 h-screen overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-cyan-500" : "bg-purple-500"
              } rounded p-2 max-w-xs`}
            >
              <div className="flex flex-row">
                <img
                  className="h-6 w-6 gap-3"
                  src={"/images/person.avif"}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-400" >{timeAgo(message.timeStamp)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* This is to input message */}
      <div className="fixed bottom-4 w-full h-14">
        <div className="pr-10 gap-4 h-full flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key == "Enter"){
                sendMessage
              }
            }}
            type="text"
            placeholder="Type Your Message"
            className="w-full dark:bg-gray-800 dark:border-gray-600 px-5 py-2 rounded-full h-full focus:outline-none"
          />
          <div className="flex gap-1">
            <button className="dark:bg-blue-600 flex justify-center items-center h-10 w-12 rounded-full ">
              <MdAttachment size={20} />
            </button>
            <button onClick={sendMessage} className="dark:bg-green-600 flex justify-center items-center h-10 w-12 rounded-full ">
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
