import styles from './PillButton.module.css';

const PillButton = (props: { label: string; clickHandler: (studentEmail: string, event: React.MouseEvent<HTMLButtonElement>) => void }) => {
	return (
		<li className={styles['pill-button']}>
			<span className={styles['pill-button-label']}>{props.label}</span>
			<button
				onClick={(event) => props.clickHandler(props.label, event)}
				className={styles['cancel-button']}
			></button>
		</li>
	);
};

export default PillButton;
