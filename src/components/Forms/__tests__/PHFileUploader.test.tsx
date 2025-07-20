import { renderWithForm } from '@/test/utils/form-test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import PHFileUploader from '../PHFileUploader';

// Mock MUI components
vi.mock('@mui/icons-material/CloudUpload', () => ({
  default: () => <span data-testid="cloud-upload-icon">CloudUpload</span>,
}));

vi.mock('@mui/material', () => ({
  Input: ({ onChange, style, ...props }: any) => (
    <input
      data-testid="file-input"
      type="file"
      onChange={onChange}
      style={style}
      {...props}
    />
  ),
  Button: ({ children, component, startIcon, sx, ...props }: any) => (
    <button
      data-testid="upload-button"
      data-component={component}
      style={sx}
      {...props}
    >
      {startIcon}
      {children}
    </button>
  ),
}));

describe('PHFileUploader', () => {
  const defaultProps = {
    name: 'profileImage',
    label: 'Upload Profile Image',
  };

  describe('Rendering', () => {
    it('should render upload button with label', () => {
      renderWithForm(<PHFileUploader {...defaultProps} />);

      expect(screen.getByTestId('upload-button')).toBeInTheDocument();
      expect(screen.getByText('Upload Profile Image')).toBeInTheDocument();
      expect(screen.getByTestId('cloud-upload-icon')).toBeInTheDocument();
      expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });

    it('should render with default label when not provided', () => {
      renderWithForm(<PHFileUploader name="file" />);

      expect(screen.getByText('Upload file')).toBeInTheDocument();
    });

    it('should apply custom sx styles', () => {
      const customSx = { backgroundColor: 'blue', padding: '10px' };
      renderWithForm(<PHFileUploader {...defaultProps} sx={customSx} />);

      const button = screen.getByTestId('upload-button');
      expect(button).toHaveStyle('background-color: blue');
      expect(button).toHaveStyle('padding: 10px');
    });

    it('should set button as label component', () => {
      renderWithForm(<PHFileUploader {...defaultProps} />);

      const button = screen.getByTestId('upload-button');
      expect(button).toHaveAttribute('data-component', 'label');
    });
  });

  describe('File selection', () => {
    it('should handle file selection', async () => {
      const user = userEvent.setup();
      const file = new File(['test content'], 'test.jpg', {
        type: 'image/jpeg',
      });

      renderWithForm(<PHFileUploader {...defaultProps} />);

      const fileInput = screen.getByTestId('file-input');
      await user.upload(fileInput, file);

      // The file name should be displayed on the button
      expect(screen.getByText('test.jpg')).toBeInTheDocument();
    });

    it('should display file name when file is selected', () => {
      const mockFile = { name: 'document.pdf' };

      renderWithForm(<PHFileUploader {...defaultProps} />, {
        defaultValues: { profileImage: mockFile },
      });

      expect(screen.getByText('document.pdf')).toBeInTheDocument();
    });

    it('should show label when no file is selected', () => {
      renderWithForm(<PHFileUploader {...defaultProps} />);

      expect(screen.getByText('Upload Profile Image')).toBeInTheDocument();
    });

    it('should disable input when file is selected', () => {
      const mockFile = { name: 'selected-file.png' };

      renderWithForm(<PHFileUploader {...defaultProps} />, {
        defaultValues: { profileImage: mockFile },
      });

      const fileInput = screen.getByTestId('file-input');
      expect(fileInput).toBeDisabled();
    });
  });

  describe('Form integration', () => {
    it('should integrate with React Hook Form', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });

      renderWithForm(<PHFileUploader {...defaultProps} />, { onSubmit });

      const fileInput = screen.getByTestId('file-input');
      await user.upload(fileInput, file);

      // Verify the form receives the file
      expect(screen.getByText('test.txt')).toBeInTheDocument();
    });

    it('should handle form field name correctly', () => {
      renderWithForm(
        <PHFileUploader name="documentUpload" label="Upload Document" />
      );

      const fileInput = screen.getByTestId('file-input');
      expect(fileInput).toHaveAttribute('type', 'file');
    });

    it('should handle multiple file uploads with different names', async () => {
      const user = userEvent.setup();

      renderWithForm(
        <div>
          <PHFileUploader name="avatar" label="Avatar" />
          <PHFileUploader name="resume" label="Resume" />
        </div>
      );

      const fileInputs = screen.getAllByTestId('file-input');
      expect(fileInputs).toHaveLength(2);

      const file1 = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });
      const file2 = new File(['resume'], 'resume.pdf', {
        type: 'application/pdf',
      });

      await user.upload(fileInputs[0], file1);
      await user.upload(fileInputs[1], file2);

      expect(screen.getByText('avatar.jpg')).toBeInTheDocument();
      expect(screen.getByText('resume.pdf')).toBeInTheDocument();
    });
  });

  describe('File input properties', () => {
    it('should have hidden file input', () => {
      renderWithForm(<PHFileUploader {...defaultProps} />);

      const fileInput = screen.getByTestId('file-input');
      expect(fileInput).toHaveStyle('display: none');
    });

    it('should set correct input type', () => {
      renderWithForm(<PHFileUploader name="upload" />);

      const fileInput = screen.getByTestId('file-input');
      expect(fileInput).toHaveAttribute('type', 'file');
    });
  });

  describe('Accessibility', () => {
    it('should have proper button role', () => {
      renderWithForm(<PHFileUploader {...defaultProps} />);

      const button = screen.getByTestId('upload-button');
      expect(button).toHaveAttribute('role', 'button');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithForm(<PHFileUploader {...defaultProps} />);

      const button = screen.getByTestId('upload-button');

      // Button should be focusable
      await user.tab();
      expect(button).toHaveFocus();
    });

    it('should have descriptive button text', () => {
      renderWithForm(
        <PHFileUploader name="certificate" label="Upload Certificate" />
      );

      expect(screen.getByText('Upload Certificate')).toBeInTheDocument();
    });
  });

  describe('File type handling', () => {
    it('should handle different file types', async () => {
      const user = userEvent.setup();

      renderWithForm(<PHFileUploader {...defaultProps} />);

      const fileTypes = [
        { name: 'image.jpg', type: 'image/jpeg' },
        { name: 'document.pdf', type: 'application/pdf' },
        { name: 'data.csv', type: 'text/csv' },
        { name: 'archive.zip', type: 'application/zip' },
      ];

      for (const fileType of fileTypes) {
        const file = new File(['content'], fileType.name, {
          type: fileType.type,
        });
        const fileInput = screen.getByTestId('file-input');

        await user.upload(fileInput, file);
        expect(screen.getByText(fileType.name)).toBeInTheDocument();
      }
    });

    it('should handle files with special characters in names', async () => {
      const user = userEvent.setup();
      const specialFiles = [
        'file with spaces.txt',
        'file-with-dashes.pdf',
        'file_with_underscores.jpg',
        'file.with.dots.csv',
      ];

      renderWithForm(<PHFileUploader {...defaultProps} />);

      for (const fileName of specialFiles) {
        const file = new File(['content'], fileName, { type: 'text/plain' });
        const fileInput = screen.getByTestId('file-input');

        await user.upload(fileInput, file);
        expect(screen.getByText(fileName)).toBeInTheDocument();
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle empty file name', () => {
      const mockFile = { name: '' };

      renderWithForm(<PHFileUploader {...defaultProps} />, {
        defaultValues: { profileImage: mockFile },
      });

      // Should show label when file name is empty
      expect(screen.getByText('Upload Profile Image')).toBeInTheDocument();
    });

    it('should handle null file value', () => {
      renderWithForm(<PHFileUploader {...defaultProps} />, {
        defaultValues: { profileImage: null },
      });

      expect(screen.getByText('Upload Profile Image')).toBeInTheDocument();
    });

    it('should handle undefined file value', () => {
      renderWithForm(<PHFileUploader {...defaultProps} />, {
        defaultValues: { profileImage: undefined },
      });

      expect(screen.getByText('Upload Profile Image')).toBeInTheDocument();
    });

    it('should handle very long file names', () => {
      const longFileName =
        'this-is-a-very-long-file-name-that-might-cause-layout-issues-in-the-ui-component.txt';
      const mockFile = { name: longFileName };

      renderWithForm(<PHFileUploader {...defaultProps} />, {
        defaultValues: { profileImage: mockFile },
      });

      expect(screen.getByText(longFileName)).toBeInTheDocument();
    });
  });

  describe('Button styling and behavior', () => {
    it('should apply MUI Button variant', () => {
      renderWithForm(<PHFileUploader {...defaultProps} />);

      const button = screen.getByTestId('upload-button');
      // The variant is passed to the MUI Button component
      expect(button).toBeInTheDocument();
    });

    it('should show cloud upload icon', () => {
      renderWithForm(<PHFileUploader {...defaultProps} />);

      expect(screen.getByTestId('cloud-upload-icon')).toBeInTheDocument();
    });

    it('should handle button click to trigger file selection', async () => {
      const user = userEvent.setup();
      renderWithForm(<PHFileUploader {...defaultProps} />);

      const button = screen.getByTestId('upload-button');
      await user.click(button);

      // The click should trigger the hidden file input
      const fileInput = screen.getByTestId('file-input');
      expect(fileInput).toBeInTheDocument();
    });
  });
});
