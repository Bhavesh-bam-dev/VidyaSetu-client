import { Outlet } from 'react-router-dom';
import HeroSection from '../HeroSection/HeroSection';

const AuthLayout = () => {
	return (
		<div>
			<HeroSection />
			<Outlet />
		</div>
	);
};

export default AuthLayout;
