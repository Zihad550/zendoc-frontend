"use client";

import Spinner from "@/components/Shared/Spinner/Spinner";
import { useGetAllSpecialtiesQuery } from "@/redux/features/specialties/specialtiesApi";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/navigation";
import React from "react";

const ScrollCategory = ({ specialties }: { specialties: string }) => {
  const { data, isLoading } = useGetAllSpecialtiesQuery(undefined);
  const [value, setValue] = React.useState(specialties || "");
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/doctors?specialties=${newValue}`);
  };

  if (isLoading) return <Spinner />;

  return (
    <Box sx={{ maxWidth: "100%", bgcolor: "background.paper", mx: "auto" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {data ? (
          data.map((specialty: any) => (
            <Tab
              key={specialty.id}
              label={specialty.title}
              value={specialty.title}
              sx={{ fontWeight: 600 }}
            />
          ))
        ) : (
          <div>No specialties found</div>
        )}
      </Tabs>
    </Box>
  );
};

export default ScrollCategory;
