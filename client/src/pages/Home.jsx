import React, { useState } from 'react';
import Login from './Login'; // Ensure Login component is correctly imported
import Signup from './Signup'; // Ensure Signup component is correctly imported

const Home = () => {
  const [isLogin, setIsLogin] = useState(false); // Default to Signup on page load

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="w-full max-h-fit py-6">
        <div className='bg-slate-900 flex items-center justify-center py-12 md:py-40 md:w-3/4 md:h-1/3 rounded-r-full rounded-bl-full h-6'>
          <div className='md:pt-24 '>
            <h3 className='font-semibold text-xl md:text-3xl md:text-center text-white'>Employee Task Management System</h3>
          </div>

          <div className='relative w-20 h-20  md:w-32 md:h-32 mx-4'>
            <div className="absolute w-6 h-6 md:w-10 md:h-10 animated-div"></div>
          </div>
        </div>

        <div className="absolute rounded-full w-20 h-20 md:w-40 md:h-40 z-10 md:top-6 md:right-6 top-32 right-6 border border-red-600"></div>
        <div className="absolute rounded-full w-28 h-28 md:w-32 md:h-32 top-3/4 left-4 border md:top-2/3 md:left-2/3  border-yellow-600 z-30"></div>

        <div className='absolute glass-effect w-3/4 h-2/3 md:w-1/4 md:h-2/3 md:top-24 md:right-24 z-30 px-8 py-4 mx-16 md:mx-0'>
          <div className='flex my-2 p-2 rounded-md bg-slate-900'>
            <button
              className={`w-1/2 rounded-md py-2 ${!isLogin ? 'bg-emerald-500' : ''} `}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
            <button
              className={`w-1/2 rounded-md py-2 ${isLogin ? 'bg-emerald-500' : ''} `}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>


          {isLogin ? <Login /> : <Signup />}

        </div>
      </div>
    </>
  );
};

export default Home;
