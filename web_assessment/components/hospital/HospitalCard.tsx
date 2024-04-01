"use client";
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface HospitalCardProps {
    hospital: HospitalData;
}

const HospitalCard: React.FC<HospitalCardProps> = ({
    hospital: { _id, photo, address, institutionName, phoneNumbers, emails, status },
}) => {
    return (
        

        <Link href={`/hospital/${_id}`} className="flex bg-customBlue bg-opacity-5 flex-col md:flex-row items-center border border-gray-200 rounded-lg shadow w-[80%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-2"> 
              <div className="w-full md:w-2/5 lg:w-3/10 h-52 relative overflow-hidden p-2 m-1">
                <Image
                  src={photo}
                  alt="profile"
                  //   tFit="cover"
                  fill
                  className="object-cover rounded-2xl"
                />
                </div>
                
              
              
        
              <div className="flex flex-col justify-between leading-normal w-full gap-6">
                <div className="flex justify-between">
                  <div className="flex flex-col ml-10">
                    <p className="font-norma dark:text-gray-400 text-primary-10">
                      {address.summary}
                    </p>
        
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {institutionName}
                    </h5>
        
                    <div className="flex gap-2 font-normal text-gray-700 dark:text-gray-400">
                      <Image src={"/location.svg"} width={20} height={20} alt="logo" />3
                      Kilometers Away
                    </div>
                  </div>
        
                  <div
                    className={`rounded-full py-1 px-2 text-xs font-semibold ${
                        status === 'open' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                >
                    {status === 'open' ? 'Open' : 'Closed'}
                </div>
                </div>
        
                <div className="flex mt-3 gap-5 ml-10 items-start">
                  <div className="flex items-start gap-2">
                    <div className="flex">
                      <Image src={"/phone.svg"} width={20} height={10} alt="logo" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {phoneNumbers[0]}
                      </p>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {phoneNumbers[1]}
                      </p>
                    </div>
                  </div>
        
                  <div className="flex gap-2 justify-center text-center">
                    <Image src={"/mail.svg"} width={20} height={10} alt="logo" />
                    {emails[0]}
                  </div>
                </div>
              </div>
              
            </Link>
        
        
    );
};

export default HospitalCard;
