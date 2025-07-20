import { render, screen } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DoctorCard from '../Doctor/DoctorCard';

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('DoctorCard', () => {
  const mockDoctor = {
    id: '1',
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    designation: 'Senior Cardiologist',
    experience: 10,
    qualification: 'MBBS, MD',
    profilePhoto: '/images/doctor1.jpg',
    apointmentFee: 150,
    currentWorkingPlace: 'City General Hospital',
    contactNumber: '+1234567890',
    address: '123 Medical Center Dr',
    registrationNumber: 'REG123456',
    gender: 'MALE' as const,
    isDeleted: false,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    averageRating: 4.5,
    review: [],
    doctorSpecialties: [
      {
        specialtiesId: 'spec1',
        doctorId: '1',
        specialties: {
          id: 'spec1',
          title: 'Cardiology',
          icon: 'cardiology-icon',
        },
      },
      {
        specialtiesId: 'spec2',
        doctorId: '1',
        specialties: {
          id: 'spec2',
          title: 'Internal Medicine',
          icon: 'internal-medicine-icon',
        },
      },
    ],
  };

  it('should render doctor information correctly', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    expect(screen.getByText('Dr. John Smith')).toBeInTheDocument();
    expect(screen.getByText('Senior Cardiologist')).toBeInTheDocument();
    expect(screen.getByText(/10.*Years/i)).toBeInTheDocument();
  });

  it('should display doctor specialties', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    expect(
      screen.getByText(/Specialties in.*Cardiology.*Internal Medicine/)
    ).toBeInTheDocument();
  });

  it('should display consultation fee', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    expect(screen.getByText(/Taka.*150/)).toBeInTheDocument();
  });

  it('should render doctor profile image', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    const image = screen.getByAltText('doctor image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/doctor1.jpg');
  });

  it('should handle missing profile photo gracefully', () => {
    const doctorWithoutPhoto = {
      ...mockDoctor,
      profilePhoto: undefined as any,
    };
    render(<DoctorCard doctor={doctorWithoutPhoto} />);

    // Should still render the card without crashing
    expect(screen.getByText('Dr. John Smith')).toBeInTheDocument();
    // Should use placeholder image
    const image = screen.getByAltText('doctor image');
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('vecteezy.com')
    );
  });

  it('should display working place', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    expect(screen.getByText('Working in')).toBeInTheDocument();
    expect(screen.getByText('City General Hospital')).toBeInTheDocument();
  });

  it('should display book appointment button', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    const bookButton = screen.getByRole('button', {
      name: /book now/i,
    });
    expect(bookButton).toBeInTheDocument();
  });

  it('should display view details button', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    const viewDetailsButton = screen.getByRole('link', {
      name: /view details/i,
    });
    expect(viewDetailsButton).toBeInTheDocument();
    expect(viewDetailsButton).toHaveAttribute('href', '/doctors/1');
  });

  it('should handle book appointment click', async () => {
    const user = userEvent.setup();
    render(<DoctorCard doctor={mockDoctor} />);

    const bookButton = screen.getByRole('button', {
      name: /book now/i,
    });
    await user.click(bookButton);

    // Button should be clickable
    expect(bookButton).toBeInTheDocument();
  });

  it('should handle multiple specialties correctly', () => {
    const doctorWithManySpecialties = {
      ...mockDoctor,
      doctorSpecialties: [
        {
          specialtiesId: 'spec1',
          doctorId: '1',
          specialties: {
            id: 'spec1',
            title: 'Cardiology',
            icon: 'cardiology-icon',
          },
        },
        {
          specialtiesId: 'spec2',
          doctorId: '1',
          specialties: {
            id: 'spec2',
            title: 'Internal Medicine',
            icon: 'internal-medicine-icon',
          },
        },
        {
          specialtiesId: 'spec3',
          doctorId: '1',
          specialties: {
            id: 'spec3',
            title: 'Pulmonology',
            icon: 'pulmonology-icon',
          },
        },
        {
          specialtiesId: 'spec4',
          doctorId: '1',
          specialties: {
            id: 'spec4',
            title: 'Critical Care',
            icon: 'critical-care-icon',
          },
        },
      ],
    };

    render(<DoctorCard doctor={doctorWithManySpecialties} />);

    expect(
      screen.getByText(
        /Specialties in.*Cardiology.*Internal Medicine.*Pulmonology.*Critical Care/
      )
    ).toBeInTheDocument();
  });

  it('should handle missing specialties gracefully', () => {
    const doctorWithoutSpecialties = {
      ...mockDoctor,
      doctorSpecialties: [],
    };

    render(<DoctorCard doctor={doctorWithoutSpecialties} />);

    expect(screen.getByText('Dr. John Smith')).toBeInTheDocument();
    // Should not crash when no specialties
  });

  it('should be accessible', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    // Check that image has proper alt text
    const image = screen.getByAltText('doctor image');
    expect(image).toBeInTheDocument();

    // Check for proper button accessibility
    const bookButton = screen.getByRole('button', { name: /book now/i });
    expect(bookButton).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    // Check for heading structure
    const doctorName = screen.getByText('Dr. John Smith');
    expect(doctorName.closest('h1, h2, h3, h4, h5, h6')).toBeInTheDocument();
  });

  it('should display experience correctly', () => {
    render(<DoctorCard doctor={mockDoctor} />);

    expect(screen.getByText('Total Experience')).toBeInTheDocument();
    expect(screen.getByText('10+ Years')).toBeInTheDocument();
  });

  it('should handle missing data gracefully', () => {
    const minimalDoctor = {
      ...mockDoctor,
      id: '2',
      name: 'Dr. Jane Doe',
      designation: '',
      experience: 0,
      qualification: '',
      profilePhoto: '',
      apointmentFee: 0,
      currentWorkingPlace: '',
      doctorSpecialties: [],
    };

    render(<DoctorCard doctor={minimalDoctor} />);

    expect(screen.getByText('Dr. Jane Doe')).toBeInTheDocument();
    // Should not crash with minimal data
  });
});
