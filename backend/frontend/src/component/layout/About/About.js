import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/prakharnag0re";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEBANEBAVEA0NDQ0NDQ8QEA4SIB0iIiAdHx8kKDQsJCYxJx8fJDEkMSsuMC8wIys1ODMuNykuMDcBCgoKDQ0NFg8OFTcZFhkrLSs3LjcrLDE3KzgrLTM4NysrNzctLS0rNzcrMistLSsrKzc3LS0rLSstKysrKysrLf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAgEDBQYHBAj/xAA6EAACAQMBBQYEBAUDBQAAAAAAAQIDBBEhBQYSMUEHIlFhcYETkaGxMsHR4RQzYnLwQsLxCCMkY4L/xAAZAQEBAAMBAAAAAAAAAAAAAAAAAQIDBAX/xAAlEQEAAgIBBAEEAwAAAAAAAAAAAQIDESEEEjFBMiJCYXETUYH/2gAMAwEAAhEDEQA/AO2pFcAqYzCqArgrgaEQVKlRHAJYBNKoanvhv7abO7km6tfDxQpNZj/c+hje07fx7Pire3w7qcXLieGrePR46t9D5+vrydWcp1JSnKTbc5tuUmEbdvD2m7Qu5twqztqa5U7acofOS1ZiLXe+/py4oXtynnP8+ePka+5dNPqQbXT6DQ61u72x3NNxje04XENF8WmlTrer6P5I61u5vLa7Qp8dtUUnhOdKWFVp+q/PkfJkZmW2BtutaV6dehOUZxfR6S8n4oD62Bht1NvU7+2p3ENG1ipDKzCXVGZAFCpQoFCoCqAqAKFUioCAAIIgqMFAFQQUKgFAhUmopybSSTcm+SRM0ftc28rTZ86a/m3HFbw1xiGO+/lp7og4dvxtuN5fXNzTTUJT4afE220lhP3xyNep03J6LLJc/mbVunsiNSLnJZ1MMl4pXbZix99tNdp7Mk+j5Z0TZmdmbsSmlKSfPk9DfrTY60xFJeCRkadjw9MHFbqLT4d1enpHlodXc6LWmV6ZNZ2zsapayTeXBtYl4PwZ2V27xyMZtfZir0atNpZcJKLfSXQYs94tz4MuCkxxHK92JX7VGuuilCST+WPfGPkdhPnLs43kqWleNs405U5VFlTzDEly73TXxyfRFCpxRTw45S7rxlHoQ86V4FCoRQYKgoAAgAAoAAoAAxAAFAAADj3/AFBUZNWM/wDQncwb/qfC/wAjsJzztxocey+LGXC4ozXlpJfmQcG2RYSr1Y049ctvwRutCwr21JQjKnDrOpL6IxPZ5Tzcy8qcvujc9qbJ+NKLk+7GSl8Nruy9fE489/q7Z8O7p6fTv21Ktt66pSShdQks9YP9Da93tq16iamuJ4zkxm8exP4upTkoqm4xjTSowUI4T8Pcz+7+znSjhvpg05bViI7W7HS3Pc1zbu8V3Co1T4Ulo1JLA2dtq8lJTn8GpDTjp033kjJ7W2Ti4VRr4lPSbhrr5Z6exiJbEqO5deg/hriUlR4ptJdVqZVms1LVt3ceGvV1K32jFpJtV4yjGTwpQk01l9NGfUFqsQgtV3Y6PnyPn7bNkp7XsFJNRqSs4yx/fh/Y+g4vTB3Y53WHnZI1aYXCqIlUZsEgAAABQAAAAAAAQAAUAASRQ0LtJU6s7e3zilJSnUWnf1xg301Xf22cqVOpFawlJOSTzFNY++DVn32Tpv6aY/ljbmOwdl07W5qxg85gks4011+mDbaTTWqXuYGnRxKk3+Linxctc/8ACMm5NaeTPNtbfMvSikVnUL1zWhDRJOTzhLGS1Z39JSUZVabk0puCkuKK9DD1b/4dXMmstSxKT0j5GLq8FSUpRwm9ZSp0Xz8mWtds/wANtvL6jJqKnDiSc1FtZcepetY05JSWDSbeEITUm1LC/FUjLu+5ldlX/HUahnh10zp7Ca6Nenr3jtsToV6eFVpccoS0zjMf892dZtqvFGMvGMZHJtoKcpRwsx4KkJLTXP7pHVrVYjFf0pYOvp5nmHF1VYitf9euJNEIk0dbhlUAFQAAAAAAAAAAAAAAAQC3VgpJppNNYafUmGBr9bde2eXwyzq4JzfDCXj5++TTblYbzo02dOkaHvhafDqca/DPMseEupyZ8Ua3EO3pss92rS13+Ep1JcU4qWOSlFM9v8LBR7sEsdIrB5aF1Hxx5HoltGC6o4+Yd/nwhCgnnKyte7LLPPTt4U55hGMU0tIpcyb2pTb0aXPOcFqd3BySUkZRuUtOm07H2RCap1m5ZWe7pwyw9Db6PQxdjTUacIrkoxMpb8kehjrFY4eXlvNp5eqJJEYkza0gAKgAAAAAAAAAAAAAAAAUZUEEJI1/eu1U6DfWLU19jYWea8oKcJxfWMomF67q2Y7atEuO7Rs3htPHPRZNQvXUjJrMvmdAu54yno1nKaNcvowlLH2R50W5exWvDWqbnnm8+OWbBsS2eVKWc55vmey12VDCfDj1yZClbKKz6ktde2NOkWLzCm11hF/QylFcjn+72+NpT/7Ne4pxfElSbbksPo2uXub7Z14VIqVOcJxecShJSi/dHo453G3kZI1Mw9sCRCJM2tIAAAAAAAAAAAAAAAAAAAAAiyMi3e3dOjCVSrUhTpxWZTqSUYr3ZzjeHtPTkqOz4qTlLgV3WXDT9Yp81z1fhyZjPDKsTPhe3gteGvVWFjicknjk9fzMCrdJ6RivPCLd/vRbUv5lx8afC+JqXxZzl7afkaltnfGrVThQj8GOGnPnUf6f5qeb/De9pmI4erGatKxEzy2fbG3aFssTlxT6UoNOXv4Gi7a3kr3OU3wU9cUqbaT9X1MPOTbbbbbbbb5spg68eCtOfMuPJ1Fr/iEot+ZlNj7auLV5tq1Wk9MqE2oy9VyfuYpE4M3tUS7Rul2rppUtoQknold0abcH/dFar1WfY6Zs/aNG4hx0KtKrDlxUpqSXk8cj5UjXa6tLyMjsveCvbzU6NSVOaw+NSab8muq8mImVtSsvqYoc+3H7RYXShSu+GnXb4Y1IrFOfhnwf0OhGTTMTAAAgAAAAAAAAAAABYu7mFKE6lSSjCEZTnJ57sUstgXKk1FOUmlFJtybSSXicu3x7V40nKlYKFRrSV1NNwz/Suvq/3NU3/wB/qt9KVGi5UrRPHAmuKs11k/8AaaLTXFLL/DHV+ZJlnWr37X2zc3VR1LmrUqtLjcZyfDHwSXJex4Lys5JRzy1wW5SyvOUm2VqQzh46IjP0sUodS5grFfIm10EkQtcJBl+ehbUdM+gWYQwTh4jGr9HFFX0Xo2EVx4/IlCIXiTgwPVZ1nFppn0H2fbzRvbaMZP8A8ilGMKsW23JLRS9+vmfPFNmV2HtevaVVXoSanHOixia6prqiwto3D6eBr25O9FPadqq8FwzTdOtSzngn+j5/8GwlaAAAAAAAAAAADS+16rKOyqzi2szoqWOq4v2RuhqParT4tkXaxl4pNevHED50zmK8WXOHEWvJ59SVpDMYPwI1HzfqYy3V8PN1S8Ei5UeEl1JQim8keby/EKrGGMfMrFZ1JtZ+3sJfsRnEaWq3NL1kHHl7srUXf/8AlEk9X6sIscOkX4t5ITffx6IuTei8iy33/wDPIya5Xqr6LmSpci03q36JEpywkuoNvRBnqt54a9jwxki9TmVYl0HshvXbbSnR1+DcwfB4KpHX9V7nczgnZzbOtfWbhr8OrOtUa/0RUHz98L3O9hheNSAAMAAAAAAAAA13tBpcezbuP/rjL5ST/I2Exu8kHKzu0k5N21wlFc2+FgfNVGPcb82/Y8NTqZGKxB+6MfIxb/SEnhEKKy15Z+ZSrIuWazll9JHMr+MfZF2yocdRZS4ViU23hJFmb1x4FuVR4ay8NrKy8GOmyZTvZR+K3DSDb4Vr4nkrTw2uvNeZcb1LF3DOq5oyYTPCzKph+T5FuM9UUU1yl8yE446phqmXqhL82wptvK1f0Rags+nh4l+P+YKqcdOufMuwkWclYsK3TcOUlfWkqcuCfxqUW84UoN4kn6rJ9Fo+W9g3jpVaVRc4ThNeqeT6ipyTSa5PVMhf0mACtYAAAAAAAAUZUMD5z32sP4W8uKKiox+JUnTiuSg9Y/Ro1GU8Z9TpPbRSxewn40+F+yX6nLqk8tLzJDZM8KV5a4Mhbx4Y+xjqC4pt9Ms911PRR92JWv8AaMZZyyEnqVgtC03qwbST1FRkGyEpA2jUpp9MlmVJeGPUvNMtyTZWEq0VkvKPmi5suzlWqKnHh4mm1xPGcGfhuTePlCHr8SBha9azqZZ1x2mNxDXMLxRJOPm/RG10dwLp/ilQgvOcm/ojIUezzk53C84wpP75/IwnPjj22RgyT6afZz1WFjlqz6k2BUUrW2km2nQoNNvLfdRyKw3RtaTTcZVGtc1JafJYR2DZEs0aXhwQXyQx5q3nVUzYrUiNvcADc5wAAAAAAAAo2VIsDkHa/R43Vl1pypSz5cKT+6OMZ5v2R3HtDkmr3r3Kn0X7HErWGWvVtmnDbfd+2/LXXb+nrs6WMZ/ul5ItTnxSbL9WXDBvrJ8K9DzUUbWH4XZaIs5LlRlplDJBlSDIhxEokWhN4WFzKj27CrcF1Rl/Wo/PT8ztFjUbivRHDbbuzg+qnB/U7TsurmK9Eef1katEu/o53WYZVvQtSlgjl+xSTON2rcnqb9sCWben6NfVnPpS1Wpve7M828PWX3Ovo/lLj6z4wzKZUgSR6LzVQAAAAAAAUZFgAcj31nmN710ucempyC1g9PBL7lQc3T/d+3Vn+1G9qZkorklwonTjhFAdLn9oVWWXIqAKKRRsAgZwRprLyAVEpPU6/sGrxU4PximAcXWxxDu6L7mY4sIo5eoBww73nqvU3jdGWaHpOS+iAOjpPm5es+DPIlEA9R5aoAIP/9k="
              alt="Developer"
            />
            <Typography>Prakhar Nagore</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @prakhar. Only with the purpose
              to Learn MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://in.linkedin.com/in/prakhar-nagore-7346111a6"
              target="blank"
            >
              <LinkedInIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/prakharnag0re" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
