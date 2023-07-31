import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../components/Welcome';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

describe('Welcome', () => {
	jest.mock('react-redux');
	const mockStore = configureStore([]);
		const store = mockStore({ users: { loggedInUser: { id: 'user-id' } }}); 
  test('renders the welcome component', () => {
    render(
        <Provider store={store}>
			<BrowserRouter basename="/">
          <Welcome />
        </BrowserRouter>
			</Provider>
    );

    const purchasedCryptoCoinsHeader = screen.getByText('Purchased Crypto Coins');
    expect(purchasedCryptoCoinsHeader).toBeInTheDocument();

    const purchaseCoinsLink = screen.getByText('Purchase Coins');
    expect(purchaseCoinsLink).toBeInTheDocument();
    expect(purchaseCoinsLink.getAttribute('href')).toBe('/home/purchase');

    const cryptoCoinsPage = screen.getByTestId('crypto-coins-page');
    expect(cryptoCoinsPage).toBeInTheDocument();
  });
});
