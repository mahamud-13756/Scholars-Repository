import { FaEye } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";

const DataCard = ({ Data }) => {
  const {
    _id,
    name,
    webContentLink,
    webViewLink,
    thumbnailLink,
    rating,
    subCategory,
    fileName,
    photoURL,
    fileId,
    link,
  } = Data;

  const handleDownload = (downloadLink) => {
    // Trigger the download using the webContentLink
    window.open(downloadLink, "_blank");
  };

  const handlePreview = (previewLink) => {
    // Trigger the download using the webContentLink
    window.open(previewLink, "_blank");
  };
  return (
    <div className="card w-full glass m-2">
      <div className="flex items-center gap-2 p-3">
        <img src={photoURL} alt="" className="w-[50px]" />
        <div>
          <span>{name}</span> <br />
          <span className="text-sm font-bold">{name}</span>
        </div>
      </div>
      <figure>
        <img
          className="h-64"
          src={`https://drive.google.com/thumbnail?id=${fileId}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold text-slate-800 text-sm ">
          {fileName}
        </h2>
        {/* <p>{webContentLink}</p> */}

        {link ? (
          <div className="w-full mt-5 flex">
            <button
              className="btn hover:bg-teal-700 text-white lg:text-lg bg-[#2F5597] md:w-1/2"
              onClick={() => handlePreview(link)}
            >
              <FaEye /> Preview
            </button>
          </div>
        ) : (
          <div className="w-full mt-5 flex">
            <button
              className="btn hover:bg-teal-700 text-white lg:text-lg bg-[#2F5597] md:w-1/2"
              onClick={() => handleDownload(webContentLink)}
            >
              <FaCloudDownloadAlt /> Download
            </button>
            <button
              className="btn hover:bg-teal-700 text-white lg:text-lg bg-[#2F5597] md:w-1/2"
              onClick={() => handlePreview(webViewLink)}
            >
              <FaEye /> Preview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCard;
