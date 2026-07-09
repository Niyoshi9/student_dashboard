import React from 'react'
import './slidebar.css'
import './head.css'
import './courses.css'
import './stats.css'
import './tasks.css'
import './activity.css'
import './login.css'
import './App.css'

import Slidebar from './slidebar'
import Courses from './courses'
import Head from './head'
import Stats from './stats'
import Tasks from './tasks'
import Activity from './activity'
import Login from './login'
import { useState, useEffect } from 'react'
import { supabase } from "./supabase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    // no need to manually setUser(null) here —
    // onAuthStateChange above already does that
    // when the session goes away
  };

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <div className="container" style={{ display: 'flex', background: 'linear-gradient(to right, cyan, blue)' }}>
        <Slidebar onLogout={handleLogout} />
        <div className="main" style={{ flex: '1' }}>
          <Head />
          <Courses user={user} />
          <div className="bottom" style={{ display: 'flex', gap: '20px' }}>
            <Stats user={user} />
            <Activity user={user} />
          </div>
          <Tasks user={user} />
        </div>
      </div>
    </>
  );
}

export default App;