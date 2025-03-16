import { expect, test } from 'vitest'; 
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; 
import Homepage from '../Homepage';

test('displays loading message while fetching data', async () => {
  render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  );
  //right test - should be true
  expect(await screen.findByText(/Food/i)).toBeInTheDocument();
  // wrong test - shoud be true as well
  expect(await screen.queryByText(/Foody/i)).not.toBeInTheDocument();
  //check loading completed
  expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
});
