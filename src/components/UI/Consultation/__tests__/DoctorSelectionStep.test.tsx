import { render, screen } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DoctorSelectionStep from '../DoctorSelectionStep';

// Mock the Redux hook
const mockUseGetAllDoctorsQuery = vi.fn();
vi.mock('@/redux/features/doctor/doctorApi', () => ({
  useGetAllDoctorsQuery: () => mockUseGetAllDoctorsQuery()
}));

// Mock Spinner component
vi.mock('@/components/Shared/Spinner/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>
}));

describe('DoctorSelectionStep', () => {
  const mockDoctors = [
    {
      id: '1',
      name: 'Dr. John Smith',
      designation: 'Cardiologist',
      profilePhoto: 'https://example.com/photo1.jpg'
    },
    {
      id: '2',
      name: 'Dr. Jane Doe',
      designation: 'Neurologist',
      profilePhoto: 'https://example.com/photo2.jpg'
    },
    {
      id: '3',
      name: 'Dr. Mike Johnson',
      designation: 'Pediatrician',
      profilePhoto: null
    }
  ];

  const mockSelectedDoctor = mockDoctors[0];
  const mockSetSelectedDoctor = vi.fn();

  const defaultProps = {
    selectedDoctor: mockSelectedDoctor,
    setSelectedDoctor: mockSetSelectedDoctor
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loading state', () => {
    it('should show spinner when loading', () => {
      mockUseGetAllDoctorsQuery.mockReturnValue({
        data: undefined,
        isLoading: true
      });

      render(<DoctorSelectionStep {...defaultProps} />);
      
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      mockUseGetAllDoctorsQuery.mockReturnValue({
        data: { data: mockDoctors },
        isLoading: false
      });
    });

    it('should render the doctor selection title', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      expect(screen.getByText('Select a Doctor')).toBeInTheDocument();
    });

    it('should render all doctors in the list', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      expect(screen.getByText('Dr. John Smith')).toBeInTheDocument();
      expect(screen.getByText('Dr. Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('Dr. Mike Johnson')).toBeInTheDocument();
    });

    it('should display doctor designations', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      expect(screen.getByText('Cardiologist')).toBeInTheDocument();
      expect(screen.getByText('Neurologist')).toBeInTheDocument();
      expect(screen.getByText('Pediatrician')).toBeInTheDocument();
    });

    it('should render doctor avatars', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      // Only 2 doctors have actual images, the third has a fallback icon
      const avatars = screen.getAllByRole('img');
      expect(avatars).toHaveLength(2);
    });
  });

  describe('doctor selection', () => {
    beforeEach(() => {
      mockUseGetAllDoctorsQuery.mockReturnValue({
        data: { data: mockDoctors },
        isLoading: false
      });
    });

    it('should highlight the selected doctor', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      const selectedDoctorButton = screen.getByRole('button', { name: /dr. john smith cardiologist/i });
      expect(selectedDoctorButton).toHaveClass('Mui-selected');
    });

    it('should call setSelectedDoctor when a doctor is clicked', async () => {
      const user = userEvent.setup();
      render(<DoctorSelectionStep {...defaultProps} />);
      
      const doctorButton = screen.getByRole('button', { name: /dr. jane doe neurologist/i });
      await user.click(doctorButton);
      
      expect(mockSetSelectedDoctor).toHaveBeenCalledWith(mockDoctors[1]);
    });

    it('should handle clicking on different doctors', async () => {
      const user = userEvent.setup();
      render(<DoctorSelectionStep {...defaultProps} />);
      
      const thirdDoctorButton = screen.getByRole('button', { name: /dr. mike johnson pediatrician/i });
      await user.click(thirdDoctorButton);
      
      expect(mockSetSelectedDoctor).toHaveBeenCalledWith(mockDoctors[2]);
    });
  });

  describe('empty state', () => {
    it('should handle empty doctor list', () => {
      mockUseGetAllDoctorsQuery.mockReturnValue({
        data: { data: [] },
        isLoading: false
      });

      render(<DoctorSelectionStep {...defaultProps} />);
      
      expect(screen.getByText('Select a Doctor')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should handle undefined data', () => {
      mockUseGetAllDoctorsQuery.mockReturnValue({
        data: undefined,
        isLoading: false
      });

      render(<DoctorSelectionStep {...defaultProps} />);
      
      expect(screen.getByText('Select a Doctor')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      mockUseGetAllDoctorsQuery.mockReturnValue({
        data: { data: mockDoctors },
        isLoading: false
      });
    });

    it('should have proper heading structure', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { name: /select a doctor/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible list structure', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      // MUI ListItemButton components don't create listitem roles, they're just buttons
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });

    it('should have accessible buttons with proper names', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: /dr. john smith cardiologist/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /dr. jane doe neurologist/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /dr. mike johnson pediatrician/i })).toBeInTheDocument();
    });

    it('should have proper selection state attributes', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      const selectedButton = screen.getByRole('button', { name: /dr. john smith cardiologist/i });
      const unselectedButton = screen.getByRole('button', { name: /dr. jane doe neurologist/i });
      
      expect(selectedButton).toHaveClass('Mui-selected');
      expect(unselectedButton).not.toHaveClass('Mui-selected');
    });
  });

  describe('avatar handling', () => {
    beforeEach(() => {
      mockUseGetAllDoctorsQuery.mockReturnValue({
        data: { data: mockDoctors },
        isLoading: false
      });
    });

    it('should display avatar with correct src and alt attributes', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      const johnAvatar = screen.getByRole('img', { name: /dr. john smith/i });
      expect(johnAvatar).toHaveAttribute('src', 'https://example.com/photo1.jpg');
    });

    it('should handle missing profile photos gracefully', () => {
      render(<DoctorSelectionStep {...defaultProps} />);
      
      // When no profile photo is provided, MUI Avatar shows a fallback icon
      const fallbackIcon = screen.getByTestId('PersonIcon');
      expect(fallbackIcon).toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('should handle API errors gracefully', () => {
      mockUseGetAllDoctorsQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Failed to fetch doctors' }
      });

      render(<DoctorSelectionStep {...defaultProps} />);
      
      // Component should still render the title even with errors
      expect(screen.getByText('Select a Doctor')).toBeInTheDocument();
    });
  });
});