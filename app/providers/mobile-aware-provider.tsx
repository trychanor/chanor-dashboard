"use client";

import Image from "next/image";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import Button from "../_ui/Button";

const MOBILE_MAX_WIDTH = 767;
const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px)`;

type MobileAwareContextType = {
  isMobileBlocked: boolean;
  minAllowedWidth: number;
};

const MobileAwareContext = createContext<MobileAwareContextType | undefined>(
  undefined
);

function getIsMobileViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function MobileBlockedState({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fcffe7_0%,#fff7f1_42%,#f9fafb_100%)] px-5 py-8 text-neutral-900">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-lg items-center justify-center">
        <div className="w-full overflow-hidden rounded-[28px] border border-[#f4d4c6] bg-white shadow-[0_24px_80px_rgba(232,106,51,0.14)]">
          <div className="bg-[linear-gradient(135deg,#ef5a22_0%,#e86a33_100%)] px-6 py-7 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                  <Smartphone size={14} />
                  Mobile blocked
                </p>
                <h1 className="text-3xl font-semibold leading-tight">
                  Open Chanor Admin on a larger screen
                </h1>
              </div>

              <Image
                src="/chanor-logo.png"
                alt="Chanor logo"
                width={96}
                height={40}
                className="h-auto w-24 scale-200 object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6 px-6 py-7">
            <p className="text-sm leading-6 text-neutral-600">
              This dashboard is available on tablets, laptops, and desktops.
              Phone-sized screens are blocked so the workspace stays readable
              and reliable.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl bg-[#fcf4ef] p-4">
                <div className="mt-0.5 rounded-xl bg-white p-2 text-[#e86a33] shadow-sm">
                  <Tablet size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900">
                    Allowed devices
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Tablets and larger screens from 768px upward.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-[#f9fafb] p-4">
                <div className="mt-0.5 rounded-xl bg-white p-2 text-[#1a1a1a] shadow-sm">
                  <Monitor size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900">
                    Best experience
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Reopen this project on a tablet, laptop, or desktop browser.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={onRetry}
              additionalStyles="w-full justify-center"
            >
              Try again
            </Button>

            <p className="text-center text-xs leading-5 text-neutral-500">
              If you already switched devices, tap try again to refresh the
              screen check.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MobileAwareProvider({
  children,
  initialIsMobile = false,
}: {
  children: ReactNode;
  initialIsMobile?: boolean;
}) {
  const [isMobileBlocked, setIsMobileBlocked] = useState(initialIsMobile);
  const [hasResolvedViewport, setHasResolvedViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    const updateViewportState = () => {
      setIsMobileBlocked(mediaQuery.matches);
      setHasResolvedViewport(true);
    };

    updateViewportState();
    mediaQuery.addEventListener("change", updateViewportState);

    return () => {
      mediaQuery.removeEventListener("change", updateViewportState);
    };
  }, []);

  const shouldBlockChildren = hasResolvedViewport
    ? isMobileBlocked
    : initialIsMobile;

  return (
    <MobileAwareContext.Provider
      value={{
        isMobileBlocked: shouldBlockChildren,
        minAllowedWidth: MOBILE_MAX_WIDTH + 1,
      }}
    >
      {shouldBlockChildren ? (
        <MobileBlockedState
          onRetry={() => {
            setIsMobileBlocked(getIsMobileViewport());
            setHasResolvedViewport(true);
          }}
        />
      ) : (
        children
      )}
    </MobileAwareContext.Provider>
  );
}

export function useMobileAware() {
  const context = useContext(MobileAwareContext);

  if (context === undefined) {
    throw new Error(
      "useMobileAware must be used within a MobileAwareProvider"
    );
  }

  return context;
}
