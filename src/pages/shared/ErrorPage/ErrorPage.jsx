
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img className='w-[400px] md:w-auto rounded-full' src="https://i.ibb.co/PW9cyq8/funny-404-error-page-design.gif" alt="" />
            <h1 className="md:text-5xl text-2xl font-bold mb-2">Oops! Page not found.</h1>
            <p className="text-gray-500 text-center mb-8">
                We're sorry, but the page you requested could not be found.
            </p>
            <Link to="/" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Go back to homepage
            </Link>
        </div>
    );
};

export default ErrorPage;