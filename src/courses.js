import React, { useEffect, useState } from "react";

import { supabase } from "./supabase";
const T = {
  bg: '#0A1022',
  panel: '#111A30',
  card: '#141D38',
  cardBorder: '#212B48',
  text: '#F5F7FA',
  textDim: '#8D97AE',
  cyan: '#22E1F2',
  blue: '#2B5CF0',
  green: '#4ADE80',
  gradient: 'linear-gradient(90deg, #22E1F2 0%, #2B5CF0 100%)',
  sans: "'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

export default function Courses({user}) {
const [title, setTitle] = useState("");

 const [courses, setCourses] = useState([]);

 useEffect(() => {
  fetchCourses();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchCourses() {

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("user_id", user.id)

    if (error) {

      console.log(error);

    } else {

      setCourses(data);

    }
  }
const addCourse = async () => {
  const { error } = await supabase
    .from("courses")
    .insert({
      title,
      progress: 0,
      user_id: user.id,
    });

  if (!error) {
    fetchCourses();
    setTitle("");
  }
};
  return (
<>
    

<div className="course">

        <div style={{ display: 'flex', gap: 10, marginBottom: 20, gridColumn: '1 / -1' }}>
          <input
            type="text"
            placeholder="Course name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCourse()}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)', color: T.text, fontSize: 14, outline: 'none',
            }}
          />
          <button
            onClick={addCourse}
            style={{
              background: T.gradient, border: 'none', borderRadius: 10, padding: '10px 20px',
              fontSize: 13.5, fontWeight: 700, color: '#071018', cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            Add course
          </button>
        </div>

        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 25, padding: 25, transition: '0.3s', cursor: 'default',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h2 style={{ marginBottom: 20, fontSize: 20, color: T.text }}>{course.title}</h2>
           
            </div>
            <div style={{
              width: '100%', height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 20, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${course.progress}%`,
                background: 'linear-gradient(to right, cyan, blue)', borderRadius: 20,
              }} />
            </div>
            <p style={{ marginTop: 10, color: '#aaa' }}>{course.progress}% completed</p>
          </div>
        ))}

    </div>
    </>
  );
}