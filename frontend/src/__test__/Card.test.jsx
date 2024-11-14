import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MediaCard from '../components/Card';
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

describe('MediaCard Component', () => {
  const mockPresentation = {
    '1': { title: 'Presentation 1', description: 'Description 1', thumbnail: 'image1.jpg' },
    '2': { title: 'Presentation 2', description: 'Description 2', thumbnail: 'image2.jpg' },
  };

  test('renders no card if presentation prop is empty', () => {
    render(
      <MemoryRouter>
        <MediaCard presentation={{}} />
      </MemoryRouter>
    );
    const cardElements = screen.queryAllByRole('img');
    expect(cardElements.length).toBe(0);
  });

  test('renders correct number of cards based on presentation prop', () => {
    render(
      <MemoryRouter>
        <MediaCard presentation={mockPresentation} />
      </MemoryRouter>
    );
    const cardElements = screen.getAllByRole('img');
    expect(cardElements.length).toBe(Object.keys(mockPresentation).length);
  });

  test('navigates to correct URL when edit button is clicked', () => {
    render(
      <MemoryRouter>
        <MediaCard presentation={mockPresentation} />
      </MemoryRouter>
    );

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);
    expect(mockedNavigate).toHaveBeenCalledWith('/presentation/1/1');
  });
});
