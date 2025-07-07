import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing.jsx";
import Authentication from "./pages/authentication.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import VideoMeetComponent from "./pages/VideoMeet.jsx";
import "./App.css";
import HomeComponent from "./pages/home.jsx";

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/auth" element={<Authentication />} />
						<Route path="/home" element={<HomeComponent />} />
						<Route path="/:url" element={<VideoMeetComponent/>} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
