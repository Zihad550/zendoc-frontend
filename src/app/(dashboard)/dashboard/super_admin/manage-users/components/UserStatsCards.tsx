"use client";

import { USER_ROLE } from "@/contants/role";
import { UserStats } from "@/types/user";
import {
  CheckCircle,
  Group,
  PersonAdd,
  SupervisorAccount,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

interface UserStatsCardsProps {
  stats: UserStats | undefined;
  isLoading: boolean;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  growthRate?: number;
  isLoading?: boolean;
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  growthRate,
  isLoading,
}: StatCardProps) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Skeleton variant="text" width={120} height={24} />
              <Skeleton variant="text" width={80} height={40} />
              {growthRate !== undefined && (
                <Skeleton variant="text" width={100} height={20} />
              )}
            </Box>
            <Skeleton variant="circular" width={48} height={48} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  const isPositiveGrowth = growthRate !== undefined && growthRate >= 0;
  const TrendIcon = isPositiveGrowth ? TrendingUp : TrendingDown;
  const trendColor = isPositiveGrowth
    ? theme.palette.success.main
    : theme.palette.error.main;

  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value.toLocaleString()}
            </Typography>
            {growthRate !== undefined && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendIcon sx={{ color: trendColor, fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: trendColor }}>
                  {Math.abs(growthRate).toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary" ml={0.5}>
                  vs last month
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const UserStatsCards = ({ stats, isLoading }: UserStatsCardsProps) => {
  const theme = useTheme();

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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case USER_ROLE.SUPER_ADMIN:
        return <SupervisorAccount />;
      case USER_ROLE.ADMIN:
        return <SupervisorAccount />;
      case USER_ROLE.DOCTOR:
        return <Group />;
      case USER_ROLE.PATIENT:
        return <Group />;
      default:
        return <Group />;
    }
  };

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

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
        User Statistics
      </Typography>

      <Grid container spacing={3}>
        {/* Total Users */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={<Group />}
            color={theme.palette.primary.main}
            isLoading={isLoading}
          />
        </Grid>

        {/* Active Users */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={stats?.activeUsers || 0}
            icon={<CheckCircle />}
            color={theme.palette.success.main}
            isLoading={isLoading}
          />
        </Grid>

        {/* New Users This Month */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New This Month"
            value={stats?.newUsersThisMonth || 0}
            icon={<PersonAdd />}
            color={theme.palette.info.main}
            growthRate={stats?.growthRate}
            isLoading={isLoading}
          />
        </Grid>

        {/* Growth Rate */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Growth Rate"
            value={Math.abs(stats?.growthRate || 0)}
            icon={
              stats?.growthRate && stats.growthRate >= 0 ? (
                <TrendingUp />
              ) : (
                <TrendingDown />
              )
            }
            color={
              stats?.growthRate && stats.growthRate >= 0
                ? theme.palette.success.main
                : theme.palette.error.main
            }
            isLoading={isLoading}
          />
        </Grid>

        {/* Users by Role */}
        {stats?.usersByRole &&
          Object.entries(stats.usersByRole).map(([role, count]) => (
            <Grid item xs={12} sm={6} md={3} key={role}>
              <StatCard
                title={getRoleDisplayName(role)}
                value={count}
                icon={getRoleIcon(role)}
                color={getRoleColor(role)}
                isLoading={isLoading}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default UserStatsCards;
