import React, { useEffect, useState } from "react";

import { supabase } from './supabase';
export default function Tasks({user}) {
    const [task_name, setTitle]=useState("");
    const [tasksData, setTasksData] = useState([]);

    useEffect(() => {
        fetchTasks();

    } , []);

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
  const addTask = async () => {
    if (!task_name.trim()) return;

    const { error } = await supabase
      .from("tasks")
      .insert({
        task_name,
        completed: false,
        user_id: user.id,
      });

      if(!error)
      {
        fetchTasks();
        setTitle("");
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
    } else {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchTasks();
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
                <button onClick={() => deleteTask(task.id)}>
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