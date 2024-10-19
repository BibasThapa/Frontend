"use client"
import React, {useEffect} from 'react'
import {useLoadUserQuery} from "@/redux/features/api/apiSlice"
import {redirect} from "next/navigation"
import Loader from "@/components/Loader/Loader"
import CourseContent from "@/components/Course/CourseContent"
type Props = {
    params:any;
}
const page = ({params}:Props) =>{
    const id = params.id;
    console.log("THis is id",id)

    const {isLoading,error,data}= useLoadUserQuery(undefined,{});
    useEffect (()=>{
        if(data){
            const isPurchased = data?.user?.courses.find((item:any)=> item.courseId===id);
            console.log("Purched",isPurchased)
            if(!isPurchased){
                redirect("/")
            }
        if(error){
            redirect("/")
        }
        }
    },[data, error])


    return (
        <>
        {
            isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id ={id} user={data.user}/>
                </div>
            )
        }
        </>
    )
}


export default page