"use client"
import { useEffect, useState } from "react";
import Tablerow from "./Tablerow";
import EditForm from './EditForm';

export type Datas = {
  ProductName: string;
  Color: string;
  Category: string;
  Price: string;
}

const Table = () => {
  const [data, setData] = useState<Array<Datas>>([]);
  const [editItem, setEditItem] = useState<Datas | null>(null);

  useEffect(() => {
    const localData = localStorage.getItem('tableData');
    if (localData) {
      setData(JSON.parse(localData));
    } else {
      fetch("/data.json")
        .then(response => response.json())
        .then(data => {
          setData(data);
          localStorage.setItem('tableData', JSON.stringify(data)); // Store fetched data
        })
        .catch(error => console.error("Failed to load data", error));
    }
  }, []);

  const handleEdit = (item: Datas) => {
    setEditItem(item);
  };

  const handleUpdate = (values: Datas) => {
    const updatedData = data.map(item => item.ProductName === values.ProductName ? values : item);
    localStorage.setItem('tableData', JSON.stringify(updatedData));
    setData(updatedData);
    setEditItem(null);
    sendDataToBackend(updatedData);
  };

  const handleDelete = (productName: string) => {
    const updatedData = data.filter(item => item.ProductName !== productName);
    localStorage.setItem('tableData', JSON.stringify(updatedData));
    setData(updatedData);
    sendDataToBackend(updatedData);
  };

  const sendDataToBackend = (updatedData: Array<Datas>) => {
    fetch('/api/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Failed to update data', error));
  };

  return (
    <div>
      {editItem && <EditForm initialValues={editItem} handleUpdate={handleUpdate} onCancel={() => setEditItem(null)} />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
                <th scope="col" className="px-6 py-3">Product name</th>
                <th scope="col" className="px-6 py-3">Color</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Delete</th>
                <th scope="col" className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <Tablerow key={index} item={item} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table;
