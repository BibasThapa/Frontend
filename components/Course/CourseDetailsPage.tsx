import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/utilis/Heading';
import Header from '../Header';
import CourseDetails from './CourseDetails';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/ordersApi';
import {loadStripe} from "@stripe/stripe-js"
type Props={
    id:string;
}
const CourseDetailsPage = ({id}:Props) => {
    const [route,setRoute]= useState("Login");
    const[open, setOpen]= useState(false);
    const {data, isLoading}= useGetCourseDetailsQuery(id);
    const {data: config}= useGetStripePublishableKeyQuery({});
    const [createPaymentIntent, {data:paymentIntentData}] = useCreatePaymentIntentMutation();
    const [stripePromise, setStripePromise]=useState<any>(null);
    const[clientSecret, setClientSecret]= useState("");

    useEffect(()=>{
      if(config){
          setStripePromise(loadStripe(config?.publishablekey))
      }
      if(data){
        const amount = Math.round(data.course.price * 100);
        createPaymentIntent(amount)
      }
    },[config, data]);

    useEffect(()=>{
      console.log("paymentIntentData",paymentIntentData)
      if(paymentIntentData){
        setClientSecret(paymentIntentData?.client_secret)
      }
    }, [paymentIntentData])

  return (
    <>
      {
        isLoading ?(
            <Loader />
        ):(
            <div>
                <Heading
                    title={data?.course?.name +"-Elearning"}
                    description= {"Elearning is a platform for students to learn"}
                    keywords={data?.course?.tags}
                />
                <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
                {
                  stripePromise && clientSecret && (
                    <CourseDetails data= {data.course} stripePromise= {stripePromise} clientSecret={clientSecret} />
                  )
                }
            </div>
        )
      }
    </>
  )
}

export default CourseDetailsPage
