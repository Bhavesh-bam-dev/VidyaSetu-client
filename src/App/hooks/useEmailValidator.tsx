import { useState } from 'react';

const useEmailValidator = (defaultState: boolean): [boolean, React.ChangeEventHandler, string] => {
	const [isValid, setIsValid] = useState(defaultState);
	const [email, setEmail] = useState('');

	const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const emailValue = e.target.value;
		setEmail(emailValue);
		if (emailRegex.test(emailValue)) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	};

	return [isValid, emailChangeHandler, email];
};

export default useEmailValidator;
