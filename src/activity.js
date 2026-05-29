import React from "react";

export default function Activity() {
    return(
        <>
        <article className="activity-card">

            <div className="top">

                <h2>Weekly Activity</h2>

                <span>+12%</span>

            </div>


            <div className="graph">

                <div className="bar" style={{height: '40px'}}></div>

                <div className="bar" style={{height: '90px'}}></div>

                <div className="bar" style={{height: '140px'}}></div>

                <div className="bar" style={{height: '80px'}}></div>

                <div className="bar" style={{height: '170px'}}></div>

                <div className="bar" style={{height: '120px'}}></div>

                <div className="bar" style={{height: '190px'}}></div>

            </div>

        </article>
        </>
    );
}

       