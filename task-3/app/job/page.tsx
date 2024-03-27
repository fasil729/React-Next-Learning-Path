"use client";
import React from "react";
import Link from "next/link";
import { useGetOpportunitiesQuery } from "@/lib/features/api/apiSlice";
import JobListCard from "@/components/JobListCard";
import LoadingSpinner from "@/components/LoadingSpinner";


export default function Home() {
  const { isUninitialized, isLoading, isError, isSuccess, data: opportunities } = useGetOpportunitiesQuery();
  const opportunity = opportunities?.data.slice(2);

  if (isUninitialized || isLoading) {
    // Show a loading spinner while data is being fetched
    return <div className="text-center">
      <LoadingSpinner />
      </div>
  }

  if (isError) {
    // Show an error message if there was an error fetching the data
    return <div>Error loading data</div>;
  }

  return (
    <main className="max-w-screen-xl mx-auto py-20 pr-[20%] pl-[5%]">
      <div className="flex flex-col gap-10 justify-between items-center ">
        <div className="flex justify-between w-[100%] ">
          <div>
            <h1 className="text-3xl font-bold">Opportunities</h1>
            <p className="text-gray-500">Showing {opportunities.count} jobs</p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1">
              <span>Sort by Most Relevant</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.293 5.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 111.414-1.414L10 10.586l5.293-5.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {isSuccess && opportunity && opportunity.map(
          (job) => (
            <Link key={job.id} href={`/job/${job.id}`}>
              <JobListCard key={job.id} props={job} />
            </Link>
          )
        )}
      </div>
    </main>
  );
}
