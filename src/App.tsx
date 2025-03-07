import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/Authentication/LoginPage';
import RegistrationPage from './components/Authentication/RegistrationPage';
import AuthLayout from './components/Authentication/AuthLayout';

function App() {
	return (
		<div className='App'>
			<header className='App-header'></header>
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
					<Route
						path='/'
						element={<LoginPage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
