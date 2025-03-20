import { Link } from 'react-router-dom';
import { ServerClass } from '../../app/apiSlice';
import { getTimeAgo } from '../../utility/dateTimeUtility';
import styles from './ClassCard.module.css';

const ClassCard = (props: { class: ServerClass }) => {
	const timeAgo = getTimeAgo(props.class.createdAt);
	return (
		<div className={styles['class-card-container']}>
			<Link to={`/app/classes/${props.class.classId}`}>
				<img
					className={styles['class-card-cover']}
					src={`https://picsum.photos/seed/${props.class.title}/300/160`}
					alt='class cover'
				/>
			</Link>
			<div className={styles['class-card-info']}>
				<h3 className={styles['class-card-title']}>{props.class.title}</h3>
				<p className={styles['student-number']}>{props.class.students.length} students</p>
				<p className={styles['time-ago']}>{timeAgo}</p>
			</div>
		</div>
	);
};

export default ClassCard;
