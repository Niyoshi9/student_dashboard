import React from 'react'
import './slidebar.css'
import './head.css'
import './courses.css'
import './stats.css'
import './tasks.css'
import './activity.css'
import './App.css'

import Slidebar from './slidebar'
import Courses from './courses'
import Head from './head'
import Stats from './stats'
import Tasks from './tasks'
import Activity from './activity'
function App() {
  return (
    <>
    <div className="container" style={{display: 'flex',  background: 'linear-gradient(to right, cyan, blue)'}}>
      <Slidebar />
      <div className="main" style={{flex:'1'}}>
       <Head />
       <Courses />
       <div className="bottom" style={{display: 'flex', gap: '20px' } }>
       <Stats />
       <Activity />
       </div>
        <Tasks />
       </div>
     </div>
    </>
  );
}

export default App;
