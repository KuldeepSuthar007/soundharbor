import React from "react";
import style from "./Logo.module.css";
import musiclogo from "../../assets/soundharbor-in-12-21-2023 (1).png";
function Logo() {
  return (
    <div className={style.top}>
      <img className={style.logo} src={musiclogo} alt="" />
      {/* <p className={style.logoname}>SoundHarbor</p> */}
    </div>
  );
}

export default Logo;
