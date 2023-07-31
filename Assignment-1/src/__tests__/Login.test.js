import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../services/apiCall', () => ({
  apiCall: jest.fn(),
}));

describe('Login', () => {
    beforeEach(() => {
        useDispatch.mockClear();
        useNavigate.mockClear();
        render(<Login />);
    });
    test('should render the login form with empty fields', () => {
    
        const emailInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
    
        expect(emailInput.value).toBe('');
        expect(passwordInput.value).toBe('');
    });
    // test('should display error messages for invalid input', () => {
    
    //     const emailInput = screen.getByLabelText('Email Address');
    //     const passwordInput = screen.getByLabelText('Password');
    //     const submitButton = screen.getByRole('button', { name: 'Login' });
    
    //     fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    //     fireEvent.change(passwordInput, { target: { value: 'pass' } });
    //     fireEvent.click(submitButton);
    
    //     const emailErrorMessage = 'Invalid email address';
    //     const passwordErrorMessage = 'Password should be 8 characters long';

    
    //     expect(emailErrorMessage).toBeInTheDocument();
    //     expect(passwordErrorMessage).toBeInTheDocument();
    // });
    
});