import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter"></div>

      <div className="midFooter">
        <h1>Shopper.</h1>
        <small>MERN Ecommerce APP</small>
        <p>Built by &copy; Prakhar Nagore</p>
      </div>

      <div className="rightFooter"></div>
    </footer>
  );
};

export default Footer;
