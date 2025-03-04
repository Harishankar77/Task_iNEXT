import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // to use notification

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/h2/user/getuser/${id}`)
      .then((response) => {
        const fetchedUser = response.data.user || response.data;
        if (!fetchedUser) {
          setError("No user data received.");
        } else {
          setFormData({
            firstName: fetchedUser.firstName,
            lastName: fetchedUser.lastName,
            dob: new Date(fetchedUser.dob).toISOString().split("T")[0],
            address: fetchedUser.address,
            email: fetchedUser.email,
            phone: fetchedUser.phone,
            photo: fetchedUser.photo || "",
            createdAt: fetchedUser.createdAt, 
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setError("Error fetching user details.");
      });
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }
  if (!formData) {
    return <div className="text-center mt-4">Loading user details...</div>;
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to update user data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/api/h2/user/updateuser/${id}`, formData)
      .then((response) => {
        toast.success("User updated successfully!");
        navigate("/userlist");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Error updating user.");
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Edit User Details
      </h2>
      <form onSubmit={handleSubmit}>
        <table className="min-w-full border border-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="divide-x divide-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">ID</td>
              <td className="px-4 py-3 text-gray-900">{id}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                First Name
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </td>
            </tr>

            <tr className="divide-x divide-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Last Name</td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Date of Birth
              </td>
              <td className="px-4 py-3">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </td>
            </tr>

            <tr className="divide-x divide-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Address</td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-700">Email</td>
              <td className="px-4 py-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </td>
            </tr>

            <tr className="divide-x divide-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Phone</td>
              <td className="px-4 py-3">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-700">Photo URL</td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium text-gray-700" colSpan="4">
                Registered At:{" "}
                <span className="text-gray-900">
                  {new Date(formData.createdAt).toLocaleString()}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <Link
          to="/userlist"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Back to User List
        </Link>
      </div>
    </div>
  );
}

export default UserEdit;
