import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PHModal from '../PHModal/PHModal';

// Mock MUI components
vi.mock('@mui/material/Dialog', () => ({
  default: ({
    children,
    open,
    onClose,
    maxWidth,
    fullWidth,
    sx,
    ...props
  }: any) =>
    open ? (
      <div
        data-testid="dialog"
        data-max-width={maxWidth}
        data-full-width={fullWidth}
        style={sx}
        {...props}
      >
        <div data-testid="dialog-backdrop" onClick={onClose} />
        {children}
      </div>
    ) : null,
}));

vi.mock('@mui/material/DialogContent', () => ({
  default: ({ children, dividers, ...props }: any) => (
    <div data-testid="dialog-content" data-dividers={dividers} {...props}>
      {children}
    </div>
  ),
}));

vi.mock('@mui/material/DialogTitle', () => ({
  default: ({ children, sx, id, ...props }: any) => (
    <div data-testid="dialog-title" id={id} style={sx} {...props}>
      {children}
    </div>
  ),
}));

vi.mock('@mui/material/IconButton', () => ({
  default: ({ children, onClick, sx, ...props }: any) => (
    <button data-testid="close-button" onClick={onClick} style={sx} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@mui/icons-material/Close', () => ({
  default: () => <span data-testid="close-icon">×</span>,
}));

vi.mock('@mui/material/styles', () => ({
  styled: (component: any) => component,
  SxProps: {},
}));

describe('PHModal', () => {
  const defaultProps = {
    open: true,
    setOpen: vi.fn(),
    title: 'Test Modal',
    children: <div data-testid="modal-content">Modal Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render modal when open is true', () => {
      render(<PHModal {...defaultProps} />);

      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
      expect(screen.getByTestId('close-button')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    });

    it('should not render modal when open is false', () => {
      render(<PHModal {...defaultProps} open={false} />);

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    });

    it('should render with custom title', () => {
      render(<PHModal {...defaultProps} title="Custom Title" />);

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('should render with empty title', () => {
      render(<PHModal {...defaultProps} title="" />);

      const titleElement = screen.getByTestId('dialog-title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toBeEmptyDOMElement();
    });

    it('should render children content', () => {
      const customContent = (
        <div>
          <p>Custom paragraph</p>
          <button>Custom button</button>
        </div>
      );

      render(<PHModal {...defaultProps}>{customContent}</PHModal>);

      expect(screen.getByText('Custom paragraph')).toBeInTheDocument();
      expect(screen.getByText('Custom button')).toBeInTheDocument();
    });
  });

  describe('Props handling', () => {
    it('should apply custom sx styles', () => {
      const customSx = { backgroundColor: 'red', padding: '20px' };
      render(<PHModal {...defaultProps} sx={customSx} />);

      const dialog = screen.getByTestId('dialog');
      expect(dialog).toHaveStyle('background-color: red');
      expect(dialog).toHaveStyle('padding: 20px');
    });

    it('should handle maxWidth prop', () => {
      render(<PHModal {...defaultProps} maxWidth="lg" />);

      const dialog = screen.getByTestId('dialog');
      expect(dialog).toHaveAttribute('data-max-width', 'lg');
    });

    it('should default to sm maxWidth', () => {
      render(<PHModal {...defaultProps} />);

      const dialog = screen.getByTestId('dialog');
      expect(dialog).toHaveAttribute('data-max-width', 'sm');
    });

    it('should handle fullWidth prop', () => {
      render(<PHModal {...defaultProps} fullWidth={true} />);

      const dialog = screen.getByTestId('dialog');
      expect(dialog).toHaveAttribute('data-full-width', 'true');
    });

    it('should default to fullWidth false', () => {
      render(<PHModal {...defaultProps} />);

      const dialog = screen.getByTestId('dialog');
      expect(dialog).toHaveAttribute('data-full-width', 'false');
    });

    it('should handle all maxWidth options', () => {
      const maxWidthOptions = ['xs', 'sm', 'md', 'lg', 'xl', false] as const;

      maxWidthOptions.forEach((maxWidth) => {
        const { unmount } = render(
          <PHModal {...defaultProps} maxWidth={maxWidth} />
        );

        const dialog = screen.getByTestId('dialog');
        expect(dialog).toHaveAttribute('data-max-width', String(maxWidth));
        unmount();
      });
    });
  });

  describe('Close functionality', () => {
    it('should call setOpen(false) when close button is clicked', async () => {
      const user = userEvent.setup();
      const setOpenMock = vi.fn();

      render(<PHModal {...defaultProps} setOpen={setOpenMock} />);

      const closeButton = screen.getByTestId('close-button');
      await user.click(closeButton);

      expect(setOpenMock).toHaveBeenCalledWith(false);
      expect(setOpenMock).toHaveBeenCalledTimes(1);
    });

    it('should call setOpen(false) when backdrop is clicked', async () => {
      const user = userEvent.setup();
      const setOpenMock = vi.fn();

      render(<PHModal {...defaultProps} setOpen={setOpenMock} />);

      const backdrop = screen.getByTestId('dialog-backdrop');
      await user.click(backdrop);

      expect(setOpenMock).toHaveBeenCalledWith(false);
      expect(setOpenMock).toHaveBeenCalledTimes(1);
    });

    it('should render close icon', () => {
      render(<PHModal {...defaultProps} />);

      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<PHModal {...defaultProps} />);

      const dialog = screen.getByTestId('dialog');
      const title = screen.getByTestId('dialog-title');

      expect(dialog).toHaveAttribute(
        'aria-labelledby',
        'customized-dialog-title'
      );
      expect(title).toHaveAttribute('id', 'customized-dialog-title');
    });

    it('should have close button with aria-label', () => {
      render(<PHModal {...defaultProps} />);

      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).toHaveAttribute('aria-label', 'close');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const setOpenMock = vi.fn();

      render(<PHModal {...defaultProps} setOpen={setOpenMock} />);

      const closeButton = screen.getByTestId('close-button');

      // Focus and activate with keyboard
      closeButton.focus();
      await user.keyboard('{Enter}');

      expect(setOpenMock).toHaveBeenCalledWith(false);
    });
  });

  describe('Dialog content', () => {
    it('should render content with dividers', () => {
      render(<PHModal {...defaultProps} />);

      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveAttribute('data-dividers', 'true');
    });

    it('should render complex children', () => {
      const complexChildren = (
        <div>
          <form data-testid="modal-form">
            <input type="text" placeholder="Name" />
            <textarea placeholder="Description" />
            <button type="submit">Submit</button>
          </form>
          <div data-testid="modal-footer">
            <button>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      );

      render(<PHModal {...defaultProps}>{complexChildren}</PHModal>);

      expect(screen.getByTestId('modal-form')).toBeInTheDocument();
      expect(screen.getByTestId('modal-footer')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  describe('State management', () => {
    it('should handle open state changes', () => {
      const { rerender } = render(<PHModal {...defaultProps} open={false} />);

      expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();

      rerender(<PHModal {...defaultProps} open={true} />);

      expect(screen.getByTestId('dialog')).toBeInTheDocument();
    });

    it('should handle setOpen function changes', async () => {
      const user = userEvent.setup();
      const firstSetOpen = vi.fn();
      const secondSetOpen = vi.fn();

      const { rerender } = render(
        <PHModal {...defaultProps} setOpen={firstSetOpen} />
      );

      await user.click(screen.getByTestId('close-button'));
      expect(firstSetOpen).toHaveBeenCalledWith(false);

      rerender(<PHModal {...defaultProps} setOpen={secondSetOpen} />);

      await user.click(screen.getByTestId('close-button'));
      expect(secondSetOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('Close button styling', () => {
    it('should apply correct styles to close button', () => {
      render(<PHModal {...defaultProps} />);

      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).toHaveStyle('position: absolute');
      expect(closeButton).toHaveStyle('right: 8px');
      expect(closeButton).toHaveStyle('top: 8px');
    });
  });

  describe('Edge cases', () => {
    it('should handle null children', () => {
      render(<PHModal {...defaultProps}>{null}</PHModal>);

      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });

    it('should handle undefined children', () => {
      render(<PHModal {...defaultProps}>{undefined}</PHModal>);

      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });

    it('should handle multiple close button clicks', async () => {
      const user = userEvent.setup();
      const setOpenMock = vi.fn();

      render(<PHModal {...defaultProps} setOpen={setOpenMock} />);

      const closeButton = screen.getByTestId('close-button');

      await user.click(closeButton);
      await user.click(closeButton);
      await user.click(closeButton);

      expect(setOpenMock).toHaveBeenCalledTimes(3);
      expect(setOpenMock).toHaveBeenCalledWith(false);
    });

    it('should handle very long titles', () => {
      const longTitle =
        'This is a very long title that might cause layout issues in the modal header component and should be handled gracefully';

      render(<PHModal {...defaultProps} title={longTitle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      const specialTitle =
        'Title with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';

      render(<PHModal {...defaultProps} title={specialTitle} />);

      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });
  });
});
