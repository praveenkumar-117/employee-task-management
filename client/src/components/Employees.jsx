import React, { useState } from "react";
import { useAuthentication } from "../store/auth";
import { toast } from "react-toastify";
import { TbReload } from "react-icons/tb";

const Employees = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  const colors = [
    "border-rose-500",
    "border-green-500",
    "border-blue-500",
    "border-yellow-500",
    "border-purple-500",
  ];

  const [empData, setEmpData] = useState([]);

  const { authrizationToken, url } = useAuthentication();

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
        setDataLoaded(true);
      } else {
        toast.error(data.message || "Unable to load employees");
      }
    } catch (error) {
      toast.error("Unable to connect with server");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${url}/api/admin/delete/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: authrizationToken,
          "Content-Type": "application/json",
        },
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Employee deleted successfully");

        setEmpData((prevEmpData) =>
          prevEmpData.filter((emp) => emp._id !== userId)
        );
      } else {
        toast.error(res_data.message || "Unable to delete employee");
      }
    } catch (error) {
      toast.error("Unable to connect with server");
    }
  };

  return (
    <>
      {!dataLoaded ? (
        <div className="flex flex-col gap-2 items-center justify-center py-4 text-slate-900">
          <button
            className="bg-emerald-500 text-2xl py-2 px-2 text-white rounded-full hover:bg-emerald-700 hover:font-semibold"
            onClick={getEmpData}
          >
            <TbReload />
          </button>

          <label className="text-xl font-medium">
            Load Employee Details
          </label>
        </div>
      ) : (
        <>
          <div className="flex justify-center py-4">
            <h2 className="underline font-semibold text-xl text-gray-200">
              Employees
            </h2>
          </div>

          <div>
            {empData.length > 0 ? (
              empData.map((currEmp, index) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row justify-between rounded-md px-4 py-2 my-2 border-b text-slate-900 ${
                    colors[index % colors.length]
                  }`}
                >
                  <span className="w-full sm:w-1/3">
                    {currEmp.name}
                  </span>

                  <span className="w-full sm:w-1/3">
                    {currEmp.email}
                  </span>

                  <button
                    className="bg-red-500 px-2 rounded-md hover:bg-red-700 text-white"
                    onClick={() => deleteUser(currEmp._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-700">
                No employees found.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Employees;