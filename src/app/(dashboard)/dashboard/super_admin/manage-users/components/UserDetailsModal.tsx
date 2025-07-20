"use client";

import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import PHModal from "@/components/Shared/PHModal/PHModal";
import PhChips from "@/components/Shared/PhChip/PhChips";
import { USER_ROLE } from "@/contants/role";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { IAppointment } from "@/types/appointment";
import {
    BloodGroup,
    GenderEnum,
    MaritalStatus,
    UserRole,
} from "@/types/common";
import { ExtendedUser, UpdateUserData, UserStatus } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AccountCircle as AccountIcon,
    LocalActivity as ActivityIcon,
    CalendarToday as CalendarIcon,
    Cancel as CancelIcon,
    Edit as EditIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Save as SaveIcon,
    Timeline as TimelineIcon,
} from "@mui/icons-material";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

dayjs.extend(relativeTime); // Val
const baseUserValidationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "DOCTOR", "PATIENT"]),
});

const patientValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  bloodGroup: z
    .enum([
      "A_POSITIVE",
      "B_POSITIVE",
      "O_POSITIVE",
      "AB_POSITIVE",
      "A_NEGATIVE",
      "B_NEGATIVE",
      "O_NEGATIVE",
      "AB_NEGATIVE",
    ])
    .optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  maritalStatus: z.enum(["MARRIED", "UNMARRIED"]).optional(),
  hasAllergies: z.boolean().optional(),
  hasDiabetes: z.boolean().optional(),
  smokingStatus: z.boolean().optional(),
  dietaryPreferences: z.string().optional(),
  hasPastSurgeries: z.boolean().optional(),
});

const doctorValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  address: z.string().optional(),
  registrationNumber: z.string().min(1, "Registration number is required"),
  experience: z.coerce.number().min(0, "Experience must be a positive number"),
  qualification: z.string().min(1, "Qualification is required"),
  currentWorkingPlace: z.string().min(1, "Current workplace is required"),
  designation: z.string().min(1, "Designation is required"),
  apointmentFee: z.coerce.number().min(0, "Appointment fee must be positive"),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
});

const adminValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
});

const getUserValidationSchema = (role: UserRole) => {
  const baseSchema = baseUserValidationSchema;

  switch (role) {
    case "PATIENT":
      return baseSchema.extend({
        patient: patientValidationSchema,
      });
    case "DOCTOR":
      return baseSchema.extend({
        doctor: doctorValidationSchema,
      });
    case "ADMIN":
    case "SUPER_ADMIN":
      return baseSchema.extend({
        admin: adminValidationSchema,
      });
    default:
      return baseSchema;
  }
};

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  mode: "view" | "edit";
  onSave?: (userData: Partial<ExtendedUser>) => void;
}

interface UserDetailsData {
  basicInfo: ExtendedUser;
  activityInfo: {
    lastLogin: Date | null;
    loginCount: number;
    appointmentHistory: IAppointment[];
  };
  auditLog: AuditLogEntry[];
}

