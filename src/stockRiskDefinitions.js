

export const stockRiskDefinitions = {
    name: {
        name: "Name",
        description: "The name of the risk profile."
    },
    riskPerTrade: {
        name: "Risk per trade",
        description: "The amount of money are you willing to risk per trade."
    },
    maxSharesOver20: {
        name: "Max shares > $20",
        description: "The maximum numbers of shares to trade for shares over $20."
    },
    maxSharesAtOrUnder20: {
        name: "Max shares <= $20",
        description: "The maxumum numbers of shares to trade for shares at or less than $20."
    },
    cost: {
        name: "Stock cost",
        description: "The purchase price of the stock."
    },
    count: {
        name: "Stock count",
        description: "The number of shares purchased."
    },
    totalIn: {
        name: "Total in",
        description: "The total cost of all shares."
    },
    riskPerShare: {
        name: "Risk/share",
        description: "The risk per share (useful for a stop loss)."
    },
    longLossExit: {
        name: "Long loss exit",
        description: "The price to sell at to take a loss on a long trade."
    },
    longProfitExit: {
        name: "Long profit exit",
        description: "The price to sell at to take a profit on a long trade."
    },
    shortLossExit: {
        name: "Short loss exit",
        description: "The price to buy to cover at to take a loss on a short trade."
    },
    shortProfitExit: {
        name: "Short profit exit",
        description: "The price to buy to cover at to take a profit on a short trade."
    },
    tradesPerDay: {
        name: "Trades per day",
        description: "How many trades will be taken per day."
    },
    maxDailyLoss: {
        name: "Max daily loss",
        description: "The maximum amount of money to loose before stopping to trade."
    },
    potentialDailyProfit: {
        name: "Potential daily profit",
        description: "How much money is earned if have of the trades are successful."
    },
    tradingDaysPerWeek: {
        name: "Trading days per week",
        description: "The number of days to trade per week."
    },
    winningDayPercentage: {
        name: "Wnning day percentage",
        description: "The percentage of days that are 'winning' days; e.g. 0.6 is 3 days up 2 days max loss."
    },
    potentialWeeklyProfit:{
        name: "Potential weekly profit",
        description: "How much money could be made per week."
    }
};
