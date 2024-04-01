"use client";
import React, { useState } from 'react';
import TopBar from '../../components/hospital/TopBar';
import SearchBar from '../../components/hospital/SearchBar';
import { useGetHospitalListQuery, useSearchHospitalsQuery } from '../../lib/features/api/apiSlice';
import HospitalCard from '../../components/hospital/HospitalCard';
import Footer from '../../components/hospital/Footer';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const HospitalListPage: React.FC = () => {
  const { data: hospitalList, error: hospitalListError, isLoading: hospitalListLoading } = useGetHospitalListQuery();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: searchResults, error: searchError, isLoading: searchLoading } = useSearchHospitalsQuery(
    searchQuery
  );

  console.log('hospitalList', hospitalList, hospitalListLoading, hospitalListError);
  console.log('searchResults', searchResults, searchLoading, searchError);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (hospitalListLoading || searchLoading) {
    return <LoadingSpinner />;
  }

  if (hospitalListError || searchError) {
    console.log('here in error', hospitalListError || searchError);
    toast.error('An error occurred while fetching hospital list.');
  }

  return (
    <div className='flex flex-col gap-10'>
      <TopBar />
      <SearchBar onSearch={handleSearch} />
      <div className='flex flex-col items-center justify-center gap-16'>
        {(searchQuery ? searchResults?.data : hospitalList?.data)?.map((hospital) => (
          <HospitalCard key={hospital._id} hospital={hospital} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HospitalListPage;
