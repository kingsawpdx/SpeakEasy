import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

const mockWords = [
  { id: 1, word: 'Apple', isCategory: false, category: '1' },
  { id: 3, word: 'Fruits', isCategory: true, category: '1', isCategoryId: '3' },
];

const renderWithRouter = (state) => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/category/1', state }]}>
      <Routes>
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('CategoryPage', () => {
  it('renders category title', () => {
    renderWithRouter({ category: 'Food', words: mockWords });
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('renders subcategory link', () => {
    renderWithRouter({ words: mockWords });
    expect(screen.getByRole('link', { name: /Fruits/i })).toBeInTheDocument();
  });

  it('renders word button', () => {
    renderWithRouter({ words: mockWords });
    expect(screen.getByRole('button', { name: /Apple/i })).toBeInTheDocument();
  });
});