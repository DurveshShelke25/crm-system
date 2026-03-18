import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [leads, setLeads] = useState([]);

  // Fetch leads
  const getLeads = async () => {
    const res = await axios.get("http://localhost:5000/leads");
    setLeads(res.data);
  };

  useEffect(() => {
    getLeads();
  }, []);

  // Add lead
  const addLead = async () => {
    await axios.post("http://localhost:5000/leads", {
      name,
      email,
      status: "New"
    });
    alert("Lead Added");
    setName("");
    setEmail("");
    getLeads();
  };

  // Delete lead
  const deleteLead = async (id) => {
    await axios.delete(`http://localhost:5000/leads/${id}`);
    getLeads();
  };

  // Update lead
  const updateStatus = async (id) => {
    await axios.put(`http://localhost:5000/leads/${id}`, {
      status: "Contacted"
    });
    getLeads();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRM System</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <button onClick={addLead}>Add Lead</button>

      <h3>Leads List</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>
                <button onClick={() => updateStatus(lead._id)}>
                  Update
                </button>
              </td>
              <td>
                <button onClick={() => deleteLead(lead._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;