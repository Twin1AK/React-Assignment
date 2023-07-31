import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogsPage from '../pages/BlogsPage';
import '@testing-library/jest-dom/extend-expect';

describe('BlogsPage', () => {

	test('renders without errors', () => {
		render(<BlogsPage />);
		// Assert that the component renders without throwing any errors
	});

	test('displays "Blogs"', () => {
		render(<BlogsPage />);
		expect(screen.getByText('Blogs')).toBeInTheDocument();
	});

	

  
});
