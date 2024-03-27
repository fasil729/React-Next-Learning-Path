"use client";
import React from "react";
import AttributeList from "@/components/AttributeList";
import { FaRegCircleCheck } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import Label from "@/components/Label";
import { AiOutlineFire } from "react-icons/ai";
import { BsCalendar2Plus, BsSkipStartBtn } from "react-icons/bs";
import { PiCalendarCheck } from "react-icons/pi";
import { useGetOpportunityByIdQuery } from "@/lib/features/api/apiSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import dayjs from "dayjs";

const JobDescription = ({ params }: { params: { id: string } }) => {
  const id: String = params.id;
  const {
    data: opportunity,
    isLoading,
    isError,
    isUninitialized,
  } = useGetOpportunityByIdQuery(id);


  const responsibilities = opportunity?.data.responsibilities.split("\n") || [];
  const formattedStartDate = dayjs(opportunity?.data.startDate).format("MMM D, YYYY");
  const formattedEndDate = dayjs(opportunity?.data.endDate).format("MMM D, YYYY");
  const formattedPostedOn = dayjs(opportunity?.data.datePosted).format("MMM D, YYYY");
  const formattedDeadline = dayjs(opportunity?.data.deadline).format("MMM D, YYYY");

  if (isLoading || isUninitialized) {
    return (
      <div className="text-center m-auto">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center">Error fetching data</div>; // You can replace this with an error message component
  }

  return (
    <div className="grid grid-cols-3 gap-14 p-8 ml-5">
      <div className="col-span-2 py-12 flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <h2 className="font-poppins font-extrabold text-3xl leading-7 text-gray-900">
            Description
          </h2>
          <p className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
            {opportunity?.data.description}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-poppins font-extrabold text-3xl leading-7 text-gray-900">
            Responsibilities
          </h3>
          <AttributeList
            data={responsibilities.map((item: string) => ({
              text: item,
              icon: <FaRegCircleCheck className="text-green-500" />,
            }))}
          />
        </div>
        
        <div className="flex flex-col gap-4">
          <h3 className="font-poppins font-extrabold text-3xl leading-7 text-gray-900">
            When and Where
          </h3>
          <div className="flex gap-4 items-center">
            <CiLocationOn className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <p>{opportunity?.data.whenAndWhere}</p>
          </div>
        </div>
      </div>
      <aside className="col-span-1">
        <h3 className="font-poppins font-extrabold text-3xl mb-5 leading-7 text-gray-900">
          About
        </h3>
        <ul className="list-disc mb-6 flex flex-col gap-5">
          <li className="flex items-center gap-4">
            <HiOutlinePlusCircle className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>Posted on</p>
              <p className="font-semibold">{formattedPostedOn}</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <AiOutlineFire className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>Deadline</p>
              <p className="font-semibold">{formattedDeadline}</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <CiLocationOn className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>Location</p>
              <p className="font-semibold">{opportunity?.data.location.join(", ")}</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <BsCalendar2Plus className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>Start Date</p>
              <p className="font-semibold">{formattedStartDate}</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <PiCalendarCheck className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>End Date</p>
              <p className="font-semibold">{formattedEndDate}</p>
            </div>
          </li>
        </ul>

        <div className="flex flex-col gap-6 justify-between mb-6">
          <h3 className="font-poppins font-extrabold text-3xl leading-7 text-gray-900">
            Categories
          </h3>
          <div className="flex gap-2 items-center">
            {opportunity?.data.categories.map((category, index) => (
              <div key={index}>
                <Label
                  labelprops={{
                    text: category,
                    color:
                      index % 2 === 0 ? "text-[#FFB836]" : "text-[#56CDAD]",
                    background:
                      index % 2 === 0
                        ? "bg-[#EB8533] bg-opacity-10"
                        : "bg-[#e0f5ef]",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
  <h3 className="font-poppins font-extrabold text-3xl leading-7 text-gray-900">
    Required Skills
  </h3>
  <div className="flex flex-wrap gap-4 items-center">
    {opportunity?.data.requiredSkills.map((skill, index) => (
      <div key={index} className="w-[calc(50%-0.5rem)]">
        <Label
          labelprops={{
            text: skill,
            color: "text-[#4640DE] text-[16p]",
            background: "bg-[#F8F8FD]",
            border: "rounded-none",
          }}
        />
      </div>
    ))}
  </div>
</div>
</aside>
</div>
);
};

export default JobDescription;

