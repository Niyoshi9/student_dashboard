import React, { useEffect, useState } from "react";

import { supabase } from "./supabase";

export default function Courses() {

  const [coursesData, setCoursesData] = useState([]);

 

  useEffect(() => {

    fetchCourses();

  }, []);

 

  async function fetchCourses() {

    const { data, error } = await supabase
      .from("courses")
      .select("*");

    if (error) {

      console.log(error);

    } else {

      setCoursesData(data);

    }
  }

  return (

    <div className="course">

      {coursesData.map((course) => (

        <div className="card" key={course.id}>

          <h2>{course.title}</h2>

          <div className="progress-box">

            <div
              className="progress"
              style={{
                width: `${course.progress}%`,
              }}
            ></div>

          </div>

          <p className="percent">
            {course.progress}% Completed
          </p>

        </div>

      ))}

    </div>
  );
}