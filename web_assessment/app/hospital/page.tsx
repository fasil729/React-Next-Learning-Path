"use client";
import React from 'react';
import TopBar from '../../components/hospital/TopBar';
import SearchBar from '../../components/hospital/SearchBar';
import { useGetHospitalListQuery } from '../../lib/features/api/apiSlice';
import HospitalCard from '../../components/hospital/HospitalCard';
import Footer from '../../components/hospital/Footer';
import { toast } from "react-toastify";
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const HospitalListPage: React.FC = () => {
  const { data, error, isLoading } = useGetHospitalListQuery();
  console.log("data", data, isLoading, error);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log("here in error", error);
    console.log(error);
    toast.error('An error occurred while fetching hospital list.');
  
  }

  return (
    <div className='flex flex-col gap-10'>
      <TopBar />
      <SearchBar />
      <div className='flex flex-col items-center justify-center gap-16' >
        {data?.data.map((hospital) => (
          <HospitalCard  hospital={hospital} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HospitalListPage;