import React, { useState, useEffect } from 'react'
import { useAuthentication } from '../store/auth';
import { TbReload } from "react-icons/tb";

const TaskAssigned = () => {
  const [task, setTask] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false);
  const { authrizationToken } = useAuthentication();
  const colors = ['border-rose-500', 'border-green-500', 'border-blue-500', 'border-yellow-500', 'border-purple-500'];

  const getTask = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/admin/gettask",
        {
          method: "GET",
          headers: { Authorization: authrizationToken },
        }
      )
      const res_data = await response.json();
      console.log('Fetched Task data:', res_data);
      setTask(res_data)
      setDataLoaded(true);
    } catch (error) {
      console.log(error)
    }
  }





  return (

    <>
      {!dataLoaded ? (
        <div className='flex flex-col gap-2 items-center justify-center py-4'>
          <button className='bg-emerald-500 text-2xl text-white py-2 px-2 rounded-full hover:bg-emerald-700 hover:font-semibold' onClick={getTask} ><TbReload /></button>
          <label className='text-xl'>Load Assigned Task</label>
        </div>

      ) : (
        <>
          <div className='flex justify-center py-4'>
            <h2 className='underline font-semibold text-xl'>Assigned Task</h2>
          </div>
          <div> {task.length > 0 ? task.map((currTask, index) => (
            <div key={index} className={`flex flex-row justify-between border-b rounded-md px-4 py-2 my-2 ${colors[index % colors.length]}`}>
              <span className='w-1/3'>{currTask.employee}</span>
              <span className='w-1/3'>{currTask.title}</span>
              <span className={`${currTask.isCompleted ? 'text-green-600' : currTask.isFailed ? 'text-red-600' : 'text-yellow-600'} font-semibold`}>
                {currTask.isCompleted ? 'Completed' : currTask.isFailed ? 'Failed' : 'Pending'} </span>
            </div>)) : (
            <p>No Task found.</p>)}
          </div>
        </>
      )}
    </>
  )

}




export default TaskAssigned
