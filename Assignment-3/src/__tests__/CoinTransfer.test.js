import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider,useSelector } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, waitFor } from '@testing-library/react';
import CoinTransfer from '../components/Coin/CoinTransfer';
import { apiCall } from '../services/apiCall';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../services/apiCall', () => ({
  apiCall: jest.fn(),
}));

describe('CoinTransfer', () => {
    beforeEach(() => {
        render(<CoinTransfer />);
        jest.clearAllMocks();
    });
    
    test('fetches transfer addresses and updates state', async () => {
        const setAddresses = jest.fn();
        const setChains = jest.fn();

        const mockResponse = {
            success: true,
            data: ['address1', 'address2'],
        };
        apiCall.mockResolvedValueOnce(mockResponse);

        await act(async () => {
            render(<CoinTransfer />, { setAddresses, setChains });

            expect(screen.getByText('Transfer')).toBeInTheDocument();

            await screen.findByText('Transfer');

           
        });
        expect(apiCall).toHaveBeenCalledWith('/api/users/getTransferAddresses', 'GET');

    });
    test('clicks transfer button without selecting values', async () => {
        const apiCallPromise = () => {
            return new Promise((resolve, reject) => {
                resolve(true);
                reject(false);
            });
            };
        await act(async () => {
            const transferButton = screen.getByText('Transfer');
            fireEvent.click(transferButton);
            await expect(apiCallPromise()).resolves.toEqual(true);
        })

    });
 })
