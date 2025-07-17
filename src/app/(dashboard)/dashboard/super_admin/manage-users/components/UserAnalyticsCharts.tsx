"use client";

import { USER_ROLE } from "@/contants/role";
import { UserStats } from "@/types/user";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface UserAnalyticsChartsProps {
  stats: UserStats | undefined;
  isLoading: boolean;
}

// Mock data for demonstration - in real implementation, this would come from API
const mockGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 150 },
  { month: "Mar", users: 180 },
  { month: "Apr", users: 220 },
  { month: "May", users: 280 },
  { month: "Jun", users: 320 },
];

const UserAnalyticsCharts = ({
  stats,
  isLoading,
}: UserAnalyticsChartsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getRoleColor = (role: string) => {
    switch (role) {
      case USER_ROLE.SUPER_ADMIN:
        return theme.palette.error.main;
      case USER_ROLE.ADMIN:
        return theme.palette.warning.main;
      case USER_ROLE.DOCTOR:
        return theme.palette.info.main;
      case USER_ROLE.PATIENT:
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case USER_ROLE.SUPER_ADMIN:
        return "Super Admins";
      case USER_ROLE.ADMIN:
        return "Admins";
      case USER_ROLE.DOCTOR:
        return "Doctors";
      case USER_ROLE.PATIENT:
        return "Patients";
      default:
        return role;
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          User Analytics
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Registration Trends
                </Typography>
                <Skeleton variant="rectangular" height={300} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Role Distribution
                </Typography>
                <Skeleton
                  variant="circular"
                  width={250}
                  height={250}
                  sx={{ mx: "auto" }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
        User Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Line Chart - User Registration Trends */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Registration Trends
              </Typography>

              {/* Placeholder for Line Chart */}
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.palette.grey[50],
                  borderRadius: 1,
                  border: `1px dashed ${theme.palette.grey[300]}`,
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                >
                  📈 Line Chart Placeholder
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  This would show user registration trends over time using
                  mui-x-charts LineChart
                </Typography>

                {/* Mock data visualization */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "end", mt: 2 }}>
                  {mockGrowthData.map((data) => (
                    <Box key={data.month}>
                      <Box
                        sx={{
                          width: 30,
                          height: (data.users / 320) * 100,
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: "4px 4px 0 0",
                          mb: 1,
                        }}
                      />
                      <Typography
                        variant="caption"
                        display="block"
                        textAlign="center"
                      >
                        {data.month}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Shows monthly user registration trends with growth indicators
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart - User Role Distribution */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Role Distribution
              </Typography>

              {/* Placeholder for Pie Chart */}
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {/* Mock pie chart visualization */}
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: `conic-gradient(
                      ${theme.palette.success.main} 0deg 180deg,
                      ${theme.palette.info.main} 180deg 270deg,
                      ${theme.palette.warning.main} 270deg 315deg,
                      ${theme.palette.error.main} 315deg 360deg
                    )`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.background.paper,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {stats?.totalUsers || 0}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  🥧 Pie Chart Placeholder
                </Typography>
              </Box>

              {/* Legend */}
              {stats?.usersByRole && (
                <Box sx={{ mt: 2 }}>
                  {Object.entries(stats.usersByRole).map(([role, count]) => (
                    <Box
                      key={role}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: getRoleColor(role),
                          }}
                        />
                        <Typography variant="body2">
                          {getRoleDisplayName(role)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">
                        {count}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Distribution of users across different roles
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Analytics Cards for Mobile */}
        {isMobile && (
          <>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Growth Metrics
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box textAlign="center">
                        <Typography
                          variant="h4"
                          color="primary"
                          fontWeight="bold"
                        >
                          {stats?.growthRate
                            ? `${stats.growthRate.toFixed(1)}%`
                            : "0%"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Monthly Growth
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box textAlign="center">
                        <Typography
                          variant="h4"
                          color="success.main"
                          fontWeight="bold"
                        >
                          {stats?.newUsersThisMonth || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          New This Month
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>

      {/* Implementation Note */}
      <Card
        sx={{
          mt: 2,
          backgroundColor: theme.palette.info.light,
          color: theme.palette.info.contrastText,
        }}
      >
        <CardContent>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            📊 <strong>Implementation Note:</strong> To complete this feature,
            install mui-x-charts package and replace the placeholder components
            with:
            <br />
            • LineChart component for user registration trends
            <br />
            • PieChart component for role distribution
            <br />• Add real-time data fetching for chart data
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserAnalyticsCharts;
