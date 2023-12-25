import React from "react";
import style from "./Footer.module.css";

function Footer() {
  return (
    <>
      <div className={style.footer}>
        <div className={style.footup}>
          <div className={style.footbox}>
            <ul className={style.foot_ul}>
              <li>
                <h2>Get to Know Us</h2>
              </li>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>All Contributors</li>
              <li>Press Releases</li>
            </ul>
          </div>
          <div className={style.footbox}>
            <ul className={style.foot_ul}>
              <li>
                <h2>Help</h2>
              </li>
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
              <li>Report Infringement</li>
            </ul>
          </div>
          <div className={style.footbox}>
            <ul className={style.foot_ul}>
              <li>
                <h2>Consumer Policy</h2>
              </li>
              <li>Cancellation & Returns</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
              <li>Grievance Redressal</li>
            </ul>
          </div>
          <div className={style.footbox}>
            <ul className={style.foot_ul}>
              <li>
                <h2>Social</h2>
              </li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className={style.footbot}>
          <p>&copy; 2007-2023 soundharbor.in</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
