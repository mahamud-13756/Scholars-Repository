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
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
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
    const universityOptions = [
      ...new Set(allData.map((item) => item.varsityName)),
    ];
    setUniversities(universityOptions);
  }, [allData]);

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    setLoading(true);

    if (file?.data) {
      fetch("http://localhost:5000/upload-file-to-google-drive", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
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
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your file uploaded successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  e.target.reset();
                  setFile(null);
                }
              });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error uploading file:", error);
        });
    }

    if (!file?.data) {
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
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your file uploaded successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
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
    <div className="hero min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl text-center text-white font-bold mb-6">Upload your Contents</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="docType">Select Document type</label>
              <select required name="docType" className="input input-bordered">
                <option value="">Select type</option>
                <option value="question">Question Paper</option>
                <option value="book">Book</option>
                <option value="slides">Lecture Slides</option>
                <option value="notes">Notes</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="university">University</label>
              <select required name="university" onChange={(e) => {
                  setSelectedUniversity(e.target.value);
                  setSelectedDepartment("");
                  setSelectedCourse("");
                }} value={selectedUniversity} className="input input-bordered">
                <option value="">Select University</option>
                {universities.map((university) => (
                  <option key={university} value={university}>{university}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">Department</label>
                <select required name="department" onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setSelectedCourse("");
                  }} value={selectedDepartment} className="input input-bordered">
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">Select Semester</label>
                <select required name="semester" className="input input-bordered">
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">Course Title</label>
              <select required name="course" onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse} className="input input-bordered">
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">Upload File</label>
              <input type="file" name="file" onChange={handleFileChange} className="input input-bordered"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">Or</label>
              <input type="url" name="link" placeholder="Video Solution YouTube Link" className="input input-bordered"/>
            </div>
            <div className="mb-4">
              <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">Contribute</button>
            </div>
          </form>
          <div className="text-center mt-3">
            If you get points then{" "}
            <Link to="/Register" className="text-blue-500 hover:underline">sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
