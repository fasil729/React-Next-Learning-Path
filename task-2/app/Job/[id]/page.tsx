import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import AttributeList from "../../(components)/AttributeList";
import jobDescriptionData from "../../(data)/jobDescriptionData.json";
import { FaRegCircleCheck } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import Label from "@/app/(components)/Label";
import { AiOutlineFire } from "react-icons/ai";
import { BsCalendar2Plus, BsSkipStartBtn } from "react-icons/bs";
import { PiCalendarCheck } from "react-icons/pi";

const JobDescription = () => {
  const {
    description,
    responsibilities,
    idealCandidate,
    whenAndWhere,
    about,
    categories,
    requiredSkills,
  } = jobDescriptionData;

  return (
    <div className="grid grid-cols-3 gap-14 p-8 ml-5">
      <div className="col-span-2 py-12 flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <h2 className="font-poppins font-extrabold text-3xl leading-7 text-gray-900">
            {description.heading}
          </h2>
          <p className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
            {description.content}
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
            Ideal Candidate we want
          </h3>
          <ul className="list-disc pl-6">
            {idealCandidate.map((item, index) => (
              <li key={index} className="mb-4">
                <p className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
                  <span className="font-semibold">{item.label}</span>{" "}
                  {item.description && item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-poppins font-extrabold text-3xl leading-7 text-gray-900">
            When and Where
          </h3>
          <div className="flex gap-4 items-center">
            <CiLocationOn className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <p>{whenAndWhere.onboardingEvent}</p>
          </div>
        </div>
      </div>
      <aside className="col-span-1">
        <h3 className="font-poppins font-extrabold text-3xl mb-5 leading-7 text-gray-900">
          About
        </h3>
        <ul className="list-disc mb-6 flex flex-col gap-5">
          <li className="flex items-center gap-4">
            <HiOutlinePlusCircle className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12"/>
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>Posted on</p>
              <p className="font-semibold">{about.postedOn}</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <AiOutlineFire className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>Deadline</p>
              <p className="font-semibold">{about.deadline}</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <CiLocationOn className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>Location</p>
              <p className="font-semibold">{about.location}</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <BsCalendar2Plus  className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12"/>
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>Start Date</p>
              <p className="font-semibold">{about.startDate}</p>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <PiCalendarCheck className="text-blue-800 rounded-full border border-[#D6DDEB] p-2 w-12 h-12" />
            <div className="font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
              <p>End Date</p>
              <p className="font-semibold">{about.endDate}</p>
            </div>
          </li>
        </ul>

        <div className="flex flex-col gap-6 justify-between mb-6">
          <h3 className="font-poppins font-extrabold text-3xl leading-7 text-gray-900">
            Categories
          </h3>
          <div className="flex gap-2 items-center">
            {categories.map((category, index) => (
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
        <div className="w-[293.5px] border border-[#D6DDEB] mb-6"></div>
        <div className="flex flex-col gap-4">
          <h3 className="font-poppins font-extrabold text-3xl leading-7 text-gray-900">
            Required Skills
          </h3>
          <div className="flex flex-wrap gap-4 items-center">
            {requiredSkills.map((skill, index) => (
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
