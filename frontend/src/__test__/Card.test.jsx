import { render, screen, fireEvent } from '@testing-library/react';
import MediaCard from './MediaCard';
import { MemoryRouter } from 'react-router-dom';

// 用于模拟 navigate 函数
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

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

  test('displays presentation title and description correctly', () => {
    render(
      <MemoryRouter>
        <MediaCard presentation={mockPresentation} />
      </MemoryRouter>
    );
    Object.values(mockPresentation).forEach((presentation) => {
      expect(screen.getByText(presentation.title)).toBeInTheDocument();
      expect(screen.getByText(presentation.description)).toBeInTheDocument();
    });
  });

  test('displays default background if thumbnail is missing', () => {
    const mockPresentationWithoutThumbnail = {
      '3': { title: 'Presentation 3', description: 'Description 3' },
    };
    render(
      <MemoryRouter>
        <MediaCard presentation={mockPresentationWithoutThumbnail} />
      </MemoryRouter>
    );
    const imgElement = screen.getByAltText('No Image');
    expect(imgElement).toHaveStyle('background-color: grey');
  });

  test('navigates to correct URL when edit button is clicked', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <MediaCard presentation={mockPresentation} />
      </MemoryRouter>
    );

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(navigate).toHaveBeenCalledWith(`/presentation/1/1`);
  });

  test('handles images with onError by applying default background', () => {
    const mockPresentationWithInvalidThumbnail = {
      '4': { title: 'Presentation 4', description: 'Description 4', thumbnail: 'invalid.jpg' },
    };

    render(
      <MemoryRouter>
        <MediaCard presentation={mockPresentationWithInvalidThumbnail} />
      </MemoryRouter>
    );

    const imgElement = screen.getByAltText('Presentation 4');
    fireEvent.error(imgElement);
    expect(imgElement).toHaveStyle('background-color: #e0e0e0');
  });
});
