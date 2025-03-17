import { useState } from 'react';
import styles from './FloatingAddMenu.module.css';

const FloatingAddMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const actionNames = ['Add Class', 'Add Lesson', 'Add Assignment', 'Add Task'];

	const toggleMenu = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	let floatingMenu = (
		<div className={`${styles['floating-add-menu']} ${styles[isMenuOpen ? 'menu-open' : '']}`}>
			{actionNames.map((actionName, index) => {
				return (
					<button
						key={index}
						className={styles['floating-add-menu-item']}
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
					{' '}
					+{' '}
				</button>
			</div>
		</>
	);
};

export default FloatingAddMenu;
