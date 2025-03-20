import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ServerClass {
	classId: number;
	title: string;
	description: string;
	owner: string;
	students: string[];
	createdAt: string;
}

export type NewClass = Pick<ServerClass, 'title' | 'description' | 'students'>;

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api',
		prepareHeaders: (headers, api) => {
			const token = (api.getState() as { auth: { user: { token: string } } }).auth.user.token;
			headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ['classes'],
	endpoints: (build) => ({
		createClass: build.mutation<ServerClass, NewClass>({
			query: (newClass) => ({
				url: '/classes',
				method: 'POST',
				body: newClass,
			}),
			invalidatesTags: ['classes'],
		}),
		getClasses: build.query<ServerClass[], void>({
			query: () => ({
				url: '/classes',
				method: 'GET',
			}),
			providesTags: ['classes'],
			transformResponse: (response: ServerClass[]) => {
				return response.sort((currentClass, nextClass) => {
					return nextClass.createdAt.localeCompare(currentClass.createdAt);
				});
			},
		}),
		getClassById: build.query<ServerClass, string>({
			query: (classId) => ({
				url: `classes/${classId}`,
				method: 'GET',
			}),
			providesTags: (result, error, classId) => [{ type: 'classes', classId }],
		}),
	}),
});

export const { useCreateClassMutation, useGetClassesQuery, useGetClassByIdQuery } = apiSlice;
