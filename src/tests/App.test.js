import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a register tab', () => {
  const { getByText } = render(<App />);
  const tabElement = getByText(/REGISTER/i);
  expect(tabElement).toBeInTheDocument();
});
