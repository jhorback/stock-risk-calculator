import { calculateRiskProfile, calculateTrade} from './riskCalculator';
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
 * @property {Boolean} isAboveMaxShares
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
        stockRisks: []
    };

    static defaultRiskProfiles = [{
        name: "Mature Trader",
        riskPerTrade: 200,
        maxSharesAtOrUnder20: 1000,
        maxSharesOver20: 500,
        tradesPerDay: 10,
        tradingDaysPerWeek: 5,
        winningDayPercentage: 0.6
    }, {
        name: "Intermediate Trader",
        riskPerTrade: 100,
        maxSharesAtOrUnder20: 400,
        maxSharesOver20: 200,
        tradesPerDay: 10,
        tradingDaysPerWeek: 5,
        winningDayPercentage: 0.6
    }, {
        name: "Beginning Trader",
        riskPerTrade: 50,
        maxSharesAtOrUnder20: 200,
        maxSharesOver20: 100,
        tradesPerDay: 10,
        tradingDaysPerWeek: 5,
        winningDayPercentage: 0.6
    }];

    state = SrcAppData.defaultState;

    connectedCallback() {
        SrcAppData.defaultRiskProfiles.forEach(p => {
            this.addRiskProfile(p);
        });
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

        // calculateRiskProfile
        const {
            maxDailyLoss,
            potentialDailyProfit,
            potentialWeeklyProfit
        } = calculateRiskProfile({
            riskPerTrade,
            tradesPerDay,
            tradingDaysPerWeek,
            winningDayPercentage
        });

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
                    maxDailyLossUSD: formatUSD(maxDailyLoss),
                    potentialDailyProfitUSD: formatUSD(potentialDailyProfit),
                    potentialWeeklyProfitUSD: formatUSD(potentialWeeklyProfit),
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

        const item = calculateTrade({
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
            isAboveMaxShares: isAboveMaxShares({
                cost,
                count,
                maxSharesAtOrUnder20: risk.maxSharesAtOrUnder20,
                maxSharesOver20: risk.maxSharesOver20
            })
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


const isAboveMaxShares = ({cost, count, maxSharesOver20, maxSharesAtOrUnder20}) => {
    cost = Number(cost);
    count = Number(count);
    maxSharesOver20 = Number(maxSharesOver20);
    maxSharesAtOrUnder20 = Number(maxSharesAtOrUnder20);

    return cost > 20 ?
        count > maxSharesOver20 ?
            true : false
        : 
        count > maxSharesAtOrUnder20  ?
            true : false;  
};


window.customElements.define("src-app-data", SrcAppData);
