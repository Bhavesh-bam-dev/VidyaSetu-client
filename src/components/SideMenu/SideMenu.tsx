import styles from './SideMenu.module.css';

const SideMenu = () => {
	const menuItems = ['Classes', 'Tasks', 'Notifications', 'Settings'];

	return (
		<div className={styles['side-menu-container']}>
			<ul className={styles['side-menu-list']}>
				{menuItems.map((item, index) => {
					return (
						<li
							className={styles['side-menu-item']}
							key={index}
						>
							{item}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SideMenu;
