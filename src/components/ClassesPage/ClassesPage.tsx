import { useGetClassesQuery } from '../../app/apiSlice';
import { getQueryErrorMessage } from '../../utility/errorHandlingUtility';
import PageHeader from '../PageHeader/PageHeader';
import ClassCard from './ClassCard';
import styles from './ClassesPage.module.css';

const ClassesPage = () => {
	const { data: classes, isFetching, isLoading, isError, error } = useGetClassesQuery();

	if (isLoading) {
		return <p>Loading..</p>;
	}

	if (isFetching) {
		return <p>Updating...</p>;
	}

	if (isError) {
		return <p>{getQueryErrorMessage(error)}</p>;
	}

	let classList = null;
	if (classes) {
		classList = classes.map((classItem) => (
			<ClassCard
				class={classItem}
				key={classItem.classId}
			/>
		));
	}
	return (
		<div>
			<PageHeader title='Classes' />
			<div className={styles['classes-container']}>{classList}</div>
		</div>
	);
};

export default ClassesPage;
