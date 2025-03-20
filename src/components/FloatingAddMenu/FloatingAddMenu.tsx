import { useState } from 'react';
import styles from './FloatingAddMenu.module.css';
import { useNavigate } from 'react-router-dom';

const FloatingAddMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const actionNames = ['Add Class', 'Add Lesson', 'Add Assignment', 'Add Task'];
	const navigationPaths = ['/app/classes/new'];

	const toggleMenu = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	const menuOptionClickHandler = (index: number) => {
		navigate(navigationPaths[index]);
		setIsMenuOpen(false);
	};

	let floatingMenu = (
		<div className={`${styles['floating-add-menu']} ${styles[isMenuOpen ? 'menu-open' : '']}`}>
			{actionNames.map((actionName, index) => {
				return (
					<button
						key={index}
						className={styles['floating-add-menu-item']}
						onClick={() => menuOptionClickHandler(index)}
					>
						{actionName}
					</button>
				);
			})}
		</div>
	);

	return (
		<>
			{isMenuOpen && (
				<div
					className={styles['floating-add-menu-overlay']}
					onClick={toggleMenu}
				></div>
			)}
			<div className={styles['floating-add-menu-container']}>
				{floatingMenu}
				<button
					className={styles['add-button']}
					onClick={toggleMenu}
				>
					+
				</button>
			</div>
		</>
	);
};

export default FloatingAddMenu;
