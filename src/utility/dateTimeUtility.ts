import { formatDistanceToNow } from 'date-fns';

export const getTimeAgo = (timestamp: string | number) => {
	return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};
