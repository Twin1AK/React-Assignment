import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CryptoCoinsPage from '../pages/CryptoCoinsPage';
import { Provider,useSelector } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('CryptoCoinsPage', () => {
	jest.mock('react-redux');
	const mockStore = configureStore([]);
	const store = mockStore({ users: { loggedInUser: { id: 'user-id' } }}); // You can provide initial state if needed
	beforeEach(() => {
		render(
			<Provider store={store}>
			<CryptoCoinsPage />
			</Provider>
		);
	});
	//Test that userCoins is not undefined:

	test('userCoins should not be undefined', () => {
		expect(screen.getByRole('table')).toBeInTheDocument();
	});


	//Test that the table is rendered:
	test('table should be rendered', () => {
		expect(screen.getByRole('table')).toBeInTheDocument();
	});



 })
