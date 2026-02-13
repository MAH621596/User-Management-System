import axios from "axios";
import type { User } from "./types";

const API_URL = "http://localhost:5000/users";

export const getUsers = () => axios.get<User[]>(API_URL);
export const getUser = (id: number) => axios.get<User>(`${API_URL}/${id}`);
export const createUser = (data: User) => axios.post(API_URL, data);
export const updateUser = (id: number, data: User) => axios.put(`${API_URL}/${id}`, data);
export const deleteUser = (id: number) => axios.delete(`${API_URL}/${id}`);
