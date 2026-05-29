import React, { useState } from "react";

export default function Slidebar() {
   const [open, setOpen] = useState(false);
  return (
    <>
    
   
       <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
       >
        ☰
      </button>
    
      <aside style={{

          position:"fixed",

          top:"0",

          left: open ? "0" : "-20vw",

          width:"20vw",

          height:"100vh",

          background:"#021644",

          color:"white",

          

          transition:"0.3s",

          zIndex:"999"
        }}>
     <div className="sb">
      <div className="logo">
        <h1> UDEMY</h1>
      </div>
      <div className="menu">
         <button className="active">Dashboard</button>
        <button>Courses</button>
        <button>Analytics</button>
        <button>Settings</button>
        </div>
        <div className="streak">
          <h2>Learning Streaks</h2>
          <div className="count">
            <h1>56 <i className="fa-solid fa-fire"></i></h1>
            <span></span>
            </div>
            <div className="line">
              <h3>Keep learning daily!</h3>
            </div>
          
        </div>

    </div>

    </aside>
     
    </>
  );
}

