import React, { useState, useEffect } from "react";
import { logout } from "../authProvider/Auth";
import {
  addData,
  fetchData,
  updateData,
  deleteData,
} from "../serviceProvider/DataService";

const DataList = () => {
  const [newData, setNewData] = useState({ name: "", description: "" });
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData(setData);
  }, [apiUrl]);

  const edit = async (id, updatedData) => {
    try {
      const _id = id;
      const name = updatedData.name;
      const description = updatedData.description;
      setNewData({ _id, name, description });
      setIsEdit(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Nav bar</h1>
          <h5 className="text-sl font-bold">
            hello {localStorage.getItem("name")}
          </h5>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <h6 className="text-2xl font-bold mb-2">Add New Data</h6>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Name"
          value={newData.name}
          onChange={(e) => setNewData({ ...newData, name: e.target.value })}
          className="border p-2 flex-grow"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newData.description}
          onChange={(e) =>
            setNewData({ ...newData, description: e.target.value })
          }
          className="border p-2 flex-grow"
          required
        />
        {isEdit ? (
          <button
            onClick={() =>
              updateData(setData, data, newData, setNewData, setIsEdit)
            }
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update Data
          </button>
        ) : (
          <button
            onClick={() => addData(setData, newData, setNewData, data)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Data
          </button>
        )}
      </div>
      <h6 className="text-2xl font-bold mb-4">Data List</h6>
      <ul className="mb-4">
        {data.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between bg-gray-100 p-2 mb-2"
          >
            <div>
              <span className="font-bold">{item.name}</span> -{" "}
              {item.description}
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => edit(item._id, item)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => deleteData(item._id, setData, data)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
