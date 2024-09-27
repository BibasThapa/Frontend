import Image from "next/image";
import { styles } from "@/app/styles/style";
import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "@/public/assests/avatar.png"; // Ensure the path is correct
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState<string>(user?.name || "");
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const[editProfile,{isSuccess:success,error:updateError}]= useEditProfileMutation()
  const [loadUser, setLoadUser] = useState(false);
  const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  // Image handler for file input
  const imageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result;
          updateAvatar(avatar); // Assuming updateAvatar accepts the base64 string
        }
      };
      fileReader.readAsDataURL(file); // Reading the selected file as a data URL
    }
  };

  // Debugging - Log the values being passed to the src prop
  useEffect(() => {
    console.log("Avatar URL:", user?.avatar?.url);
    console.log("Fallback avatar:", avatar);
    console.log("Default avatar icon:", avatarIcon);
  }, [user?.avatar?.url, avatar]);

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if(success){
      toast.success("Profile update Successfully")
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== ""){
      await editProfile({
        name:name,
       
      })
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative mb-6">
        {/* Profile Image */}
        <Image
          src={user?.avatar?.url || avatar || avatarIcon} // Fallback chain
          alt="User Avatar"
          width={120}
          height={120}
          className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
        />
        {/* File input for avatar update */}
        <input
          type="file"
          name="avatar"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png, image/jpg, image/jpeg, image/webp"
        />
        <label htmlFor="avatar">
          <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} className="text-white" />
          </div>
        </label>
      </div>

      {/* Form for updating user info */}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="pb-4">
          <label className="block pb-2 text-gray-900 dark:text-gray-100">Full Name</label>
          <input
            type="text"
            className={`${styles.input} w-full mb-4 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700`}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="pb-4">
          <label className="block pb-2 text-gray-900 dark:text-gray-100">Email Address</label>
          <input
            type="text"
            readOnly
            className={`${styles.input} w-full mb-4 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700`}
            required
            value={user?.email || ""}
          />
        </div>

        <input
          className="w-full h-[40px] border border-[#37a39a] text-center dark:border-[#37a39a] dark:bg-[#37a39a] dark:text-white text-black rounded-[3px] mt-4 cursor-pointer"
          required
          value="Update"
          type="submit"
        />
      </form>
    </div>
  );
};

export default ProfileInfo;
