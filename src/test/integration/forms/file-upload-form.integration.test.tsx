import AutoFileUploader from '@/components/Forms/AutoFileUploader';
import PHFileUploader from '@/components/Forms/PHFileUploader';
import PHForm from '@/components/Forms/PHForm';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { render } from '../../utils/test-utils';

// Mock dependencies
jest.mock('sonner');

const mockToast = toast as jest.Mocked<typeof toast>;

// File upload validation schema
const fileUploadSchema = z.object({
  profileImage: z.any().optional(),
  documents: z.any().optional(),
});

// Mock file upload service
const mockUploadFile = jest.fn();

// Test component for PHFileUploader (form-integrated)
const FormFileUploadTest = ({ 
  onSubmit,
  maxFileSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/*', '.pdf', '.doc', '.docx']
}: {
  onSubmit: (values: any) => Promise<void>;
  maxFileSize?: number;
  acceptedTypes?: string[];
}) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleSubmit = async (values: any) => {
    try {
      // Simulate file upload with progress
      if (values.profileImage) {
        await simulateFileUpload(values.profileImage, 'profileImage', setUploadProgress);
      }
      if (values.documents) {
        await simulateFileUpload(values.documents, 'documents', setUploadProgress);
      }
      
      await onSubmit(values);
      mockToast.success('Files uploaded successfully!');
    } catch (error) {
      mockToast.error('Failed to upload files');
      throw error;
    }
  };

  const simulateFileUpload = async (
    file: File, 
    fieldName: string, 
    setProgress: (progress: Record<string, number>) => void
  ) => {
    // Validate file size
    if (file.size > maxFileSize) {
      throw new Error(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`);
    }

    // Validate file type
    const fileType = file.type || file.name.split('.').pop();
    const isValidType = acceptedTypes.some(type => {
      if (type.includes('*')) {
        return file.type.startsWith(type.replace('*', ''));
      }
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    });

    if (!isValidType) {
      throw new Error(`File type not supported. Accepted types: ${acceptedTypes.join(', ')}`);
    }

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 20) {
      setProgress(prev => ({ ...prev, [fieldName]: progress }));
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return mockUploadFile(file);
  };

  return (
    <Box data-testid="file-upload-form">
      <PHForm
        onSubmit={handleSubmit}
        defaultValues={{
          profileImage: null,
          documents: null,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Profile Image
          </Typography>
          <PHFileUploader
            name="profileImage"
            label="Upload Profile Image"
          />
          {uploadProgress.profileImage !== undefined && uploadProgress.profileImage < 100 && (
            <Box sx={{ mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress.profileImage} 
                data-testid="profile-image-progress"
              />
              <Typography variant="caption">
                {uploadProgress.profileImage}% uploaded
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Documents
          </Typography>
          <PHFileUploader
            name="documents"
            label="Upload Documents"
          />
          {uploadProgress.documents !== undefined && uploadProgress.documents < 100 && (
            <Box sx={{ mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress.documents}
                data-testid="documents-progress"
              />
              <Typography variant="caption">
                {uploadProgress.documents}% uploaded
              </Typography>
            </Box>
          )}
        </Box>

        <Button 
          type="submit" 
          variant="contained" 
          data-testid="submit-button"
        >
          Upload Files
        </Button>
      </PHForm>
    </Box>
  );
};

// Test component for AutoFileUploader (standalone)
const AutoFileUploadTest = ({
  onFileUpload,
  showProgress = false,
  maxFileSize = 5 * 1024 * 1024,
  acceptedTypes = 'image/*,.pdf,.doc,.docx'
}: {
  onFileUpload: (file: File) => Promise<void>;
  showProgress?: boolean;
  maxFileSize?: number;
  acceptedTypes?: string;
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = async (file: File) => {
    // Validate file size
    if (file.size > maxFileSize) {
      mockToast.error(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      if (showProgress) {
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }

      await onFileUpload(file);
      setUploadedFiles(prev => [...prev, file]);
      mockToast.success(`${file.name} uploaded successfully!`);
    } catch (error) {
      mockToast.error(`Failed to upload ${file.name}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Box data-testid="auto-file-upload">
      <AutoFileUploader
        name="autoUpload"
        label={isUploading ? 'Uploading...' : 'Choose File'}
        accept={acceptedTypes}
        onFileUpload={handleFileUpload}
        icon={<CloudUploadIcon />}
      />
      
      {showProgress && isUploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={uploadProgress}
            data-testid="auto-upload-progress"
          />
          <Typography variant="caption">
            {uploadProgress}% uploaded
          </Typography>
        </Box>
      )}

      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 2 }} data-testid="uploaded-files-list">
          <Typography variant="subtitle2">Uploaded Files:</Typography>
          {uploadedFiles.map((file, index) => (
            <Typography key={index} variant="body2">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

describe('File Upload Form Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUploadFile.mockResolvedValue({ url: 'https://example.com/uploaded-file.jpg' });
  });

  describe('PHFileUploader (Form Integration)', () => {
    it('should render file upload form', () => {
      const mockSubmit = jest.fn();
      render(<FormFileUploadTest onSubmit={mockSubmit} />);

      expect(screen.getByTestId('file-upload-form')).toBeInTheDocument();
      expect(screen.getByText('Profile Image')).toBeInTheDocument();
      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(screen.getByText('Upload Profile Image')).toBeInTheDocument();
      expect(screen.getByText('Upload Documents')).toBeInTheDocument();
    });

    it('should handle file selection and upload', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue(undefined);

      render(<FormFileUploadTest onSubmit={mockSubmit} />);

      // Create a test file
      const testFile = new File(['test content'], 'test-image.jpg', {
        type: 'image/jpeg',
      });

      // Find the hidden file input for profile image
      const profileImageButton = screen.getByText('Upload Profile Image');
      const profileImageInput = profileImageButton.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;

      // Upload file
      if (profileImageInput) {
        await user.upload(profileImageInput, testFile);
      }

      // Check that button text changes to show selected file
      await waitFor(() => {
        expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
      });

      // Submit form
      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            profileImage: testFile,
          })
        );
        expect(mockToast.success).toHaveBeenCalledWith('Files uploaded successfully!');
      });
    });

    it('should show upload progress', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue(undefined);

      render(<FormFileUploadTest onSubmit={mockSubmit} />);

      const testFile = new File(['test content'], 'test-image.jpg', {
        type: 'image/jpeg',
      });

      const profileImageButton = screen.getByText('Upload Profile Image');
      const profileImageInput = profileImageButton.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;

      if (profileImageInput) {
        await user.upload(profileImageInput, testFile);
      }

      // Submit form to trigger upload
      await user.click(screen.getByTestId('submit-button'));

      // Check for progress bar
      await waitFor(() => {
        expect(screen.getByTestId('profile-image-progress')).toBeInTheDocument();
      });

      // Wait for upload to complete
      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith('Files uploaded successfully!');
      }, { timeout: 2000 });
    });

    it('should validate file size', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue(undefined);

      // Set small file size limit (1KB)
      render(<FormFileUploadTest onSubmit={mockSubmit} maxFileSize={1024} />);

      // Create a large test file (2KB)
      const largeFile = new File(['x'.repeat(2048)], 'large-file.jpg', {
        type: 'image/jpeg',
      });

      const profileImageButton = screen.getByText('Upload Profile Image');
      const profileImageInput = profileImageButton.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;

      if (profileImageInput) {
        await user.upload(profileImageInput, largeFile);
      }

      // Submit form
      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('Failed to upload files');
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('should validate file type', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue(undefined);

      // Only allow images
      render(<FormFileUploadTest onSubmit={mockSubmit} acceptedTypes={['image/*']} />);

      // Create a text file
      const textFile = new File(['test content'], 'test.txt', {
        type: 'text/plain',
      });

      const profileImageButton = screen.getByText('Upload Profile Image');
      const profileImageInput = profileImageButton.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;

      if (profileImageInput) {
        await user.upload(profileImageInput, textFile);
      }

      // Submit form
      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('Failed to upload files');
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('should handle upload errors', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockRejectedValue(new Error('Upload failed'));

      render(<FormFileUploadTest onSubmit={mockSubmit} />);

      const testFile = new File(['test content'], 'test-image.jpg', {
        type: 'image/jpeg',
      });

      const profileImageButton = screen.getByText('Upload Profile Image');
      const profileImageInput = profileImageButton.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;

      if (profileImageInput) {
        await user.upload(profileImageInput, testFile);
      }

      // Submit form
      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('Failed to upload files');
      });
    });

    it('should handle multiple file uploads', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn().mockResolvedValue(undefined);

      render(<FormFileUploadTest onSubmit={mockSubmit} />);

      // Upload profile image
      const profileFile = new File(['profile content'], 'profile.jpg', {
        type: 'image/jpeg',
      });

      const profileImageButton = screen.getByText('Upload Profile Image');
      const profileImageInput = profileImageButton.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;

      if (profileImageInput) {
        await user.upload(profileImageInput, profileFile);
      }

      // Upload document
      const documentFile = new File(['document content'], 'document.pdf', {
        type: 'application/pdf',
      });

      const documentsButton = screen.getByText('Upload Documents');
      const documentsInput = documentsButton.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;

      if (documentsInput) {
        await user.upload(documentsInput, documentFile);
      }

      // Submit form
      await user.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            profileImage: profileFile,
            documents: documentFile,
          })
        );
        expect(mockToast.success).toHaveBeenCalledWith('Files uploaded successfully!');
      });
    });
  });

  describe('AutoFileUploader (Standalone)', () => {
    it('should render auto file uploader', () => {
      const mockUpload = jest.fn();
      render(<AutoFileUploadTest onFileUpload={mockUpload} />);

      expect(screen.getByTestId('auto-file-upload')).toBeInTheDocument();
      expect(screen.getByText('Choose File')).toBeInTheDocument();
    });

    it('should handle immediate file upload', async () => {
      const user = userEvent.setup();
      const mockUpload = jest.fn().mockResolvedValue(undefined);

      render(<AutoFileUploadTest onFileUpload={mockUpload} />);

      const testFile = new File(['test content'], 'test-file.jpg', {
        type: 'image/jpeg',
      });

      // Find the hidden file input
      const fileInput = screen.getByTestId('auto-file-upload').querySelector('input[type="file"]') as HTMLInputElement;

      // Upload file
      if (fileInput) {
        await user.upload(fileInput, testFile);
      }

      await waitFor(() => {
        expect(mockUpload).toHaveBeenCalledWith(testFile);
        expect(mockToast.success).toHaveBeenCalledWith('test-file.jpg uploaded successfully!');
      });
    });

    it('should show upload progress for auto uploader', async () => {
      const user = userEvent.setup();
      const mockUpload = jest.fn().mockResolvedValue(undefined);

      render(<AutoFileUploadTest onFileUpload={mockUpload} showProgress={true} />);

      const testFile = new File(['test content'], 'test-file.jpg', {
        type: 'image/jpeg',
      });

      const fileInput = screen.getByTestId('auto-file-upload').querySelector('input[type="file"]') as HTMLInputElement;

      if (fileInput) {
        await user.upload(fileInput, testFile);
      }

      // Check for progress bar
      await waitFor(() => {
        expect(screen.getByTestId('auto-upload-progress')).toBeInTheDocument();
      });

      // Wait for upload to complete
      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith('test-file.jpg uploaded successfully!');
      }, { timeout: 1000 });
    });

    it('should display uploaded files list', async () => {
      const user = userEvent.setup();
      const mockUpload = jest.fn().mockResolvedValue(undefined);

      render(<AutoFileUploadTest onFileUpload={mockUpload} />);

      const testFile = new File(['test content'], 'test-file.jpg', {
        type: 'image/jpeg',
      });

      const fileInput = screen.getByTestId('auto-file-upload').querySelector('input[type="file"]') as HTMLInputElement;

      if (fileInput) {
        await user.upload(fileInput, testFile);
      }

      await waitFor(() => {
        expect(screen.getByTestId('uploaded-files-list')).toBeInTheDocument();
        expect(screen.getByText('test-file.jpg (0.0 KB)')).toBeInTheDocument();
      });
    });

    it('should validate file size for auto uploader', async () => {
      const user = userEvent.setup();
      const mockUpload = jest.fn().mockResolvedValue(undefined);

      // Set small file size limit (1KB)
      render(<AutoFileUploadTest onFileUpload={mockUpload} maxFileSize={1024} />);

      // Create a large test file (2KB)
      const largeFile = new File(['x'.repeat(2048)], 'large-file.jpg', {
        type: 'image/jpeg',
      });

      const fileInput = screen.getByTestId('auto-file-upload').querySelector('input[type="file"]') as HTMLInputElement;

      if (fileInput) {
        await user.upload(fileInput, largeFile);
      }

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('File size exceeds 1MB limit');
      });

      expect(mockUpload).not.toHaveBeenCalled();
    });

    it('should handle upload errors for auto uploader', async () => {
      const user = userEvent.setup();
      const mockUpload = jest.fn().mockRejectedValue(new Error('Upload failed'));

      render(<AutoFileUploadTest onFileUpload={mockUpload} />);

      const testFile = new File(['test content'], 'test-file.jpg', {
        type: 'image/jpeg',
      });

      const fileInput = screen.getByTestId('auto-file-upload').querySelector('input[type="file"]') as HTMLInputElement;

      if (fileInput) {
        await user.upload(fileInput, testFile);
      }

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('Failed to upload test-file.jpg');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for file inputs', () => {
      const mockSubmit = jest.fn();
      render(<FormFileUploadTest onSubmit={mockSubmit} />);

      const profileImageButton = screen.getByText('Upload Profile Image');
      const documentsButton = screen.getByText('Upload Documents');

      expect(profileImageButton).toHaveAttribute('role', 'button');
      expect(documentsButton).toHaveAttribute('role', 'button');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const mockSubmit = jest.fn();

      render(<FormFileUploadTest onSubmit={mockSubmit} />);

      const profileImageButton = screen.getByText('Upload Profile Image');
      
      // Should be focusable
      await user.tab();
      expect(profileImageButton).toHaveFocus();

      // Should be activatable with Enter key
      await user.keyboard('{Enter}');
      // File dialog would open (can't test in jsdom)
    });

    it('should announce upload progress to screen readers', async () => {
      const user = userEvent.setup();
      const mockUpload = jest.fn().mockResolvedValue(undefined);

      render(<AutoFileUploadTest onFileUpload={mockUpload} showProgress={true} />);

      const testFile = new File(['test content'], 'test-file.jpg', {
        type: 'image/jpeg',
      });

      const fileInput = screen.getByTestId('auto-file-upload').querySelector('input[type="file"]') as HTMLInputElement;

      if (fileInput) {
        await user.upload(fileInput, testFile);
      }

      // Progress should be announced
      await waitFor(() => {
        const progressText = screen.getByText(/% uploaded/);
        expect(progressText).toBeInTheDocument();
      });
    });
  });
});