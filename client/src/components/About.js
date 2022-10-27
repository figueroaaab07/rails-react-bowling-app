import React from "react";
import image from "../images/eva-andria-d9IDQqK9ePg-unsplash.jpg"

function About() {
  return (
    <>
      <div style={{ backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat", backgroundSize:"contain", maxWidth:"100%", height:720, backgroundPosition:"top"}}>
        {/* <p style={{ color:"white", width:"50%", marginRight:"auto", marginLeft:"auto", backgroundOpacity: "50%" }}>Bowling Tournament App is designed to keep track of bowling tournaments, assigning teams to each match that is established with the number of people per team and dates.</p>
        <p style={{ color:"white", width:"50%", marginRight:"auto", marginLeft:"auto" }}>INSTRUCTIONS</p>
        <ul style={{ color:"white", width:"50%", marginRight:"auto", marginLeft:"auto", backgroundOpacity: "50%" }}>
          <li>Sign Up / Login: In order to interact with the App, registration is required, for which the user must provide a valid email address and a password. Likewise, the user has to provide his role within the application: either as administrator, team captain or bowler. Depending on the supplied role the user will be allowed access to certain functions. Italic letters indicate that they do not have access to the function or functions that they delimit. Administrator: Full Access, the only one who can Manage the Matches. Team Captain: Has Access to the Management of Teams and their Bowlers. Bowler: has access to the Games and their Annotations.</li>
        </ul> */}
        <div style={{ textAlign: "justify", textJustify: "inter-word", color:"white", width:"95%", marginRight:"auto", marginLeft:"auto", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div><br></br>
            <b>Bowling Tournament App is designed to keep track of bowling tournaments, assigning teams to each match that is established with the number of people per team and dates.</b><br></br><br></br>
            <b>Sign Up / Login:</b> In order to interact with the App, registration is required, for which the user must provide a valid email address and a password. Likewise, the user has to provide his role within the application: either as administrator, team captain or bowler. Depending on the supplied role the user will be allowed access to certain functions. Italic letters indicate that they do not have access to the function or functions that they delimit. Administrator: Full Access, the only one who can Manage the Matches. Team Captain: Has Access to the Management of Teams and their Bowlers. Bowler: has access to the Games and their Annotations.<br></br><br></br>
            <b>Match Administration - Locations:</b> The administration of the locations and their selection is the first part of the creation, updating or maintenance of the different Matches that the Teams participating in a Tournament can have. As indicated above, it is the responsibility of the Administrator.<br></br><br></br>
            <b>Match Administration - Tournaments:</b> Once the location is selected, the tournament information is displayed, if any. Failing that, you can add, edit and select in the same way.<br></br><br></br>
            <b>Match Administration - Matches:</b> Next we proceed to create the Matches, where the date range in which it will be played, the number of players per team and the number of dates of its duration are indicated.<br></br><br></br>
            <b>Match Administration - Match Teams:</b> At this point, each Team Captain is expected to have registered their respective team and bowlers. Otherwise, the administrator, if he has received the information from the Captain, will be able to register the teams and members through Teams Administration.<br></br>
            Once the fields (2) and the rival team of each team (Home Team / Guest Team) have been determined, the system is ready to generate the number of games of each Match on each date.<br></br><br></br>
            <b>Team Administration - Teams - Bowlers:</b> As indicated in advance, each Team Captain must register his team and bowlers, taking care to have the minimum requested for the games in which he will participate.<br></br><br></br>
            <b>Enjoy Games - Bowler Games:</b> When selecting the game, it will show the players selected for that game and team.<br></br><br></br>
            <b>Enjoy Games - Frames:</b> Once we ratify the Bowlers Selected, we finally enter the presentation of the Scoreboards of each player.
          </div>
        </div>
      </div>
    </>
  );
}

export default About;