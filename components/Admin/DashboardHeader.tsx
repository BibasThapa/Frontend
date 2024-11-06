"use client";
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from "@/redux/features/notifications/notificationsApi";
import { ThemeSwitcher } from "@/utilis/ThemeSwitcher";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT,{transports:["websocket"]});

type Props = {
  open?:boolean;
  setOpen?:any
};

const DashboardHeader: FC<Props> = ({open,setOpen}) => {
 const {data, refetch} = useGetAllNotificationsQuery(undefined, {refetchOnMountOrArgChange:true})
 const [updateNotificationStatus,{isSuccess}] = useUpdateNotificationStatusMutation();
 const [notifications, setNotifications] = useState<any>([]);
 const [audio] = useState(
  new Audio(
    "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcentjn.mp3"
  )
 )
 const playerNotificationSound = ()=>{
  audio.play()
 }
useEffect(()=>{
  if(data){
    setNotifications(
      data.notifications.filter((item:any)=> item.status === "unread")
    )
  }
  if(isSuccess){
    refetch();
  }
  audio.load()
},[data,isSuccess])

useEffect(()=>{
  socketId.on("newNotification", (data)=>{
    refetch();
    playerNotificationSound()
  })
},[])
const handleNotificationStatusChange = async(id:string) =>{
  await updateNotificationStatus(id)
}
  return (
    <div className="fixed top-0 right-0 w-auto p-4 z-50 bg-transparent dark:bg-black">
      <div className="flex items-center space-x-4">
        {/* ThemeSwitcher */}
        <div className="border border-gray-300 dark:border-gray-700 p-2 rounded-full">
          <ThemeSwitcher />
        </div>

        {/* Notification Bell */}
        <div
          className="relative cursor-pointer border border-gray-300 dark:border-gray-700 p-2 rounded-full"
          onClick={() => setOpen(!open)}
        >
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] text-[12px] flex items-center justify-center text-white">
            {notifications && notifications.length}
          </span>
        </div>
      </div>

      {/* Notification Dropdown */}
      {open && (
        <div className="absolute top-[60px] right-0 w-[350px] max-h-[50vh] bg-white dark:bg-black shadow-xl z-50 rounded overflow-auto border border-gray-300 dark:border-gray-700">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {
            notifications && notifications.map((item:any, index:number)=>(
              <div className="dark:bg-[#1a1a1a] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">{item.title}</p>
              <p className="text-black dark:text-white cursor-pointer"
              onClick={()=> handleNotificationStatusChange(item._id)} >
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              {item.message}
            </p>
            <p className="p-2 text-black dark:text-white text-[14px]">
              {format(item.createdAt)}
            </p>
          </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
