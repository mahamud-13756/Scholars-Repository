import Banner from "../Banner/Banner";
import RecentBooks from "../RecentBooks/RecentBooks";
import RecentNotes from "../RecentNotes/RecentNotes";
import RecentQuestions from "../RecentQuestions/RecentQuestions";
import RecentSlides from "../RecentSlides/RecentSlides";

const Home = () => {
    return (
        <div className='bg-gradient-to-b from-green-400 to-blue-500 text-white'>
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
