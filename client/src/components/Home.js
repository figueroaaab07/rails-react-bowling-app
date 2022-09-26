import React from "react";
import image from "../images/evgeniy-alyoshin-YF80qEzcEW8-unsplash.jpg"

function Home() {
  return (
    <>
      <div style={{ backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat", backgroundSize:"contain", maxWidth:"100%", height:720, backgroundPosition:"top"}}>
        <h2 style={{ color:"white", width:"50%", marginRight:"auto", marginLeft:"auto" }}>Bowling Tournament App: Take Control of Your Fun</h2> 
      </div>
    </>
  );
}

export default Home;