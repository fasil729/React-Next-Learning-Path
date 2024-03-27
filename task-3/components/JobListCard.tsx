"use client";
import React, { FC } from "react";
import Label from "./Label";

interface JobListCardProps {
  props: Opportunity;
}

const JobListCard: FC<JobListCardProps> = ({ props }) => {
  const greenColor = "#56CDAD";
  const yellowColor = "#FFB836";
  const purpleColor = "#4640DE";

  return (
    <div className="rounded-3xl border-2 p-6 w-[100%] bg-white">
      <div className="flex gap-6">
        <img
          className="w-[66px] h-[59px]"
          src={props.logoUrl} // Use 'logoUrl' from Opportunity
          alt="company avatar"
        />

        <div className="flex flex-col gap-2">
          <h1 className="font-epilogue font-semibold text-xl">{props.title}</h1>

          <div className="flex gap-2 items-center">
            <p className="font-epilogue font-normal text-[#7C8493]">
              {props.location}
            </p>

            <div className="w-[4px] h-[4px] bg-[#7C8493] rounded-full"></div>

            <p className="font-epilogue font-normal text-[#7C8493]">
              Ethiopia
              {/* Use 'location' from Opportunity */}
            </p>
          </div>

          <p className="w-[100%]  font-epilogue text-[16px] leading-[25.6px] text-[#25324B] font-[400]">
            {props.description}
          </p>

          <div className="flex gap-2 items-center">
            {props.categories.map((category, index) => (
              <Label
                key={index}
                labelprops={{
                  text: category,
                  color:
                    index === 0
                      ? "text-[#56CDAD]"
                      : index === 1
                      ? "text-[#FFB836]"
                      : "text-[#4640DE]",
                  background: index === 0 ? "bg-[#e0f5ef]" : undefined,
                  border:
                    index === 1
                      ? "border border-[#FFB836]"
                      : index === 2
                      ? "border border-[#4640DE]"
                      : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListCard;
