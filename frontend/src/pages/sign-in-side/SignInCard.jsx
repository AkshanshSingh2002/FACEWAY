import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Checkbox from "@mui/material/Checkbox";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
// import ForgotPassword from "./ForgotPassword.jsx";
import { SitemarkIcon } from "./CustomIcons.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import Snackbar from "@mui/material/Snackbar";

const Card = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignSelf: "center",
	width: "100%",
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
	[theme.breakpoints.up("sm")]: {
		width: "450px",
	},
	...theme.applyStyles("dark", {
		boxShadow:
			"hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
	}),
}));

export default function SignInCard() {
	const [name, setName] = React.useState();
	const [username, setUsername] = React.useState();
	const [password, setPassword] = React.useState();

	const [error, setError] = React.useState();
	const [message, setMessage] = React.useState();

	const [formState, setFormState] = React.useState(0);
	const [open, setOpen] = React.useState(false);

	const { handleRegister, handleLogin } = React.useContext(AuthContext);

	let handleAuth = async () => {
		try {
			if (formState === 0) {
				let result = await handleLogin(username, password);
				console.log(result);
			}

			if (formState === 1) {
				let result = await handleRegister(name, username, password);
				console.log(result);
				setUsername("");
				setMessage(result);
				setOpen(true);
				setError("")
				setFormState(0)
				setPassword("")
			}
		} catch (err) {
			console.error(err);
			let message = err.response.data.message;
			setError(message);
		}
	};

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	// const handleClose = () => {
	// 	setOpen(false);
	// };

	// const handleSubmit = (event) => {
	// 	if (usernameError || passwordError) {
	// 		event.preventDefault();
	// 		return;
	// 	}
	// 	const data = new FormData(event.currentTarget);
	// 	console.log({
	// 		email: data.get("username"),
	// 		password: data.get("password"),
	// 	});
	// };

	// const validateInputs = () => {
	// 	const username = document.getElementById("username");
	// 	const password = document.getElementById("password");

	// 	let isValid = true;

	// 	if (!username.value) {
	// 		setUsernameError(true);
	// 		setUsernameErrorMessage("Please enter a valid Username.");
	// 		isValid = false;
	// 	} else {
	// 		setUsernameError(false);
	// 		setUsernameErrorMessage("");
	// 	}

	// 	if (!password.value || password.value.length < 6) {
	// 		setPasswordError(true);
	// 		setPasswordErrorMessage("Password must be at least 6 characters long.");
	// 		isValid = false;
	// 	} else {
	// 		setPasswordError(false);
	// 		setPasswordErrorMessage("");
	// 	}

	// 	return isValid;
	// };

	return (
		<Card variant="outlined">
			<Box sx={{ display: { xs: "flex", md: "none" } }}>
				<SitemarkIcon />
			</Box>

			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
					<LockOutlinedIcon />
				</Avatar>
			</Box>

			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					mb: 2,
				}}
			>
				<Button
					onClick={() => setFormState(0)}
					variant={formState === 0 ? "contained" : ""}
					sx={{
						borderRadius: "8px 0 0 8px",
						textTransform: "none",
						backgroundColor: formState === 0 ? "#ffffff" : "transparent",
						color: formState === 0 ? "#000" : "#fff",
						boxShadow: formState === 0 ? 2 : "none",
						"&:hover": {
							backgroundColor:
								formState === 0 ? "#f5f5f5" : "rgba(255, 255, 255, 0.1)",
						},
					}}
				>
					Sign In
				</Button>
				<Button
					onClick={() => setFormState(1)}
					variant={formState === 1 ? "contained" : ""}
					sx={{
						borderRadius: "0 8px 8px 0",
						textTransform: "none",
						backgroundColor: formState === 1 ? "#ffffff" : "transparent",
						color: formState === 1 ? "#000" : "#fff",
						boxShadow: formState === 1 ? 2 : "none",
						"&:hover": {
							backgroundColor:
								formState === 1 ? "#f5f5f5" : "rgba(255, 255, 255, 0.1)",
						},
					}}
				>
					Sign Up
				</Button>
			</Box>

			<Box
				component="form"
				// onSubmit={handleSubmit}
				noValidate
				sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
			>
				{formState === 1 ? (
					<FormControl>
						<FormLabel htmlFor="fullname">Full Name</FormLabel>
						<TextField
							error={setError}
							helperText={setMessage}
							id="fullname"
							type="fullname"
							name="fullname"
							placeholder="fullname"
							autoComplete="fullname"
							value={name}
							autoFocus
							required
							fullWidth
							variant="outlined"
							color={setError ? "error" : "primary"}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>
				) : (
					<></>
				)}

				<FormControl>
					<FormLabel htmlFor="username">Username</FormLabel>
					<TextField
						error={setError}
						helperText={setMessage}
						id="username"
						type="username"
						name="username"
						placeholder="username"
						autoComplete="username"
						autoFocus
						value={username}
						required
						fullWidth
						variant="outlined"
						color={setError ? "error" : "primary"}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</FormControl>

				<FormControl>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<FormLabel htmlFor="password">Password</FormLabel>
						{/* <Link
							component="button"
							type="button"
							onClick={handleClickOpen}
							variant="body2"
							sx={{ alignSelf: "baseline" }}
						>
							Forgot your password?
						</Link> */}
					</Box>
					<TextField
						error={setError}
						helperText={setMessage}
						name="password"
						placeholder="••••••"
						type="password"
						id="password"
						autoComplete="current-password"
						autoFocus
						value={password}
						required
						fullWidth
						variant="outlined"
						color={setError ? "error" : "primary"}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormControl>

				{/* <FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				<ForgotPassword open={open} handleClose={handleClose} /> */}

				<p style={{ color: "red" }}>{error}</p>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					onClick={handleAuth}
					// onClick={validateInputs}
				>
					{formState === 0 ? "Sign In" : "Sign Up"}
				</Button>

				{/* <Typography sx={{ textAlign: "center" }}>
					Don&apos;t have an account?{" "}
					<span>
						<Link
							href="/material-ui/getting-started/templates/sign-in/"
							variant="body2"
							sx={{ alignSelf: "center" }}
						>
							Sign up
						</Link>
					</span>
				</Typography> */}
			</Box>

			<Snackbar open={open} autoHideDuration={4000} message={message} />
		</Card>
	);
}
