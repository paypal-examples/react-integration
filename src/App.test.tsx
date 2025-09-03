import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders buy an atom text', () => {
  render(<App />);
  const textElement = screen.getByText(/buy an atom/i);
  expect(textElement).toBeInTheDocument();
});
