import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.css';
import Profile from '../Profile/Profile';
import SideMenu from '../SideMenu/SideMenu';
import FloatingAddMenu from '../FloatingAddMenu/FloatingAddMenu';

const DashboardLayout = () => {
	return (
		<div className={styles['app-container']}>
			<div className={styles['sidebar-container']}>
				<Profile />
				<SideMenu />
			</div>
			<div className={styles['content-container']}>
				<Outlet />
				<FloatingAddMenu />
			</div>
		</div>
	);
};

export default DashboardLayout;
