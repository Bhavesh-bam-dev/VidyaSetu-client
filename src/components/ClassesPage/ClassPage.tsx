import { useParams } from 'react-router-dom';
import { useGetClassByIdQuery } from '../../app/apiSlice';
import styles from './ClassPage.module.css';
import { getQueryErrorMessage } from '../../utility/errorHandlingUtility';
import StudentListDisplay from '../StudentListDisplay/StudentListDisplay';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const ClassPage = () => {
	const { classId } = useParams();
	const { data: classData, isError, error, isLoading, isFetching, isSuccess } = useGetClassByIdQuery(classId!);
	const [showModal, setShowModal] = useState({ show: false, student: '' });

	const removeStudentHandler = (studentEmail: string, event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setShowModal({ show: true, student: studentEmail });
	};

	if (isSuccess) {
		return (
			<div className={styles['classpage-container']}>
				<h1 className={styles['classpage-title']}>{classData.title}</h1>
				<p className={styles['classpage-description']}>{classData.description}</p>
				<StudentListDisplay
					students={classData.students}
					removeStudentHandler={removeStudentHandler}
				/>
				{showModal.show && (
					<ConfirmationModal
						modalTitle='Delete Student from Class'
						modalDetails='Once you deleted the student, you can not undo this Action, Are you sure you want to delete the Student?'
						modalActionName='Delete'
					/>
				)}
			</div>
		);
	} else if (isLoading) {
		return <p>Loading...</p>;
	} else if (isError) {
		return <p className='error-message'>{getQueryErrorMessage(error)}</p>;
	}
	return null;
};

export default ClassPage;
