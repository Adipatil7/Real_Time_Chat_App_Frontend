"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { createRooms, joinChatApi } from "@/services/RoomService";
import useChatContext from "@/context/ChatContext";
import { useRouter } from "next/navigation";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const {
    roomId,
    userName,
    connected,
    setRoomId,
    setCurrentUser,
    setConnected,
  } = useChatContext();
  const router = useRouter();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid input !!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      // API call to join the chat room

      try {
        const response = await joinChatApi(detail.roomId);
        console.log(response);
        toast.success("Room joined successfully !!");

        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);

        router.push("/chat");
      } catch (e) {
        console.log(e);
        if (e.status == 400) {
          toast.error(e.response.data);
        } else {
          toast.error("Error !!");
        }
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      // API call to create the room
      try {
        const response = await createRooms(detail.roomId);
        console.log(response);
        toast.success("Room created Successfully !!");

        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);

        router.push("/chat");
      } catch (e) {
        console.log(e);
        if (e.status == 400) {
          toast.error("Room already exists !!");
        } else {
          toast.error("Error creating room !!");
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 dark:border-gray-700 border w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow">
        <div>
          <img src="/images/chat.png" alt="" className="w-24 mx-auto" />
        </div>

        <h1 className="text-2xl font-semibold text-center mb6">
          Join Room / Create Room
        </h1>
        {/* name div */}
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Your Name :{" "}
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            name="userName"
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-br-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* room id div */}
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Room ID :{" "}
          </label>
          <input
            type="text"
            id="name"
            onChange={handleFormInputChange}
            value={detail.roomId}
            name="roomId"
            placeholder="Enter room id"
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-br-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* button */}
        <div className="flex justify-center">
          <button
            onClick={joinChat}
            className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full mr-20"
          >
            {" "}
            Join Room{" "}
          </button>
          <button
            onClick={createRoom}
            className="px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full ml-20"
          >
            {" "}
            Create Room{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
