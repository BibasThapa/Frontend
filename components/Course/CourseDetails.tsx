import { styles } from '@/app/styles/style';
import CoursePlayer from '@/utilis/CoursePlayer';
import NavItems from '@/utilis/NavItems';
import Ratings from '@/utilis/Ratings';
import Link from 'next/link';
import React from 'react';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import CourseContentList from "@/components/Course/CourseContentList"
type Props = {
  data: any;
};

const CourseDetails = ({ data }: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  // Calculate discount percentage
  const discountPercentenge = ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentengePrice = discountPercentenge.toFixed(0);

  // Check if the course is purchased
  const isPurchased = user && user?.courses?.find((item: any) => item._id === data._id);

  const handlerOrder = (e: any) => {
    // Implement order logic if needed
  };

  return (
    <div className="min-h-screen w-full py-5 bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Main Layout */}
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
              >
                Buy Now Rs{data.price}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
