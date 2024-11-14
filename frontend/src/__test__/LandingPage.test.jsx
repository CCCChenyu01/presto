import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import { vi } from 'vitest';

// 手动模拟 useNavigate
const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('LandingPage Component', () => {
  test('renders welcome message', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to Presto!/i)).toBeInTheDocument();
  });

  test('navigates to login page when login button is clicked', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });

  test('navigates to register page when register button is clicked', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(mockedNavigate).toHaveBeenCalledWith('/register');
  });
});
