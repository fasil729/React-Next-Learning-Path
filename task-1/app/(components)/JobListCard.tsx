import React, { FC } from "react";
import Label from "./Label";

const JobListCard: FC<{ props: JoblistProps }> = ({ props }) => {
  const greenColor = "#56CDAD";
  const yellowColor = "#FFB836";
  const purpleColor = "#4640DE";

  return (
    <div className="rounded-3xl border-2 p-6 w-[919px] bg-white">
      <div className="flex gap-6">
        <img
          className="w-[66px] h-[59px]"
          src={props.imageUrl}
          alt="company avatar"
        />

        <div className="flex flex-col gap-2">
          <h1 className="font-epilogue font-semibold text-xl">{props.title}</h1>

          <div className="flex gap-2 items-center">
            <p className="font-epilogue font-normal text-[#7C8493]">
              {props.subTitle}
            </p>

            <div className="w-[4px] h-[4px] bg-[#7C8493] rounded-full"></div>

            <p className="font-epilogue font-normal text-[#7C8493]">
              {props.address}
            </p>
          </div>

          <p className="w-[744px] h-[112px] font-epilogue text-[16px] leading-[25.6px] text-[#25324B] font-[400]">
            {props.description}
          </p>

          <div className="flex gap-2 items-center">
            <Label
              labelprops={{
                text: props.relatedTopics[0],
                color: "text-[#56CDAD]",
                background: `bg-[#e0f5ef]`
              }}
            />
            <div className="w-[1px] h-[31px] bg-[#D6DDEB] mx-2"></div>
            <Label
              labelprops={{
                text: props.relatedTopics[1],
                color: "text-[#FFB836]",
                border: "border border-[#FFB836]"
              }}
            />
            <Label
              labelprops={{
                text: props.relatedTopics[2],
                color: `text-[#4640DE]`,
                border: `border border-[#4640DE]`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListCard;
