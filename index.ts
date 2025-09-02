import { getPositions, placeOrder, placeLimitOrder } from "./trade";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});


//buy a stock
server.registerTool("buy",
  {
    title: "Buy Tool",
    description: "Buying a stock",
    inputSchema: { stock : z.string(), qty : z.number()}
  },
  async({stock, qty})=>{
    placeOrder(stock,qty,"BUY");
    return{
      content:[{type:"text", text: "Stock has been purchased."}]
    }
  }
);

//sell a stock
server.registerTool("sell",
  {
    title: "sell Tool",
    description: "selling a stock",
    inputSchema: { stock : z.string(), qty : z.number(), }
  },
  async({stock, qty})=>{
    placeOrder(stock,qty,"SELL");
    return{
      content:[{type:"text", text: "Stock has been sold."}]
    }
  }
);


//show the portfolio
server.registerTool("show-portfolio",
  {
    title: "Display",
    description: "Shows the whole portfolio all at once.",
    inputSchema: { }
  },
  async()=>{
    const holdings = await getPositions()
    return{
      content:[{type:"text", text: holdings}]
    }
  }
);


server.registerTool("buy_limit",
  {
    title: "Buy at Price Tool",
    description: "Buy a stock at a user-specified limit price.",
    inputSchema: { stock: z.string(), qty: z.number(), price: z.number() }
  },
  async({ stock, qty, price }) => {
    try {
      await placeLimitOrder(stock, qty, "BUY", price);
      return {
        content: [{ type: "text", text: `Limit buy order placed for ${qty} shares of ${stock} at price ${price}.` }]
      };
    } catch (error) {
      let errorMessage = 'Unknown error';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        if ('message' in error && typeof error.message === 'string') {
          errorMessage = error.message;
        } else if ('error' in error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if ('detail' in error && typeof error.detail === 'string') {
          errorMessage = error.detail;
        } else {
          try {
            errorMessage = JSON.stringify(error);
          } catch {
            errorMessage = String(error);
          }
        }
      }
      
      return {
        content: [{ type: "text", text: `Error placing limit buy order: ${errorMessage}` }]
      };
    }
  }
);

//sell at a price
server.registerTool("sell_limit",
  {
    title: "Sell at Price Tool",
    description: "Sell a stock at a user-specified limit price.",
    inputSchema: { stock: z.string(), qty: z.number(), price: z.number() }
  },
  async({ stock, qty, price }) => {
    try {
      await placeLimitOrder(stock, qty, "SELL", price);
      return {
        content: [{ type: "text", text: `Limit sell order placed for ${qty} shares of ${stock} at price ${price}.` }]
      };
    } catch (error) {
      let errorMessage = 'Unknown error';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
       
        if ('message' in error && typeof error.message === 'string') {
          errorMessage = error.message;
        } else if ('error' in error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if ('detail' in error && typeof error.detail === 'string') {
          errorMessage = error.detail;
        } else {
          
          try {
            errorMessage = JSON.stringify(error);
          } catch {
            errorMessage = String(error);
          }
        }
      }
      
      return {
        content: [{ type: "text", text: `Error placing limit sell order: ${errorMessage}` }]
      };
    }
  }
);
const transport = new StdioServerTransport();
await server.connect(transport);


