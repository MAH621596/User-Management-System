import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api";
import type { User } from "./types";

const Users: React.FC = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    age: 0
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
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="custom-input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="custom-input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="custom-input"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
        />

        <button type="submit" className="sbmit-bttn">
          {form.id ? "Update" : "Create"}
        </button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span className="user_info">
              {user.name} - {user.email} - {user.age}
            </span>
            <button className="row-bttns" onClick={() => handleEdit(user)}>Edit</button>
            <button className="row-bttns" onClick={() => handleDelete(user.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
