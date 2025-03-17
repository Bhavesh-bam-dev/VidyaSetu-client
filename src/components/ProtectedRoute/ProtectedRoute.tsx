import { useSelector } from 'react-redux';
import { selectUser } from '../Authentication/authSlice';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
	const user = useSelector(selectUser);

	return user ? (
		<Outlet />
	) : (
		<Navigate
			to='/login'
			replace
		/>
	);
};

export default ProtectedRoute;
