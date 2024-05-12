
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import { FaCloudDownloadAlt, FaEye } from "react-icons/fa";

const RecentNotes = () => {

    const { isPending, isError, error, refetch, data: recentNotesData } = useQuery({
        queryKey: ['recentNotes'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/recent-notes');
            return res.json();
        }
    });

    if(recentNotesData){
        console.log("consultant:", recentNotesData);
    }

    const handleDownload = (downloadLink) => {
        // Trigger the download using the webContentLink
        window.open(downloadLink, '_blank');
      };

    const handlePreview = (previewLink) => {
        // Trigger the download using the webContentLink
        window.open(previewLink, '_blank');
      };









// Function to format the time difference
const formatTimeDifference = (createdTime) => {
    const now = new Date();
    const uploadedDate = new Date(createdTime);
    const timeDifference = now - uploadedDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (days === 1) {
      return 'yesterday';
    } else if (days <= 10) {
      return `${days} days ago`;
    } else if (days <= 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(days / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  };
  
  











    return (
        <div className="w-full my-10">
            <SectionTitle heading={"Recently Shared Notes"}></SectionTitle>

            <div className="w-full ">
                <div className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-1 px-5 md:px-0">
                    {
                        recentNotesData?.map((data, index) =>
                            <div className="card border flex-row bg-base-100 shadow-xl"
                                key={index}>
                                <div className="card w-full glass m-2">
                                    <div className="flex items-center gap-2 p-3">
                                        <img src={data.photoURL} alt="" className="w-[50px]" />
                                        <div>
                                            <span>{data.name}</span> <br />
                                            <span className="text-sm font-bold">{formatTimeDifference(data.createdTime)}</span>
                                        </div>
                                    </div>
                                    <figure><img className='h-64' src={`https://drive.google.com/thumbnail?id=${data?.fileId}`} alt="thumbnail not available" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title font-bold text-slate-800 text-sm ">{data.fileName}</h2>
                                        {/* <p>{webContentLink}</p> */}


                                        <div className="w-full mt-5 flex">

                                            <button className="btn hover:bg-teal-700 text-white lg:text-lg bg-[#2F5597] md:w-1/2" onClick={() => handleDownload(data.webContentLink)}><FaCloudDownloadAlt /> Download</button>
                                            <button className="btn hover:bg-teal-700 text-white lg:text-lg bg-[#2F5597] md:w-1/2" onClick={() => handlePreview(data.webViewLink)}><FaEye /> Preview</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    );
};

export default RecentNotes;