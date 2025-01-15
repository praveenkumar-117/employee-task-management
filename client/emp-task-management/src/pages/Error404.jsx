import React from 'react';

const Error404 = () => {
  return (
    <div className="w-full max-h-fit flex items-center justify-center min-h-screen">
      <div className='bg-slate-900 flex flex-col items-center justify-center py-20 px-8 rounded-lg shadow-lg'>
        <h1 className='font-semibold text-4xl text-center text-emerald-500 mb-6'>404! Page Not Found</h1>
        <div className='relative w-full max-w-xs h-10 border border-emerald-500 rounded-md overflow-hidden'>
          <div className="absolute h-full w-10 bg-emerald-500 animated-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Error404;
