export function convertPrice(
  amount: number,
  fromTokenPrice: number,
): number {
  if (!amount || !fromTokenPrice) return 0;
  return parseFloat(((amount * fromTokenPrice)).toFixed(8));
}
  
function normalCdf(z: number) {
  const beta1 = -0.0004406;
  const beta2 = 0.0418198;
  const beta3 = 0.9;
  const exponent = 
    -Math.sqrt(Math.PI) * (beta1 * Math.pow(z, 5) + beta2 * Math.pow(z, 3) + beta3 * z);
    
  return 1.0/(1.0 + Math.exp(exponent));
}

function normalPdf(x: number) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
};

//s = current price
//k = strike price
//t = time to expiration in seconds
//isCall = true: call, false: put

export function black_scholes(s:number, k:number ,t:number , isCall:boolean){
  const r = 0.0;
  const sigma = 0.5;

  const d1 = (Math.log(s / k) + (r + 0.5 * sigma * sigma) * t) / (sigma * Math.sqrt(t));
  const d2 = d1 - sigma * Math.sqrt(t);

  const nd1 = normalCdf(d1);
  const nd2 = normalCdf(d2);
  const nNegd1 = normalCdf(-d1);
  const nNegd2 = normalCdf(-d2);

  if(isCall){
    return s * nd1 - k * Math.exp(-r * t) * nd2;
  }else {
    return k * Math.exp(-r * t) * nNegd2 - s * nNegd1;
  }
}

export function delta_calc(s: number, k: number, t:number, isCall:boolean){
  const r = 0.0;
  const sigma = 0.5

  const d1 = (Math.log(s / k) + (r + Math.pow(sigma, 2) / 2) * t) / (sigma * Math.sqrt(t));
  
  
  return isCall ? normalCdf(d1) : -normalCdf(-d1);
}

export function gamma_calc(s: number, k: number, t:number){
  const r = 0.0;
  const sigma = 0.5;

  const d1 = (Math.log(s / k) + (r + Math.pow(sigma, 2) / 2) * t) / (sigma * Math.sqrt(t));

  return normalPdf(d1) / (s * sigma * Math.sqrt(t))
}

export function vega_calc(s: number, k: number, t:number){
  const r = 0.0;
  const sigma = 0.5;

  const d1 = (Math.log(s / k) + (r + Math.pow(sigma, 2) / 2) * t) / (sigma * Math.sqrt(t));

  let vegaValue : number;
  
  vegaValue = s * normalPdf(d1) * Math.sqrt(t);

  return vegaValue * 0.01
}

export function theta_calc(s: number, k: number, t:number, isCall:boolean){
  const r = 0.0;
  const sigma = 0.5;

  const d1 = (Math.log(s / k) + (r + Math.pow(sigma, 2) / 2) * t) / (sigma * Math.sqrt(t));
  const d2 = d1 - sigma * Math.sqrt(t);

  let thetaValue: number;

  if(isCall){
    thetaValue = (-s * normalPdf(d1) * sigma) / (2 * Math.sqrt(t)) - r * k * Math.exp(-r * t) * normalCdf(d2);
  } else {
    thetaValue = (-s * normalPdf(d1) * sigma) / (2 * Math.sqrt(t)) - r * k * Math.exp(-r * t) * normalCdf(-d2);
  }

  return thetaValue/365;
}

export function rho_calc(s: number, k: number, t:number, isCall:boolean){
  const r = 0.0;
  const sigma = 0.5;

  const d1 = (Math.log(s / k) + (r + Math.pow(sigma, 2) / 2) * t) / (sigma * Math.sqrt(t));
  const d2 = d1 - sigma * Math.sqrt(t);

  let rhoValue: number;

  if(isCall){
    rhoValue = k * t * Math.exp(-r * t) * normalCdf(d2)
  }else{
    rhoValue = -k * t * Math.exp(-r * t) * normalCdf(-d2)
  }

  return rhoValue * 0.01;
}

