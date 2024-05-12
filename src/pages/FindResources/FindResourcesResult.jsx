import{ useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DataCard from './DataCard';

const FindResourcesResult = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [data, setData] = useState([]);
    const [searchParams] = useSearchParams();

    const [categorizedData, setCategorizedData] = useState([]);

    // Access query parameters
    const universityName = searchParams.get('universityName');
    const departmentName = searchParams.get('departmentName');
    const semester = searchParams.get('semester');
    const courseName = searchParams.get('courseName');
    console.log("university name: ", universityName, " department name: ", departmentName, " semester : ", semester, " course name: ", courseName);



    useEffect(() => {
      // Fetch data from MongoDB using the query parameters
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/get-resource-data?universityName=${encodeURIComponent(universityName)}&departmentName=${encodeURIComponent(departmentName)}&semester=${encodeURIComponent(semester)}&courseName=${encodeURIComponent(courseName)}`);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [universityName, departmentName, semester, courseName]);

    if(data){
        console.log("data: ", data);
    }


    useEffect(() => {
        if (tabIndex == 0) {
            const newToys = data.filter(Data => Data.docType === "question");
            setCategorizedData(newToys);
        }
        else if (tabIndex == 1) {
            const newToys = data.filter(Data => Data.docType === "book");
            setCategorizedData(newToys);
        }
        else if (tabIndex == 2) {
            const newToys = data.filter(Data => Data.docType === "slides");
            setCategorizedData(newToys);
        }
        else if (tabIndex == 3) {
            const newToys = data.filter(Data => Data.docType === "notes");
            setCategorizedData(newToys);
        }
    }, [tabIndex, data])

    return (
        <div>
             <div className="text-center">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Questions</Tab>
                        <Tab>Books</Tab>
                        <Tab>Slides</Tab>
                        <Tab>Notes</Tab>
                    </TabList>

                    <TabPanel >
                        <div className=" text-start grid grid-cols-1 md:grid-cols-4 gap-4 py-5 px-6">
                            {
                                categorizedData.map(Data => <DataCard key={Data._id} Data={Data}></DataCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="text-start grid grid-cols-1 md:grid-cols-4 gap-4 py-5 px-6">
                            {
                                categorizedData.map(Data => <DataCard key={Data._id} Data={Data}></DataCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="text-start grid grid-cols-1 md:grid-cols-4 gap-4 py-5 px-6">
                            {
                                categorizedData.map(Data => <DataCard key={Data._id} Data={Data}></DataCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="text-start grid grid-cols-1 md:grid-cols-4 gap-4 py-5 px-6">
                            {
                                categorizedData.map(Data => <DataCard key={Data._id} Data={Data}></DataCard>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default FindResourcesResult;