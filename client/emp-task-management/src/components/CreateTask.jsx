import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuthentication } from '../store/auth';

const CreateTask = () => {
  const {  authrizationToken } = useAuthentication();

  const [task, setTask] = useState({
    title: "",
    employee: "",
    priority: "",
    description: "",
    status: "false"
  })

  

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTask({ ...task, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current date in YYYY-MM-DD format 
    const currentDate = new Date().toISOString().split('T')[0];
    const taskData = { ...task, date: currentDate, };
    try {
      const response = await fetch("http://localhost:7000/api/admin/createtask",
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json',
            'Authorization': authrizationToken
           },
          body: JSON.stringify(taskData),
        }
      )
      const res_data = await response.json();
      console.log(res_data)
      if (response.ok) {
        toast.success("Task Created")

        setTask({
          title: "",
          employee: "",
          priority: "",
          description: "",
          status: false
        })

      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <>
      <div className=' flex flex-col gap-1 py-4 px-20 d-bg rounded-md'>
        <h2 className='underline text-center font-semibold text-2xl'>Create Task</h2>

        <label> Task Title</label>
        <input type="text" name="title" placeholder='Enter Task Title' onChange={handleInput} value={task.title} className=' p-1 px-2 outline-none border border-gray-500 rounded-md  bg-transparent text-white' />

        {/* <label>Date</label>
        <input type="date" name="date" onChange={handleInput} value={task.date} className='p-1 px-2 border border-gray-500 rounded-md  bg-transparent text-white' /> */}

        <label>Assign to</label>
        <input type="text" name="employee" value={task.employee} onChange={handleInput} placeholder='Enter Employee name' className=' p-1 px-2 outline-none border border-gray-500 rounded-md  bg-transparent text-white' />

        <label>Priority</label>
        {/* <select id="priority" name="priority" value={task.priority} onChange={handleSelectChange}
          className="p-2 border border-gray-500 rounded-md bg-transparent text-white" >

          <option value="Low" className='bg-zinc-800'>Low</option>
          <option value="Medium" className='bg-zinc-800'>Medium</option>
          <option value="High" className='bg-zinc-800'>High</option>
        </select> */}


        <input type="text" list='sggst' id="priority" name='priority' value={task.priority} onChange={handleInput} placeholder='Low / Medium / High' className='p-1 px-2 outline-none border border-gray-500 rounded-md  bg-transparent text-white' />

        <datalist id="sggst">
          <option value="Low" />
          <option value="Medium" />
          <option value="High" />
        </datalist>

        <label>Description</label>
        <textarea placeholder='Enter Task Description' name='description' onChange={handleInput} value={task.description} className='p-1 px-2 h-2/3 outline-none border border-gray-500 rounded-md  bg-transparent text-white' />

        <button className='mt-4 bg-emerald-500 text-white py-1 rounded-md hover:bg-emerald-700 hover:font-semibold' onClick={handleSubmit}>Create Task</button>
      </div>


    </>
  )
}

export default CreateTask
