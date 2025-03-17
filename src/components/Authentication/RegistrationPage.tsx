import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { registerUser, selectAuthError, selectAuthLoading } from './authSlice';
import styles from './RegistrationPage.module.css';
import useEmailValidator from '../../app/hooks/useEmailValidator';

interface RegisterFormFields extends HTMLFormControlsCollection {
	email: HTMLInputElement;
	password: HTMLInputElement;
	role: HTMLSelectElement;
}

interface RegisterFormElements extends HTMLFormElement {
	readonly elements: RegisterFormFields;
}

const RegistrationPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const authError = useSelector(selectAuthError);
	const authLoading = useSelector(selectAuthLoading);

	const [isMinLengthPassword, setIsMinLengthPassword] = useState(true);
	const [isContainsSpecialCharPassword, setIsContainsSpecialCharPassword] = useState(true);
	const [isContainsNumPassword, setIsContainsNumPassword] = useState(true);
	const [isContainsLetterPassword, setIsContainsLetterPassword] = useState(true);
	const [isEmailValid, emailValidator, email] = useEmailValidator(true);
	const [isFormTouched, setIsFormTouched] = useState(false);
	const [password, setPassword] = useState('');
	const isPasswordValid = isMinLengthPassword && isContainsSpecialCharPassword && isContainsNumPassword && isContainsLetterPassword;

	const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsFormTouched(true);
		emailValidator(e);
	};

	const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const minLengthRegex = /.{8,}/; // At least 8 characters
		const hasLetterRegex = /[A-Za-z]/; // At least one letter
		const hasNumberRegex = /\d/; // At least one digit
		const hasSpecialCharRegex = /[@$!%*?&]/; // At least one special character
		const passwordValue = e.target.value;

		setIsFormTouched(true);
		setPassword(passwordValue);

		if (!minLengthRegex.test(passwordValue)) {
			setIsMinLengthPassword(false);
		} else {
			setIsMinLengthPassword(true);
		}

		if (!hasLetterRegex.test(passwordValue)) {
			setIsContainsLetterPassword(false);
		} else {
			setIsContainsLetterPassword(true);
		}

		if (!hasNumberRegex.test(passwordValue)) {
			setIsContainsNumPassword(false);
		} else {
			setIsContainsNumPassword(true);
		}

		if (!hasSpecialCharRegex.test(passwordValue)) {
			setIsContainsSpecialCharPassword(false);
		} else {
			setIsContainsSpecialCharPassword(true);
		}
	};

	const registerUserHandler = async (event: React.FormEvent<RegisterFormElements>) => {
		event.preventDefault();

		const elements = event.currentTarget.elements;
		const { email, role, password } = elements;

		try {
			await dispatch(
				registerUser({
					email: email.value,
					role: role.value,
					password: password.value,
				})
			).unwrap();
			navigate('/login');
		} catch (error) {
			console.log('Error in Register', error);
		}
	};

	const emailValidationMessage = !isEmailValid && <p className='error-message'>Please enter a valid email</p>;

	const minLengthPasswordValidationMsg = !isMinLengthPassword && <p className='error-message'>Password must be at least 8 characters long</p>;
	const letterPasswordValidationMessage = !isContainsLetterPassword && <p className='error-message'>Password must contain at least one letter</p>;
	const numberPasswordValidationMessage = !isContainsNumPassword && <p className='error-message'>Password must contain at least one number</p>;
	const specialCharPasswordValidationMessage = !isContainsSpecialCharPassword && (
		<p className='error-message'>Password must contain at least one special character</p>
	);

	const passwordValidationMessage = (
		<div className={styles['password-validation-message-container']}>
			{minLengthPasswordValidationMsg}
			{letterPasswordValidationMessage}
			{numberPasswordValidationMessage}
			{specialCharPasswordValidationMessage}
		</div>
	);

	return (
		<div className={styles['register-form-container']}>
			<h2 className={styles['register-title-text']}>Register</h2>
			<form
				className={styles['register-form']}
				onSubmit={registerUserHandler}
			>
				<div className={styles['register-form-field']}>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						name='email'
						type='email'
						value={email}
						required
						spellCheck='false'
						onChange={emailChangeHandler}
						className={!isEmailValid ? 'invalid-input' : ''}
					/>
					<div className={styles['email-validation-message-container']}>
						{emailValidationMessage}
						{authError && authError.code === 'EMAIL_ALREADY_EXISTS' ? <p className='error-message'>{authError.error}</p> : null}
					</div>
				</div>
				<div className={styles['register-form-field']}>
					<label htmlFor='role'>Role</label>
					<select
						id='role'
						name='role'
						required
						defaultValue='teacher'
						className={styles['role-select']}
					>
						<option value='teacher'>Teacher</option>
						<option value='student'>Student</option>
					</select>
				</div>
				<div className={styles['register-form-field']}>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						name='password'
						type='password'
						value={password}
						required
						onChange={passwordChangeHandler}
						className={!isPasswordValid ? 'invalid-input' : ''}
					/>
					{passwordValidationMessage}
				</div>
				<button
					className={styles['register-button']}
					disabled={!(isFormTouched && isEmailValid && isPasswordValid && email && password) || authLoading}
				>
					Register
				</button>
			</form>
			<div className={styles['login-text-container']}>
				<span>
					Already An User?{' '}
					<Link
						className='link'
						to='/login'
					>
						Login Here
					</Link>
				</span>
			</div>
		</div>
	);
};

export default RegistrationPage;
