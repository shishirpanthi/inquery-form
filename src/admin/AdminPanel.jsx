import React, { useEffect, useState } from "react";
import styles from "./AdminPanel.module.css";

function getRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay > 0) return diffDay === 1 ? "1 day ago" : `${diffDay} days ago`;
  if (diffHr > 0) return diffHr === 1 ? "1 hour ago" : `${diffHr} hours ago`;
  if (diffMin > 0)
    return diffMin === 1 ? "1 minute ago" : `${diffMin} minutes ago`;
  return "Just now";
}

const API = "/api/inquiry";

const AdminPanel = ({ token, onLogout }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data);
        setLoading(false);
      })
      .catch(() => setError("Failed to fetch inquiries"));
  }, [token]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(() => setInquiries((prev) => prev.filter((q) => q._id !== id)))
      .catch(() => setError("Delete failed"));
  };

  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelHeader}>
        <h2>Admin Panel</h2>
        <button onClick={onLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <table className={styles.inquiryTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Study Level</th>
              <th>Interested For</th>
              <th>Other Field</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((q) => (
              <tr key={q._id}>
                <td>{q.fullName}</td>
                <td>{q.mobile}</td>
                <td>{q.email}</td>
                <td>{q.address}</td>
                <td>{q.studyLevel}</td>
                <td>{q.interestedFor}</td>
                <td>{q.otherField}</td>
                <td>
                  {new Date(q.createdAt).toLocaleString()}
                  <br />
                  <span style={{ color: "#888", fontSize: "0.95em" }}>
                    {getRelativeTime(q.createdAt)}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
