import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-full flex">
            <footer className="footer p-10 bg-blue-900 text-white justify-start md:justify-around"> {/* Change bg-base-200 to bg-blue-900 and text color to white */}
                <aside>
                    <Link to={'/'}><img src="\src\assets\logon.png" alt="" className="object-cover w-[100px]" /></Link>
                    <p>scholars Repository<br />A Hub for Knowledge Exchange</p>
                </aside>
                <nav>
                    <header className="footer-title">Quick Links</header>
                    <a className="link link-hover text-white">Find Resources</a> {/* Change text color to white */}
                    <a className="link link-hover text-white">Upload</a> {/* Change text color to white */}
                    <a className="link link-hover text-white">Point</a> {/* Change text color to white */}
                    <a className="link link-hover text-white">Highest Contributor</a> {/* Change text color to white */}
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover text-white">About us</a> {/* Change text color to white */}
                    <a className="link link-hover text-white">Contact Us</a> {/* Change text color to white */}
                </nav>
                <nav>
                    <header className="footer-title">Social Media</header>
                    <a className="link link-hover text-white">GitHub</a> {/* Change text color to white */}
                    <a className="link link-hover text-white">YouTube</a> {/* Change text color to white */}
                    <a className="link link-hover text-white">LinkedIn</a> {/* Change text color to white */}
                    <a className="link link-hover text-white">Facebook</a> {/* Change text color to white */}
                </nav>
                <nav>
                    <header className="footer-title">Important</header>
                    <a className="link link-hover text-white">Terms of use</a> {/* Change text color to white */}
                    <a className="link link-hover text-white">Privacy policy</a> {/* Change text color to white */}
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
