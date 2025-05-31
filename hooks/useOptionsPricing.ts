"use client";

import { black_scholes } from "@/utils/optionsPricing";
import { differenceInSeconds, differenceInYears } from "date-fns";
import { useState, useEffect } from "react";

interface UseOptionsPricingProps {
  type: "Call" | "Put";
  strikePrice: number;
  currentPrice: number;
  expiryDate: Date;
}

export function useOptionsPricing({
  type,
  strikePrice,
  currentPrice,
  expiryDate,
}: UseOptionsPricingProps) {
  const [premium, setPremium] = useState<number>(0);
  const seconds = differenceInSeconds(expiryDate, Date.now());

  const time = seconds / (365 * 24 * 60 * 60);

  const isCall = (type: "Call" | "Put") => {
    return type === "Call" ? true : false;
  };

  useEffect(() => {
    if (!strikePrice || !currentPrice || !expiryDate) {
      setPremium(0);
      return;
    }

    const calculatedPremium = black_scholes(
      currentPrice,
      strikePrice,
      time,
      isCall(type)
    );

    setPremium(Math.max(0, calculatedPremium));
  }, [type, strikePrice, currentPrice, expiryDate]);

  return { premium };
}
