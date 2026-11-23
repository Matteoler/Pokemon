"use client";

import React, { useEffect, useState } from "react";
import grid from "@/config/tailwind/grid";

export const Grid = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [columns, setColumns] = useState(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      return width < 460
          ? grid.mobile.columns
          : width < 900
              ? grid.tablet.columns
              : grid.desktop.columns;
    }
    return grid.desktop.columns; // Default value for SSR
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "g") setIsVisible((prev) => !prev);
    };

    const updateColumns = () => {
      const width = window.innerWidth;
      const newColumns =
          width < 460
              ? grid.mobile.columns
              : width < 900
                  ? grid.tablet.columns
                  : grid.desktop.columns;
      setColumns(newColumns);
    };

    window.addEventListener("resize", updateColumns);
    document.body.addEventListener("keydown", handleKeyDown);
    updateColumns(); // Ensure initial update after mount

    return () => {
      window.removeEventListener("resize", updateColumns); // Correct cleanup
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
      <div
          className={`fixed inset-0 w-full h-full z-999 pointer-events-none ${
              isVisible ? "" : "hidden"
          }`}
      >
        <div className="flex h-full w-full gap-grid px-grid">
          {Array.from({ length: columns }).map((_, i) => (
              <div
                  key={i}
                  className="border-2 border-red opacity-60 h-full flex-1"
              ></div>
          ))}
        </div>
      </div>
  );
};