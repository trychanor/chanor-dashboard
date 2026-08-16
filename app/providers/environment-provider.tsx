"use client";

import { createContext, useContext, ReactNode } from "react";

type Environment = "local" | "test" | "development" | "production";

interface EnvironmentContextType {
  environment: Environment;
  isLocal: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined,
);

export function EnvironmentProvider({
  children,
  environment,
}: {
  children: ReactNode;
  environment: string;
}) {
  const env = environment as Environment;

  const value = {
    environment: env,
    isLocal: env === "local",
    isDevelopment: env === "development",
    isProduction: env === "production",
    isTest: env === "test",
  };

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error(
      "useEnvironment must be used within an EnvironmentProvider",
    );
  }
  return context;
}
