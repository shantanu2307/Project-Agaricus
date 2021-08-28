import React from "react";
import logo from "../assets/3.png"
import { Link } from "react-router-dom";
import './Footer.css'
export default function Footer() {

  return (
    <div className="footer">
        <footer class="footer-distributed">

            <div class="footer-right">

                <Link to="/"> <img src={logo} alt="Company Logo" /></Link>

            </div>

            <div class="footer-left">

                <p class="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/">About</Link>
                    <Link to="/signup">SignUp</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/">Contact</Link>
                </p>

                <p>Agaricus &copy; 2021</p>
            </div>

            </footer>
        </div>
  );
}

        