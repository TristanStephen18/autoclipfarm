// src/hooks/useProfile.ts
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { backendPrefix } from "../../confg";
import type { Profile } from "../../types/profile";

export const useProfile = () => {
  const query = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(`${backendPrefix}/api/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("autocliptoken") || ""
          }`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      return data as Profile;
    },
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log("Fetched profile:", query.data);
    }
    if (query.isError) {
      console.error("Failed to fetch user profile");
    }
  }, [query.isSuccess, query.isError]);

  return query;
};
