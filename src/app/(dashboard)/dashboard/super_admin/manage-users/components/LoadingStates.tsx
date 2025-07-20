'use client';

import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

/**
 * Skeleton loading for user statistics cards
 */
export const UserStatsCardsSkeleton = () => {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {[1, 2, 3, 4].map((index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}>
          <Card elevation={1}>
            <CardContent>
              <Stack spacing={1}>
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="40%" height={32} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Skeleton variant="circular" width={16} height={16} />
                  <Skeleton variant="text" width="30%" height={16} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

/**
 * Skeleton loading for user data grid
 */
export const UserDataGridSkeleton = ({ rows = 10 }: { rows?: number }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Skeleton variant="rectangular" width={20} height={20} />
            </TableCell>
            {['Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map(
              (header, index) => (
                <TableCell key={index}>
                  <Skeleton variant="text" width="80%" height={20} />
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Skeleton variant="rectangular" width={20} height={20} />
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="text" width="120px" height={20} />
                </Stack>
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="150px" height={20} />
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={24}
                  sx={{ borderRadius: 1 }}
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="rectangular"
                  width={70}
                  height={24}
                  sx={{ borderRadius: 1 }}
                />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="100px" height={20} />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="circular" width={32} height={32} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/**
 * Skeleton loading for user filters bar
 */
export const UserFiltersBarSkeleton = () => {
  return (
    <Card elevation={1} sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid
            size={{
              xs: 12,
              md: 4
            }}>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 2
            }}>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 2
            }}>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 2
            }}>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 2
            }}>
            <Stack direction="row" spacing={1}>
              <Skeleton
                variant="rectangular"
                width={80}
                height={36}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width={60}
                height={36}
                sx={{ borderRadius: 1 }}
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

/**
 * Skeleton loading for user details modal
 */
export const UserDetailsModalSkeleton = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Skeleton variant="circular" width={64} height={64} />
            <Box>
              <Skeleton variant="text" width="200px" height={28} />
              <Skeleton variant="text" width="150px" height={20} />
            </Box>
          </Stack>
        </Box>

        {/* Tabs */}
        <Box>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            {['Basic Info', 'Profile', 'Activity'].map((tab, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={80}
                height={32}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Stack>
        </Box>

        {/* Content */}
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Stack spacing={2}>
              <Skeleton variant="text" width="100px" height={20} />
              <Skeleton
                variant="rectangular"
                height={40}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton variant="text" width="100px" height={20} />
              <Skeleton
                variant="rectangular"
                height={40}
                sx={{ borderRadius: 1 }}
              />
            </Stack>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Stack spacing={2}>
              <Skeleton variant="text" width="100px" height={20} />
              <Skeleton
                variant="rectangular"
                height={40}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton variant="text" width="100px" height={20} />
              <Skeleton
                variant="rectangular"
                height={40}
                sx={{ borderRadius: 1 }}
              />
            </Stack>
          </Grid>
        </Grid>

        {/* Activity Timeline */}
        <Box>
          <Skeleton variant="text" width="150px" height={24} sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {[1, 2, 3].map((index) => (
              <Box
                key={index}
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
              >
                <Skeleton variant="circular" width={24} height={24} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={16} />
                </Box>
                <Skeleton variant="text" width="80px" height={16} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

/**
 * Skeleton loading for analytics charts
 */
export const UserAnalyticsChartsSkeleton = () => {
  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          xs: 12,
          md: 8
        }}>
        <Card elevation={1}>
          <CardContent>
            <Skeleton variant="text" width="200px" height={24} sx={{ mb: 2 }} />
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 1 }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 4
        }}>
        <Card elevation={1}>
          <CardContent>
            <Skeleton variant="text" width="150px" height={24} sx={{ mb: 2 }} />
            <Skeleton
              variant="circular"
              width={200}
              height={200}
              sx={{ mx: 'auto' }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

/**
 * Skeleton loading for bulk operation toolbar
 */
export const BulkOperationToolbarSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        mb: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Skeleton variant="text" width="120px" height={20} />
        <Skeleton
          variant="rectangular"
          width={80}
          height={32}
          sx={{ borderRadius: 1 }}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        {[1, 2, 3, 4].map((index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={80}
            height={32}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
};

/**
 * Generic loading overlay for modals and forms
 */
interface LoadingOverlayProps {
  loading: boolean;
  children: React.ReactNode;
  message?: string;
  backdrop?: boolean;
}

export const LoadingOverlay = ({
  loading,
  children,
  message = 'Loading...',
  backdrop = true,
}: LoadingOverlayProps) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: backdrop ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            zIndex: 1000,
            borderRadius: 1,
          }}
          role="progressbar"
          aria-label={message}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              p: 3,
              bgcolor: backdrop ? 'background.paper' : 'transparent',
              borderRadius: 2,
              boxShadow: backdrop ? 2 : 0,
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Typography variant="body2" color="text.secondary">
              {message}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

/**
 * Progress indicator for bulk operations
 */
interface BulkOperationProgressProps {
  open: boolean;
  operation: string;
  progress: number;
  total: number;
  currentItem?: string;
  onCancel?: () => void;
}

export const BulkOperationProgress = ({
  open,
  operation,
  progress,
  total,
  currentItem,
  onCancel,
}: BulkOperationProgressProps) => {
  if (!open) return null;

  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 8,
        borderRadius: 2,
        p: 3,
        minWidth: 300,
        zIndex: 9999,
      }}
      role="dialog"
      aria-labelledby="bulk-operation-title"
      aria-describedby="bulk-operation-description"
    >
      <Typography
        id="bulk-operation-title"
        variant="h6"
        component="h2"
        gutterBottom
      >
        {operation}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <Skeleton
              variant="rectangular"
              height={8}
              sx={{
                borderRadius: 1,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${percentage}%`,
                  bgcolor: 'primary.main',
                  borderRadius: 1,
                },
              }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {percentage}%
            </Typography>
          </Box>
        </Box>
        <Typography
          id="bulk-operation-description"
          variant="body2"
          color="text.secondary"
        >
          Processing {progress} of {total} items
        </Typography>
        {currentItem && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Current: {currentItem}
          </Typography>
        )}
      </Box>

      {onCancel && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton
            variant="rectangular"
            width={80}
            height={32}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      )}
    </Box>
  );
};

/**
 * Export progress indicator
 */
interface ExportProgressProps {
  open: boolean;
  progress: number;
  stage: 'preparing' | 'processing' | 'generating' | 'complete';
  onCancel?: () => void;
}

export const ExportProgress = ({
  open,
  progress,
  stage,
  onCancel,
}: ExportProgressProps) => {
  if (!open) return null;

  const getStageMessage = () => {
    switch (stage) {
      case 'preparing':
        return 'Preparing export...';
      case 'processing':
        return 'Processing user data...';
      case 'generating':
        return 'Generating export file...';
      case 'complete':
        return 'Export complete!';
      default:
        return 'Processing...';
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 8,
        borderRadius: 2,
        p: 3,
        minWidth: 300,
        zIndex: 9999,
      }}
      role="dialog"
      aria-labelledby="export-progress-title"
    >
      <Typography
        id="export-progress-title"
        variant="h6"
        component="h2"
        gutterBottom
      >
        Exporting User Data
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <Skeleton
              variant="rectangular"
              height={8}
              sx={{
                borderRadius: 1,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${progress}%`,
                  bgcolor: 'primary.main',
                  borderRadius: 1,
                },
              }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}%
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {getStageMessage()}
        </Typography>
      </Box>

      {onCancel && stage !== 'complete' && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton
            variant="rectangular"
            width={80}
            height={32}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      )}
    </Box>
  );
};
