import { KiteConnect } from "kiteconnect";

const apiKey = "your-api-key";
const apiSecret = "your-api-secret";
//const requestToken = "your-request-token";

let access_token="your-access-token"; //hard coded access token through generate session  function  and then deleted it.
const kc = new KiteConnect({ api_key: apiKey });

kc.setAccessToken(access_token);


//console.log(kc.getLoginURL());

export async function placeOrder(tradingsymbol: string, quantity:number,type: "BUY" | "SELL" ) {
  try {
    //kc.setAccessToken(access_token);
    const response = await kc.placeOrder("regular", {
      exchange : "NSE",
      tradingsymbol : tradingsymbol,
      transaction_type : type,
      quantity : quantity,
      product : "CNC",
      order_type: "MARKET"
      
    });
    
    return response; // Return the response for successful orders
  } catch (err) {
    console.error(err);
  }
}

export async function getPositions(){
    const holdings = await kc.getPositions();
    let allHoldings = "";
    holdings.net.map(holding => {
        allHoldings += `stock : ${holding.tradingsymbol}, quantity : ${holding.quantity}, currentPrice : ${holding}`
    })
    return allHoldings;
}

export async function placeLimitOrder(tradingsymbol: string, quantity: number, type: "BUY" | "SELL", price: number) {
  try {
    const response = await kc.placeOrder("regular", {
      exchange: "NSE",
      tradingsymbol: tradingsymbol,
      transaction_type: type,
      quantity: quantity,
      product: "CNC",
      order_type: "LIMIT",
      price: price  // User-specified limit price
    });
    
    return response; // Return the response for successful orders
  } catch (err) {
    console.error("KiteConnect API Error:", err);
    
    // Create a more informative error
    let errorMessage = "Failed to place limit order";
    
    if (err && typeof err === 'object') {
      if ('message' in err && typeof err.message === 'string') {
        errorMessage = err.message;
      } else if ('error' in err && typeof err.error === 'string') {
        errorMessage = err.error;
      } else if ('detail' in err && typeof err.detail === 'string') {
        errorMessage = err.detail;
      } else if ('status' in err && 'message' in err) {
        errorMessage = `API Error ${err.status}: ${err.message}`;
      }
    }
    
    const enhancedError = new Error(errorMessage);
    enhancedError.cause = err; // Preserve the original error as cause
    throw enhancedError;
  }
}

/*async function generateSession() {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    console.log(response.access_token) //used to generate access token then hard code it.
    kc.setAccessToken(response.access_token);
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
} 

generateSession();
*/
// Initialize the API calls
