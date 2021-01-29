

import { html, css, LitElement } from 'lit-element';

import { SrcAppData } from "./src-app-data.js";
import { SharedStyles } from "./SharedStyles.js";


class SrcRiskProfileTable extends LitElement {
  static get styles() {
    return css`
      :host {
          display: block;
          margin-bottom: 5rem;
          background: var(--risk-background, red);
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          margin: 0rem 0rem 3rem;
          padding: 0.01rem 1rem 0.2rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
      }
      h2 {
          font-size: 1rem;
          margin: 1rem 0 1rem 0;
          padding: 0;
      }
      .over-max {
        text-decoration: line-through;
      }
      ${SharedStyles.dataTable}
      ${SharedStyles.form}
      ${SharedStyles.riskProfile}
    `;
  }

  static get properties() {
    return {
        state: {
            type: Object,
            attribute: false
        }
    };
  }

  constructor() {
    super();
    this.state = SrcAppData.defaultState.defaultStockRisk;
  }

  render() {
    const { state } = this;

    return html`
        <h2>${state.name}</h2>
        <div class="risk-profile">
            <div>
                <div>
                    <label
                        title=${SrcAppData.definitions.riskPerTrade.description}
                    >${SrcAppData.definitions.riskPerTrade.name}
                    </label>
                    <strong>${state.riskPerTradeUSD}</strong>
                </div>
                <div>
                    <label
                        title=${SrcAppData.definitions.maxSharesAtOrUnder20.description}
                    >${SrcAppData.definitions.maxSharesAtOrUnder20.name}
                    </label>
                    <strong>${state.maxSharesAtOrUnder20}</strong>
                </div>
                <div>
                    <label
                        title=${SrcAppData.definitions.maxSharesOver20.description}
                    >${SrcAppData.definitions.maxSharesOver20.name}
                    </label>
                    <strong>${state.maxSharesOver20}</strong>
                </div>
            </div>
            <div>
                <div>
                    <label
                        title=${SrcAppData.definitions.tradesPerDay.description}
                    >${SrcAppData.definitions.tradesPerDay.name}
                    </label>
                    <strong>${state.tradesPerDay}</strong>
                </div>
                <div>
                    <label
                        title=${SrcAppData.definitions.tradingDaysPerWeek.description}
                    >${SrcAppData.definitions.tradingDaysPerWeek.name}
                    </label>
                    <strong>${state.tradingDaysPerWeek}</strong>
                </div>
                <div>
                    <label
                        title=${SrcAppData.definitions.winningDayPercentage.description}
                    >${SrcAppData.definitions.winningDayPercentage.name}
                    </label>
                    <strong>${state.winningDayPercentage}</strong>
                </div>
            </div>
            <div>
                <div>
                    <label
                        title=${SrcAppData.definitions.maxDailyLoss.description}
                    >${SrcAppData.definitions.maxDailyLoss.name}
                    </label>
                    <strong>${state.maxDailyLossUSD}</strong>
                </div>
                <div>
                    <label
                        title=${SrcAppData.definitions.potentialDailyProfit.description}
                    >${SrcAppData.definitions.potentialDailyProfit.name}
                    </label>
                    <strong>${state.potentialDailyProfitUSD}</strong>
                </div>
                <div>
                    <label
                        title=${SrcAppData.definitions.potentialWeeklyProfit.description}
                    >${SrcAppData.definitions.potentialWeeklyProfit.name}
                    </label>
                    <strong>${state.potentialWeeklyProfitUSD}</strong>
                </div>
            </div>
        </div>       

        <div>
            <form @submit="${this.submitAddRiskItemForm}">
            <table class="data-table">
                <caption>Trades</caption>
                <thead>
                    <tr>
                        <th title="${SrcAppData.definitions.cost.description}"
                            >${SrcAppData.definitions.cost.name}</th>
                        <th title="${SrcAppData.definitions.count.description}"
                            >${SrcAppData.definitions.count.name}</th>
                        <th title="${SrcAppData.definitions.totalIn.description}"
                            >${SrcAppData.definitions.riskPerTrade.name}</th>
                        <th title="${SrcAppData.definitions.riskPerShare.description}"
                            >${SrcAppData.definitions.riskPerShare.name}</th>
                        <th title="${SrcAppData.definitions.shortLossExit.description}"
                            >${SrcAppData.definitions.shortLossExit.name}</th>
                        <th title="${SrcAppData.definitions.shortProfitExit.description}"
                            >${SrcAppData.definitions.shortProfitExit.name}</th>
                        <th title="${SrcAppData.definitions.longLossExit.description}"
                            >${SrcAppData.definitions.longLossExit.name}</th>
                        <th title="${SrcAppData.definitions.longProfitExit.description}"
                            >${SrcAppData.definitions.longProfitExit.name}</th>
                     </tr>
                </thead>
                <tbody>
                    ${state.items.map(i => html`
                        <tr class="${i.isAboveMaxShares ? "over-max" : ""}">
                            <td>${i.costUSD}</td>
                            <td>${i.count}</td>
                            <td>${i.totalInUSD}</td>
                            <td>${i.riskPerShareUSD}</td>
                            <td>${i.shortLossExitUSD}</td>
                            <td>${i.shortProfitExitUSD}</td>
                            <td>${i.longLossExitUSD}</td>
                            <td>${i.longProfitExitUSD}</td>
                        </tr>
                    `)}                   
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <input id="cost" name="cost" type="number" value="10"  step="0.01">
                        </td>
                        <td>
                            <input id="count" name="count" type="number"
                                value="${state.maxSharesAtOrUnder20}"
                            >
                        </td>
                        <td colspan="5">
                            <button type="submit">Add Trade</button>
                        </td>
                    </tr>
                </tfoot>
            </table>                
            </form>
        </div>
    `;
  }

  stateChange(event) {
    this.state = event.target.state;
    this.requestUpdate();
  }

  submitAddRiskItemForm(event) {
    event.preventDefault();

    const entries = new FormData(event.target).entries();
    const values = Array.from(entries).reduce((values, item) => {
      values[item[0]] = item[1];
      return values;
    }, {});

    this.dispatchEvent(new CustomEvent("add-stock-risk-item", {
        detail: {
            id: this.state.id,
            ...values
        }
    }));
  }
}

window.customElements.define("src-risk-profile-table", SrcRiskProfileTable);
