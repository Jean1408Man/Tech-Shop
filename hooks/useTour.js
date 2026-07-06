"use client";

import { useEffect, useRef, useCallback } from "react";
import { driver } from "driver.js";

const TOUR_STORAGE_KEY = "tech-shop-tour-completed";

export function useTour(steps, options = {}) {
  const driverRef = useRef(null);

  const markTourCompleted = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOUR_STORAGE_KEY, "true");
    }
  }, []);

  const isTourCompleted = useCallback(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOUR_STORAGE_KEY) === "true";
    }
    return false;
  }, []);

  const resetTour = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOUR_STORAGE_KEY);
    }
  }, []);

  const startTour = useCallback(() => {
    if (!steps || steps.length === 0) return;

    if (driverRef.current) {
      driverRef.current.destroy();
    }

    driverRef.current = driver({
      showProgress: true,
      showButtons: ["next", "previous", "close"],
      nextBtnText: "Siguiente →",
      prevBtnText: "← Anterior",
      doneBtnText: "Finalizar",
      allowClose: true,
      onDestroyed: () => {
        markTourCompleted();
      },
      ...options,
      steps: steps.map((step) => ({
        popover: {
          title: step.title,
          description: step.description,
          side: step.side || "bottom",
          align: step.align || "start",
        },
        ...step,
      })),
    });

    driverRef.current.drive();
  }, [steps, options, markTourCompleted]);

  useEffect(() => {
    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, []);

  return {
    startTour,
    isTourCompleted,
    resetTour,
  };
}
