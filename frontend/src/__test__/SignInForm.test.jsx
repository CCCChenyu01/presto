import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from './SignInForm';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate hook and fetch function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

global.fetch = jest.fn();

describe('SignInForm Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders email and password fields and submit button', () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );
    
    // 检查 email 和 password 字段以及 submit 按钮是否存在
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
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
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

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
      expect(navigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('navigates to register page when register button is clicked', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(navigate).toHaveBeenCalledWith('/register');
  });

  test('clears error message on successful login', async () => {
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
      expect(screen.queryByText(/login failed\. please check your credentials\./i)).not.toBeInTheDocument();
    });
  });
});
