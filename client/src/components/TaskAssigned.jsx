import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuthentication } from "../store/auth";
import { TbReload } from "react-icons/tb";

const TaskAssigned = () => {
  const [task, setTask] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { authrizationToken, url } = useAuthentication();

  const colors = [
    "border-rose-500",
    "border-green-500",
    "border-blue-500",
    "border-yellow-500",
    "border-purple-500",
  ];

  const getTask = async () => {
    try {
      const response = await fetch(`${url}/api/admin/gettask`, {
        method: "GET",
        headers: {
          Authorization: authrizationToken,
        },
      });

      const res_data = await response.json();

      if (response.ok) {
        setTask(res_data);
        setDataLoaded(true);
      } else {
        toast.error(res_data.message || "Unable to load tasks");
      }
    } catch (error) {
      toast.error("Unable to connect with server");
    }
  };

  return (
    <>
      {!dataLoaded ? (
        <div className="flex flex-col gap-2 items-center justify-center py-4">

          <button
            className="bg-emerald-500 text-2xl text-white py-2 px-2 rounded-full hover:bg-emerald-700 hover:font-semibold"
            onClick={getTask}
          >
            <TbReload />
          </button>

          <label className="text-xl">
            Load Assigned Task
          </label>

        </div>
      ) : (
        <>
          <div className="flex justify-center py-4">
            <h2 className="underline font-semibold text-xl">
              Assigned Task
            </h2>
          </div>

          <div>
            {task.length > 0 ? (
              task.map((currTask, index) => (
                <div
                  key={currTask._id}
                  className={`flex items-center border-b rounded-md px-4 py-2 my-2 ${
                    colors[index % colors.length]
                  }`}
                >

                  <span className="w-1/4">
                    {currTask.employee?.name}
                  </span>

                  <span className="w-2/5 truncate">
                    {currTask.title}
                  </span>

                  <span
                    className={`w-1/5 font-semibold ${
                      currTask.priority === "High"
                        ? "text-red-500"
                        : currTask.priority === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {currTask.priority}
                  </span>

                  <span
                    className={`w-1/5 font-semibold ${
                      currTask.isCompleted
                        ? "text-green-600"
                        : currTask.isFailed
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {currTask.isCompleted
                      ? "Completed"
                      : currTask.isFailed
                        ? "Failed"
                        : currTask.isAccepted
                          ? "Accepted"
                          : "Pending"}
                  </span>

                </div>
              ))
            ) : (
              <p>No Task found.</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TaskAssigned;