import { useNavigate } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../Authentication/authSlice';

const SideMenu = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const menuItems = ['Classes', 'Tasks', 'Notifications', 'Settings', 'Logout'];
	const navigationPaths = ['/app/classes', '', '', '', ''];

	const menuItemClickHandler = (index: number) => {
		if (index === 4) {
			dispatch(logout());
		} else {
			navigate(navigationPaths[index]);
		}
	};

	return (
		<div className={styles['side-menu-container']}>
			<ul className={styles['side-menu-list']}>
				{menuItems.map((item, index) => {
					return (
						<li
							className={styles['side-menu-item']}
							key={index}
							onClick={() => menuItemClickHandler(index)}
						>
							<a>{item}</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SideMenu;
