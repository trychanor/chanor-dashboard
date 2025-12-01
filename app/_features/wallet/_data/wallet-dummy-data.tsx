import React from "react";
import Status from "@/app/_ui/Status";

// Helper to render Status component inside data
// We use this to keep the data file clean while returning the UI component required by the Table
const renderStatus = (label: string, appearance: "subtle" | "solid" | "subtle-rounded" = "subtle", showDot = true) => (
  <Status label={label} appearance={appearance} showDot={showDot} />
);

// --- FLOAT GAUGE DATA ---
export const floatGaugeUsersData = [
  { id: "1", data: { id: "301", businessName: "Pos Juma", email: "example@gmail.com", balance: "₦30,000", category: "E-commerce" } },
  { id: "2", data: { id: "494", businessName: "Pos Juma", email: "example@gmail.com", balance: "₦30,000", category: "E-commerce" } },
  { id: "3", data: { id: "234", businessName: "Pos Juma", email: "example@gmail.com", balance: "₦30,000", category: "E-commerce" } },
  { id: "4", data: { id: "123", businessName: "Pos Juma", email: "example@gmail.com", balance: "₦30,000", category: "E-commerce" } },
  { id: "5", data: { id: "123", businessName: "Pos Juma", email: "example@gmail.com", balance: "₦30,000", category: "E-commerce" } },
];

export const floatGaugeAlertsData = [
  {
    id: "a1",
    data: {
      alertId: "RA101",
      type: "Delay",
      description: "₦30,000 settlement delay (24hr)",
      amount: "₦30,000",
      status: renderStatus("Pending", "subtle", true),
    },
  },
  {
    id: "a2",
    data: {
      alertId: "RA102",
      type: "Mismatch",
      description: "₦200,000 not reflected on providus",
      amount: "₦30,000",
      status: renderStatus("Failed", "subtle", true), // Using 'Failed' to trigger red color for Critical
    },
  },
  {
    id: "a3",
    data: {
      alertId: "RA103",
      type: "Delay",
      description: "₦30,000",
      amount: "₦30,000",
      status: renderStatus("Successful", "subtle", true), // Using 'Successful' to trigger green for Resolved
    },
  },
  {
    id: "a4",
    data: {
      alertId: "RA104",
      type: "Mismatch",
      description: "₦30,000",
      amount: "₦30,000",
      status: renderStatus("Failed", "subtle", true),
    },
  },
];

// --- DAILY NET DATA ---
export const dailyNetData = [
  {
    id: "dn1",
    data: {
      date: "Oct 24, 2025",
      transactions: "1,240",
      volume: "₦45,000,000",
      payouts: "₦42,000,000",
      net: "₦3,000,000",
      status: renderStatus("Successful", "subtle", true),
    },
  },
  {
    id: "dn2",
    data: {
      date: "Oct 23, 2025",
      transactions: "980",
      volume: "₦32,000,000",
      payouts: "₦31,500,000",
      net: "₦500,000",
      status: renderStatus("Successful", "subtle", true),
    },
  },
  {
    id: "dn3",
    data: {
      date: "Oct 22, 2025",
      transactions: "1,500",
      volume: "₦50,000,000",
      payouts: "₦51,000,000",
      net: "-₦1,000,000",
      status: renderStatus("Failed", "subtle", true),
    },
  },
];

// --- USERS WALLET DATA ---
export const usersWalletData = [
  {
    id: "uw1",
    data: {
      userId: "U-1023",
      name: "John Doe",
      email: "john@example.com",
      balance: "₦150,000",
      lastActive: "2 mins ago",
      status: renderStatus("Active", "subtle", true),
    },
  },
  {
    id: "uw2",
    data: {
      userId: "U-1024",
      name: "Sarah Smith",
      email: "sarah@example.com",
      balance: "₦45,000",
      lastActive: "1 hour ago",
      status: renderStatus("Active", "subtle", true),
    },
  },
  {
    id: "uw3",
    data: {
      userId: "U-1025",
      name: "Michael Brown",
      email: "michael@example.com",
      balance: "₦0.00",
      lastActive: "3 days ago",
      status: renderStatus("Inactive", "subtle", true),
    },
  },
];

// --- BUSINESS WALLET DATA ---
export const businessWalletData = [
  {
    id: "bw1",
    data: {
      businessId: "B-501",
      businessName: "SuperMart Ltd",
      email: "finance@supermart.com",
      balance: "₦5,400,000",
      category: "Retail",
      status: renderStatus("Active", "subtle", true),
    },
  },
  {
    id: "bw2",
    data: {
      businessId: "B-502",
      businessName: "TechNova",
      email: "billing@technova.io",
      balance: "₦2,100,000",
      category: "SaaS",
      status: renderStatus("Active", "subtle", true),
    },
  },
  {
    id: "bw3",
    data: {
      businessId: "B-503",
      businessName: "QuickLogistics",
      email: "accounts@quicklog.com",
      balance: "₦780,000",
      category: "Logistics",
      status: renderStatus("Inactive", "subtle", true),
    },
  },
];