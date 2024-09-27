import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');

  const { data } = useGetHeroDataQuery('Banner', { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
  }, [data]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEdit = () => {
    // Function for saving edited hero content
    console.log('Edited: ', { title, subTitle, image });
  };

  return (
    <div className="w-full flex flex-wrap items-center justify-center relative">
      {/* Background Circle */}
      <div className="absolute top-[100px] left-[5%] h-[500px] w-[500px] lg:h-[700px] lg:w-[700px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full z-0 hero_animation"></div>

      {/* Image Section */}
      <div className="w-full lg:w-[40%] flex justify-center lg:justify-end items-center pt-[70px] lg:pt-0 z-10 relative">
        <div className="relative">
          {image ? (
            <img
              src={image}
              alt="Banner"
              className="object-contain max-w-[90%] h-auto rounded-lg shadow-lg"
            />
          ) : (
            <div className="bg-gray-200 h-[200px] w-[90%] flex justify-center items-center text-gray-500">
              No image selected
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            id="banner"
            className="hidden"
            onChange={handleUpdate}
          />
          <label htmlFor="banner" className="absolute bottom-2 right-2">
            <AiOutlineCamera className="text-[18px] cursor-pointer dark:text-white text-black" />
          </label>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left mt-[150px] lg:mt-0 px-4 z-10">
        <textarea
          className="resize-none w-full text-black dark:text-white text-[40px] lg:text-[60px] xl:text-[70px] font-Poppins leading-tight"
          placeholder="Improve Your Online Learning Experience Better Instantly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={2}
        />
        <br />
        <textarea
          className="resize-none w-full text-black dark:text-[#edf4f4] text-[18px] font-Josefin font-[600] bg-transparent"
          placeholder="We have 40k+ Online courses & 500k+ Online registered students."
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          rows={2}
        />
      </div>

      {/* Save Button */}
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
  );
};

export default EditHero;
