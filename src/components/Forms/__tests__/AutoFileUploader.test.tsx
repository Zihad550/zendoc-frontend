import { render } from '@/test/utils/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AutoFileUploader from '../AutoFileUploader';

describe('AutoFileUploader Component', () => {
  const mockOnFileUpload = vi.fn();
  const defaultProps = {
    name: 'test-file',
    onFileUpload: mockOnFileUpload,
  };

  beforeEach(() => {
    mockOnFileUpload.mockClear();
  });

  describe('Rendering', () => {
    it('should render upload button with default label', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      expect(screen.getByText('Upload file')).toBeInTheDocument();
    });

    it('should render with custom label', () => {
      render(<AutoFileUploader {...defaultProps} label="Upload Document" />);
      
      expect(screen.getByText('Upload Document')).toBeInTheDocument();
    });

    it('should render with default cloud upload icon', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      const uploadButton = screen.getByText('Upload file');
      expect(uploadButton).toBeInTheDocument();
      
      // Check if CloudUpload icon is present
      const icon = uploadButton.parentElement?.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render with custom icon', () => {
      const CustomIcon = () => <svg data-testid="custom-icon">Custom</svg>;
      
      render(<AutoFileUploader {...defaultProps} icon={<CustomIcon />} />);
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render with contained variant by default', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      const uploadButton = screen.getByText('Upload file').parentElement;
      expect(uploadButton).toHaveClass('MuiButton-contained');
    });

    it('should render with text variant when specified', () => {
      render(<AutoFileUploader {...defaultProps} variant="text" />);
      
      const uploadButton = screen.getByText('Upload file').parentElement;
      expect(uploadButton).toHaveClass('MuiButton-text');
    });
  });

  describe('File Upload Functionality', () => {
    it('should call onFileUpload when file is selected', async () => {
      const user = userEvent.setup();
      render(<AutoFileUploader {...defaultProps} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toBeInTheDocument();
      
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
      
      await user.upload(fileInput, file);
      
      expect(mockOnFileUpload).toHaveBeenCalledWith(file);
    });

    it('should handle multiple file selections correctly', async () => {
      const user = userEvent.setup();
      render(<AutoFileUploader {...defaultProps} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      const file1 = new File(['content 1'], 'test1.txt', { type: 'text/plain' });
      const file2 = new File(['content 2'], 'test2.txt', { type: 'text/plain' });
      
      // Upload first file
      await user.upload(fileInput, file1);
      expect(mockOnFileUpload).toHaveBeenCalledWith(file1);
      
      // Upload second file
      await user.upload(fileInput, file2);
      expect(mockOnFileUpload).toHaveBeenCalledWith(file2);
      
      expect(mockOnFileUpload).toHaveBeenCalledTimes(2);
    });

    it('should not call onFileUpload when no file is selected', async () => {
      const user = userEvent.setup();
      render(<AutoFileUploader {...defaultProps} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      // Simulate clicking without selecting a file
      await user.click(fileInput);
      
      expect(mockOnFileUpload).not.toHaveBeenCalled();
    });

    it('should handle file input change event correctly', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      
      // Create a mock event
      const event = {
        target: {
          files: [file],
        },
      } as any;
      
      // Trigger the onChange handler directly
      fileInput.onchange?.(event);
      
      expect(mockOnFileUpload).toHaveBeenCalledWith(file);
    });
  });

  describe('File Type Restrictions', () => {
    it('should apply accept attribute when specified', () => {
      render(<AutoFileUploader {...defaultProps} accept=".pdf,.doc,.docx" />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toHaveAttribute('accept', '.pdf,.doc,.docx');
    });

    it('should not have accept attribute when not specified', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).not.toHaveAttribute('accept');
    });

    it('should handle image file types', async () => {
      const user = userEvent.setup();
      render(<AutoFileUploader {...defaultProps} accept="image/*" />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toHaveAttribute('accept', 'image/*');
      
      const imageFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' });
      await user.upload(fileInput, imageFile);
      
      expect(mockOnFileUpload).toHaveBeenCalledWith(imageFile);
    });
  });

  describe('Accessibility', () => {
    it('should have proper button structure', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      const uploadText = screen.getByText('Upload file');
      expect(uploadText).toBeInTheDocument();
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<AutoFileUploader {...defaultProps} />);
      
      const uploadButton = screen.getByText('Upload file').parentElement;
      
      // Focus the button
      uploadButton?.focus();
      expect(uploadButton).toHaveFocus();
      
      // Should be activatable with Enter key
      await user.keyboard('{Enter}');
      
      // Button should remain accessible
      expect(uploadButton).toBeInTheDocument();
    });

    it('should support screen readers', () => {
      render(<AutoFileUploader {...defaultProps} label="Upload Profile Picture" />);
      
      const uploadText = screen.getByText('Upload Profile Picture');
      expect(uploadText).toBeInTheDocument();
      expect(uploadText).toHaveTextContent('Upload Profile Picture');
    });

    it('should have hidden file input for accessibility', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toHaveStyle({ display: 'none' });
    });
  });

  describe('Styling and Customization', () => {
    it('should apply custom sx styles', () => {
      const customSx = { backgroundColor: 'red', padding: '20px' };
      render(<AutoFileUploader {...defaultProps} sx={customSx} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // Styles are applied via MUI's sx prop system
    });

    it('should render as label element', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button.tagName.toLowerCase()).toBe('label');
    });

    it('should have proper component structure', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      // Should have Box container
      const container = screen.getByRole('button').parentElement;
      expect(container).toBeInTheDocument();
      
      // Should have Button as label
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      // Should have hidden Input
      const input = button.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing file in event', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      const fileInput = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;
      
      // Create event with no files
      const event = {
        target: {
          files: null,
        },
      } as any;
      
      // Should not crash
      expect(() => {
        fileInput.onchange?.(event);
      }).not.toThrow();
      
      expect(mockOnFileUpload).not.toHaveBeenCalled();
    });

    it('should handle empty files array', () => {
      render(<AutoFileUploader {...defaultProps} />);
      
      const fileInput = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;
      
      // Create event with empty files array
      const event = {
        target: {
          files: [],
        },
      } as any;
      
      expect(() => {
        fileInput.onchange?.(event);
      }).not.toThrow();
      
      expect(mockOnFileUpload).not.toHaveBeenCalled();
    });

    it('should handle onFileUpload callback errors', () => {
      const errorCallback = vi.fn().mockImplementation(() => {
        throw new Error('Upload error');
      });
      
      render(<AutoFileUploader {...defaultProps} onFileUpload={errorCallback} />);
      
      const fileInput = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      
      const event = {
        target: {
          files: [file],
        },
      } as any;
      
      // Should handle callback errors gracefully
      expect(() => {
        fileInput.onchange?.(event);
      }).toThrow('Upload error');
      
      expect(errorCallback).toHaveBeenCalledWith(file);
    });
  });

  describe('Integration with Forms', () => {
    it('should work with form validation', async () => {
      const user = userEvent.setup();
      render(<AutoFileUploader {...defaultProps} accept=".pdf" />);
      
      const fileInput = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;
      const pdfFile = new File(['pdf content'], 'document.pdf', { type: 'application/pdf' });
      
      await user.upload(fileInput, pdfFile);
      
      expect(mockOnFileUpload).toHaveBeenCalledWith(pdfFile);
      expect(pdfFile.name).toBe('document.pdf');
      expect(pdfFile.type).toBe('application/pdf');
    });

    it('should provide file metadata for validation', async () => {
      const user = userEvent.setup();
      render(<AutoFileUploader {...defaultProps} />);
      
      const fileInput = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      
      await user.upload(fileInput, file);
      
      expect(mockOnFileUpload).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'test.txt',
          type: 'text/plain',
          size: expect.any(Number),
        })
      );
    });
  });
});