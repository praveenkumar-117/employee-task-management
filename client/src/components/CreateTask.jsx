import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthentication } from "../store/auth";

const CreateTask = () => {
  const { authrizationToken, url } = useAuthentication();
  const [empData, setEmpData] = useState([]);

  const [task, setTask] = useState({
    title: "",
    employee: "",
    priority: "",
    description: "",
    status: "false",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split("T")[0];
    const taskData = { ...task, date: currentDate };

    try {
      const response = await fetch(`${url}/api/admin/createtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authrizationToken,
        },
        body: JSON.stringify(taskData),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Task Created Successfully");

        setTask({
          title: "",
          employee: "",
          priority: "",
          description: "",
          status: false,
        });
      } else {
        toast.error(
          res_data.extraDetails || res_data.message || "Unable to create task"
        );
      }
    } catch (error) {
      toast.error("Unable to connect with server");
    }
  };

  const getEmpData = async () => {
    try {
      const response = await fetch(`${url}/api/admin/employee`, {
        method: "GET",
        headers: {
          Authorization: authrizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEmpData(data);
      } else {
        toast.error(data.message || "Unable to load employees");
      }
    } catch (error) {
      toast.error("Unable to connect with server");
    }
  };

  useEffect(() => {
    getEmpData();
  }, []);

  return (
    <>
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-1 py-4 px-20 d-bg rounded-md"
  >
    <h2 className="underline text-center font-semibold text-2xl">
      Create Task
    </h2>

    <label>Task Title</label>

    <input
      type="text"
      name="title"
      placeholder="Enter Task Title"
      onChange={handleInput}
      value={task.title}
      required
      className="p-1 px-2 outline-none border border-gray-500 rounded-md bg-transparent text-white"
    />

    <label>Assign to</label>

    <select
      name="employee"
      value={task.employee}
      onChange={handleInput}
      required
      className="p-2 border border-gray-500 rounded-md bg-transparent text-white"
    >
      <option value="" className="bg-zinc-800">
        Select Employee
      </option>

      {empData
        .filter((emp) => emp.isAdmin !== true)
        .map((emp) => (
          <option
            key={emp._id}
            value={emp._id}
            className="bg-zinc-800"
          >
            {emp.name}
          </option>
        ))}
    </select>

    <label>Priority</label>

    <select
      id="priority"
      name="priority"
      value={task.priority}
      onChange={handleInput}
      required
      className="p-2 border border-gray-500 rounded-md bg-transparent text-white"
    >
      <option value="" className="bg-zinc-800">
        Select Priority
      </option>

      <option value="Low" className="bg-zinc-800">
        Low
      </option>

      <option value="Medium" className="bg-zinc-800">
        Medium
      </option>

      <option value="High" className="bg-zinc-800">
        High
      </option>
    </select>

    <label>Description</label>

    <textarea
      placeholder="Enter Task Description"
      name="description"
      onChange={handleInput}
      value={task.description}
      required
      className="p-1 px-2 h-2/3 outline-none border border-gray-500 rounded-md bg-transparent text-white"
    />

    <button
      type="submit"
      className="mt-4 bg-emerald-500 text-white py-1 rounded-md hover:bg-emerald-700 hover:font-semibold"
    >
      Create Task
    </button>
  </form>
</>
  );
};

export default CreateTask;