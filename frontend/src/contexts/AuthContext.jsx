import React from "react";
import axios from "axios";
import httpStatus from "http-status";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useContext } from "react";

export const AuthContext = createContext({});

const client = axios.create({
	baseURL: "http://localhost:8000/api/v1/users",
});

export const AuthProvider = ({ children }) => {
	const authContext = useContext(AuthContext);

	const [userData, setUserData] = React.useState(authContext);

	const router = useNavigate();

	const handleRegister = async (name, username, password) => {
		try {
			let request = await client.post("/register", {
				name: name,
				username: username,
				password: password,
			});
			if (request.status === httpStatus.CREATED) {
				return request.data.message;
			}
		} catch (err) {
			throw new Error(err.response.data.message || "Registration failed");
		}
	};

	const handleLogin = async (username, password) => {
		try {
			let request = await client.post("/login", {
				username: username,
				password: password,
			});

			if (request.status === httpStatus.OK) {
				localStorage.setItem("token", request.data.token);
				router("/home");
			}
		} catch (err) {
			throw new Error(err.response.data.token || "Login failed");
		}
	};

	const getHistoryOfUser = async () => {
		try {
			let request = await client.get("/get_all_activity", {
				params: {
					token: localStorage.getItem("token"),
				},
			});
			return request.data;
		} catch (err) {
            throw new Error(
				err.response?.data?.message || "Failed to get user history"
			);
        }
	};

	const addToUserHistory = async (meetingCode) => {
		try {
			let request = await client.get("/add_to_activity", {
				token: localStorage.getItem("token"),
				meeting_code: meetingCode,
			});
			return request;
		} catch (err) {
			throw new Error(
				err.response?.data?.message || "Failed to add to user history"
			);
		}
	};

	const data = {
		userData,
		setUserData,
		getHistoryOfUser,
		addToUserHistory,
		handleRegister,
		handleLogin,
	};

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
