import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {};

const ChangePassword: FC<Props> = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation()

    const passwordChangeHandler = async (e: any) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Password do not match")

        } else {
            await updatePassword({ oldPassword, newPassword })
        }
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success("Password changed successfully");
        } if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error])

    return (
        <div className="w-full p-7 px-5">
            <h1 className="block text-[25px] md:text-[30px] font-Poppins text-center font-semibold pb-2 text-black dark:text-white">
                Change Password
            </h1>
            <div className="w-full">
                <form onSubmit={passwordChangeHandler} className="flex flex-col items-center">
                    <div className="w-[100%] md:w-[60%] mt-5">
                        <label className="block pb-2 text-black dark:text-white">
                            Enter your old password
                        </label>
                        <input
                            type="password"
                            className="w-[95%] mb-4 p-2 border border-gray-300 rounded-md"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="w-[100%] md:w-[60%] mt-2">
                        <label className="block pb-2 text-black dark:text-white">
                            Enter your new password
                        </label>
                        <input
                            type="password"
                            className="w-[95%] mb-4 p-2 border border-gray-300 rounded-md"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="w-[100%] md:w-[60%] mt-2">
                        <label className="block pb-2 text-black dark:text-white">
                            Enter your confirm password
                        </label>
                        <input
                            type="password"
                            className="w-[95%] mb-4 p-2 border border-gray-300 rounded-md"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Update"
                        className="w-[95%] h-[40px] border border-green-500 text-center text-white bg-green-500 rounded-md mt-8 cursor-pointer"
                    />
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
