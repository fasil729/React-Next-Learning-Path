import React, { FC } from "react";

const AttributeList: FC<{ data: DataItem[] }> = ({data}) => {
  return (
    <ul className="list-disc flex flex-col gap-2">
      {data.map((item: DataItem, index: number) => (
        <li key={index} className="flex items-center font-epilogue font-normal text-base leading-[25.6px] text-[#25324B]">
          <span className="mr-2">{item.icon}</span>
          {item.text}
        </li>
      ))}
    </ul>
  );
};

export default AttributeList;
