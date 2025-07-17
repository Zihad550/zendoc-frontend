"use client";

import PHAlert from "@/components/Shared/PHModal/PHAlert";
import { UserRole } from "@/types/common";
import {
  BulkOperationResult,
  ExtendedUser,
  GetAllUsersParams,
} from "@/types/user";
import {
  CheckCircle as ActivateIcon,
  SwapHoriz as ChangeRoleIcon,
  Clear as ClearIcon,
  Delete as DeleteIcon,
  FileDownload as ExportIcon,
  Block as SuspendIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BulkOperationResultsModal from "./BulkOperationResultsModal";
import UserExportModal, { ExportConfig } from "./UserExportModal";

export type BulkOperation =
  | "suspend"
  | "activate"
  | "delete"
  | "changeRole"
  | "export";

interface BulkOperationToolbarProps {
  selectedUsers: string[];
  users: ExtendedUser[];
  currentFilters?: GetAllUsersParams;
  onClearSelection: () => void;
  onBulkOperation: (
    operation: BulkOperation,
    options?: { newRole?: UserRole },
  ) => Promise<BulkOperationResult | void>;
  onExport: (config: ExportConfig) => Promise<void>;
  isLoading?: boolean;
  operationProgress?: number;
  isExporting?: boolean;
  exportProgress?: number;
  exportError?: string | null;
}

interface ConfirmationDialog {
  open: boolean;
  operation: BulkOperation | null;
  title: string;
  message: string;
  newRole?: UserRole;
}

interface ResultsModal {
  open: boolean;
  operation: BulkOperation | null;
  results: BulkOperationResult | null;
}

const BulkOperationToolbar = ({
  selectedUsers,
  users,
  currentFilters,
  onClearSelection,
  onBulkOperation,
  onExport,
  isLoading = false,
  operationProgress = 0,
  isExporting = false,
  exportProgress = 0,
  exportError = null,
}: BulkOperationToolbarProps) => {
  const [confirmationDialog, setConfirmationDialog] =
    useState<ConfirmationDialog>({
      open: false,
      operation: null,
      title: "",
      message: "",
    });

  const [resultsModal, setResultsModal] = useState<ResultsModal>({
    open: false,
    operation: null,
    results: null,
  });

  const [changeRoleValue, setChangeRoleValue] = useState<UserRole>("PATIENT");
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Get selected user objects
  const selectedUserObjects = users.filter((user) =>
    selectedUsers.includes(user.id),
  );

  // Helper function to get display name
  const getDisplayName = (user: ExtendedUser): string => {
    if (user.admin?.name) return user.admin.name;
    if (user.doctor?.name) return user.doctor.name;
    if (user.patient?.name) return user.patient.name;
    return user.email.split("@")[0];
  };

  // Helper function to get operation counts
  const getOperationCounts = (operation: BulkOperation) => {
    switch (operation) {
      case "suspend":
        return selectedUserObjects.filter((user) => user.status === "ACTIVE")
          .length;
      case "activate":
        return selectedUserObjects.filter((user) => user.status === "BLOCKED")
          .length;
      case "delete":
        return selectedUserObjects.filter((user) => user.status !== "DELETED")
          .length;
      case "changeRole":
      case "export":
        return selectedUsers.length;
      default:
        return 0;
    }
  };

  // Handle bulk operation initiation
  const handleBulkOperation = (operation: BulkOperation) => {
    const operationCount = getOperationCounts(operation);

    if (operationCount === 0) {
      let message = "";
      switch (operation) {
        case "suspend":
          message = "No active users selected to suspend.";
          break;
        case "activate":
          message = "No blocked users selected to activate.";
          break;
        case "delete":
          message = "No users available for deletion.";
          break;
        default:
          message = "No users available for this operation.";
      }
      // Show a simple alert or notification
      alert(message);
      return;
    }

    // For export, open export modal
    if (operation === "export") {
      setExportModalOpen(true);
      return;
    }

    // Show confirmation dialog for other operations
    const confirmationData = getConfirmationData(operation, operationCount);
    setConfirmationDialog({
      open: true,
      operation,
      ...confirmationData,
    });
  };

  // Get confirmation dialog data
  const getConfirmationData = (operation: BulkOperation, count: number) => {
    switch (operation) {
      case "suspend":
        return {
          title: "Suspend Users",
          message: `Are you sure you want to suspend ${count} user(s)? This will prevent them from accessing the system.`,
        };
      case "activate":
        return {
          title: "Activate Users",
          message: `Are you sure you want to activate ${count} user(s)? This will restore their access to the system.`,
        };
      case "delete":
        return {
          title: "Delete Users",
          message: `Are you sure you want to delete ${count} user(s)? This action will soft delete the user accounts and cannot be easily undone.`,
        };
      case "changeRole":
        return {
          title: "Change User Roles",
          message: `Are you sure you want to change the role of ${count} user(s) to ${changeRoleValue}?`,
          newRole: changeRoleValue,
        };
      default:
        return {
          title: "Confirm Operation",
          message: `Are you sure you want to perform this operation on ${count} user(s)?`,
        };
    }
  };

  // Handle confirmation
  const handleConfirmOperation = async () => {
    const { operation, newRole } = confirmationDialog;

    // Close confirmation dialog
    setConfirmationDialog({
      open: false,
      operation: null,
      title: "",
      message: "",
    });

    if (!operation) return;

    try {
      const result = await onBulkOperation(operation, { newRole });

      // Show results modal for operations that return results
      if (result && typeof result === "object" && "successful" in result) {
        setResultsModal({
          open: true,
          operation,
          results: result,
        });
      }
    } catch (error) {
      console.error("Bulk operation failed:", error);
      // Error handling is done in the parent component
    }
  };

  // Handle cancel confirmation
  const handleCancelConfirmation = () => {
    setConfirmationDialog({
      open: false,
      operation: null,
      title: "",
      message: "",
    });
  };

  // Handle close results modal
  const handleCloseResults = () => {
    setResultsModal({
      open: false,
      operation: null,
      results: null,
    });
  };

  // Handle retry failed operations
  const handleRetryFailed = async () => {
    const { operation, results } = resultsModal;
    if (!operation || !results) return;

    try {
      const retryResult = await onBulkOperation(operation, {
        newRole: confirmationDialog.newRole,
      });

      if (
        retryResult &&
        typeof retryResult === "object" &&
        "successful" in retryResult
      ) {
        setResultsModal({
          open: true,
          operation,
          results: retryResult,
        });
      }
    } catch (error) {
      console.error("Retry operation failed:", error);
    }
  };

  // Handle export modal close
  const handleExportModalClose = () => {
    setExportModalOpen(false);
  };

  // Handle export
  const handleExport = async (config: ExportConfig) => {
    try {
      await onExport(config);
      setExportModalOpen(false);
    } catch (error) {
      console.error("Export failed:", error);
      // Error is handled by the parent component
    }
  };

  // Get operation button props
  const getOperationButtonProps = (operation: BulkOperation) => {
    const count = getOperationCounts(operation);
    const disabled = isLoading || isExporting || count === 0;

    switch (operation) {
      case "suspend":
        return {
          icon: <SuspendIcon />,
          label: `Suspend (${count})`,
          color: "warning" as const,
          disabled,
        };
      case "activate":
        return {
          icon: <ActivateIcon />,
          label: `Activate (${count})`,
          color: "success" as const,
          disabled,
        };
      case "delete":
        return {
          icon: <DeleteIcon />,
          label: `Delete (${count})`,
          color: "error" as const,
          disabled,
        };
      case "changeRole":
        return {
          icon: <ChangeRoleIcon />,
          label: `Change Role (${selectedUsers.length})`,
          color: "primary" as const,
          disabled: isLoading || selectedUsers.length === 0,
        };
      case "export":
        return {
          icon: <ExportIcon />,
          label: `Export (${selectedUsers.length})`,
          color: "info" as const,
          disabled: isLoading || isExporting || selectedUsers.length === 0,
        };
      default:
        return {
          icon: null,
          label: "Unknown",
          color: "primary" as const,
          disabled: true,
        };
    }
  };

  if (selectedUsers.length === 0) {
    return null;
  }

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 2 },
          mb: 2,
          backgroundColor: "primary.50",
          border: "1px solid",
          borderColor: "primary.200",
        }}
        role="toolbar"
        aria-label="Bulk operations for selected users"
        aria-describedby="bulk-operations-description"
      >
        {/* Screen reader only description */}
        <Typography
          id="bulk-operations-description"
          variant="body2"
          sx={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          Toolbar for performing bulk operations on selected users. Use tab to
          navigate between buttons and enter to activate.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 2 }}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between"
        >
          {/* Selection Info */}
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            flexWrap="wrap"
            sx={{
              justifyContent: { xs: "space-between", sm: "flex-start" },
            }}
          >
            <Chip
              label={`${selectedUsers.length} users selected`}
              color="primary"
              variant="outlined"
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                height: { xs: 28, sm: 32 },
              }}
            />
            <Button
              size="small"
              startIcon={<ClearIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
              onClick={onClearSelection}
              disabled={isLoading || isExporting}
              aria-label={`Clear selection of ${selectedUsers.length} users`}
              sx={{
                minHeight: { xs: 36, sm: "auto" },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                "&:focus": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "2px",
                },
              }}
            >
              Clear Selection
            </Button>
          </Box>

          {/* Bulk Action Buttons - Responsive Layout */}
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 1, md: 1 }}
            alignItems="stretch"
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            {/* Primary Actions Row */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems="stretch"
            >
              {/* Suspend Button */}
              {(() => {
                const props = getOperationButtonProps("suspend");
                const count = getOperationCounts("suspend");
                return (
                  <Button
                    variant="outlined"
                    color={props.color}
                    startIcon={props.icon}
                    onClick={() => handleBulkOperation("suspend")}
                    disabled={props.disabled}
                    size="small"
                    aria-label={`Suspend ${count} selected users. This will prevent them from accessing the system.`}
                    sx={{
                      minHeight: { xs: 40, sm: "auto" },
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      flex: { sm: 1, md: "none" },
                      "&:focus": {
                        outline: "2px solid",
                        outlineColor: "warning.main",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    {props.label}
                  </Button>
                );
              })()}

              {/* Activate Button */}
              {(() => {
                const props = getOperationButtonProps("activate");
                const count = getOperationCounts("activate");
                return (
                  <Button
                    variant="outlined"
                    color={props.color}
                    startIcon={props.icon}
                    onClick={() => handleBulkOperation("activate")}
                    disabled={props.disabled}
                    size="small"
                    aria-label={`Activate ${count} selected users. This will restore their access to the system.`}
                    sx={{
                      minHeight: { xs: 40, sm: "auto" },
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      flex: { sm: 1, md: "none" },
                      "&:focus": {
                        outline: "2px solid",
                        outlineColor: "success.main",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    {props.label}
                  </Button>
                );
              })()}

              {/* Delete Button */}
              {(() => {
                const props = getOperationButtonProps("delete");
                const count = getOperationCounts("delete");
                return (
                  <Button
                    variant="outlined"
                    color={props.color}
                    startIcon={props.icon}
                    onClick={() => handleBulkOperation("delete")}
                    disabled={props.disabled}
                    size="small"
                    aria-label={`Delete ${count} selected users. This action will soft delete the user accounts and cannot be easily undone.`}
                    sx={{
                      minHeight: { xs: 40, sm: "auto" },
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      flex: { sm: 1, md: "none" },
                      "&:focus": {
                        outline: "2px solid",
                        outlineColor: "error.main",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    {props.label}
                  </Button>
                );
              })()}
            </Stack>

            {/* Secondary Actions Row */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems="stretch"
            >
              {/* Change Role Section */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                alignItems="stretch"
                sx={{ flex: 1 }}
              >
                <FormControl
                  size="small"
                  sx={{
                    minWidth: { xs: "100%", sm: 120 },
                    flex: { sm: 1, md: "none" },
                  }}
                >
                  <InputLabel
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    id="change-role-select-label"
                  >
                    New Role
                  </InputLabel>
                  <Select
                    value={changeRoleValue}
                    label="New Role"
                    onChange={(e) =>
                      setChangeRoleValue(e.target.value as UserRole)
                    }
                    disabled={isLoading || isExporting}
                    labelId="change-role-select-label"
                    aria-label="Select new role for bulk role change operation"
                    aria-describedby="change-role-help"
                    sx={{
                      "& .MuiSelect-select": {
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      },
                      "&:focus-within": {
                        outline: "2px solid",
                        outlineColor: "primary.main",
                        outlineOffset: "2px",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: { xs: 200, sm: 300 },
                        },
                      },
                    }}
                  >
                    <MenuItem
                      value="PATIENT"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      Patient
                    </MenuItem>
                    <MenuItem
                      value="DOCTOR"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      Doctor
                    </MenuItem>
                    <MenuItem
                      value="ADMIN"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      Admin
                    </MenuItem>
                    <MenuItem
                      value="SUPER_ADMIN"
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      Super Admin
                    </MenuItem>
                  </Select>
                  {/* Screen reader help text */}
                  <Typography
                    id="change-role-help"
                    variant="body2"
                    sx={{
                      position: "absolute",
                      left: "-10000px",
                      top: "auto",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  >
                    Select the new role to assign to all selected users. Use
                    arrow keys to navigate options and enter to select.
                  </Typography>
                </FormControl>
                {(() => {
                  const props = getOperationButtonProps("changeRole");
                  return (
                    <Button
                      variant="outlined"
                      color={props.color}
                      startIcon={props.icon}
                      onClick={() => handleBulkOperation("changeRole")}
                      disabled={props.disabled}
                      size="small"
                      aria-label={`Change role of ${selectedUsers.length} selected users to ${changeRoleValue}`}
                      sx={{
                        minHeight: { xs: 40, sm: "auto" },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        flex: { sm: 1, md: "none" },
                        whiteSpace: "nowrap",
                        "&:focus": {
                          outline: "2px solid",
                          outlineColor: "primary.main",
                          outlineOffset: "2px",
                        },
                      }}
                    >
                      Change Role
                    </Button>
                  );
                })()}
              </Stack>

              {/* Export Button */}
              {(() => {
                const props = getOperationButtonProps("export");
                return (
                  <Button
                    variant="outlined"
                    color={props.color}
                    startIcon={props.icon}
                    onClick={() => handleBulkOperation("export")}
                    disabled={props.disabled}
                    size="small"
                    aria-label={`Export ${selectedUsers.length} selected users to file`}
                    sx={{
                      minHeight: { xs: 40, sm: "auto" },
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      flex: { sm: 1, md: "none" },
                      "&:focus": {
                        outline: "2px solid",
                        outlineColor: "info.main",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    {props.label}
                  </Button>
                );
              })()}
            </Stack>
          </Stack>
        </Stack>

        {/* Progress Indicator */}
        {(isLoading || isExporting) && (
          <Box mt={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {isExporting
                ? "Preparing export..."
                : "Processing bulk operation..."}
            </Typography>
            <LinearProgress
              variant={
                operationProgress > 0 || exportProgress > 0
                  ? "determinate"
                  : "indeterminate"
              }
              value={isExporting ? exportProgress : operationProgress}
              sx={{
                height: { xs: 6, sm: 4 },
                borderRadius: 1,
              }}
            />
            {(operationProgress > 0 || exportProgress > 0) && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.75rem" },
                  mt: 0.5,
                  display: "block",
                }}
              >
                {Math.round(isExporting ? exportProgress : operationProgress)}%
                complete
              </Typography>
            )}
          </Box>
        )}
      </Paper>

      {/* Confirmation Dialog */}
      <PHAlert
        open={confirmationDialog.open}
        title={confirmationDialog.title}
        handleConfirm={handleConfirmOperation}
        handleCancel={handleCancelConfirmation}
      >
        <Box>
          <Typography variant="body1" gutterBottom>
            {confirmationDialog.message}
          </Typography>

          {/* Show selected users preview */}
          {selectedUserObjects.length > 0 &&
            selectedUserObjects.length <= 10 && (
              <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Selected Users:
                </Typography>
                <List dense>
                  {selectedUserObjects.map((user) => (
                    <ListItem key={user.id} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={getDisplayName(user)}
                        secondary={`${user.email} - ${user.role}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

          {selectedUserObjects.length > 10 && (
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                And {selectedUserObjects.length - 10} more users...
              </Typography>
            </Box>
          )}
        </Box>
      </PHAlert>

      {/* Results Modal */}
      <BulkOperationResultsModal
        open={resultsModal.open}
        onClose={handleCloseResults}
        operation={resultsModal.operation}
        results={resultsModal.results}
        users={users}
        onRetryFailed={handleRetryFailed}
        isRetrying={isLoading}
      />

      {/* Export Modal */}
      <UserExportModal
        open={exportModalOpen}
        onClose={handleExportModalClose}
        selectedUsers={selectedUsers}
        users={users}
        currentFilters={currentFilters}
        onExport={handleExport}
        isExporting={isExporting}
        exportProgress={exportProgress}
        exportError={exportError}
      />
    </>
  );
};

export default BulkOperationToolbar;
