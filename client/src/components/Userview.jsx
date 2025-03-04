import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/h2/user/getuser/${id}`)
      .then((response) => {
        const fetchedUser = response.data.user || response.data;
        if (!fetchedUser) {
          setError("No user data received.");
        } else {
          setUser(fetchedUser);
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

  if (!user) {
    return <div className="text-center mt-4">Loading user details...</div>;
  }

  const photoSrc =
    user.photo && user.photo.startsWith("http")
      ? user.photo
      : user.photo
      ? `http://localhost:4000/${user.photo}`
      : null;

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-semibold text-center text-green-800 mb-8">
        User Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="divide-x divide-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">ID</td>
              <td className="px-4 py-3 text-gray-900">{user._id}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                First Name
              </td>
              <td className="px-4 py-3 text-gray-900">{user.firstName}</td>
            </tr>

            <tr className="divide-x divide-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Last Name</td>
              <td className="px-4 py-3 text-gray-900">{user.lastName}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Date of Birth
              </td>
              <td className="px-4 py-3 text-gray-900">
                {new Date(user.dob).toLocaleDateString()}
              </td>
            </tr>

            <tr className="divide-x divide-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Address</td>
              <td className="px-4 py-3 text-gray-900">{user.address}</td>
              <td className="px-4 py-3 font-medium text-gray-700">Email</td>
              <td className="px-4 py-3 text-gray-900">{user.email}</td>
            </tr>

            <tr className="divide-x divide-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">Phone</td>
              <td className="px-4 py-3 text-gray-900">{user.phone}</td>
              <td className="px-4 py-3 font-medium text-gray-700">Photo</td>
              <td className="px-4 py-3 text-gray-900">
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt="User"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ) : (
                  "No photo provided"
                )}
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium text-gray-700" colSpan="4">
                <span className="mr-2">Registered At:</span>
                <span className="text-gray-900">
                  {new Date(user.createdAt).toLocaleString()}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-center">
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

export default UserView;
