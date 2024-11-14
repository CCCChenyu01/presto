import { render, screen, fireEvent } from '@testing-library/react';
import LandingPage from './LandingPage';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LandingPage Component', () => {
  test('renders welcome message', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    // 检查是否正确渲染欢迎信息
    expect(screen.getByText(/Welcome to Presto!/i)).toBeInTheDocument();
  });

  test('renders login and register buttons', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    // 检查是否渲染登录和注册按钮
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('navigates to login page when login button is clicked', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(navigate).toHaveBeenCalledWith('/login');
  });

  test('navigates to register page when register button is clicked', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(navigate).toHaveBeenCalledWith('/register');
  });
});
