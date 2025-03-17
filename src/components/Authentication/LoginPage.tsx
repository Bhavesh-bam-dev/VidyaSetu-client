import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginUser, selectAuthError, selectAuthLoading } from './authSlice';
import styles from './LoginPage.module.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useEmailValidator from '../../app/hooks/useEmailValidator';

interface LoginFormFields extends HTMLFormControlsCollection {
	email: HTMLInputElement;
	password: HTMLInputElement;
}

interface LoginFormElements extends HTMLFormElement {
	readonly elements: LoginFormFields;
}

const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const authError = useSelector(selectAuthError);
	const authLoading = useSelector(selectAuthLoading);
	const [isEmailValid, emailValidator, email] = useEmailValidator(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [password, setPassword] = useState('');
	const [isFormTouched, setIsFormTouched] = useState(false);

	const loginHandler = async (event: React.FormEvent<LoginFormElements>) => {
		event.preventDefault();

		const elements = event.currentTarget.elements;
		const email = elements.email.value;
		const password = elements.password.value;

		try {
			await dispatch(
				loginUser({
					email,
					password,
				})
			).unwrap();
			navigate('/app');
		} catch (error) {
			console.log('Error in Login:', error);
		}
	};

	const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsFormTouched(true);
		emailValidator(e);
	};

	const paaswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsFormTouched(true);
		const passwordValue = e.target.value;
		setPassword(passwordValue);
		const isPasswordEmpty = passwordValue.length === 0;
		if (isPasswordEmpty) {
			setIsPasswordValid(false);
		} else {
			setIsPasswordValid(true);
		}
	};

	const emailValidationMessage = isEmailValid ? null : <p className='error-message'>Please enter a valid email</p>;
	const passwordValidationMessage = isPasswordValid ? null : <p className='error-message'>Please enter a valid password</p>;

	let loginErrorMessage = null;
	if (authError && authError.code === 'USER_DOES_NOT_EXISTS') {
		loginErrorMessage = <p className='error-message'>{authError.error}</p>;
	} else if (authError && authError.code === 'PASSWORD_NOT_MATCHING') {
		loginErrorMessage = <p className='error-message'>{authError.error}</p>;
	} else if (authError) {
		loginErrorMessage = <p className='error-message'>An Error Occurred</p>;
	}

	return (
		<div className={styles['login-form-container']}>
			<h2 className={styles['login-title-text']}>Login</h2>
			<form
				className={styles['login-form']}
				onSubmit={loginHandler}
			>
				<div className={styles['login-form-field']}>
					<label htmlFor='email'>Email</label>
					<input
						className={`styles['email-input'] ${!isEmailValid ? 'invalid-input' : ''}`}
						id='email'
						name='email'
						value={email}
						required
						spellCheck='false'
						onChange={emailChangeHandler}
					/>
					<div>{emailValidationMessage}</div>
				</div>
				<div className={styles['login-form-field']}>
					<label htmlFor='password'>Password</label>
					<input
						className={`styles['password-input'] ${!isPasswordValid ? 'invalid-input' : ''}`}
						id='password'
						name='password'
						type='password'
						value={password}
						required
						onChange={paaswordChangeHandler}
					/>
					<div>{passwordValidationMessage}</div>
				</div>
				<button
					className={styles['login-button']}
					disabled={!(isFormTouched && isEmailValid && isPasswordValid && email && password) || authLoading}
				>
					Login
				</button>
			</form>
			<div className={styles['login-error-message-container']}>{loginErrorMessage}</div>
			<div className={styles['register-text-container']}>
				<span>
					New User?{' '}
					<Link
						className='link'
						to='/register'
					>
						Register Here
					</Link>
				</span>
			</div>
		</div>
	);
};

export default LoginPage;
