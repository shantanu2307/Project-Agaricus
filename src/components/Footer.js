import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from './NavBar'

export default function Footer() {

  return (
    <>
    <footer class="footer">
            <div class="footer__logo-box">
                <img src="../assets/logo-white.png" alt="Full logo" class="footer__logo">
            </div>
            <div class="row">
                <div class="col-1-of-2">
                    <div class="footer__navigation">
                        <ul class="footer__list">
                            <li class="footer_item"><a href="#" class="footer_link">Company</a></li>
                            <li class="footer_item"><a href="#" class="footer_link">Contact us</a></li>
                            <li class="footer_item"><a href="#" class="footer_link">Carrers</a></li>
                            <li class="footer_item"><a href="#" class="footer_link">Privacy policy</a></li>
                            <li class="footer_item"><a href="#" class="footer_link">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-1-of-2">
                    <p class="footer__copyright">
                        Built by <a href="#" class="footer__link">Nucleus Systems Pvt. Ltd.</a>
                        <a href="#" class="footer__link"></a>.
                        Copyright &copy; by NUCLEUS
                    </p>
                </div>
            </div>
        </footer>
    </>
  );
}

        