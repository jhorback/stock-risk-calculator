import { calculateStockRisk } from './calculateStockRisk';
import { stockRiskDefinitions } from "./stockRiskDefinitions.js";

export { SrcAppData }

/**
 * @typedef StockRisk
 * @property {String} id
 * @property {Name} name
 * @property {Number} riskPerTrade
 * @property {String} riskPerTradeUSD
 * @property {Number} maxSharesAtOrUnder20
 * @property {Number} maxSharesOver20
 * @property {Number} tradesPerDay
 * @property {Number} tradingDaysPerWeek
 * @property {Number} winningDayPercentage
 * @property {String} maxDailyLossUSD
 * @property {String} potentialDailyProfitUSD
 * @property {String} potentialWeeklyProfitUSD
 * @property {Array.<StockRiskItem>} items
 */

/**
 * @typedef StockRiskItem
 * @property {String} id
 * @property {Number} cost
 * @property {String} costUSD
 * @property {Number} count
 * @property {String} totalInUSD
 * @property {String} lossExitUSD
 * @property {String} profitExitUSD
 * @property {String} stopProfitUSD
 * @property {String} stopLossUSD
 */

class SrcAppData extends HTMLElement {

    static definitions = stockRiskDefinitions;
    
    static defaultState = {
        title: "Stock Risk Calculator",
        /** @type {StockRisk} */
        defaultStockRisk: {
            id: null,
            name: "Enter a name",
            riskPerTrade: 50,
            riskPerTradeUSD: formatUSD(50),
            maxSharesAtOrUnder20: 200,
            maxSharesOver20: 100,
            tradesPerDay: 10,
            tradingDaysPerWeek: 5,
            winningDayPercentage: 0.6,
            rows: []
        },
        /** @type {StockRiskItem} */
        defaultStockRiskItem: {
            cost: 10,
            count: 100
        },
        stockRisks: []
    };

    state = SrcAppData.defaultState;

    constructor() {
        super();
    }

    /**
     * 
     * @param {Object} stockRisk
     * @param {Number=50} stockRisk.riskPerTrade the amount of risk per trade  
     */
    addRiskProfile = ({
        name,
        riskPerTrade,
        maxSharesAtOrUnder20,
        maxSharesOver20,
        tradesPerDay,
        tradingDaysPerWeek,
        winningDayPercentage
    } = SrcAppData.defaultState.defaultStockRisk) => {

        this.state = {
            ...this.state,
            stockRisks: [
                {
                    id: getNextId(),
                    name,
                    riskPerTrade,
                    riskPerTradeUSD: formatUSD(riskPerTrade),
                    maxSharesAtOrUnder20,
                    maxSharesOver20,
                    tradesPerDay,
                    tradingDaysPerWeek,
                    winningDayPercentage,
                    items: []
                },
                ...this.state.stockRisks
            ]
        };

        this.dispatchStateChange();
    };

    addRiskProfileItem({
        id,
        cost,
        count
    }) {

        const risk = this.state.stockRisks.find(sr => sr.id === id);

        const item = calculateStockRisk({
            ...risk,
            cost,
            count
        });

        const newItem = {
            id: getNextId(),
            ...item,
            count,
            costUSD: formatUSD(cost),
            totalInUSD: formatUSD(item.totalIn),
            lossExitUSD: formatUSD(item.lossExit),
            profitExitUSD: formatUSD(item.profitExit),
            stopProfitUSD: formatUSD(item.stopProfit),
            stopLossUSD: formatUSD(item.stopLoss),
            maxDailyLossUSD: formatUSD(item.maxDailyLoss),
            potentialDailyProfitUSD: formatUSD(item.potentialDailyProfit),
            potentialWeeklyProfitUSD: formatUSD(item.potentialWeeklyProfit)
        };

        this.state = {
            ...this.state,
            stockRisks: this.state.stockRisks.map(sr => {
                if (sr.id === id) {
                    return {
                        ...sr,
                        items: [
                            ...sr.items,
                            newItem
                        ]
                    };
                } else {
                    return sr;
                }
            })
        };

        this.dispatchStateChange();
    }

    dispatchStateChange() {
        this.dispatchEvent(new CustomEvent("state-change"));
    }    
};


let counter = 0;

const getNextId = () => {
    counter = counter+1;
    return `id-${counter}`;
};


function formatUSD(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}


window.customElements.define("src-app-data", SrcAppData);
