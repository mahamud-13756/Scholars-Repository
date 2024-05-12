import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { FaAward } from "react-icons/fa6";

const Winners = () => {
  const { user } = useAuth();
  let top10LeaderBoardData;

  const { isPending, isError, error, refetch, data: leaderBoardData } = useQuery({
    queryKey: ['Leaderboard'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/leader-board/all-contributor');
      return res.json();
    }
  });

  if (leaderBoardData) {
    const sortedLeaderBoardData = [...leaderBoardData].sort((a, b) => b.points - a.points);
    top10LeaderBoardData = sortedLeaderBoardData.slice(0, 10);
  }

  return (
    <div className='w-full bg-gray-200 p-10'>
      <div className='container mx-auto p-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {top10LeaderBoardData?.map((data, index) => (
            <div key={index} className='bg-white rounded-lg shadow-md p-6'>
              <div className='flex items-center mb-4'>
                <div className='rounded-full bg-blue-500 text-white flex items-center justify-center h-12 w-12'>
                  <span className='text-xl font-bold'>{index + 1}</span>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-semibold'>{data.name}</h3>
                  <p className='text-sm text-gray-500'>Points: {data.points}</p>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <img src={data.photoURL} alt='' className='h-10 w-10 rounded-full' />
                  <p className='ml-2 text-sm'>{data.email}</p>
                </div>
                <div>
                  <FaAward className='text-green-500 text-3xl ml-2' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Winners;