interface AuditLogEntry {
  id: string;
  action: string;
  timestamp: Date;
  performedBy: string;
  details: string;
  ipAddress?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-details-tabpanel-${index}`}
      aria-labelledby={`user-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `user-details-tab-${index}`,
    "aria-controls": `user-details-tabpanel-${index}`,
  };
}
const UserDetailsModal = ({
  open,
  onClose,
  userId,
  mode: initialMode,
  onSave,
}: UserDetailsModalProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [userDetails, setUserDetails] = useState<UserDetailsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"view" | "edit">(initialMode);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Mock data fetching - In real implementation, this would be an API call
  useEffect(() => {
    if (open && userId) {
      fetchUserDetails(userId);
    }
  }, [open, userId]);

  const fetchUserDetails = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      // Mock data for demonstration
      const mockUserDetails: UserDetailsData = {
        basicInfo: {
          id: id,
          email: "john.doe@example.com",
          role: "PATIENT" as UserRole,
          needPasswordChange: false,
          status: UserStatus.ACTIVE,
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-07-10"),
          displayName: "John Doe",
          lastLoginAt: new Date("2024-07-15"),
          appointmentCount: 5,
          profileCompleteness: 85,
          patient: {
            id: "patient-1",
            email: "john.doe@example.com",
            name: "John Doe",
            profilePhoto: "",
            contactNumber: "+1234567890",
            address: "123 Main St, City, State 12345",
            isDeleted: false,
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-07-10"),
            user: {} as any,
            patientHealthData: {
              id: "health-1",
              patientId: "patient-1",
              patient: {} as any,
              gender: "MALE" as any,
              dateOfBirth: "1990-05-15",
              bloodGroup: "A_POSITIVE" as any,
              hasAllergies: false,
              hasDiabetes: false,
              height: "175cm",
              weight: "70kg",
              smokingStatus: false,
              dietaryPreferences: "Vegetarian",
              pregnancyStatus: false,
              mentalHealthHistory: "None",
              immunizationStatus: "Up to date",
              hasPastSurgeries: false,
              recentAnxiety: false,
              recentDepression: false,
              maritalStatus: "MARRIED" as any,
              createdAt: new Date("2024-01-15"),
              updatedAt: new Date("2024-07-10"),
            },
            medicalReport: [],
            appointment: [],
            prescription: [],
            review: [],
          },
        },
        activityInfo: {
          lastLogin: new Date("2024-07-15T10:30:00"),
          loginCount: 45,
          appointmentHistory: [],
        },
        auditLog: [
          {
            id: "audit-1",
            action: "User Login",
            timestamp: new Date("2024-07-15T10:30:00"),
            performedBy: "System",
            details: "User logged in successfully",
            ipAddress: "192.168.1.100",
          },
        ],
      };

      setUserDetails(mockUserDetails);
    } catch (err) {
      setError("Failed to load user details. Please try again.");
      console.error("Error fetching user details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    setTabValue(0);
    setUserDetails(null);
    setError(null);
    setMode(initialMode);
    onClose();
  };

  const handleEditToggle = () => {
    setMode(mode === "view" ? "edit" : "view");
  };

  const handleSave = async (data: FieldValues) => {
    if (!userDetails || !userId) return;

    try {
      const updateData: UpdateUserData = {
        email: data.email,
        status: data.status,
        role: data.role,
      };

      // Add role-specific data
      if (data.patient) {
        updateData.patient = data.patient;
      }
      if (data.doctor) {
        updateData.doctor = data.doctor;
      }
      if (data.admin) {
        updateData.admin = data.admin;
      }

      await updateUser({ id: userId, data: updateData }).unwrap();

      toast.success("User updated successfully");
      setMode("view");

      if (onSave) {
        onSave(updateData as Partial<ExtendedUser>);
      }

      // Refresh user details
      fetchUserDetails(userId);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  //Helper functions
  const getDisplayName = (user: ExtendedUser): string => {
    if (user.admin?.name) return user.admin.name;
    if (user.doctor?.name) return user.doctor.name;
    if (user.patient?.name) return user.patient.name;
    return user.email.split("@")[0];
  };

  const getStatusChipType = (
    status: UserStatus,
  ): "success" | "warning" | "error" => {
    switch (status) {
      case UserStatus.ACTIVE:
        return "success";
      case UserStatus.BLOCKED:
        return "warning";
      case UserStatus.DELETED:
        return "error";
      default:
        return "success";
    }
  };

  const getRoleChipColor = (role: UserRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return { bgcolor: "#e3f2fd", color: "#0d47a1" };
      case "ADMIN":
        return { bgcolor: "#f3e5f5", color: "#4a148c" };
      case "DOCTOR":
        return { bgcolor: "#e8f5e8", color: "#1b5e20" };
      case "PATIENT":
        return { bgcolor: "#fff3e0", color: "#e65100" };
      default:
        return { bgcolor: "#f5f5f5", color: "#424242" };
    }
  };

  const getFormDefaultValues = () => {
    if (!userDetails) return {};

    const { basicInfo } = userDetails;
    const defaultValues: any = {
      email: basicInfo.email,
      status: basicInfo.status,
      role: basicInfo.role,
    };

    // Add role-specific default values
    if (basicInfo.role === "PATIENT" && basicInfo.patient) {
      defaultValues.patient = {
        name: basicInfo.patient.name || "",
        contactNumber: basicInfo.patient.contactNumber || "",
        address: basicInfo.patient.address || "",
        dateOfBirth: basicInfo.patient.patientHealthData?.dateOfBirth || "",
        gender: basicInfo.patient.patientHealthData?.gender || "",
        bloodGroup: basicInfo.patient.patientHealthData?.bloodGroup || "",
        height: basicInfo.patient.patientHealthData?.height || "",
        weight: basicInfo.patient.patientHealthData?.weight || "",
        maritalStatus: basicInfo.patient.patientHealthData?.maritalStatus || "",
        hasAllergies:
          basicInfo.patient.patientHealthData?.hasAllergies || false,
        hasDiabetes: basicInfo.patient.patientHealthData?.hasDiabetes || false,
        smokingStatus:
          basicInfo.patient.patientHealthData?.smokingStatus || false,
        dietaryPreferences:
          basicInfo.patient.patientHealthData?.dietaryPreferences || "",
        hasPastSurgeries:
          basicInfo.patient.patientHealthData?.hasPastSurgeries || false,
      };
    } else if (basicInfo.role === "DOCTOR" && basicInfo.doctor) {
      defaultValues.doctor = {
        name: basicInfo.doctor.name || "",
        contactNumber: basicInfo.doctor.contactNumber || "",
        address: basicInfo.doctor.address || "",
        registrationNumber: basicInfo.doctor.registrationNumber || "",
        experience: basicInfo.doctor.experience || 0,
        qualification: basicInfo.doctor.qualification || "",
        currentWorkingPlace: basicInfo.doctor.currentWorkingPlace || "",
        designation: basicInfo.doctor.designation || "",
        apointmentFee: basicInfo.doctor.apointmentFee || 0,
        gender: basicInfo.doctor.gender || "",
      };
    } else if (
      (basicInfo.role === "ADMIN" || basicInfo.role === "SUPER_ADMIN") &&
      basicInfo.admin
    ) {
      defaultValues.admin = {
        name: basicInfo.admin.name || "",
        contactNumber: basicInfo.admin.contactNumber || "",
      };
    }

    return defaultValues;
  };

  const renderEditForm = () => {
    if (!userDetails) return null;

    const { basicInfo } = userDetails;
    const validationSchema = getUserValidationSchema(basicInfo.role);
    const defaultValues = getFormDefaultValues();

    return (
      <PHForm
        onSubmit={handleSave}
        resolver={zodResolver(validationSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <PHInput
                      name="email"
                      label="Email"
                      type="email"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <PHSelectField
                      name="status"
                      label="Status"
                      items={Object.values(UserStatus)}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <PHSelectField
                      name="role"
                      label="Role"
                      items={Object.keys(USER_ROLE)}
                      required
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Role-specific Information */}
          {basicInfo.role === "PATIENT" && (
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Patient Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="patient.name"
                        label="Full Name"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="patient.contactNumber"
                        label="Contact Number"
                        fullWidth
                      />
                    </Grid>
                    <Grid size={12}>
                      <PHInput
                        name="patient.address"
                        label="Address"
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <PHInput
                        name="patient.dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <PHSelectField
                        name="patient.gender"
                        label="Gender"
                        items={Object.values(GenderEnum)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <PHSelectField
                        name="patient.bloodGroup"
                        label="Blood Group"
                        items={Object.values(BloodGroup)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <PHInput name="patient.height" label="Height" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <PHInput name="patient.weight" label="Weight" fullWidth />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHSelectField
                        name="patient.maritalStatus"
                        label="Marital Status"
                        items={Object.values(MaritalStatus)}
                      />
                    </Grid>
                    <Grid size={12}>
                      <PHInput
                        name="patient.dietaryPreferences"
                        label="Dietary Preferences"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          {basicInfo.role === "DOCTOR" && (
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Doctor Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="doctor.name"
                        label="Full Name"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="doctor.contactNumber"
                        label="Contact Number"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid size={12}>
                      <PHInput
                        name="doctor.address"
                        label="Address"
                        fullWidth
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="doctor.registrationNumber"
                        label="Registration Number"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="doctor.experience"
                        label="Experience (Years)"
                        type="number"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="doctor.qualification"
                        label="Qualification"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="doctor.designation"
                        label="Designation"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="doctor.currentWorkingPlace"
                        label="Current Workplace"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="doctor.apointmentFee"
                        label="Appointment Fee"
                        type="number"
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          {(basicInfo.role === "ADMIN" || basicInfo.role === "SUPER_ADMIN") && (
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Administrator Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="admin.name"
                        label="Full Name"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <PHInput
                        name="admin.contactNumber"
                        label="Contact Number"
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Action Buttons */}
          <Grid size={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleEditToggle}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </PHForm>
    );
  };
  const renderViewMode = () => {
    if (!userDetails) return null;

    const { basicInfo } = userDetails;
    const displayName = getDisplayName(basicInfo);

    return (
      <Grid container spacing={3}>
        {/* User Avatar and Basic Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  fontSize: "2rem",
                  bgcolor: "primary.main",
                }}
                src={
                  basicInfo.patient?.profilePhoto ||
                  basicInfo.doctor?.profilePhoto
                }
              >
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {displayName}
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
                <Chip
                  label={basicInfo.role.replace("_", " ").toUpperCase()}
                  size="small"
                  sx={getRoleChipColor(basicInfo.role)}
                />
                <PhChips
                  label={basicInfo.status}
                  type={getStatusChipType(basicInfo.status)}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Profile Completeness: {basicInfo.profileCompleteness}%
              </Typography>
              <Box sx={{ width: "100%", mt: 1 }}>
                <CircularProgress
                  variant="determinate"
                  value={basicInfo.profileCompleteness}
                  size={40}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AccountIcon color="primary" />
                Contact Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={basicInfo.email} />
                </ListItem>
                {(basicInfo.patient?.contactNumber ||
                  basicInfo.doctor?.contactNumber ||
                  basicInfo.admin?.contactNumber) && (
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={
                        basicInfo.patient?.contactNumber ||
                        basicInfo.doctor?.contactNumber ||
                        basicInfo.admin?.contactNumber
                      }
                    />
                  </ListItem>
                )}
                {(basicInfo.patient?.address || basicInfo.doctor?.address) && (
                  <ListItem>
                    <ListItemIcon>
                      <LocationIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary={
                        basicInfo.patient?.address || basicInfo.doctor?.address
                      }
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Registration Date"
                    secondary={dayjs(basicInfo.createdAt).format(
                      "MMMM DD, YYYY",
                    )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TimelineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Last Updated"
                    secondary={dayjs(basicInfo.updatedAt).format(
                      "MMMM DD, YYYY",
                    )}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderActivity = () => {
    if (!userDetails) return null;

    const { activityInfo, auditLog } = userDetails;

    return (
      <Grid container spacing={3}>
        {/* Activity Summary */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <ActivityIcon color="primary" />
                Activity Summary
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Last Login"
                    secondary={
                      activityInfo.lastLogin
                        ? `${dayjs(activityInfo.lastLogin).format(
                            "MMMM DD, YYYY HH:mm",
                          )} (${dayjs(activityInfo.lastLogin).fromNow()})`
                        : "Never"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Total Logins"
                    secondary={activityInfo.loginCount}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Total Appointments"
                    secondary={activityInfo.appointmentHistory.length}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Audit Log */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <TimelineIcon color="primary" />
                Activity Timeline
              </Typography>
              <Timeline>
                {auditLog.slice(0, 10).map((entry, index) => (
                  <TimelineItem key={entry.id}>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {dayjs(entry.timestamp).format("MMM DD, HH:mm")}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      {index < auditLog.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        {entry.action}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {entry.details}
                      </Typography>
                      {entry.ipAddress && (
                        <Typography variant="caption" color="text.secondary">
                          IP: {entry.ipAddress}
                        </Typography>
                      )}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };
  return (
    <PHModal
      open={open}
      setOpen={() => handleClose()}
      title={`User Details - ${
        userDetails ? getDisplayName(userDetails.basicInfo) : "Loading..."
      }`}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "90vw",
          width: "1200px",
          maxHeight: "90vh",
        },
      }}
    >
      <Box sx={{ width: "100%" }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {userDetails && !loading && (
          <>
            {/* Action Buttons */}
            <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
              {mode === "view" ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditToggle}
                >
                  Edit User
                </Button>
              ) : null}
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="user details tabs"
              >
                <Tab label="Basic Info" {...a11yProps(0)} />
                <Tab label="Profile Details" {...a11yProps(1)} />
                <Tab label="Activity" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              {mode === "edit" ? renderEditForm() : renderViewMode()}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Alert severity="info">
                Profile details view - Role-specific information would be
                displayed here
              </Alert>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {renderActivity()}
            </TabPanel>
          </>
        )}
      </Box>
    </PHModal>
  );
};

export default UserDetailsModal;
