import { useState } from 'react';
import useEmailValidator from '../../app/hooks/useEmailValidator';
import PageHeader from '../PageHeader/PageHeader';
import styles from './AddClassPage.module.css';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../Authentication/authSlice';
import { useCreateClassMutation } from '../../app/apiSlice';
import { useNavigate } from 'react-router-dom';
import { getAxiosErrorMessage, getQueryErrorMessage } from '../../utility/errorHandlingUtility';
import StudentListDisplay from '../StudentListDisplay/StudentListDisplay';

interface CreateClassFormFields extends HTMLFormControlsCollection {
	classname: HTMLInputElement;
	classDescription: HTMLTextAreaElement;
}

interface CreateClassFormElements extends HTMLFormElement {
	readonly elements: CreateClassFormFields;
}

const AddClassPage = () => {
	const [email, setEmail] = useState('');
	const [isEmailValid, emailValidator] = useEmailValidator(true);
	const [students, setStudents] = useState<string[]>([]);
	const [addStudentActionError, setAddStudentActionError] = useState<string>('');
	const [className, setClassName] = useState('');
	const [isClassNameValid, setIsClassNameValid] = useState(true);
	const [isFormTouched, setIsFormTouched] = useState(false);
	const user = useAppSelector(selectUser);
	const [createClass, { isLoading, isError, error }] = useCreateClassMutation();
	const navigate = useNavigate();

	const classNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const className = event.target.value.trim();
		setClassName(event.target.value);
		setIsFormTouched(true);
		if (!className) {
			setIsClassNameValid(false);
		} else {
			setIsClassNameValid(true);
		}
	};

	const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setAddStudentActionError('');
		const email = event.target.value;
		setEmail(email);
		setIsFormTouched(true);
		emailValidator(event);
	};

	const addStudentHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		try {
			const response = await axios.post(
				'http://localhost:5000/users/check-student',
				{
					email,
				},
				{
					headers: {
						Authorization: `Bearer ${user!.token}`,
					},
				}
			);
			if (response.data.exists) {
				setStudents((prevStudents) => {
					if (!prevStudents.find((student) => student === email)) {
						return [...prevStudents, email];
					} else {
						return prevStudents;
					}
				});
				setEmail('');
			}
		} catch (error) {
			setAddStudentActionError(getAxiosErrorMessage(error));
			console.log('Error in Adding Student', error);
		}
	};

	const removeStudentHandler = (studentEmail: string, event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		setStudents((prevStudents) => prevStudents.filter((student) => student !== studentEmail));
	};

	const onSubmitHandler = async (event: React.FormEvent<CreateClassFormElements>) => {
		event.preventDefault();
		const elements = event.currentTarget.elements;
		const title = elements.classname.value;
		const description = elements.classDescription.value;

		if (title) {
			try {
				await createClass({ title, description, students }).unwrap();
				navigate('/app/classes');
			} catch (error) {
				console.log('Error during creation of New Class:', error);
			}
		}
	};

	const emailValidationMessage = !isEmailValid && <p className='error-message'>Please enter a valid email</p>;
	let classNameErrorMessage = null;
	if (!isClassNameValid) {
		classNameErrorMessage = <p className='error-message'>Class Name should not be Empty.</p>;
	}

	const addStudentActionErrorMessage = addStudentActionError ? <p className='error-message'>{addStudentActionError}</p> : '';
	const createClassActionErrorMessage = isError ? <p className='error-message'>{getQueryErrorMessage(error)}</p> : null;

	const isCreateClassButtonDisabled = !isFormTouched || !isClassNameValid || !className || !isEmailValid || isLoading;
	const isAddStudentButtonDisabled = !isEmailValid || !email;

	return (
		<>
			<PageHeader title='Add Class' />
			<div className={styles['add-class-form-container']}>
				<form onSubmit={onSubmitHandler}>
					<div className={styles['add-class-form-field']}>
						<label htmlFor='classname'>Class Name</label>
						<input
							id='classname'
							name='classname'
							type='text'
							value={className}
							onChange={classNameChangeHandler}
							className={!isClassNameValid ? 'invalid-input' : ''}
						/>
						{classNameErrorMessage}
					</div>
					<div className={styles['add-class-form-field']}>
						<label htmlFor='student-id-input'>Student Email</label>
						<input
							id='student-id-input'
							name='student-id'
							type='email'
							value={email}
							onChange={emailChangeHandler}
							className={!isEmailValid ? 'invalid-input' : ''}
						/>
						<div>{emailValidationMessage}</div>
						<button
							type='button'
							className={styles['add-student-button']}
							disabled={isAddStudentButtonDisabled}
							onClick={addStudentHandler}
						>
							Add Student to Class
						</button>
						{addStudentActionErrorMessage}
						<StudentListDisplay
							students={students}
							removeStudentHandler={removeStudentHandler}
						/>
					</div>
					<div className={styles['add-class-form-field']}>
						<label htmlFor='classDescription'>Class Description</label>
						<textarea
							id='classDescription'
							name='classDescription'
							className={styles['class-description-area']}
						/>
					</div>
					<button
						className={styles['create-class-button']}
						disabled={isCreateClassButtonDisabled}
					>
						Create Class
					</button>
					{createClassActionErrorMessage}
				</form>
			</div>
		</>
	);
};

export default AddClassPage;
