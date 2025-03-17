import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../Authentication/authSlice';
import styles from './Profile.module.css';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';

const Profile = () => {
	const user = useAppSelector(selectUser);

	const avatar = createAvatar(initials, { seed: user?.email, scale: 50 });

	return (
		<div className={styles['profile-container']}>
			<div className={styles['profile-img-container']}>
				<img
					src={avatar.toDataUri()}
					alt='avatar'
				/>
			</div>
			{user ? (
				<div className={styles['profile-text-container']}>
					<p className={styles['profile-email-text']}>{user.email}</p>
					<p>{user.role}</p>
				</div>
			) : (
				<p>User not found</p>
			)}
		</div>
	);
};

export default Profile;
