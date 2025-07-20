'use client';

import PhChips from '@/components/Shared/PhChip/PhChips';
import PHAlert from '@/components/Shared/PHModal/PHAlert';
import { UserRole } from '@/types/common';
import { ExtendedUser, UserStatus } from '@/types/user';
import {
  CheckCircle as ActivateIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  LockReset as ResetPasswordIcon,
  Block as SuspendIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { MouseEvent, useState } from 'react';

type UserAction =
  | 'view'
  | 'edit'
  | 'suspend'
  | 'activate'
  | 'delete'
  | 'resetPassword';

interface UserDataGridProps {
  users: ExtendedUser[];
  isLoading: boolean;
  selectedUsers: string[];
  onSelectionChange: (userIds: string[]) => void;
  onUserAction: (action: UserAction, userId: string) => void;
  onRowClick?: (userId: string) => void;
  loadingActions?: { [userId: string]: UserAction };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  onPaginationChange: (
    pagination: Partial<{ page: number; pageSize: number }>
  ) => void;
}

interface ConfirmationDialog {
  open: boolean;
  action: UserAction | null;
  userId: string | null;
  userName: string;
}

const UserDataGrid = ({
  users,
  isLoading,
  selectedUsers,
  onSelectionChange,
  onUserAction,
  onRowClick,
  loadingActions = {},
  pagination,
  onPaginationChange,
}: UserDataGridProps) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    userId: string;
  } | null>(null);

  const [confirmationDialog, setConfirmationDialog] =
    useState<ConfirmationDialog>({
      open: false,
      action: null,
      userId: null,
      userName: '',
    });

  // Helper function to get display name
  const getDisplayName = (user: ExtendedUser): string => {
    if (user.admin?.name) return user.admin.name;
    if (user.doctor?.name) return user.doctor.name;
    if (user.patient?.name) return user.patient.name;
    return user.email.split('@')[0]; // Fallback to email prefix
  };

  // Helper function to get status chip type
  const getStatusChipType = (
    status: UserStatus
  ): 'success' | 'warning' | 'error' => {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'success';
      case UserStatus.BLOCKED:
        return 'warning';
      case UserStatus.DELETED:
        return 'error';
      default:
        return 'info' as any;
    }
  };

  // Helper function to get role chip color
  const getRoleChipColor = (role: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return { bgcolor: '#e3f2fd', color: '#0d47a1' };
      case 'ADMIN':
        return { bgcolor: '#f3e5f5', color: '#4a148c' };
      case 'DOCTOR':
        return { bgcolor: '#e8f5e8', color: '#1b5e20' };
      case 'PATIENT':
        return { bgcolor: '#fff3e0', color: '#e65100' };
      default:
        return { bgcolor: '#f5f5f5', color: '#424242' };
    }
  };

  // Handle context menu
  const handleContextMenu = (
    event: MouseEvent<HTMLButtonElement>,
    userId: string
  ) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
            userId,
          }
        : null
    );
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  // Handle user actions
  const handleUserAction = (action: UserAction, userId: string) => {
    const user = users.find((u) => u.id === userId);
    const userName = user ? getDisplayName(user) : 'Unknown User';

    // Actions that require confirmation
    if (['suspend', 'activate', 'delete', 'resetPassword'].includes(action)) {
      setConfirmationDialog({
        open: true,
        action,
        userId,
        userName,
      });
    } else {
      // Direct actions (view, edit)
      onUserAction(action, userId);
    }

    handleContextMenuClose();
  };

  // Handle confirmation dialog
  const handleConfirmAction = () => {
    if (confirmationDialog.action && confirmationDialog.userId) {
      onUserAction(confirmationDialog.action, confirmationDialog.userId);
    }
    setConfirmationDialog({
      open: false,
      action: null,
      userId: null,
      userName: '',
    });
  };

  const handleCancelAction = () => {
    setConfirmationDialog({
      open: false,
      action: null,
      userId: null,
      userName: '',
    });
  };

  // Get confirmation dialog content
  const getConfirmationContent = () => {
    const { action, userName } = confirmationDialog;
    switch (action) {
      case 'suspend':
        return `Are you sure you want to suspend ${userName}? This will prevent them from accessing the system.`;
      case 'activate':
        return `Are you sure you want to activate ${userName}? This will restore their access to the system.`;
      case 'delete':
        return `Are you sure you want to delete ${userName}? This action will soft delete the user account and cannot be easily undone.`;
      case 'resetPassword':
        return `Are you sure you want to reset the password for ${userName}? A temporary password will be generated and sent to their email.`;
      default:
        return 'Are you sure you want to perform this action?';
    }
  };

  const getConfirmationTitle = () => {
    const { action } = confirmationDialog;
    switch (action) {
      case 'suspend':
        return 'Suspend User';
      case 'activate':
        return 'Activate User';
      case 'delete':
        return 'Delete User';
      case 'resetPassword':
        return 'Reset Password';
      default:
        return 'Confirm Action';
    }
  };

  // Transform users data for DataGrid
  const rows = users.map((user) => ({
    ...user,
    displayName: getDisplayName(user),
  }));

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'User ID',
      flex: 0.8,
      minWidth: 120,
      // Visible on all screen sizes
      renderCell: ({ value }) => (
        <Box
          sx={{
            fontFamily: 'monospace',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            color: 'text.secondary',
          }}
        >
          {value.slice(-8)} {/* Show last 8 characters for readability */}
        </Box>
      ),
    },
    {
      field: 'displayName',
      headerName: 'Name',
      flex: 1.2,
      minWidth: 150,
      renderCell: ({ value, row }) => (
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            {value}
          </Typography>
          {/* Show email on mobile as secondary text */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: { xs: 'block', sm: 'none' },
              fontSize: '0.6875rem',
              lineHeight: 1.2,
            }}
          >
            {(row as ExtendedUser).email}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.2,
      minWidth: 200,
      // Hide on mobile since it's shown under name
      renderCell: ({ value }) => (
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.8,
      minWidth: 100,
      renderCell: ({ value }) => {
        const chipStyles = getRoleChipColor(value);
        return (
          <Chip
            label={value.replace('_', ' ').toUpperCase()}
            size="small"
            sx={{
              ...chipStyles,
              fontSize: { xs: '0.625rem', sm: '0.75rem' },
              height: { xs: 20, sm: 24 },
              '& .MuiChip-label': {
                px: { xs: 0.5, sm: 1 },
              },
            }}
          />
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.7,
      minWidth: 90,
      renderCell: ({ value }) => (
        <PhChips
          label={value}
          type={getStatusChipType(value)}
          sx={{
            fontSize: { xs: '0.625rem', sm: '0.75rem' },
            height: { xs: 20, sm: 24 },
          }}
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Registered',
      flex: 1,
      minWidth: 120,
      renderCell: ({ value }) => {
        if (!value) return '-';
        return (
          <Box>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {dayjs(value).format('MMM DD, YYYY')}
            </Typography>
            {/* Show time on mobile as secondary text */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: { xs: 'block', sm: 'none' },
                fontSize: '0.6875rem',
              }}
            >
              {dayjs(value).format('HH:mm')}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'lastLoginAt',
      headerName: 'Last Login',
      flex: 1,
      minWidth: 120,
      // Hide on smaller screens to save space
      renderCell: ({ value }) => {
        if (!value)
          return (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                display: { xs: 'none', md: 'block' },
              }}
            >
              Never
            </Typography>
          );
        return (
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {dayjs(value).format('MMM DD, YYYY')}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '0.6875rem' }}
            >
              {dayjs(value).format('HH:mm')}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        const userId = id as string;
        const user = row as ExtendedUser;
        const isLoading = loadingActions[userId];
        const isDeleted = user.status === UserStatus.DELETED;

        const actions = [
          <GridActionsCellItem
            key="view"
            icon={
              isLoading === 'view' ? (
                <CircularProgress size={16} />
              ) : (
                <Tooltip title="View Details">
                  <ViewIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                </Tooltip>
              )
            }
            label="View"
            onClick={() => handleUserAction('view', userId)}
            disabled={!!isLoading}
          />,
        ];

        if (!isDeleted) {
          actions.push(
            <GridActionsCellItem
              key="edit"
              icon={
                isLoading === 'edit' ? (
                  <CircularProgress size={16} />
                ) : (
                  <Tooltip title="Edit User">
                    <EditIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                  </Tooltip>
                )
              }
              label="Edit"
              onClick={() => handleUserAction('edit', userId)}
              disabled={!!isLoading}
            />
          );
        }

        // More actions button - always visible but larger touch target on mobile
        actions.push(
          <GridActionsCellItem
            key="more"
            icon={
              <Tooltip title="More Actions">
                <MoreVertIcon sx={{ fontSize: { xs: 20, sm: 20 } }} />
              </Tooltip>
            }
            label="More"
            onClick={(event) =>
              handleContextMenu(event as MouseEvent<HTMLButtonElement>, userId)
            }
            disabled={!!isLoading}
          />
        );

        return actions;
      },
    },
  ];

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    // GridRowSelectionModel can be an array of strings or numbers
    const userIds = Array.isArray(selectionModel)
      ? selectionModel.map((id) => String(id))
      : [];
    onSelectionChange(userIds);
  };

  const handlePaginationModelChange = (model: {
    page: number;
    pageSize: number;
  }) => {
    onPaginationChange({
      page: model.page + 1, // DataGrid uses 0-based indexing, but our API uses 1-based
      pageSize: model.pageSize,
    });
  };

  const handleRowClick = (params: any) => {
    if (onRowClick) {
      onRowClick(params.id);
    }
  };

  const contextUser = contextMenu
    ? users.find((u) => u.id === contextMenu.userId)
    : null;
  const isContextUserDeleted = contextUser?.status === UserStatus.DELETED;
  const isContextUserActive = contextUser?.status === UserStatus.ACTIVE;

  return (
    <>
      <Box
        sx={{ height: 600, width: '100%' }}
        role="region"
        aria-labelledby="users-table-title"
        aria-describedby="users-table-description"
      >
        {/* Screen reader only descriptions */}
        <Typography
          id="users-table-title"
          variant="h6"
          component="h2"
          sx={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          Users Data Table
        </Typography>
        <Typography
          id="users-table-description"
          variant="body2"
          sx={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          Table showing user information with options to view, edit, suspend,
          activate, or delete users. Use arrow keys to navigate, space to select
          rows, and enter to activate buttons.
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={selectedUsers as unknown as GridRowSelectionModel}
          onRowSelectionModelChange={handleSelectionChange}
          onRowClick={handleRowClick}
          paginationMode="server"
          paginationModel={{
            page: pagination.page - 1, // Convert to 0-based for DataGrid
            pageSize: pagination.pageSize,
          }}
          onPaginationModelChange={handlePaginationModelChange}
          rowCount={pagination.total}
          pageSizeOptions={[10, 20, 50, 100]}
          // Accessibility props
          aria-label="Users management table"
          getRowId={(row) => row.id}
          // Enhanced keyboard navigation - removed deprecated feature
          sx={{
            '& .MuiDataGrid-root': {
              border: '2px solid transparent',
              '&:focus-within': {
                borderColor: 'primary.main',
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            },
            '& .MuiDataGrid-columnHeader': {
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '-2px',
              },
            },
            '& .MuiDataGrid-cell': {
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '-2px',
              },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '-2px',
              },
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                cursor: 'pointer',
              },
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '-2px',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                },
              },
            },
            '& .MuiDataGrid-checkboxInput': {
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            },
            '& .deleted-row': {
              opacity: 0.6,
              backgroundColor: 'rgba(244, 67, 54, 0.04)',
            },
            // Enhanced pagination accessibility
            '& .MuiTablePagination-root': {
              '& .MuiTablePagination-select': {
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              },
            },
            '& .MuiIconButton-root': {
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            },
          }}
          getRowClassName={(params) => {
            // Add visual indication for deleted users
            return params.row.status === UserStatus.DELETED
              ? 'deleted-row'
              : '';
          }}
          // Accessibility announcements
          localeText={{
            noRowsLabel: 'No users found',
            noResultsOverlayLabel: 'No users match the current filters',
          }}
        />
      </Box>

      {/* Context Menu */}
      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {!isContextUserDeleted && (
          <MenuItem
            onClick={() =>
              handleUserAction(
                isContextUserActive ? 'suspend' : 'activate',
                contextMenu!.userId
              )
            }
            disabled={!!loadingActions[contextMenu?.userId || '']}
          >
            <ListItemIcon>
              {loadingActions[contextMenu?.userId || ''] ===
              (isContextUserActive ? 'suspend' : 'activate') ? (
                <CircularProgress size={20} />
              ) : isContextUserActive ? (
                <SuspendIcon fontSize="small" />
              ) : (
                <ActivateIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>
              {isContextUserActive ? 'Suspend User' : 'Activate User'}
            </ListItemText>
          </MenuItem>
        )}

        {!isContextUserDeleted && (
          <MenuItem
            onClick={() =>
              handleUserAction('resetPassword', contextMenu!.userId)
            }
            disabled={!!loadingActions[contextMenu?.userId || '']}
          >
            <ListItemIcon>
              {loadingActions[contextMenu?.userId || ''] === 'resetPassword' ? (
                <CircularProgress size={20} />
              ) : (
                <ResetPasswordIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>Reset Password</ListItemText>
          </MenuItem>
        )}

        {!isContextUserDeleted && (
          <MenuItem
            onClick={() => handleUserAction('delete', contextMenu!.userId)}
            disabled={!!loadingActions[contextMenu?.userId || '']}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon>
              {loadingActions[contextMenu?.userId || ''] === 'delete' ? (
                <CircularProgress size={20} />
              ) : (
                <DeleteIcon fontSize="small" color="error" />
              )}
            </ListItemIcon>
            <ListItemText>Delete User</ListItemText>
          </MenuItem>
        )}
      </Menu>

      {/* Confirmation Dialog */}
      <PHAlert
        open={confirmationDialog.open}
        title={getConfirmationTitle()}
        handleConfirm={handleConfirmAction}
        handleCancel={handleCancelAction}
      >
        {getConfirmationContent()}
      </PHAlert>
    </>
  );
};

export default UserDataGrid;
