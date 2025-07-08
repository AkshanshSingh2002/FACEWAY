import React, { useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import { Button, IconButton, TextField } from "@mui/material";
import Restore from "@mui/icons-material/Restore";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
	let navigate = useNavigate();
	const [meetingCode, setMeetingCode] = useState("");

	const { addToUserHistory } = useContext(AuthContext);
	let handleJoinVideoCall = async () => {
		await addToUserHistory(meetingCode);
		navigate(`/${meetingCode}`);
	};

	return (
		<>
			<div className={styles.navBar}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<h2>FACEWAY</h2>
				</div>

				<div className={styles.buttonContainer}>
					<IconButton
						onClick={() => {
							navigate("/history");
						}}
					>
						<Restore />
					</IconButton>
					<p>History</p>
					<Button
						onClick={() => {
							localStorage.removeItem("token");
							navigate("/auth");
						}}
					>
						Logout
					</Button>
				</div>
			</div>

			<div className={styles.meetContainer}>
				<div className={styles.leftPanel}>
					<h2>Providing Quality Video Call</h2>
					<div style={{ display: "flex", gap: "10px" }}>
						<TextField
							id="outlined-basic"
							label="Meeting Code"
							variant="outlined"
							value={meetingCode}
							onChange={(e) => setMeetingCode(e.target.value)}
						/>
						<Button variant="contained" onClick={handleJoinVideoCall}>
							Join
						</Button>
					</div>
				</div>
				<div className={styles.rightPanel}>
					<img srcSet="/logo3.png" alt="" />
				</div>
			</div>
		</>
	);
}

const AuthHomeComponent = withAuth(HomeComponent);
export default AuthHomeComponent;
