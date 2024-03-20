import React, { FC } from "react";

interface LabelProps {
  text: string;
  color: string;
  background?: string;
  border?: string;
}

const Label: FC<{ labelprops: LabelProps }> = ({ labelprops }) => {
  const { text, color, background = "", border = "" } = labelprops;
  return (
    <div className={`${color} ${border} ${background} h-[31px] w-[76px] rounded-[80px] px-[10px] py-[6px] gap-[8px] flex justify-center items-center`}>
      <p className={`font-epilogue font-semibold text-[12px]`}>{text}</p>
    </div>
  );
};

export default Label;
