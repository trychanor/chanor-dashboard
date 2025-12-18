import React from "react";
import Status from "@/app/_ui/Status";

// --- FAILED LOGIN DATA ---
export const failedLoginData = [
  {
    id: "1",
    data: {
      userId: "U102",
      email: "example@gmail.com",
      device: "Mobile",
      ipAddress: "104.77.44.12",
      reason: "Wrong password",
      attemptTime: "09:34 AM",
    },
  },
  {
    id: "2",
    data: {
      userId: "U102",
      email: "example@gmail.com",
      device: "Mobile",
      ipAddress: "104.77.44.12",
      reason: "Wrong password",
      attemptTime: "09:34 AM",
    },
  },
  {
    id: "3",
    data: {
      userId: "U102",
      email: "example@gmail.com",
      device: "Mobile",
      ipAddress: "104.77.44.12",
      reason: "Wrong password",
      attemptTime: "09:34 AM",
    },
  },
  {
    id: "4",
    data: {
      userId: "U102",
      email: "example@gmail.com",
      device: "Mobile",
      ipAddress: "104.77.44.12",
      reason: "Wrong password",
      attemptTime: "09:34 AM",
    },
  },
  {
    id: "5",
    data: {
      userId: "U102",
      email: "example@gmail.com",
      device: "Mobile",
      ipAddress: "104.77.44.12",
      reason: "Wrong password",
      attemptTime: "09:34 AM",
    },
  },
];

// --- LOCKED ACCOUNT DATA ---
export const lockedAccountData = [
  {
    id: "1",
    data: {
      userId: "U205",
      email: "john.doe@email.com",
      device: "Desktop - Chrome",
      ipAddress: "192.168.1.1",
      reason: "Multiple failed attempts",
      lockTime: "10:15 AM",
    },
  },
  // Add empty array or more items to simulate different states
];

// --- FRAUD ALERT DATA ---
export const fraudAlertData = [
  {
    id: "1",
    data: {
      alertId: "U102",
      type: "Voice Mismatch",
      user: "U102",
      description: "Voice doesn't match",
      risk: <Status label="High" appearance="solid" showDot={false} />,
      status: <Status label="Pending" appearance="subtle-rounded" showDot={false} />,
    },
  },
  {
    id: "2",
    data: {
      alertId: "U102",
      type: "Voice Mismatch",
      user: "U102",
      description: "Voice doesn't match",
      risk: <Status label="High" appearance="solid" showDot={false} />,
      status: <Status label="Pending" appearance="subtle-rounded" showDot={false} />,
    },
  },
  {
    id: "3",
    data: {
      alertId: "U102",
      type: "Voice Mismatch",
      user: "U102",
      description: "Voice doesn't match",
      risk: <Status label="High" appearance="solid" showDot={false} />,
      status: <Status label="Pending" appearance="subtle-rounded" showDot={false} />,
    },
  },
  {
    id: "4",
    data: {
      alertId: "U102",
      type: "Voice Mismatch",
      user: "U102",
      description: "Voice doesn't match",
      risk: <Status label="High" appearance="solid" showDot={false} />,
      status: <Status label="Pending" appearance="subtle-rounded" showDot={false} />,
    },
  },
];