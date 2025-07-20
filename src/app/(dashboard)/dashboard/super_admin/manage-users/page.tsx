"use client";

import { useScreenReaderAnnouncements } from "@/hooks/useScreenReaderAnnouncements";
import {
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useGetUserStatsQuery,
    useResetUserPasswordMutation,
    useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { GetAllUsersParams, UserStatus } from "@/types/user";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import UserAnalyticsCharts from "./components/UserAnalyticsCharts";
import UserDataGrid from "./components/UserDataGrid";
import UserFiltersBar, { UserFilters } from "./components/UserFiltersBar";
import UserStatsCards from "./components/UserStatsCards";

type UserAction =
  | "view"
  | "edit"
  | "suspend"
  | "activate"
  | "delete"
  | "resetPassword";

const ManageUsersPage = () => {
  const { 
    announcePolite, 
    announceUserAction: _announceUserAction, 
    announceBulkOperation: _announceBulkOperation, 
    announceSearchResults,
    announceSelectionChange 
  } = useScreenReaderAnnouncements();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loadingActions, setLoadingActions] = useState<{
    [userId: string]: UserAction;
  }>({});

  // Initialize state from URL parameters
  const initializeFromURL = useCallback(() => {
    const urlPage = parseInt(searchParams.get("page") || "1");
    const urlPageSize = parseInt(searchParams.get("pageSize") || "20");
    const urlSearch = searchParams.get("search") || "";
    const urlRoles =
      searchParams.get("roles")?.split(",").filter(Boolean) || [];
    const urlStatus =
      searchParams.get("status")?.split(",").filter(Boolean) || [];
    const urlSortBy = searchParams.get("sortBy") || "name";
    const urlSortOrder = searchParams.get("sortOrder") || "asc";
    const urlDateFrom = searchParams.get("dateFrom");
    const urlDateTo = searchParams.get("dateTo");
    const urlLastLoginFrom = searchParams.get("lastLoginFrom");
    const urlLastLoginTo = searchParams.get("lastLoginTo");

    return {
      pagination: {
        page: urlPage,
        pageSize: urlPageSize,
        total: 0,
      },
      filters: {
        searchTerm: urlSearch,
        roles: urlRoles as any[],
        status: urlStatus as any[],
        dateRange: {
          from: urlDateFrom ? dayjs(urlDateFrom) : null,
          to: urlDateTo ? dayjs(urlDateTo) : null,
        },
        lastLoginRange: {
          from: urlLastLoginFrom ? dayjs(urlLastLoginFrom) : null,
          to: urlLastLoginTo ? dayjs(urlLastLoginTo) : null,
        },
        sortBy: urlSortBy as any,
        sortOrder: urlSortOrder as any,
      },
    };
  }, [searchParams]);

  // Initialize state from URL
  const initialState = useMemo(() => initializeFromURL(), [initializeFromURL]);

  // Pagination state with URL initialization
  const [pagination, setPagination] = useState(initialState.pagination);

  // Filter state with URL initialization
  const [filters, setFilters] = useState<UserFilters>(initialState.filters);

  // Track if filters have been applied
  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchTerm.trim() ||
      filters.roles.length > 0 ||
      filters.status.length > 0 ||
      filters.dateRange.from ||
      filters.dateRange.to ||
      filters.lastLoginRange.from ||
      filters.lastLoginRange.to ||
      filters.sortBy !== "name" ||
      filters.sortOrder !== "asc"
    );
  }, [filters]);

  // Convert filters to API parameters
  const apiParams = useMemo((): GetAllUsersParams => {
    const params: GetAllUsersParams = {
      page: pagination.page,
      limit: pagination.pageSize,
    };

    if (filters.searchTerm.trim()) {
      params.searchTerm = filters.searchTerm.trim();
    }

    if (filters.roles.length > 0) {
      params.roles = filters.roles;
    }

    if (filters.status.length > 0) {
      params.status = filters.status;
    }

    if (filters.sortBy && filters.sortOrder) {
      params.sortBy = filters.sortBy;
      params.sortOrder = filters.sortOrder;
    }

    // Registration date range
    if (filters.dateRange.from) {
      params.dateFrom = filters.dateRange.from.format("YYYY-MM-DD");
    }

    if (filters.dateRange.to) {
      params.dateTo = filters.dateRange.to.format("YYYY-MM-DD");
    }

    // Last login date range (if supported by API)
    if (filters.lastLoginRange.from) {
      params.lastLoginFrom = filters.lastLoginRange.from.format("YYYY-MM-DD");
    }

    if (filters.lastLoginRange.to) {
      params.lastLoginTo = filters.lastLoginRange.to.format("YYYY-MM-DD");
    }

    return params;
  }, [filters, pagination.page, pagination.pageSize]);

  // API hooks
  const {
    data: usersResponse,
    isLoading,
    error,
  } = useGetAllUsersQuery(apiParams);

  const {
    data: userStats,
    isLoading: isStatsLoading,
    error: statsError,
  } = useGetUserStatsQuery();

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [resetUserPassword] = useResetUserPasswordMutation();

  // Extract users and pagination from response
  const users = useMemo(() => usersResponse?.data || [], [usersResponse?.data]);
  const totalUsers = usersResponse?.meta?.total || 0;

  // Update pagination total when data changes
  useEffect(() => {
    if (totalUsers !== pagination.total) {
      setPagination((prev) => ({ ...prev, total: totalUsers }));
    }
  }, [totalUsers, pagination.total]);

  // Update URL when state changes
  const updateURL = useCallback(
    (newFilters: UserFilters, newPagination: typeof pagination) => {
      const params = new URLSearchParams();

      // Add pagination parameters
      if (newPagination.page !== 1) {
        params.set("page", newPagination.page.toString());
      }
      if (newPagination.pageSize !== 20) {
        params.set("pageSize", newPagination.pageSize.toString());
      }

      // Add filter parameters
      if (newFilters.searchTerm.trim()) {
        params.set("search", newFilters.searchTerm.trim());
      }
      if (newFilters.roles.length > 0) {
        params.set("roles", newFilters.roles.join(","));
      }
      if (newFilters.status.length > 0) {
        params.set("status", newFilters.status.join(","));
      }
      if (newFilters.sortBy !== "name") {
        params.set("sortBy", newFilters.sortBy);
      }
      if (newFilters.sortOrder !== "asc") {
        params.set("sortOrder", newFilters.sortOrder);
      }
      if (newFilters.dateRange.from) {
        params.set("dateFrom", newFilters.dateRange.from.format("YYYY-MM-DD"));
      }
      if (newFilters.dateRange.to) {
        params.set("dateTo", newFilters.dateRange.to.format("YYYY-MM-DD"));
      }
      if (newFilters.lastLoginRange.from) {
        params.set(
          "lastLoginFrom",
          newFilters.lastLoginRange.from.format("YYYY-MM-DD"),
        );
      }
      if (newFilters.lastLoginRange.to) {
        params.set(
          "lastLoginTo",
          newFilters.lastLoginRange.to.format("YYYY-MM-DD"),
        );
      }

      // Update URL without causing a page reload
      const newURL = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      router.replace(newURL, { scroll: false });
    },
    [router],
  );

  // Update URL when filters or pagination change
  useEffect(() => {
    updateURL(filters, pagination);
  }, [filters, pagination, updateURL]);

  // Announce data loading status to screen readers
  useEffect(() => {
    if (isLoading) {
      announcePolite("Loading users...");
    } else if (users.length > 0) {
      announceSearchResults(users.length);
    } else if (!isLoading && users.length === 0) {
      announcePolite("No users found");
    }
  }, [isLoading, users.length, announcePolite, announceSearchResults]);

  // Announce filter changes
  useEffect(() => {
    const activeFilters = [];
    if (filters.searchTerm) activeFilters.push("search");
    if (filters.roles.length > 0) activeFilters.push("roles");
    if (filters.status.length > 0) activeFilters.push("status");
    if (filters.dateRange.from || filters.dateRange.to)
      activeFilters.push("date range");

    if (activeFilters.length > 0) {
      announcePolite(`Filters applied: ${activeFilters.join(", ")}`);
    }
  }, [filters, announcePolite]);

  // Handle user actions

  const handleUserAction = useCallback(
    async (action: UserAction, userId: string) => {
      setLoadingActions((prev) => ({ ...prev, [userId]: action }));

      try {
        switch (action) {
          case "view":
            // TODO: Open user details modal (will be implemented in task 7.1)
            toast.info("User details modal - Coming Soon");
            break;

          case "edit":
            // TODO: Open user edit modal (will be implemented in task 7.2)
            toast.info("User edit modal - Coming Soon");
            break;

          case "suspend":
            await updateUser({
              id: userId,
              data: { status: UserStatus.BLOCKED },
            }).unwrap();
            toast.success("User suspended successfully");
            break;

          case "activate":
            await updateUser({
              id: userId,
              data: { status: UserStatus.ACTIVE },
            }).unwrap();
            toast.success("User activated successfully");
            break;

          case "delete":
            await deleteUser(userId).unwrap();
            toast.success("User deleted successfully");
            break;

          case "resetPassword":
            const result = await resetUserPassword(userId).unwrap();
            toast.success(
              `Password reset successfully. Temporary password: ${result.temporaryPassword}`,
            );
            break;

          default:
            toast.error("Unknown action");
        }
      } catch (error: any) {
        console.error("User action failed:", error);
        toast.error(error?.data?.message || `Failed to ${action} user`);
      } finally {
        setLoadingActions((prev) => {
          const newState = { ...prev };
          delete newState[userId];
          return newState;
        });
      }
    },
    [updateUser, deleteUser, resetUserPassword],
  );

  // Handle row click (open user details) - with deep linking support
  const handleRowClick = useCallback(
    (userId: string) => {
      // Add user ID to URL for deep linking
      const params = new URLSearchParams(window.location.search);
      params.set("userId", userId);
      const newURL = `${window.location.pathname}?${params.toString()}`;
      router.replace(newURL, { scroll: false });

      handleUserAction("view", userId);
    },
    [handleUserAction, router],
  );

  // Handle deep linking to specific user details
  useEffect(() => {
    const userId = searchParams.get("userId");
    if (userId && users.length > 0) {
      const user = users.find((u) => u.id === userId);
      if (user) {
        // Auto-open user details if user ID is in URL
        handleUserAction("view", userId);
      }
    }
  }, [searchParams, users, handleUserAction]);

  // Handle selection change
  const handleSelectionChange = useCallback(
    (userIds: string[]) => {
      setSelectedUsers(userIds);
      // Announce selection changes to screen readers
      announceSelectionChange(userIds.length, users.length);
    },
    [announceSelectionChange, users.length],
  );

  // Handle pagination change
  const handlePaginationChange = useCallback(
    (newPagination: Partial<{ page: number; pageSize: number }>) => {
      setPagination((prev) => ({ ...prev, ...newPagination }));
    },
    [],
  );

  // Handle filter changes
  const handleFiltersChange = useCallback(
    (newFilters: Partial<UserFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      // Reset to first page when filters change
      setPagination((prev) => ({ ...prev, page: 1 }));
      // Clear selection when filters change
      setSelectedUsers([]);
    },
    [],
  );

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    const defaultFilters = {
      searchTerm: "",
      roles: [],
      status: [],
      dateRange: {
        from: null,
        to: null,
      },
      lastLoginRange: {
        from: null,
        to: null,
      },
      sortBy: "name" as const,
      sortOrder: "asc" as const,
    };
    setFilters(defaultFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  return (
    <Box
      sx={{ width: "100%", overflow: "hidden" }}
      component="main"
      role="main"
      aria-labelledby="page-title"
    >
      {/* Page Title - Responsive */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography
          id="page-title"
          variant="h4"
          component="h1"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.125rem" },
            fontWeight: 600,
            mb: 1,
          }}
        >
          Manage Users
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: { xs: "block", sm: "none" } }}
          aria-describedby="page-title"
        >
          Comprehensive user management dashboard
        </Typography>
      </Box>

      {/* User Statistics Cards - Already responsive with Grid */}
      <UserStatsCards stats={userStats} isLoading={isStatsLoading} />

      {/* User Analytics Charts - Already responsive */}
      <UserAnalyticsCharts stats={userStats} isLoading={isStatsLoading} />

      {/* Top Action Bar - Responsive */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={{ xs: 2, sm: 0 }}
        sx={{ mb: 2 }}
      >
        <Button
          variant="contained"
          disabled
          size="large"
          sx={{
            minHeight: { xs: 44, sm: "auto" }, // Touch-friendly height on mobile
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Create New User
        </Button>
      </Stack>

      {/* User Filters Bar - Already responsive */}
      <UserFiltersBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        isLoading={isLoading}
      />

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <Box
          sx={{
            mb: 2,
            p: 1,
            bgcolor: "grey.50",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {users.length} user{users.length !== 1 ? "s" : ""} found
            {filters.searchTerm && ` matching "${filters.searchTerm}"`}
            {filters.roles.length > 0 &&
              ` with roles: ${filters.roles.join(", ")}`}
            {filters.status.length > 0 &&
              ` with status: ${filters.status.join(", ")}`}
          </Typography>
        </Box>
      )}

      {/* Placeholder for Bulk Operations Toolbar - will be implemented in task 9.1 */}
      {selectedUsers.length > 0 && (
        <Box
          sx={{
            mb: 2,
            p: { xs: 2, sm: 1 },
            bgcolor: "primary.50",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "primary.200",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Bulk Operations Toolbar - Coming Soon ({selectedUsers.length} users
            selected)
          </Typography>
        </Box>
      )}

      {/* Error Display - Responsive */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            "& .MuiAlert-message": {
              fontSize: { xs: "0.875rem", sm: "1rem" },
            },
          }}
        >
          Failed to load users. Please try again.
        </Alert>
      )}

      {/* Stats Error Display */}
      {statsError && (
        <Alert
          severity="warning"
          sx={{
            mb: 2,
            "& .MuiAlert-message": {
              fontSize: { xs: "0.875rem", sm: "1rem" },
            },
          }}
        >
          Failed to load user statistics. User data is still available.
        </Alert>
      )}

      {/* Main User Data Grid - Enhanced for mobile */}
      <Box
        sx={{
          width: "100%",
          "& .MuiDataGrid-root": {
            minHeight: { xs: 400, sm: 600 },
            "& .MuiDataGrid-main": {
              overflow: "auto",
            },
            "& .MuiDataGrid-virtualScroller": {
              // Enable horizontal scrolling on mobile
              overflowX: { xs: "auto", sm: "hidden" },
            },
            "& .MuiDataGrid-columnHeaders": {
              minHeight: { xs: 48, sm: 56 }, // Touch-friendly header height
              "& .MuiDataGrid-columnHeader": {
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                fontWeight: 600,
              },
            },
            "& .MuiDataGrid-row": {
              minHeight: { xs: 52, sm: 52 }, // Touch-friendly row height
              "&:hover": {
                backgroundColor: {
                  xs: "transparent",
                  sm: "rgba(0, 0, 0, 0.04)",
                },
              },
            },
            "& .MuiDataGrid-cell": {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              padding: { xs: "8px 4px", sm: "16px" },
              borderBottom: {
                xs: "1px solid rgba(224, 224, 224, 0.5)",
                sm: "1px solid rgba(224, 224, 224, 1)",
              },
            },
            "& .MuiDataGrid-footerContainer": {
              minHeight: { xs: 48, sm: 52 },
              "& .MuiTablePagination-root": {
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                },
            },
          },
        }}
      >
        <UserDataGrid
          users={users}
          isLoading={isLoading}
          selectedUsers={selectedUsers}
          onSelectionChange={handleSelectionChange}
          onUserAction={handleUserAction}
          onRowClick={handleRowClick}
          loadingActions={loadingActions}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      </Box>

      {/* Screen Reader Announcement Region - handled by the hook internally */}

      {/* Placeholder modals - will be implemented in later tasks */}
      {/* CreateUserModal - task 8.1 */}
      {/* UserDetailsModal - task 7.1 */}
      {/* BulkOperationConfirmDialog - task 9.1 */}
    </Box>
  );
};

export default ManageUsersPage;
