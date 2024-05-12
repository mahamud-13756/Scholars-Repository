import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const LeaderBoard = () => {
    const { user } = useAuth();
    const [myPosition, setMyPosition] = useState(0);
    const [myData, setMyData] = useState([]);
    let sortedLeaderBoardData;
    const { isPending, isError, error, refetch, data: leaderBoardData } = useQuery({
        queryKey: ['Leaderboard'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/leader-board/all-contributor');
            return res.json();
        }
    });

    const [currentUserPosition, setCurrentUserPosition] = useState(null);

    if (leaderBoardData) {
        sortedLeaderBoardData = [...leaderBoardData].sort((a, b) => b.points - a.points);
    }

    useEffect(() => {
        if (sortedLeaderBoardData) {
            const currentUserEmail = user?.email;
            const userPosition = sortedLeaderBoardData.findIndex(user => user.email === currentUserEmail);

            // Adding 1 to make it human-readable (1-indexed instead of 0-indexed)
            setCurrentUserPosition(userPosition + 1);

            // Filter the leaderBoardData to get the current user's data
            const currentUserData = sortedLeaderBoardData.find(user => user.email === currentUserEmail);
            setMyData(currentUserData);
        }
    }, [leaderBoardData, user, sortedLeaderBoardData]);

    // Fetch the most recent 50 files
    const { isPending: isRecentFilesPending, isError: isRecentFilesError, error: recentFilesError, data: recentFilesData } = useQuery({
        queryKey: ['RecentFiles'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/admin/all-contribution');
            return res.json();
        }
    });

    return (
        <div className='w-full bg-slate-200 p-10'>
            <div className='flex flex-col lg:flex-row gap-5'>
                <div className='lg:w-2/3 min-h-[500px] border border-black rounded-lg p-5'>
                    <div className='border border-success mb-10 p-10 bg-green-400 rounded-lg'>
                        <div className='flex items-center w-full rounded bg-gradient-to-r from-green-400 to-blue-500'>
                            <div className='w-1/6 text-center text-2xl'>{currentUserPosition}</div>
                            <div className='w-4/6 flex items-center gap-2'>
                                <img src={myData?.photoURL} alt='' className='h-[50px] w-[50px] rounded-full' /><p className='text-2xl font-bold'>{myData?.name}</p>
                            </div>
                            <div className='w-1/6 text-center text-3xl'>{myData?.points}<FaStar className='inline text-5xl text-yellow-500' /></div>
                        </div>
                    </div>
                    <div className='mt-10 border border-success mb-10 p-10 bg-green-400 rounded-lg'>
                        {sortedLeaderBoardData?.map((data, index) => (
                            <div key={index} className='flex items-center w-full my-2 rounded bg-gradient-to-r from-green-400 to-blue-500'>
                                <div className='w-1/6 text-center text-2xl'>{index + 1}</div>
                                <div className='w-4/6 border flex items-center gap-3'>
                                    <img src={data.photoURL} alt='' className='h-[50px] w-[50px] rounded-full' />
                                    <p className='text-2xl font-bold'>{data.name}</p>
                                </div>
                                <div className='w-1/6 border text-center text-3xl'>{data.points} <FaStar className='inline text-5xl text-yellow-500' /></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='lg:w-1/3 min-h-[500px] border border-black rounded-lg p-5'>
    <p className='text-xl px-3 text-center font-bold'>Recent Contributions</p>
    {recentFilesData?.slice(0, 50).reverse().map((file, index) => (
        <div key={index} className='bg-gradient-to-br from-green-400 to-blue-500 p-2 m-2 rounded-lg'>
            <p className='font-bold'>{file.name}</p>
            <p>Shared a <span className='bg-yellow-500 px-2 pb-1 rounded'>{file.docType}</span></p>
            <p className='mt-2'><span className='bg-slate-200 pb-1 px-2 rounded'>{file.docType} name:</span> {file.fileName}</p>
            {/* Add other relevant information */}
        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;
