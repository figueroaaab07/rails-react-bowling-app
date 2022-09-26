import React from "react";
import image from "../images/eva-andria-d9IDQqK9ePg-unsplash.jpg"

function About() {
  return (
    <>
      <div style={{ backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat", backgroundSize:"contain", maxWidth:"100%", height:720, backgroundPosition:"top"}}>
        <p style={{ color:"white", width:"50%", marginRight:"auto", marginLeft:"auto" }}>Bowling Tournament App is designed to keep track of bowling tournaments, assigning teams to each match that is established with the number of people per team and dates.</p> 
      </div>
    </>
  );
}

export default About;