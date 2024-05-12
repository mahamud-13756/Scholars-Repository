import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import { FaCloudDownloadAlt } from "react-icons/fa";

const AllFiles = () => {
    const { user } = useAuth();
    // const {deleteAnUser} = useAuth();

    // const { data: users = [], refetch } = useQuery(['users'], async () => {
    //     const res = await fetch('http://localhost:5000/users')
    //     if(!res.ok){
    //         throw new Error('Data fetch response was not ok !')
    //     }
    //     return res.json();
    // })
    console.log('user:', user);


    const { isPending, isError, error, refetch, data: Data } = useQuery({
        queryKey: ['Data'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/admin/all-contribution`);
            return res.json();
        }
    })



    const handleDownload = (downloadLink) => {
        // Trigger the download using the webContentLink
        window.open(downloadLink, '_blank');
      };



    return (
        <div className='container mx-auto search-page py-10'>
            <Helmet>
                <title>scholars Repository || All Files</title>
            </Helmet>
            <h1>Total : {Data?.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr className='text-md md:text-xl text-center'>
                            <td>#</td>
                            <td>File Name</td>
                            <td>Uploader Name</td>
                            <td>Uploader Email</td>
                            <td>Upload Time</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            Data?.map((data, index) =>
                                <tr className="my-3 text-center text-2xl md:text-3xl"
                                    key={data._id}
                                >
                                    <th className="text-md md:text-lg"> {index + 1} </th>
                                    <td className="text-md md:text-lg">{data.fileName}</td>
                                    <td className="text-md md:text-lg">{data.name}</td>
                                    <td className="text-md md:text-lg">{data.email}</td>
                                    <td className="text-md md:text-lg">{data.createdTime}</td>

                                    <td className="">
                                    <button className="btn hover:bg-teal-700 text-white  bg-[#2F5597]" onClick={()=>handleDownload(data.webContentLink)}><FaCloudDownloadAlt className='inline'/><span>Download</span></button> </td>
                                

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllFiles;