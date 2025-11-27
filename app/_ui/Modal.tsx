"use client";

import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  width?: string;
  height?: string;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  width = "auto",
  height = "auto",
  className = "",
}: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg flex flex-col relative p-6 ${className}`}
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* Content */}
        <div className="flex-1">{children}</div>

        {/* Actions */}
        {actions && (
          <div className="mt-4 flex gap-2 justify-end">{actions}</div>
        )}
      </div>
    </div>,
    document.body
  );
}
