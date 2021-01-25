export { calculateRiskProfile, calculateTrade };


/**
 * @typedef RiskProfileParams
 * @property {Number} riskPerTrade
 * @property {Number} tradesPerDay
 * @property {Number} tradingDaysPerWeek
 * @property {Number} winningDayPercentage
 */
/**
 * @typedef RiskProfileReturn
 * @property {Number} maxDailyLoss
 * @property {Number} potentialDailyProfit
 * @property {Number} potentialWeeklyProfit
 */
/**
 * @typedef TradeParams
 * @property {Number} riskPerTrade
 * @property {Number} cost
 * @property {Number} count
 */
/**
 * @typedef TradeReturn
 * @property {Number} totalIn
 * @property {Number} longProfitExit
 * @property {Number} longLossExit
 * @property {Number} shortProfitExit
 * @property {Number} shortLossExit
 */

/**
 * Calculates the profile profit loss values.
 * @param {RiskProfileParams} params 
 * @returns {RiskProfileReturn}
 */
function calculateRiskProfile({
    riskPerTrade,
    tradesPerDay,
    tradingDaysPerWeek,
    winningDayPercentage
}) {

    /** 3 times risk per trade */
    const maxDailyLoss = (riskPerTrade * 3);

    /** 2:1 profit/risk ratio */
    const maxTradeProfit = (riskPerTrade * 2); 

    /** Based on 50% win/loss */
    const potentialDailyProfit = ((tradesPerDay/2)*maxTradeProfit)
        - ((tradesPerDay/2)*riskPerTrade);
    
    /** Based on the winning day percentage */
    const potentialWeeklyProfit = (potentialDailyProfit * (tradingDaysPerWeek * winningDayPercentage))
        - (maxDailyLoss * (tradingDaysPerWeek * (1-winningDayPercentage)));

    return {
        maxDailyLoss,
        potentialDailyProfit,
        potentialWeeklyProfit
    };
}

/**
 * Calculates the trade profit/loss values.
 * @param {TradeParams} params
 * @returns {TradeReturn}
 */
function calculateTrade({
    riskPerTrade,
    cost,
    count
}) {
    const totalIn = cost * count;
    const longProfitExit = (totalIn + riskPerTrade*2) / count;
    const longLossExit = (totalIn - riskPerTrade) / count;
    const shortProfitExit = (totalIn - riskPerTrade*2) / count;
    const shortLossExit = (totalIn + riskPerTrade) / count;
    /*
    */
        
    const calculations = {
        totalIn,
        longLossExit,
        longProfitExit,
        shortProfitExit,
        shortLossExit
    };

    return calculations;
};



