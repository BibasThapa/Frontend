"use client"
import AdminProtected from '@/app/hooks/adminProtected'
import DashboardHero from '@/components/Admin/DashboardHero'
import Heading from '@/utilis/Heading'
import React from 'react'
import AdminSidebar  from "@/components/Admin/sidebar/AdminSidebar"
import AllInvoices from '@/components/Admin/Order/AllInvoices'



type Props = {}
const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
            <Heading
                title="Elearning - Admin"
                description="Elearning is a platform for students to learn"
                keywords="Programming"
            />
             <div className="flex screen">
                <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
                </div>
                <div className= "w-[85%]" >
                    <DashboardHero />
                    <AllInvoices />
                </div>
        </div>
            </AdminProtected>
       

        </div>
    )
}

export default page
