import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const getQueryErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
	if (!error) return 'Unknown error occurred';

	if ('status' in error) {
		// This is a FetchBaseQueryError
		if (error.status === 'FETCH_ERROR') return 'Network error, please check your connection.';
		if (error.status === 'PARSING_ERROR') return 'Unexpected response from server.';

		const errData = error.data as { message?: string }; // API-specific error message
		return errData?.message || `API Error: ${error.status}`;
	} else {
		// This is a SerializedError (thrown JS error)
		return error.message || 'An unexpected error occurred.';
	}
};

export const getAxiosErrorMessage = (error: unknown): string => {
	// Ensure the error is an AxiosError
	const axiosError = error as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;

	if (!axiosError || !axiosError.isAxiosError) {
		return 'An unknown error occurred.';
	}

	// Handle HTTP response errors
	if (axiosError.response) {
		const { status, data } = axiosError.response;

		// Check if the API returned a custom message
		if (data?.message) {
			return data.message;
		}

		// Handle specific status codes
		switch (status) {
			case 400:
				return 'Bad request. Please check your input.';
			case 401:
				return 'Unauthorized. Please log in.';
			case 403:
				return "Forbidden. You don't have permission.";
			case 404:
				return 'Resource not found.';
			case 500:
				return 'Server error. Please try again later.';
			default:
				return `Unexpected error (Status: ${status}).`;
		}
	}

	// Handle network errors (e.g., no internet)
	if (axiosError.request) {
		return 'Network error. Please check your internet connection.';
	}

	// Handle other unknown errors
	return axiosError.message || 'An unexpected error occurred.';
};
