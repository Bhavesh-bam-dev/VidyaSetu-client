import PillButton from './PillButton';
import styles from './StudentListDisplay.module.css';

const StudentListDisplay = ({
	students,
	removeStudentHandler,
}: {
	students: string[];
	removeStudentHandler: (studentEmail: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
	let studentList = null;
	if (students.length > 0) {
		studentList = (
			<ul className={styles['student-list']}>
				{students.map((student) => (
					<PillButton
						label={student}
						clickHandler={removeStudentHandler}
						key={student}
					/>
				))}
			</ul>
		);
	}
	return studentList;
};

export default StudentListDisplay;
