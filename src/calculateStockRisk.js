export { calculateStockRisk };

/*
 * Numbers are a bit off
 * 
 * Idea is to have a UI that sets up a StockRisk instance
 * Could add multiples on the screen
 * 
 * For each risk can add stock entries to calculate
 * Shows in table format
 * 
 * Shows definitions of calucations below
 * 
--------
To calculate
Total in:
Profit stop
Loss stop
Potential daily profit
Max daily loss
Earnings per week

-------
$100/$50 earnings/risk per trade ($250/day)
100 share max > $20/share
200 share max < $20/share ($4k max)
Max daily loss $150
*Earnings: $400/week
*/

/**
 * @typedef CalculateStockRiskParams
 * @property {Number} params.riskPerTrade
 * @property {Number} params.tradesPerDay
 * @property {Number} params.tradingDaysPerWeek
 * @property {Number} params.winningDayPercentage
 * @property {Number} params.cost
 * @property {Number} params.count 
 */

/**
 * @typedef CalculateStockRiskReturn
 * @property {Number} totalIn
 * @property {Number} lossExit
 * @property {Number} profitExit
 * @property {Number} stopProfit
 * @property {Number} stopLoss
 * @property {Number} maxDailyLoss
 * @property {Number} potentialDailyProfit
 * @property {Number} potentialWeeklyProfit
 */

/**
 * Calculates the stock risk item based on the stock risk definition,
 * stock count, and stock cost.
 * @param {ObCalculateStockRiskParamsject} params
 * @returns {CalculateStockRiskReturn}
 */
function calculateStockRisk({
    riskPerTrade,
    tradesPerDay,
    tradingDaysPerWeek,
    winningDayPercentage,
    cost,
    count
}) {
    const totalIn = cost * count;
    const stopProfit = (totalIn + riskPerTrade*2) / count;
    const stopLoss = (totalIn - riskPerTrade) / count;
    const maxDailyLoss = (riskPerTrade * 3);
    const potentialDailyProfit = (stopProfit * count * (tradesPerDay/2)) - (stopLoss * count * (tradesPerDay/2));
    const potentialWeeklyProfit = (potentialDailyProfit * (tradingDaysPerWeek * winningDayPercentage))
        - (maxDailyLoss * (tradingDaysPerWeek * (1-winningDayPercentage)));

        
    const calculations = {
        totalIn,
        lossExit: 0,
        profitExit: 0,
        stopProfit,
        stopLoss,
        maxDailyLoss,
        potentialDailyProfit,
        potentialWeeklyProfit
    };

    return calculations;
};



