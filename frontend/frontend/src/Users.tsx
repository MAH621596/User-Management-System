import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api";
import type { User } from "./types";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.id) {
      await updateUser(form.id, form);
    } else {
      await createUser(form);
    }

    setForm({ name: "", email: "", age: 0 });
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setForm(user);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="users-container">
      {/* Form Card */}
      <div className="form-card">
          <h2>Users Management System</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            className="custom-input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="custom-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="custom-input"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
            required
          />
          <button type="submit" className="submit-btn">
            {form.id ? "Update" : "Create"}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="users-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-info">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <span>Age: {user.age}</span>
            </div>
            <div className="user-actions">
              <button className="action-btn edit-btn" onClick={() => handleEdit(user)}>Edit</button>
              <button className="action-btn delete-btn" onClick={() => handleDelete(user.id!)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
