"use client";

import React, { ReactNode } from "react";

type CardProps = {
  width?: string | number;
  height?: string | number;
  header?: ReactNode | ReactNode[];
  main?: ReactNode | ReactNode[];
  footer?: ReactNode | ReactNode[];
  paddingClassName?: string;
  className?: string;
};

export default function Card({
  width,
  height = "140px",
  header,
  main,
  footer,
  paddingClassName = "p-4",
  className = "",
}: CardProps) {
  // Utility to render flex row with gap for multiple nodes and inject keys
  const renderRow = (content: ReactNode | ReactNode[]) => {
    if (!content) return null;
    const nodes = Array.isArray(content) ? content : [content];

    return (
      <div>
        {nodes.map((node, idx) =>
          React.isValidElement(node) ? (
            React.cloneElement(node, { key: node.key ?? idx })
          ) : (
            <span key={idx}>{node}</span>
          ),
        )}
      </div>
    );
  };

  return (
    <div
      className={`bg-white rounded-lg flex flex-col justify-between ${paddingClassName} hover:shadow-md transition-shadow duration-300 ${className}`}
      style={{
        width,
        height,
      }}
    >
      {header && renderRow(header)}
      {main && <div className="flex gap-2">{renderRow(main)}</div>}
      {footer && renderRow(footer)}
    </div>
  );
}
