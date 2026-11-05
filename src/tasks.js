import React, { useEffect, useState } from "react";

import { supabase } from './supabase';
export default function Tasks({user}) {
    const [task_name, setTitle]=useState("");
    const [tasksData, setTasksData] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
   useEffect(() => {
  fetchTasks();
  fetchCourses();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function fetchTasks() {
        const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq("user_id",user.id);
         if (error) {

      console.log(error);

    } else {

      setTasksData(data);

    }
  }
   async function fetchCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("user_id", user.id);
    if (!error) setCourses(data);
  }
   const updateCourseProgress = async (course_id) => {
    if (!course_id) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("completed")
      .eq("course_id", course_id)
      .eq("user_id", user.id);
      

    if (error) {
      console.log(error);
      return;
    }

    const total = data.length;
    const completedCount = data.filter((t) => t.completed).length;
    const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);
   
    const { error: updateError } = await supabase
      .from("courses")
      .update({ progress })
      .eq("id", course_id);
   
    if (updateError) console.log(updateError);
  };

  const addTask = async () => {
    if (!task_name.trim()) return;

    const { error } = await supabase
      .from("tasks")
      .insert({
        task_name,
        completed: false,
        user_id: user.id,
        course_id: selectedCourse !== "" ? Number(selectedCourse) : null,
      });
     

      if(!error)
      {
        fetchTasks();
        setTitle("");
        if (selectedCourse) updateCourseProgress(Number(selectedCourse));
      }
      else
      {
        console.log(error);
        
      }
  };
    const toggleTask = async (task) => {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !task.completed })
        .eq("id", task.id);
          
      if (!error) {
        fetchTasks();
        if (task.course_id) updateCourseProgress(task.course_id);
      } else {
        console.log(error);
      }
    };

  const deleteTask = async (task) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id);

    if (!error) {
      fetchTasks();
      if (task.course_id) updateCourseProgress(task.course_id);
    } else {
      console.log(error);
    }
  };
    return(
        <>
        <article className="tasks-card">

        <div className="top">
          <h2>Upcoming Tasks</h2>
          
        </div>

        <div className="add-task">
          <input
            type="text"
            placeholder="Task Name"
            value={task_name}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <select
            aria-label="Course for this task"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">No course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="tasks">
          {tasksData.map((task) => (
            <div className="task" key={task.id}>

              <p style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.task_name}
              </p>

              <div className="task-actions">
                <button onClick={() => toggleTask(task)}>
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button onClick={() => deleteTask(task)}>
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </article>

        </>

    );
}