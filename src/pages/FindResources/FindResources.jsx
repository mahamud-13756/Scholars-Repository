import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const FindResources = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    // Fetch all data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/resource-title-info');
        const data = await response.json();
        setAllData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update university options
    const universityOptions = [...new Set(allData.map((item) => item.varsityName))];
    setUniversities(universityOptions);
  }, [allData]);

  useEffect(() => {
    // Update department options based on the selected university
    const departmentOptions = [
      ...new Set(allData.filter((item) => item.varsityName === selectedUniversity).map((item) => item.departmentName)),
    ];
    setDepartments(departmentOptions);
    setSelectedDepartment('');
    setSelectedCourse('');
  }, [selectedUniversity, allData]);

  useEffect(() => {
    // Update course options based on the selected university and department
    const courseOptions = [
      ...new Set(
        allData
          .filter(
            (item) => item.varsityName === selectedUniversity && item.departmentName === selectedDepartment
          )
          .map((item) => item.courseTitle)
      ),
    ];
    setCourses(courseOptions);
    setSelectedCourse('');
  }, [selectedUniversity, selectedDepartment, allData]);






  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const universityName = encodeURIComponent(form.university.value);
    const departmentName = encodeURIComponent(form.department.value);
    const semester = encodeURIComponent(form.semester.value);
    const courseName = encodeURIComponent(form.course.value);

    navigate(`/find-resources-result?universityName=${universityName}&departmentName=${departmentName}&semester=${semester}&courseName=${courseName}`);

  };


  return (
    <div className="w-full p-5">
      
      <div className="container mx-auto my-10">
        <div className="flex-col flex-row">
          <div className="text-center text-left">
            <h1 className="text-3xl text-[#000000] font-bold">Find resources</h1>
          </div>
          <div className="card w-full sm:w-8/12 mx-auto mt-5  min-w-[400px] shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">University</span>
                  </label>
                  <select
                    required
                    name="university"
                    onChange={(e) => {
                      setSelectedUniversity(e.target.value);
                      setSelectedDepartment('');
                      setSelectedCourse('');
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
                        setSelectedCourse('');
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
                <div className="form-control">
                  <button type="submit" className="btn bg-[#2F5597] text-white hover:bg-blue-700">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindResources;
