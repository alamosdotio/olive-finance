
import { delta_calc, gamma_calc, rho_calc, theta_calc, vega_calc } from "@/utils/optionsPricing";
import { differenceInSeconds } from "date-fns";

interface useGreeksProps {
    type: "Call" | "Put";
    strikePrice: number;
    currentPrice: number;
    expiryDate: Date;
}

export function useGreeks({
    type,
    strikePrice,
    currentPrice,
    expiryDate,
} : useGreeksProps) {
    let delta : number
    let gamma : number
    let vega : number
    let theta : number
    let rho : number

    const seconds = differenceInSeconds(expiryDate, Date.now())
    const time = seconds / (365 * 24 * 60 * 60);
    const isCall = (type: "Call" | "Put") => {
        return type === "Call" ? true : false;
    };

    delta = delta_calc(currentPrice, strikePrice, time, isCall(type))
    gamma = gamma_calc(currentPrice, strikePrice, time)
    vega = vega_calc(currentPrice, strikePrice, time)
    theta = theta_calc(currentPrice, strikePrice, time, isCall(type))
    rho = rho_calc(currentPrice, strikePrice, time, isCall(type))

    return { delta, gamma, vega, theta, rho}

}