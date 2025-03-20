import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/Authentication/LoginPage';
import RegistrationPage from './components/Authentication/RegistrationPage';
import AuthLayout from './components/Authentication/AuthLayout';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ClassesPage from './components/ClassesPage/ClassesPage';
import AddClassPage from './components/AddClass/AddClassPage';
import ClassPage from './components/ClassesPage/ClassPage';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthLayout />}>
						<Route
							path='/login'
							element={<LoginPage />}
						/>
						<Route
							path='/register'
							element={<RegistrationPage />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path='/app'
							element={<DashboardLayout />}
						>
							<Route
								index
								element={
									<Navigate
										to='classes'
										replace
									/>
								}
							/>
							<Route
								path='classes'
								element={<ClassesPage />}
							/>
							<Route
								path='classes/new'
								element={<AddClassPage />}
							/>
							<Route
								path='classes/:classId'
								element={<ClassPage />}
							/>
							<Route
								path='tasks'
								element={<div>Tasks</div>}
							/>
							<Route
								path='notifications'
								element={<div>Notifications</div>}
							/>
							<Route
								path='settings'
								element={<div>Settings</div>}
							/>
							<Route
								path='*'
								element={<ClassesPage />}
							/>
						</Route>
					</Route>
					<Route
						path='*'
						element={
							<Navigate
								to='/login'
								replace
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
