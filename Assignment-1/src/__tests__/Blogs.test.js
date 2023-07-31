import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogsPage from '../pages/BlogsPage';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('BlogsPage', () => {
	jest.mock('react-redux');
	const mockStore = configureStore([]);
	const store = mockStore({ users: { loggedInUser: { id: 'user-id' } }}); 
	beforeEach(() => {
		render(
			<Provider store={store}>
			<BlogsPage />
			</Provider>
		);
	});

	test('displays "Blogs"', () => {
		expect(screen.getByText('Blogs')).toBeInTheDocument();
	});

	

  
});
