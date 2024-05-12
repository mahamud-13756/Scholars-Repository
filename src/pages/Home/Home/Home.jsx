import Banner from "../Banner/Banner";
import RecentBooks from "../RecentBooks/RecentBooks";
import RecentNotes from "../RecentNotes/RecentNotes";
import RecentQuestions from "../RecentQuestions/RecentQuestions";
import RecentSlides from "../RecentSlides/RecentSlides";
import Test from "../Test/Test";

const Home = () => {
    return (
        <div className='text-white'> {/* Add text-white class to change text color to white */}
            <Banner></Banner>
            {/* <Test></Test> */}
            <RecentQuestions></RecentQuestions>
            <RecentBooks></RecentBooks>
            <RecentSlides></RecentSlides>
            <RecentNotes></RecentNotes>
        </div>
    );
};

export default Home;
