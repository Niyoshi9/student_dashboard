import React, { useState } from "react";

export default function Slidebar({ onLogout }) {
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

          display:"flex",

          flexDirection:"column",

          transition:"0.3s",

          zIndex:"999"
        }}>
     <div className="sb" style={{ display:"flex", flexDirection:"column", height:"100%" }}>
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

        <div style={{ flex: 1 }} />

        <button
          className="signout-btn"
          onClick={onLogout}
          style={{
            margin: "16px",
            padding: "12px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Sign out
        </button>

    </div>

    </aside>
     
    </>
  );
}