import { styles } from '@/app/styles/style';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


type Props = {
    setOpen: any;
    data: any;
};

const CheckOutForm = ({ setOpen, data }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string>("");
    const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
    const [loadUser, setLoadUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { data: userData } = useLoadUserQuery(undefined, { skip: !loadUser });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return; 
        }

        setIsLoading(true);
        const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });
       


        if (paymentError) {
            setMessage(paymentError.message ?? "An unknown error occurred");
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false);
             createOrder({ courseId: data._id, payment_info: paymentIntent });
        }
    };

    useEffect(() => {
        if (orderData) {
            setLoadUser(true);
            redirect(`/course-access/${data._id}`); 
        } if (error){
            if("data"in error){
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [orderData, error]);

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
                    {isLoading ? "Paying..." : "Pay now"}
                </span>
            </button>
            {message && (
                <div id="payment-message" className='text-[red] font-Poppins pt-2'>
                    {message}
                </div>
            )}
        </form>
    );
};

export default CheckOutForm;
