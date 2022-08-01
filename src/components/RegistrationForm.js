import React, { useRef, useReducer } from "react";
import classes from "./RegistrationForm.module.css";

const RegistrationForm = (props) => {
	const firstName = useRef();
	const lastName = useRef();
	const email = useRef();

	const clearForm = () => {
		firstName.current.value = "";
		lastName.current.value = "";
		email.current.value = "";
	};

	const setFormValidity = (state, action) => {
		let newState = {
			firstName: true,
			lastName: true,
			email: true,
			form: false,
			submitted: false,
		};

		const { type, data } = { ...action };

		if (type === "submit") {
			newState = { ...newState, submitted: true };

			if (data.firstName.current.value.length === 0) {
				newState = { ...newState, firstName: false };
			}
			if (data.lastName.current.value.length === 0) {
				newState = { ...newState, lastName: false };
			}
			if (!data.email.current.value.includes("@")) {
				newState = { ...newState, email: false };
			}

			if (newState.firstName && newState.lastName && newState.email) {
				newState = { ...newState, form: true, submitted: false };
			}
		}

		return newState;
	};

	// USEREDUCER - Set Form Validity
	const [isValid, dispatch] = useReducer(setFormValidity, {
		firstName: true,
		lastName: true,
		email: true,
		form: false,
		submitted: false,
	});

	const successBanner = (
		<p className={classes["success-banner"]}>
			Success! Thank you for registering
		</p>
	);

	const invalidFirstName = (
		<p className={classes["form-validation-error"]}>
			Please enter a first name
		</p>
	);

	const invalidLastName = (
		<p className={classes["form-validation-error"]}>Please enter a last name</p>
	);

	const invalidEmail = (
		<p className={classes["form-validation-error"]}>
			Please enter a email address
		</p>
	);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		dispatch({
			type: "submit",
			data: {
				firstName,
				lastName,
				email,
			},
		});
	};

	return (
		<form className={classes["registration-form"]}>
			{isValid.form && successBanner}
			<input
				ref={firstName}
				className={classes["registration-form-text"]}
				type="text"
				placeholder="First Name"
			/>
			{!isValid.firstName && isValid.submitted && invalidFirstName}
			<input
				ref={lastName}
				className={classes["registration-form-text"]}
				type="text"
				placeholder="Last Name"
			/>
			{!isValid.lastName && isValid.submitted && invalidLastName}
			<input
				ref={email}
				className={classes["registration-form-text"]}
				type="text"
				placeholder="Email"
			/>
			{!isValid.email && isValid.submitted && invalidEmail}
			<button className={classes["form-cta-btn"]} onClick={handleFormSubmit}>
				Register
			</button>
		</form>
	);
};

export default RegistrationForm;
