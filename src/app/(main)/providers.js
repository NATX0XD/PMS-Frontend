"use client";
import { SettingsProvider } from "@/context/settingsContext";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/authContext";
import ProtectedRoute from "@/layouts/components/ProtectedRoute";

export const Providers = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <AuthProvider>
        <ProtectedRoute>
          {/* <SettingsProvider> */}
          {children}
          {/* </SettingsProvider> */}
        </ProtectedRoute>
      </AuthProvider>
    </SessionProvider>
  );
};
