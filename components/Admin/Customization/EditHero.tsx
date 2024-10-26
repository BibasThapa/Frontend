import { styles } from '@/app/styles/style';
import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');

  const { data, refetch } = useGetHeroDataQuery('Banner', { refetchOnMountOrArgChange: true });
  const [editLayout,{isLoading,isSuccess, error}]= useEditLayoutMutation ()

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if(isSuccess){
      refetch()
      toast.success("Hero update Succcessfully")
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData?.data?.message)
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type:"Banner",
      image,
      title,
      subTitle,
    })
  };

  return (
    <div className="w-full 1000px:flex items-center">
      
      <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]'>

  
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt="Banner"
              className="object-contain 1100px:max-w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            />
          
          <input
            type="file"
            name=""
            accept="image/*"
            id="banner"
            className="hidden"
            onChange={handleUpdate}
          />
          <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
            <AiOutlineCamera className=" dark:text-white text-black text-[18px] cursor-pointer" />
          </label>
        </div>
      </div>

      
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <textarea
          className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-Poppins leading-tight"
          placeholder="Improve Your Online Learning Experience Better Instantly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={4}
        />
        <br />
        <textarea
          className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:w-[74%] bg-transparent"
          placeholder="We have 40k+ Online courses & 500k+ Online registered students."
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        > </textarea>
        <br />
        <br />
        <br/>
      
      <div
        className={`${
          styles.button
        } !w-[110px] !h-[40px] !min-h-[40px] bg-[#cccccc34] dark:text-white text-black ${
          data?.layout?.banner?.title !== title ||
          data?.layout?.banner?.subTitle !== subTitle ||
          data?.layout?.banner?.image?.url !== image
            ? 'cursor-pointer bg-[#42d383]'
            : 'cursor-not-allowed'
        } !rounded absolute bottom-12 right-12 shadow-md`}
        onClick={
          data?.layout?.banner?.title !== title ||
          data?.layout?.banner?.subTitle !== subTitle ||
          data?.layout?.banner?.image?.url !== image
            ? handleEdit
            : () => null
        }
      >
        Save
      </div>
    </div>
    </div>
    </div>
  );
};

export default EditHero;
