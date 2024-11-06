'use client'

import React from "react"
import AdminSidebar from "@/components/Admin/sidebar/AdminSidebar"
import Heading from "@/utilis/Heading"
import DashboardHeader from "@/components/Admin/DashboardHeader"
import OrderAnalytics from "@/components/Admin/Analytics/OrderAnalytics"


 type Props ={}
 const page =(props:Props)=>{
    return (
        <div>
            <Heading title="E"
            description="Elearning is a platform for students to learn "
            keywords="Programming Machine Learning" />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
                </div>
                <div className="w-[85%]">
                    <DashboardHeader />
                    <OrderAnalytics />
                </div>
            </div>
        </div>
    )
 }




export default page