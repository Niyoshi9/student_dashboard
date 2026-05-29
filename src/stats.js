import React from 'react'

export default function Stats(){
    return(
        <>
        <article className="stat">
            <h2>Learning Stats</h2>
            <div className="stats-grid">
             <div className="box">
                <p>Hours Learned</p>
                 <h3>124</h3>
            </div>

            <div className="box">
                <p>Courses</p>
                <h3>8</h3>
            </div>

            <div className="box">
                <p>Certificates</p>
                <h3>3</h3>
            </div>

            <div className="box">
                  <p>Rank</p>
                <h3>#12</h3>
            </div>

             </div>

        </article>
        </>

    );
}