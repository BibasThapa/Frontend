import { styles } from '@/app/styles/style';
import CoursePlayer from '@/utilis/CoursePlayer';
import NavItems from '@/utilis/NavItems';
import Ratings from '@/utilis/Ratings';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import CourseContentList from "@/components/Course/CourseContentList"
import {Elements} from "@stripe/react-stripe-js"
import CheckOutForm from '../Payment/CheckOutForm';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
type Props = {
  data: any;
  clientSecret:string;
  stripePromise: any;
};

const CourseDetails = ({ data,stripePromise, clientSecret }: Props) => {
  const { data:userData } = useLoadUserQuery(undefined,{});
  const user = userData?.user;
  const [open, setOpen]= useState(false);

  // Calculate discount percentage
  const discountPercentenge = ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentengePrice = discountPercentenge.toFixed(0);

  // Check if the course is purchased
  const isPurchased = user && user?.courses?.find((item: any) =>item.courseId===data._id);
  console.log("Is purchased", user?.courses)
  console.log("Is purchased", data?._id);


  const handleOrder = (e: any) => {
    setOpen(true)
  };

  return (
    <div className="min-h-screen w-full py-5 bg-white dark:bg-gray-900 text-black dark:text-white">
    
      <div className="w-[90%] m-auto flex flex-col-reverse 800px:flex-row">
        <div className="w-full 800px:w-[65%] 800px:pr-5">
          {/* Course Title */}
          <h1 className="text-[25px] font-Poppins font-[600]">{data.name}</h1>

          {/* Course Rating and Students */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={data.ratings} />
              <h5 className="ml-2">{data.reviews?.length} Reviews</h5>
            </div>
          </div>
          <h5>{data.purchased} Students</h5>

          {/* What you'll learn */}
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">What you will learn from this course?</h1>
          <div>
            {data.benefits?.map((item: any, index: number) => (
              <div key={index} className="flex items-center my-2">
                <IoCheckmarkDoneOutline size={20} className="mr-2" />
                <p className="pl-2">{item.title}</p>
              </div>
            ))}
          </div>

          {/* Prerequisites */}
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">What are the prerequisites for starting this course?</h1>
          <div>
            {data.prerequisites?.map((item: any, index: number) => (
              <div key={index} className="flex items-center my-2">
                <IoCheckmarkDoneOutline size={20} className="mr-2" />
                <p className="pl-2">{item.title}</p>
              </div>
            ))}
          </div>

          <br />
          <br />
          <div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">Course Overview</h1>
            <CourseContentList 
            data={data?.courseData} 
             isDemo={true} />
          </div>

          <br />
        
          <br />
          <div className="w-full">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">Course Details</h1>
            <br />
            <p className="text-[18px] whitespace-pre-line w-full overflow-hidden">{data.description}</p>
            <br />
            {/* Course Rating and Reviews */}
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="ml-2">
                  {data?.ratings.toFixed(1)} Course Rating | {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {/* User Reviews */}
              {data?.reviews &&
                [...data.reviews].reverse().map((item: any, index: number) => (
                  <div key={index} className="w-full pb-4">
                    <div className="flex">
                      {/* User Icon */}
                      <div className="w-[50px] h-[50px] bg-slate-600 rounded-full flex items-center justify-center">
                        <h1 className="uppercase text-[18px] text-white">{item.user.name.slice(0, 2)}</h1>
                      </div>
                      {/* Review Content */}
                      <div className="pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2">{item.user.name}</h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p>{item.comment}</p>
                        <small className="text-[#ffffff83]">{format(item.createdAt)}</small>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Section with Video Player and Price */}
        <div className="w-full 800px:w-[35%] relative">
          <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
          <div className="flex items-center justify-between pt-5">
            <h1 className="text-[25px]">{data.price === 0 ? "Free" : "Rs" + data.price}</h1>
            <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">Rs{data.estimatedPrice}</h5>
            <h4 className="pl-5 text-[22px]">{discountPercentengePrice}% off</h4>
          </div>
          <div className="flex items-center">
            {isPurchased ? (
              <Link
                className={`${styles.button}!w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                href={`/course-access/${data._id}`}
              >
                Enter to Course
              </Link>
            ) : (
              <div
                className={`${styles.button}!w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                onClick={handleOrder}
              >
                Buy Now Rs{data.price}
              </div>
            )}
          </div>

          
        </div>
      </div>
      <>
      { open && (
      <div className='w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center'>
        <div className='w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3'>
          <div className='w-full flex justify-end'>
            <IoCloseOutline
            size={40}
            className='text-black cursor-pointer'
            onClick={()=> setOpen(false)}
             />
          </div>
          <div className='w-full'>
            {
              stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{clientSecret}}>
                  <CheckOutForm setOpen={setOpen} data={data} />
                </Elements>
              )
            }
          </div>
        </div>
      </div>
      )}
      </>
    </div>
  );
};

export default CourseDetails;
