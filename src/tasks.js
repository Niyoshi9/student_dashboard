import React, { useEffect, useState } from "react";

import { supabase } from './supabase';
export default function Tasks() {

    const [tasksData, setTasksData] = useState([]);

    useEffect(() => {
        fetchTasks();

    } , []);

    async function fetchTasks() {
        const { data, error } = await supabase
        .from('tasks')
        .select('*');

         if (error) {

      console.log(error);

    } else {

      setTasksData(data);

    }
  }

    return(
        <>
        <article className="tasks-card">

        <div className="top">

            <h2>Upcoming Tasks</h2>

            <span>Today</span>

        </div>

   

        <div className="tasks">
            {tasksData.map((task)=>(
            <div className="task" key={task.id}>

                <p>{task.task_name}</p>

                <button>Open</button>

            </div>
            ))}
           

        </div>

        </article>

        </>

    );
}