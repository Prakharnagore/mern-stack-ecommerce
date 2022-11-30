import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:prakharrnagore000@gmail.com">
        <Button>
          Contact:<b>prakharnagore000@gmail.com</b>
        </Button>
      </a>
    </div>
  );
};

export default Contact;
