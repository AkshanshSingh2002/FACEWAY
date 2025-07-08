import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing.jsx";
import Authentication from "./pages/authentication.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import VideoMeetComponent from "./pages/VideoMeet.jsx";
import "./App.css";
import HomeComponent from "./pages/home.jsx";
import History from "./pages/history.jsx";

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/auth" element={<Authentication />} />
						<Route path="/home"s element={<HomeComponent />} />
						<Route path="/history" element={<History />} />
						<Route path="/:url" element={<VideoMeetComponent/>} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
