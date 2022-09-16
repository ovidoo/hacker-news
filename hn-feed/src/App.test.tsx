import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { counterStore } from './app/counterStore';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={counterStore}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
