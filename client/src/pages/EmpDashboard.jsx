import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuthentication } from "../store/auth";

const EmpDashboard = () => {
  const { authrizationToken, user, isLoading, isLoggedIn, url } =
    useAuthentication();

  const [empTask, setEmpTask] = useState([]);

  useEffect(() => {
    if (isLoggedIn && !user.isAdmin) {
      getEmpTask();
    }
  }, [isLoggedIn, user.isAdmin, authrizationToken]);

  const getEmpTask = async () => {
    try {
      const response = await fetch(`${url}/api/employee/emptask`, {
        method: "POST",
        headers: {
          Authorization: authrizationToken,
          "Content-Type": "application/json",
        },
      });

      const res_data = await response.json();

      if (response.ok) {
        setEmpTask(res_data);
      }
    } catch (error) {
      // API errors are handled without console output
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      const response = await fetch(`${url}/api/employee/updatestatus`, {
        method: "POST",
        headers: {
          Authorization: authrizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, status }),
      });

      const res_data = await response.json();

      if (!response.ok) {
        return;
      }

      setEmpTask((prevTasks) =>
        prevTasks.map((task) => {
          if (task._id !== taskId) {
            return task;
          }

          if (status === "Accepted") {
            return {
              ...task,
              isAccepted: true,
              isFailed: false,
              isCompleted: false,
            };
          }

          if (status === "Completed") {
            return {
              ...task,
              isCompleted: true,
              isFailed: false,
            };
          }

          if (status === "Failed") {
            return {
              ...task,
              isFailed: true,
              isCompleted: false,
            };
          }

          return task;
        })
      );
    } catch (error) {
      // API errors are handled without console output
    }
  };

  const newTaskCount = empTask.filter(
    (task) => !task.isAccepted && !task.isCompleted && !task.isFailed
  ).length;

  const acceptedTaskCount = empTask.filter(
    (task) => task.isAccepted
  ).length;

  const completedTaskCount = empTask.filter(
    (task) => task.isCompleted
  ).length;

  const failedTaskCount = empTask.filter(
    (task) => task.isFailed
  ).length;

  if (isLoading) {
    return <h1 className="text-white p-6">Loading...</h1>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (user.isAdmin) {
    return <Navigate to="/admindashboard" />;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <main className="p-4 md:p-6">
        <Navbar />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">

            <div className="border border-black rounded-lg flex flex-col items-center justify-center bg-blue-500 p-5 min-h-[110px] font-semibold">
              <h2 className="text-2xl">{newTaskCount}</h2>
              <h3>All Task</h3>
            </div>

            <div className="border border-black rounded-lg flex flex-col items-center justify-center bg-green-500 p-5 min-h-[110px] font-semibold">
              <h2 className="text-2xl">{completedTaskCount}</h2>
              <h3>Completed Task</h3>
            </div>

            <div className="border border-black rounded-lg flex flex-col items-center justify-center bg-yellow-500 p-5 min-h-[110px] font-semibold">
              <h2 className="text-2xl">{acceptedTaskCount}</h2>
              <h3>Accepted Task</h3>
            </div>

            <div className="border border-black rounded-lg flex flex-col items-center justify-center bg-red-500 p-5 min-h-[110px] font-semibold">
              <h2 className="text-2xl">{failedTaskCount}</h2>
              <h3>Failed Task</h3>
            </div>

          </div>

          {/* Task Section */}
          <div className="lg:col-span-3">

            {empTask.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                {empTask.map((curTask) => (

                  <div
                    key={curTask._id}
                    className="border border-zinc-500 rounded-lg bg-zinc-800 p-4 flex flex-col min-h-[350px] hover:bg-zinc-900 transition-colors"
                  >

                    {/* Priority + Date */}
                    <div className="flex justify-between items-center gap-2 mb-4">

                      <h2
                        className={`px-2 py-1 rounded-md text-white text-sm ${
                          curTask.priority === "High"
                            ? "bg-red-500"
                            : curTask.priority === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      >
                        {curTask.priority}
                      </h2>

                      <h3 className="text-gray-300 text-sm">
                        {curTask.date}
                      </h3>

                    </div>

                    {/* Task Content */}
                    <div className="flex-1">

                      <h2 className="text-xl md:text-2xl font-semibold mb-3 break-words">
                        {curTask.title}
                      </h2>

                      <p className="text-zinc-300 mb-4 px-1 break-words">
                        {curTask.description}
                      </p>

                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-700">

                      <button
                        className={`px-3 py-1 rounded-md text-white ${
                          curTask.isAccepted
                            ? "bg-blue-800 line-through cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        onClick={() =>
                          updateStatus(curTask._id, "Accepted")
                        }
                        disabled={
                          curTask.isAccepted ||
                          curTask.isCompleted ||
                          curTask.isFailed
                        }
                      >
                        Accept
                      </button>

                      <button
                        className={`px-3 py-1 rounded-md text-white ${
                          curTask.isCompleted ||
                          curTask.isFailed ||
                          !curTask.isAccepted
                            ? "bg-green-800 line-through cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-700"
                        }`}
                        onClick={() =>
                          updateStatus(curTask._id, "Completed")
                        }
                        disabled={
                          curTask.isCompleted ||
                          curTask.isFailed ||
                          !curTask.isAccepted
                        }
                      >
                        Complete
                      </button>

                      <button
                        className={`px-3 py-1 rounded-md text-white ${
                          curTask.isFailed ||
                          curTask.isCompleted ||
                          !curTask.isAccepted
                            ? "bg-red-800 line-through cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-700"
                        }`}
                        onClick={() =>
                          updateStatus(curTask._id, "Failed")
                        }
                        disabled={
                          curTask.isFailed ||
                          curTask.isCompleted ||
                          !curTask.isAccepted
                        }
                      >
                        Close
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="flex items-center justify-center min-h-[300px]">
                <p className="text-zinc-400 text-lg">
                  No Tasks found.
                </p>
              </div>

            )}

          </div>

        </div>
      </main>
    </div>
  );
};

export default EmpDashboard;