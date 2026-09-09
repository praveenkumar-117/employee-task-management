import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { RiTeamLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import Employees from '../components/Employees';
import CreateTask from '../components/CreateTask';
import TaskAssigned from '../components/TaskAssigned';
import { useAuthentication } from "../store/auth";
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [currentComponent, setCurrentComponent] = useState('Employees');
  const { isLoading, isLoggedIn, user } = useAuthentication();

  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>
  }

  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  if (!user.isAdmin) {
    return <Navigate to="/empdashboard" />
  }

  const renderComponent = () => {
    switch (currentComponent) {
      case 'Employees': return <Employees />;
      case 'CreateTask': return <CreateTask />;
      case 'TaskAssigned': return <TaskAssigned />;
      default: return <Employees />;
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen flex flex-col flex-grow p-4 bg-zinc-900 text-white">

        <Navbar />

        <div className='flex flex-col flex-1 py-4 md:flex-row rounded-lg'>

          <div className='flex flex-col md:w-1/4 gap-4 p-8 rounded-md mx-4 bg-zinc-800 text-white'>

            <button
              className={`flex gap-2 border-l border-b rounded-bl-md rounded-tr-md p-2 text-start hover:bg-sky-600 hover:font-semibold ${currentComponent === 'Employees' ? 'bg-sky-600' : ''}`}
              onClick={() => setCurrentComponent('Employees')}
            >
              <RiTeamLine />Employees
            </button>

            <button
              className={`flex gap-2 border-l border-b rounded-bl-md rounded-tr-md p-2 text-start hover:bg-green-600 hover:font-semibold ${currentComponent === 'CreateTask' ? 'bg-green-600' : ''}`}
              onClick={() => setCurrentComponent('CreateTask')}
            >
              <IoCreateOutline />Create Task
            </button>

            <button
              className={`flex gap-2 border-l border-b rounded-bl-md rounded-tr-md p-2 text-start hover:bg-rose-500 hover:font-semibold ${currentComponent === 'TaskAssigned' ? 'bg-rose-600' : ''}`}
              onClick={() => setCurrentComponent('TaskAssigned')}
            >
              <GoTasklist />Task Assiegned
            </button>

          </div>

          <div className='md:w-3/4 px-4 my-4 text-white'>
            {renderComponent()}
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminDashboard