import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import { vi } from 'vitest';

// 手动模拟 useNavigate 和 fetch
const mockedNavigate = vi.fn();
global.fetch = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('SignInForm Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('shows error alert on failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'incorrectpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed\. please check your credentials\./i)).toBeInTheDocument();
    });
  });

  test('navigates to dashboard on successful login', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mock-token' }),
    });

    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'correct@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'correctpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
