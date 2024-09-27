import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/utilis/Heading';
import Header from '../Header';
import CourseDetails from './CourseDetails';
type Props={
    id:string;
}
const CourseDetailsPage = ({id}:Props) => {
    const [route,setRoute]= useState("Login");
    const[open, setOpen]= useState(false);
    const {data, isLoading}= useGetCourseDetailsQuery(id)

  return (
    <>
      {
        isLoading ?(
            <Loader />
        ):(
            <div>
                <Heading
                    title={data.course.name +"-Elearning"}
                    description= {"Elearning is a platform for students to learn"}
                    keywords={data?.course?.tags}
                />
                <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
                <CourseDetails  data={data.course}/>
            </div>
        )
      }
    </>
  )
}

export default CourseDetailsPage
