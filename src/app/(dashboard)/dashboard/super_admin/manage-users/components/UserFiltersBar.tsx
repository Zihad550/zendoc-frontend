"use client";

import { useDebounced } from "@/redux/hooks";
import { UserRole } from "@/types";
import { UserStatus } from "@/types/user";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import {
    Box,
    Button,
    Chip,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export interface UserFilters {
  searchTerm: string;
  roles: UserRole[];
  status: UserStatus[];
  dateRange: {
    from: Dayjs | null;
    to: Dayjs | null;
  };
  lastLoginRange: {
    from: Dayjs | null;
    to: Dayjs | null;
  };
  sortBy: "name" | "email" | "createdAt" | "lastLogin";
  sortOrder: "asc" | "desc";
}

interface UserFiltersBarProps {
  filters: UserFilters;
  onFiltersChange: (filters: Partial<UserFilters>) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}

const ROLE_OPTIONS = [
  { value: "SUPER_ADMIN" as UserRole, label: "Super Admin" },
  { value: "ADMIN" as UserRole, label: "Admin" },
  { value: "DOCTOR" as UserRole, label: "Doctor" },
  { value: "PATIENT" as UserRole, label: "Patient" },
];

const STATUS_OPTIONS = [
  { value: UserStatus.ACTIVE, label: "Active" },
  { value: UserStatus.BLOCKED, label: "Blocked" },
  { value: UserStatus.DELETED, label: "Deleted" },
];

const SORT_OPTIONS = [
  { value: "name" as const, label: "Name" },
  { value: "email" as const, label: "Email" },
  { value: "createdAt" as const, label: "Registration Date" },
  { value: "lastLogin" as const, label: "Last Login" },
];

const UserFiltersBar = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: UserFiltersBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(filters.searchTerm);

  // Debounce search input
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchInput,
    delay: 600,
  });

  // Update filters when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== filters.searchTerm) {
      onFiltersChange({ searchTerm: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, filters.searchTerm, onFiltersChange]);

  // URL parameter persistence
  const updateUrlParams = useCallback(
    (newFilters: Partial<UserFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update search term
      if (newFilters.searchTerm !== undefined) {
        if (newFilters.searchTerm) {
          params.set("search", newFilters.searchTerm);
        } else {
          params.delete("search");
        }
      }

      // Update roles
      if (newFilters.roles !== undefined) {
        if (newFilters.roles.length > 0) {
          params.set("roles", newFilters.roles.join(","));
        } else {
          params.delete("roles");
        }
      }

      // Update status
      if (newFilters.status !== undefined) {
        if (newFilters.status.length > 0) {
          params.set("status", newFilters.status.join(","));
        } else {
          params.delete("status");
        }
      }

      // Update sort
      if (newFilters.sortBy !== undefined) {
        params.set("sortBy", newFilters.sortBy);
      }
      if (newFilters.sortOrder !== undefined) {
        params.set("sortOrder", newFilters.sortOrder);
      }

      // Update date range
      if (newFilters.dateRange !== undefined) {
        if (newFilters.dateRange.from) {
          params.set(
            "dateFrom",
            newFilters.dateRange.from.format("YYYY-MM-DD"),
          );
        } else {
          params.delete("dateFrom");
        }
        if (newFilters.dateRange.to) {
          params.set("dateTo", newFilters.dateRange.to.format("YYYY-MM-DD"));
        } else {
          params.delete("dateTo");
        }
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  // Enhanced onFiltersChange that also updates URL
  const handleFiltersChange = useCallback(
    (newFilters: Partial<UserFilters>) => {
      onFiltersChange(newFilters);
      updateUrlParams(newFilters);
    },
    [onFiltersChange, updateUrlParams],
  );

  // Enhanced clear filters that resets to default state
  const handleClearFilters = useCallback(() => {
    setSearchInput("");
    onClearFilters();
    router.push(window.location.pathname, { scroll: false });
  }, [onClearFilters, router]);

  const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    handleFiltersChange({
      roles:
        typeof value === "string" ? [value as UserRole] : (value as UserRole[]),
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    handleFiltersChange({
      status:
        typeof value === "string"
          ? [value as UserStatus]
          : (value as UserStatus[]),
    });
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const [sortBy, sortOrder] = event.target.value.split("-");
    handleFiltersChange({
      sortBy: sortBy as "name" | "email" | "createdAt" | "lastLogin",
      sortOrder: sortOrder as "asc" | "desc",
    });
  };

  const handleDateFromChange = (date: Dayjs | null) => {
    handleFiltersChange({
      dateRange: {
        ...filters.dateRange,
        from: date,
      },
    });
  };

  const handleDateToChange = (date: Dayjs | null) => {
    handleFiltersChange({
      dateRange: {
        ...filters.dateRange,
        to: date,
      },
    });
  };

  const hasActiveFilters =
    filters.searchTerm ||
    filters.roles.length > 0 ||
    filters.status.length > 0 ||
    filters.dateRange.from ||
    filters.dateRange.to ||
    filters.sortBy !== "name" ||
    filters.sortOrder !== "asc";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{ mb: 3 }}
        role="search"
        aria-labelledby="filters-title"
        aria-describedby="filters-description"
      >
        {/* Screen reader only descriptions */}
        <Typography
          id="filters-title"
          variant="h6"
          component="h2"
          sx={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          User Filters
        </Typography>
        <Typography
          id="filters-description"
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
          Use these filters to search and filter the user list. Changes are
          applied automatically as you type or select options.
        </Typography>

        <Stack spacing={{ xs: 3, sm: 2 }}>
          {/* Search and Clear Filters Row */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
          >
            <TextField
              size="small"
              placeholder="Search by name, email, or user ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search users by name, email, or user ID"
              aria-describedby="search-help-text"
              sx={{
                minWidth: { xs: "100%", sm: 300 },
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
                "& .MuiInputBase-root": {
                  "&:focus-within": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "2px",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      color="action"
                      sx={{ fontSize: { xs: 20, sm: 24 } }}
                      aria-hidden="true"
                    />
                  </InputAdornment>
                ),
                endAdornment: searchInput && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSearchInput("");
                        handleFiltersChange({ searchTerm: "" });
                      }}
                      edge="end"
                      aria-label="Clear search"
                      sx={{
                        minWidth: { xs: 40, sm: 32 },
                        minHeight: { xs: 40, sm: 32 },
                        "&:focus": {
                          outline: "2px solid",
                          outlineColor: "primary.main",
                          outlineOffset: "2px",
                        },
                      }}
                    >
                      <ClearIcon sx={{ fontSize: { xs: 20, sm: 18 } }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* Screen reader help text */}
            <Typography
              id="search-help-text"
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
              Search results will update automatically as you type. Use the
              clear button or delete key to clear the search.
            </Typography>

            {hasActiveFilters && (
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearFilters}
                startIcon={<ClearIcon />}
                sx={{
                  whiteSpace: "nowrap",
                  minHeight: { xs: 44, sm: "auto" },
                  fontSize: { xs: "0.875rem", sm: "0.875rem" },
                }}
              >
                Clear Filters
              </Button>
            )}
          </Stack>

          {/* Filters Row - Responsive Layout */}
          <Stack
            direction={{ xs: "column", sm: "column", lg: "row" }}
            spacing={{ xs: 2, sm: 2, lg: 2 }}
            alignItems={{ xs: "stretch", lg: "flex-start" }}
          >
            {/* First Row: Role and Status Filters */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ flex: 1 }}
            >
              {/* Role Filter */}
              <FormControl
                size="small"
                sx={{
                  minWidth: { xs: "100%", sm: 150 },
                  flex: { sm: 1 },
                }}
              >
                <InputLabel
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  id="role-filter-label"
                >
                  Roles
                </InputLabel>
                <Select
                  multiple
                  value={filters.roles as string[]}
                  onChange={handleRoleChange}
                  input={<OutlinedInput label="Roles" />}
                  labelId="role-filter-label"
                  aria-label="Filter users by role"
                  aria-describedby="role-filter-help"
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
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => {
                        const option = ROLE_OPTIONS.find(
                          (opt) => opt.value === value,
                        );
                        return (
                          <Chip
                            key={value}
                            label={option?.label || value}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                              height: { xs: 20, sm: 24 },
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: { xs: 200, sm: 300 },
                      },
                    },
                  }}
                >
                  {ROLE_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      role="option"
                      aria-selected={filters.roles.includes(option.value)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {/* Screen reader help text */}
                <Typography
                  id="role-filter-help"
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
                  Select one or more user roles to filter by. Use arrow keys to
                  navigate options and space to select.
                </Typography>
              </FormControl>

              {/* Status Filter */}
              <FormControl
                size="small"
                sx={{
                  minWidth: { xs: "100%", sm: 150 },
                  flex: { sm: 1 },
                }}
              >
                <InputLabel
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  id="status-filter-label"
                >
                  Status
                </InputLabel>
                <Select
                  multiple
                  value={filters.status as string[]}
                  onChange={handleStatusChange}
                  input={<OutlinedInput label="Status" />}
                  labelId="status-filter-label"
                  aria-label="Filter users by status"
                  aria-describedby="status-filter-help"
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
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => {
                        const option = STATUS_OPTIONS.find(
                          (opt) => opt.value === value,
                        );
                        return (
                          <Chip
                            key={value}
                            label={option?.label || value}
                            size="small"
                            variant="outlined"
                            color={
                              value === UserStatus.ACTIVE
                                ? "success"
                                : value === UserStatus.BLOCKED
                                  ? "warning"
                                  : "error"
                            }
                            sx={{
                              fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                              height: { xs: 20, sm: 24 },
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: { xs: 200, sm: 300 },
                      },
                    },
                  }}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      role="option"
                      aria-selected={filters.status.includes(option.value)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {/* Screen reader help text */}
                <Typography
                  id="status-filter-help"
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
                  Select one or more user statuses to filter by. Use arrow keys
                  to navigate options and space to select.
                </Typography>
              </FormControl>
            </Stack>

            {/* Second Row: Sort and Date Filters */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ flex: 1 }}
            >
              {/* Sort Options */}
              <FormControl
                size="small"
                sx={{
                  minWidth: { xs: "100%", sm: 180 },
                  flex: { sm: 1 },
                }}
              >
                <InputLabel
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  id="sort-filter-label"
                >
                  Sort By
                </InputLabel>
                <Select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={handleSortChange}
                  input={<OutlinedInput label="Sort By" />}
                  labelId="sort-filter-label"
                  aria-label="Sort users by field and order"
                  aria-describedby="sort-filter-help"
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
                  startAdornment={
                    <InputAdornment position="start">
                      <SortIcon
                        sx={{ fontSize: { xs: 18, sm: 20 } }}
                        aria-hidden="true"
                      />
                    </InputAdornment>
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: { xs: 200, sm: 300 },
                      },
                    },
                  }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={`${option.value}-asc`}
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      role="option"
                    >
                      {option.label} (A-Z)
                    </MenuItem>
                  ))}
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem
                      key={`${option.value}-desc`}
                      value={`${option.value}-desc`}
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                      role="option"
                    >
                      {option.label} (Z-A)
                    </MenuItem>
                  ))}
                </Select>
                {/* Screen reader help text */}
                <Typography
                  id="sort-filter-help"
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
                  Select how to sort the user list. Use arrow keys to navigate
                  options and enter to select.
                </Typography>
              </FormControl>
            </Stack>

            {/* Date Range Filters - Separate row on mobile */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={{
                width: { xs: "100%", lg: "auto" },
                minWidth: { lg: 300 },
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: { xs: "0.875rem", sm: "0.875rem" },
                  mb: { xs: 1, sm: 0 },
                  textAlign: { xs: "left", sm: "center" },
                }}
              >
                Registration:
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{ flex: 1 }}
              >
                <DatePicker
                  label="From"
                  value={filters.dateRange.from}
                  onChange={handleDateFromChange}
                  slotProps={{
                    textField: {
                      size: "small",
                      "aria-label": "Filter users registered from this date",
                      "aria-describedby": "date-from-help",
                      sx: {
                        minWidth: { xs: "100%", sm: 120 },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        },
                        "& .MuiInputBase-root": {
                          "&:focus-within": {
                            outline: "2px solid",
                            outlineColor: "primary.main",
                            outlineOffset: "2px",
                          },
                        },
                      },
                    },
                    openPickerButton: {
                      "aria-label": "Open date picker for from date",
                      sx: {
                        "&:focus": {
                          outline: "2px solid",
                          outlineColor: "primary.main",
                          outlineOffset: "2px",
                        },
                      },
                    },
                  }}
                  maxDate={filters.dateRange.to || dayjs()}
                />
                <DatePicker
                  label="To"
                  value={filters.dateRange.to}
                  onChange={handleDateToChange}
                  slotProps={{
                    textField: {
                      size: "small",
                      "aria-label": "Filter users registered up to this date",
                      "aria-describedby": "date-to-help",
                      sx: {
                        minWidth: { xs: "100%", sm: 120 },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        },
                        "& .MuiInputBase-root": {
                          "&:focus-within": {
                            outline: "2px solid",
                            outlineColor: "primary.main",
                            outlineOffset: "2px",
                          },
                        },
                      },
                    },
                    openPickerButton: {
                      "aria-label": "Open date picker for to date",
                      sx: {
                        "&:focus": {
                          outline: "2px solid",
                          outlineColor: "primary.main",
                          outlineOffset: "2px",
                        },
                      },
                    },
                  }}
                  minDate={filters.dateRange.from || undefined}
                  maxDate={dayjs()}
                />
                {/* Screen reader help text for date pickers */}
                <Typography
                  id="date-from-help"
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
                  Select the earliest registration date to filter by. Use arrow
                  keys to navigate the calendar.
                </Typography>
                <Typography
                  id="date-to-help"
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
                  Select the latest registration date to filter by. Use arrow
                  keys to navigate the calendar.
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Active Filters Display - Enhanced for mobile */}
          {hasActiveFilters && (
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                  fontSize: { xs: "0.875rem", sm: "0.875rem" },
                }}
              >
                Active Filters:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{
                  "& .MuiChip-root": {
                    fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                    height: { xs: 24, sm: 28 },
                    "& .MuiChip-deleteIcon": {
                      fontSize: { xs: 16, sm: 18 },
                    },
                  },
                }}
              >
                {filters.searchTerm && (
                  <Chip
                    label={`Search: "${filters.searchTerm}"`}
                    size="small"
                    onDelete={() => {
                      setSearchInput("");
                      handleFiltersChange({ searchTerm: "" });
                    }}
                  />
                )}
                {filters.roles.map((role) => {
                  const option = ROLE_OPTIONS.find((opt) => opt.value === role);
                  return (
                    <Chip
                      key={role}
                      label={`Role: ${option?.label || role}`}
                      size="small"
                      onDelete={() => {
                        handleFiltersChange({
                          roles: filters.roles.filter((r) => r !== role),
                        });
                      }}
                    />
                  );
                })}
                {filters.status.map((status) => {
                  const option = STATUS_OPTIONS.find(
                    (opt) => opt.value === status,
                  );
                  return (
                    <Chip
                      key={status}
                      label={`Status: ${option?.label || status}`}
                      size="small"
                      color={
                        status === UserStatus.ACTIVE
                          ? "success"
                          : status === UserStatus.BLOCKED
                            ? "warning"
                            : "error"
                      }
                      onDelete={() => {
                        handleFiltersChange({
                          status: filters.status.filter((s) => s !== status),
                        });
                      }}
                    />
                  );
                })}
                {(filters.sortBy !== "name" || filters.sortOrder !== "asc") && (
                  <Chip
                    label={`Sort: ${
                      SORT_OPTIONS.find((opt) => opt.value === filters.sortBy)
                        ?.label
                    } (${filters.sortOrder === "asc" ? "A-Z" : "Z-A"})`}
                    size="small"
                    onDelete={() => {
                      handleFiltersChange({ sortBy: "name", sortOrder: "asc" });
                    }}
                  />
                )}
                {filters.dateRange.from && (
                  <Chip
                    label={`From: ${filters.dateRange.from.format(
                      "MMM DD, YYYY",
                    )}`}
                    size="small"
                    onDelete={() => handleDateFromChange(null)}
                  />
                )}
                {filters.dateRange.to && (
                  <Chip
                    label={`To: ${filters.dateRange.to.format("MMM DD, YYYY")}`}
                    size="small"
                    onDelete={() => handleDateToChange(null)}
                  />
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default UserFiltersBar;
