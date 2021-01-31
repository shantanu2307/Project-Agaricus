import React from "react";
import logo from "../assets/3.png"
export default function Footer() {

  return (
    <div class="footer">
            <div class="footer__logo-box">
                <img src={logo} alt="Full logo" class="footer__logo" />
            </div>
            <div class="row">
                <div class="col-1-of-2">
                    <div class="footer__navigation">
                        <ul class="footer__list">
                            <li class="footer_item">Company</li>
                            <li class="footer_item">Contact us</li>
                            <li class="footer_item">Privacy policy</li>
                            <li class="footer_item">Terms</li>
                        </ul>
                    </div>
                </div>
                <div class="col-1-of-2">
                    <p class="footer__copyright">
                        Built by Agaricus Systems Pvt. Ltd
                        Copyright &copy; by AGARICUS
                    </p>
                </div>
            </div>
        </div>
  );
}

        