import { useState, useEffect } from "react";
import UploadForm from "./UploadForm";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Contribute = () => {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [allData, setAllData] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading modal
  console.log("user email: ", user?.email, "user name: ", user?.displayName);

  useEffect(() => {
    // Fetch all data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/resource-title-info"
        );
        const data = await response.json();
        setAllData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update university options
    const universityOptions = [
      ...new Set(allData.map((item) => item.varsityName)),
    ];
    setUniversities(universityOptions);
  }, [allData]);

  useEffect(() => {
    // Update department options based on the selected university
    const departmentOptions = [
      ...new Set(
        allData
          .filter((item) => item.varsityName === selectedUniversity)
          .map((item) => item.departmentName)
      ),
    ];
    setDepartments(departmentOptions);
    setSelectedDepartment("");
    setSelectedCourse("");
  }, [selectedUniversity, allData]);

  useEffect(() => {
    // Update course options based on the selected university and department
    const courseOptions = [
      ...new Set(
        allData
          .filter(
            (item) =>
              item.varsityName === selectedUniversity &&
              item.departmentName === selectedDepartment
          )
          .map((item) => item.courseTitle)
      ),
    ];
    setCourses(courseOptions);
    setSelectedCourse("");
  }, [selectedUniversity, selectedDepartment, allData]);
  if (user) {
    console.log("user: ", user, "image url: ", user.photoURL);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your file upload logic here
    let formData = new FormData();
    if (file?.data) {
      formData.append("file", file.data);
    }
    const form = e.target;
    const docType = form.docType.value;
    const universityName = form.university.value;
    const departmentName = form.department.value;
    const semester = form.semester.value;
    const courseName = form.course.value;
    const vedioLink = form.link.value;
    let photoURL;

    if (user.photoURL == null) {
      photoURL = "https://i.ibb.co/ypBKbw5/user-icon-1024x1024-dtzturco.png";
    } else {
      photoURL = user.photoURL;
    }

    // Show loading modal
    setLoading(true);

    if (file?.data) {
      fetch("http://localhost:5000/upload-file-to-google-drive", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("new response: ", data);
          // setLoading(false);
          if (data.id) {
            // Hide loading modal
            setLoading(false);

            const newDoc = {
              name: user.displayName,
              email: user.email,
              photoURL: photoURL || "",
              docType,
              universityName,
              semester,
              departmentName,
              courseName,
              fileId: data.id,
              fileName: data.name || "",
              webContentLink: data.webContentLink,
              webViewLink: data.webViewLink,
              thumbnailLink: data.thumbnailLink,
              createdTime: data.createdTime,
              link: vedioLink || "",
            };
            console.log("Full Data- line 98: ", newDoc);
            fetch("http://localhost:5000/upload/new-file", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newDoc),
            })
              .then((res) => res.json())
              .then((Data) => {
                if (Data.insertedId) {
                  // Show success alert
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your file uploaded successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  // Reset the form
                  e.target.reset();

                  // Reset the file state
                  setFile(null);
                }
              });
          }
        })
        .catch((error) => {
          // Hide loading modal on error
          setLoading(false);
          console.error("Error uploading file:", error);
        });
    }

    if (!file?.data) {
      console.log("from  not file part");
      const newDoc = {
        name: user.displayName,
        email: user.email,
        photoURL: photoURL || "",
        docType,
        universityName,
        semester,
        departmentName,
        courseName,
        link: vedioLink || "",
      };

      fetch("http://localhost:5000/upload/new-file", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newDoc),
      })
        .then((res) => res.json())
        .then((Data) => {
          if (Data.insertedId) {
            // Show success alert
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your file uploaded successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            // Reset the form
            e.target.reset();
            setLoading(false);
          }
        });
    }
  };

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(file);
  };

  return (
    <div className="w-full p-5">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"> Loading...</div> */}
          <span className="loading loading-spinner loading-lg"></span>
          <h1 className="text-center">Uploading...</h1>
        </div>
      )}
      <div className="container mx-auto my-10">
        <div className="flex-col flex-row">
          <div className="text-center text-left">
            <h1 className="text-3xl text-[#000000] font-bold">
              Upload your Contents
            </h1>
          </div>
          <div className="card w-full sm:w-8/12 mx-auto mt-5  min-w-[400px] shadow-2xl bg-purple-200">
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select Document type</span>
                  </label>
                  <select
                    required
                    name="docType"
                    className="input input-bordered"
                  >
                    <option value="">Select type</option>
                    <option value="question">Question Paper</option>
                    <option value="book">Book</option>
                    <option value="slides">Lecture Slides</option>
                    <option value="notes">Notes</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">University</span>
                  </label>
                  <select
                    required
                    name="university"
                    onChange={(e) => {
                      setSelectedUniversity(e.target.value);
                      setSelectedDepartment("");
                      setSelectedCourse("");
                    }}
                    value={selectedUniversity}
                    className="input input-bordered"
                  >
                    <option value="">Select University</option>
                    {universities.map((university) => (
                      <option key={university} value={university}>
                        {university}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:flex gap-2">
                  <div className="form-control sm:w-1/2">
                    <label className="label">
                      <span className="label-text">Department</span>
                    </label>
                    <select
                      required
                      name="department"
                      onChange={(e) => {
                        setSelectedDepartment(e.target.value);
                        setSelectedCourse("");
                      }}
                      value={selectedDepartment}
                      className="input input-bordered"
                    >
                      <option value="">Select Department</option>
                      {departments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control sm:w-1/2">
                    <label className="label">
                      <span className="label-text">Select Semester</span>
                    </label>
                    <select
                      required
                      name="semester"
                      className="input input-bordered"
                    >
                      <option value="">Select</option>
                      <option value="1st-semester">1st Semester</option>
                      <option value="2nd-semester">2nd Semester</option>
                      <option value="3rd-semester">3rd Semester</option>
                      <option value="4th-semester">4th Semester</option>
                      <option value="5th-semester">5th Semester</option>
                      <option value="6th-semester">6th Semester</option>
                      <option value="7th-semester">7th Semester</option>
                      <option value="8th-semester">8th Semester</option>
                      <option value="9th-semester">9th Semester</option>
                      <option value="10th-semester">10th Semester</option>
                      <option value="11th-semester">11th Semester</option>
                      <option value="12th-semester">12th Semester</option>
                    </select>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Course Title</span>
                  </label>
                  <select
                    required
                    name="course"
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    value={selectedCourse}
                    className="input input-bordered"
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control my-2 ps-2">
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className="input input-bordered" // Apply the same class as other text boxes
                  />
                </div>

                <div className="form-control my-2 ps-2">
                  <span className="inline-block mx-auto pb-2 px-5 bg-white rounded-lg mb-2 ">
                    OR
                  </span>
                  <input
                    type="url"
                    name="link"
                    placeholder="Video Solution YouTube Link"
                    className="input input-bordered" // Apply the same class as other text boxes
                  />
                </div>

                <div className="form-control">
                  <button
                    type="submit"
                    className="btn bg-[#2F5597] text-white hover:bg-blue-700"
                  >
                    Contribute
                  </button>
                </div>

                <div className="text-center mt-3">
                  If you get points then{" "}
                  <Link
                    to="/Register"
                    className="text-blue-500 hover:underline"
                  >
                    sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
