# Kite Bot

A simple and powerful trading bot built using **Zerodha’s Kite Connect SDK**.  
This bot lets you execute trades right from your terminal with **five core tools**:

- 🟢 **Buy** – Place a buy order  
- 🔴 **Sell** – Place a sell order  
- 📊 **Display** – View your current positions/holdings  
- 💰 **Buy at Price** – Place a buy order at a specific price  
- 💸 **Sell at Price** – Place a sell order at a specific price  

---

##  Features

-  Direct integration with **Zerodha Kite Connect**  
-  Lightweight & easy to run  
-  Supports **market & limit orders**  
-  Simple CLI commands for fast execution  
-  Extendable for advanced trading strategies  

---

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Atharva-2715/Kite-Bot.git
cd zerodha-trading-bot
```
### 2. Install Dependencies
```bash
bun install
```

### 3. Get Zerodha API credentials

Go to Zerodha Kite Connect.

Create an app to get your API Key and API Secret.

### 4. Generate your access token

Use:
```bash
kc.getLoginURL()
```
to log in and obtain a request token.

Exchange the request token for an access token using your API key and secret

### 5. Configure Claude Desktop

Open Claude in developer mode

Modify 'claude_desktop_config_json'.

### 6. Usage

Run the code using 
```bash
bun index.ts
bun trade.ts
```
---
⚠️ Disclaimer

This project is for educational purposes only.
Trading in financial markets carries significant risk.
The author is not responsible for any losses incurred while using this bot.
Use responsibly. 

---
⭐ Contribute

1.Fork the repo

2.Create a feature branch (git checkout -b feature-name)

3.Commit your changes

4.Open a pull request
