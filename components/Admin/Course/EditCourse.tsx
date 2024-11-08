"use client";
import React, { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useEditCoursesMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


type Props = {
    id:string;

};
const EditCourse:FC<Props>= ({id}) => {

  const [editCourse,{isSuccess,error}] = useEditCoursesMutation()
    
    
  const { data, refetch }  = useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true})
  const editCourseData = data && data.courses.find((i:any)=>i._id === id)

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated successfully");
      redirect("/admin/courses")
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message)
      }
    }
  }, [isSuccess, error])
  const [active, setActive] = useState(0);
  useEffect (()=> {
    if(editCourseData){
      setCourseInfo({
        name: editCourseData.name,
      description: editCourseData.description,
      price: editCourseData.price,
      estimatedPrice: editCourseData.estimatedPrice,
      tags: editCourseData.tags,
      thumbnail: editCourseData.thumbnail,
      level: editCourseData.level,
      demoUrl:editCourseData.demoUrl,
    
      })
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData)
    }
  },[editCourseData]);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));
    const formattedCourseContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };
    setCourseData(data);
  };

  const handleNextStep = () => {
    // Basic validation for the current step
    if (active === 0 && !courseInfo.name) {
      alert("Please fill out the course information.");
      return;
    }
    if (active === 1 && benefits.length === 0) {
      alert("Please add at least one benefit.");
      return;
    }
    if (active === 2 && courseContentData.length === 0) {
      alert("Please add at least one course content.");
      return;
    }

    setActive((prev) => Math.min(prev + 1, 3)); // Go to the next step
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({id:editCourseData?._id,data})
    
  };

  const { theme } = useTheme();

  return (
    <div className={`w-full flex min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="w-[75%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div
        className={`w-[25%] mt-[100px] h-screen fixed top-18 right-0 z-[10] ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
      >
        <CourseOptions active={active} setActive={handleNextStep} />
      </div>
    </div>
  );
};

export default EditCourse;
