import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = async (setData) => {
  try {
    const response = await axios.get(`${apiUrl}/data`);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const addData = async (setData, newData, setNewData, data) => {
  try {
    if (newData.name !== "" && newData.description !== "") {
      const response = await axios.post(`${apiUrl}/data`, newData);
      setData([...data, response.data]);
      setNewData({ name: "", description: "" });
    } else {
      alert("fill all the fields before submit");
    }
  } catch (error) {
    console.error("Error adding data:", error);
  }
};
export const updateData = async (
  setData,
  data,
  newData,
  setNewData,
  setIsEdit
) => {
  try {
    const response = await axios.put(`${apiUrl}/data/${newData._id}`, newData);
    const updatedList = data.map((item) =>
      item._id === newData._id ? response.data : item
    );
    setData(updatedList);
    setIsEdit(false);
    setNewData({ name: "", description: "" });
  } catch (error) {
    console.error("Error updating data:", error);
  }
};
export const deleteData = async (id, setData, data) => {
  try {
    await axios.delete(`${apiUrl}/data/${id}`);
    const updatedList = data.filter((item) => item._id !== id);
    setData(updatedList);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
