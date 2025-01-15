import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { useAuthentication } from "../store/auth";

const EmpDashboard = () => {

  const { authrizationToken, user, isLoading, isLoggedIn } = useAuthentication();
  const [empTask, setEmpTask] = useState([]);


  useEffect(() => {
    if (isLoggedIn && !user.isAdmin) {
      getEmpTask();
    }
  }, [isLoggedIn, user.isAdmin, user.name, authrizationToken]);


  const getEmpTask = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/employee/emptask",
        {
          method: "POST",
          headers: {
            Authorization: authrizationToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: user.name })

        })
      const res_data = await response.json();
      
      if (response.ok) {
        setEmpTask(res_data)
      }
    } catch (error) {
      console.log('Error fetching tasks:', error)
    }
  }

  const updateStatus = async (taskId, status) => {
    try {
      const response = await fetch("http://localhost:7000/api/employee/updatestatus",
        {
          method: "POST",
          headers: {
            Authorization: authrizationToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ taskId, status })
        })
      const res_data = await response.json();
      // Update the task status in the state
      setEmpTask(prevTasks => prevTasks.map(task => {
        if (task._id === taskId) {
          if (status === 'Accepted') {
            return { ...task, isAccepted: true, isFailed: false, isCompleted: false }
          }
        };


        //   } else if (status === 'Completed') {
        //     return { ...task, isCompleted: true, isFailed: false }; // Disable both Completed and Close buttons }
        //   } else if (status === 'Failed') {
        //     return { ...task, isFailed: true, isCompleted: false }; // Disable both Close and Completed buttons }
        //   }
        // }
        return task;
      }));
    } catch (error) {
      console.log('Error updating task status:', error);
    }
  }


  // useEffect(() => {
  //   getEmpTask();
  // }, [user.name, authrizationToken]);

 


  const newTaskCount = empTask.filter(task => !task.isAccepted && !task.isCompleted && !task.isFailed).length;
  const acceptedTaskCount = empTask.filter(task => task.isAccepted).length;
  const completedTaskCount = empTask.filter(task => task.isCompleted).length;
  const failedTaskCount = empTask.filter(task => task.isFailed).length;


  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>
  }
  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  if (user.isAdmin) {
    return <Navigate to="/admindashboard" />
  }



  return (
    <div className="flex flex-col md:flex-row min-h-screen ">


      {/* Main Content */}
      <main className="flex-grow p-6 ">


        <Navbar />
        <div className='p-6 flex flex-col md:flex-row '>

          {/* sidediv */}
          <div className=' p-2 flex justify-around flex-wrap md:flex-col gap-1 md:gap-6 w-full my-4 md:w-1/4 font-semibold'>

            <div className='dv dv1 w-5/12  md:w-full  border border-black rounded-lg flex flex-col items-center bg-blue-500 p-4'>
              <h2>{newTaskCount}</h2>
              <h3>New Task</h3>
            </div>

            <div className='dv dv2 md:w-full w-5/12 border border-black rounded-lg flex flex-col items-center bg-green-500 p-4'>
              <h2>{completedTaskCount}</h2>
              <h3>Completed Task</h3>
            </div>

            <div className='dv dv3 md:w-full w-5/12 border border-black rounded-lg flex flex-col items-center bg-yellow-500 p-4'>
              <h2>{acceptedTaskCount}</h2>
              <h3>Accepetd Task</h3>
            </div>

            <div className='dv dv4 md:w-full w-5/12 border border-black rounded-lg flex flex-col items-center bg-red-500 p-4'>
              <h2>{failedTaskCount}</h2>
              <h3>Failded Task</h3>
            </div>
          </div>


          {/* center div */}
          <div className=' gap-8 p-4 md:px-20 w-full flex flex-wrap'>

            {empTask.length > 0 ? empTask.map((curTask, index) => (
              <div key={index} className=' md:flex-col rounded-lg bg-zinc-800 py-4 px-2 mb-6 w-full md:max-w-[30%]'>
                <div className='flex justify-between items-center mb-2'>
                  <h2 className={`px-2 py-1 rounded-md text-white ${curTask.priority === 'High' ? 'bg-red-500' : curTask.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}> {curTask.priority} </h2>
                  <h3 className='text-gray-300'>{curTask.date}</h3>
                </div>

                <div className='md:h-3/4'>
                  <h2 className='text-2xl font-semibold mb-2'>{curTask.title}</h2>
                  <p className='text-zinc-300 mb-4 px-2'>{curTask.description}</p>
                </div>

                <div className='flex md:justify-evenly gap-2 '>
                  <button className={`${curTask.isAccepted ? 'bg-blue-800 line-through' : 'bg-blue-500'} text-white px-2 py-1 rounded-md`} onClick={() => updateStatus(curTask._id, 'Accepted')} disabled={curTask.isAccepted} > Accept </button>

                  <button className={`${curTask.isCompleted || curTask.isFailed || !curTask.isAccepted ? 'bg-green-800 line-through' : 'bg-green-500'} text-white px-2 py-1 rounded-md hover:bg-green-700`} disabled >Complete</button>

                  <button className={`${curTask.isFailed ? 'bg-red-800 line-through' : 'bg-red-500'} text-white px-2 py-1 rounded-md hover:bg-red-700`} onClick={() => updateStatus(curTask._id, 'Failed')} disabled={curTask.isFailed} > Close </button>
                </div>
              </div>)
            ) : (
              <p>No Tasks found.</p>)}


          </div>

        </div>

      </main>
    </div>
  );
}

export default EmpDashboard;
