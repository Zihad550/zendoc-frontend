import { render, screen } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { beforeEach } from 'node:test';
import { describe, expect, it, vi } from 'vitest';
import ConsultationDetailsStep from '../ConsultationDetailsStep';

// Mock the DoctorScheduleSlots component
vi.mock('@/app/(public)/doctors/components/DoctorScheduleSlots', () => ({
  default: ({ id }: { id: string }) => <div data-testid="doctor-schedule-slots">Doctor Schedule for {id}</div>
}));

describe('ConsultationDetailsStep', () => {
  const mockConsultationDetails = {
    symptoms: '',
    duration: '',
    previousTreatments: '',
    additionalNotes: ''
  };

  const mockSetConsultationDetails = vi.fn();
  const mockDoctorId = 'doctor-123';

  const defaultProps = {
    consultationDetails: mockConsultationDetails,
    setConsultationDetails: mockSetConsultationDetails,
    doctorId: mockDoctorId
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the consultation details form', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      expect(screen.getByText('Consultation Details')).toBeInTheDocument();
      expect(screen.getByText('Please provide information about your symptoms and medical history')).toBeInTheDocument();
    });

    it('should render all form fields', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      expect(screen.getByLabelText(/describe your symptoms/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/duration of symptoms/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/previous treatments/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/additional notes/i)).toBeInTheDocument();
    });

    it('should render doctor schedule slots component', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      expect(screen.getByTestId('doctor-schedule-slots')).toBeInTheDocument();
      expect(screen.getByText(`Doctor Schedule for ${mockDoctorId}`)).toBeInTheDocument();
    });

    it('should display helper texts', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      expect(screen.getByText('This information helps the doctor prepare for your consultation')).toBeInTheDocument();
      expect(screen.getByText('How long have you been experiencing these symptoms?')).toBeInTheDocument();
      expect(screen.getByText('Optional: Include allergies, medications, or other relevant medical history')).toBeInTheDocument();
    });
  });

  describe('form interactions', () => {
    it('should handle symptoms input change', async () => {
      const user = userEvent.setup();
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const symptomsField = screen.getByLabelText(/describe your symptoms/i);
      await user.type(symptomsField, 'Headache and fever');
      
      // Check the last call to see the final result
      const lastCall = mockSetConsultationDetails.mock.calls[mockSetConsultationDetails.mock.calls.length - 1];
      expect(lastCall[0]).toEqual({
        ...mockConsultationDetails,
        symptoms: 'Headache and fever'
      });
    });

    it('should handle duration select change', async () => {
      const user = userEvent.setup();
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const durationSelect = screen.getByLabelText(/duration of symptoms/i);
      await user.click(durationSelect);
      
      const option = screen.getByText('Less than a week');
      await user.click(option);
      
      expect(mockSetConsultationDetails).toHaveBeenCalledWith({
        ...mockConsultationDetails,
        duration: 'less-than-week'
      });
    });

    it('should handle previous treatments input change', async () => {
      const user = userEvent.setup();
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const treatmentsField = screen.getByLabelText(/previous treatments/i);
      await user.type(treatmentsField, 'Paracetamol');
      
      // Check the last call to see the final result
      const lastCall = mockSetConsultationDetails.mock.calls[mockSetConsultationDetails.mock.calls.length - 1];
      expect(lastCall[0]).toEqual({
        ...mockConsultationDetails,
        previousTreatments: 'Paracetamol'
      });
    });

    it('should handle additional notes input change', async () => {
      const user = userEvent.setup();
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const notesField = screen.getByLabelText(/additional notes/i);
      await user.type(notesField, 'No known allergies');
      
      // Check the last call to see the final result
      const lastCall = mockSetConsultationDetails.mock.calls[mockSetConsultationDetails.mock.calls.length - 1];
      expect(lastCall[0]).toEqual({
        ...mockConsultationDetails,
        additionalNotes: 'No known allergies'
      });
    });
  });

  describe('form validation', () => {
    it('should mark symptoms field as required', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const symptomsField = screen.getByLabelText(/describe your symptoms/i);
      expect(symptomsField).toBeRequired();
    });

    it('should mark duration field as required', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const durationField = screen.getByLabelText(/duration of symptoms/i);
      expect(durationField).toBeRequired();
    });

    it('should not mark optional fields as required', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const treatmentsField = screen.getByLabelText(/previous treatments/i);
      const notesField = screen.getByLabelText(/additional notes/i);
      
      expect(treatmentsField).not.toBeRequired();
      expect(notesField).not.toBeRequired();
    });
  });

  describe('duration options', () => {
    it('should display all duration options when select is opened', async () => {
      const user = userEvent.setup();
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const durationSelect = screen.getByLabelText(/duration of symptoms/i);
      await user.click(durationSelect);
      
      expect(screen.getByText('Less than a week')).toBeInTheDocument();
      expect(screen.getByText('1-2 weeks')).toBeInTheDocument();
      expect(screen.getByText('2-4 weeks')).toBeInTheDocument();
      expect(screen.getByText('1-3 months')).toBeInTheDocument();
      expect(screen.getByText('3-6 months')).toBeInTheDocument();
      expect(screen.getByText('More than 6 months')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper form labels', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      expect(screen.getByLabelText(/describe your symptoms/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/duration of symptoms/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/previous treatments/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/additional notes/i)).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { name: /consultation details/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have helper text associated with form fields', () => {
      render(<ConsultationDetailsStep {...defaultProps} />);
      
      const symptomsField = screen.getByLabelText(/describe your symptoms/i);
      expect(symptomsField).toHaveAccessibleDescription();
    });
  });

  describe('controlled inputs', () => {
    it('should display current values in form fields', () => {
      const filledDetails = {
        symptoms: 'Test symptoms',
        duration: 'one-two-weeks',
        previousTreatments: 'Test treatments',
        additionalNotes: 'Test notes'
      };

      render(
        <ConsultationDetailsStep
          {...defaultProps}
          consultationDetails={filledDetails}
        />
      );
      
      expect(screen.getByDisplayValue('Test symptoms')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test treatments')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test notes')).toBeInTheDocument();
    });
  });
});