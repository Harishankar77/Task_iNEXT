import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/h2/user/getalluser")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleView = (id) => {
    navigate(`/userview/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/useredit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:4000/api/h2/user/deleteuser/${id}`)
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Go Home Button */}
        <div className="flex justify-start mb-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-800">
          Registered Users
        </h2>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow rounded-lg">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="py-3 px-4 border text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="py-3 px-4 border text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        DOB
                      </th>
                      <th className="py-3 px-4 border text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="py-3 px-4 border text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="py-3 px-4 border text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="py-3 px-4 border text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr
                          key={user._id}
                          className="whitespace-nowrap text-center odd:bg-white even:bg-gray-50"
                        >
                          <td className="py-3 px-4 border text-xs sm:text-sm text-gray-700">
                            {index + 1}
                          </td>
                          <td className="py-3 px-4 border text-xs sm:text-sm text-gray-700">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="py-3 px-4 border text-xs sm:text-sm text-gray-700">
                            {new Date(user.dob).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 border text-xs sm:text-sm text-gray-700">
                            {user.address}
                          </td>
                          <td className="py-3 px-4 border text-xs sm:text-sm text-gray-700">
                            {user.email}
                          </td>
                          <td className="py-3 px-4 border text-xs sm:text-sm text-gray-700">
                            {user.phone}
                          </td>
                          <td className="py-3 px-4 border text-center">
                            <button
                              onClick={() => handleView(user._id)}
                              className="bg-green-500 text-white px-2 py-1 rounded mr-1 text-xs sm:text-sm"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(user._id)}
                              className="bg-yellow-500 text-white px-2 py-1 rounded mr-1 text-xs sm:text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-4 border text-center text-xs sm:text-sm text-gray-700"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
