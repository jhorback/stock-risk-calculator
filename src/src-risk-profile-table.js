

import { html, css, LitElement } from 'lit-element';

import { SrcAppData } from "./src-app-data.js";
import { SharedStyles } from "./SharedStyles.js";


class SrcRiskProfileTable extends LitElement {
  static get styles() {
    return css`
      :host {
      }
      h2 {
          font-size: 1rem;
          margin: 1rem 0 0 0;
          padding: 0;
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
        <h2>Risk Profile: ${state.name}</h2>
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
            <table>
                <caption>Trades</caption>
                <thead>
                    <tr>
                        <th title="${SrcAppData.definitions.cost.description}"
                            >${SrcAppData.definitions.cost.name}</th>
                        <th title="${SrcAppData.definitions.count.description}"
                            >${SrcAppData.definitions.count.name}</th>
                        <th title="${SrcAppData.definitions.totalIn.description}"
                            >${SrcAppData.definitions.totalIn.name}</th>
                        <th title="${SrcAppData.definitions.stopLoss.description}"
                            >${SrcAppData.definitions.stopLoss.name}</th>
                        <th title="${SrcAppData.definitions.lossExit.description}"
                            >${SrcAppData.definitions.lossExit.name}</th>
                        <th title="${SrcAppData.definitions.stopProfit.description}"
                            >${SrcAppData.definitions.stopProfit.name}</th>
                        <th title="${SrcAppData.definitions.profitExit.description}"
                            >${SrcAppData.definitions.profitExit.name}</th>
                     </tr>
                </thead>
                <tbody>
                    ${state.items.map(i => html`
                        <tr>
                            <td>${i.costUSD}</td>
                            <td>${i.count}</td>
                            <td>${i.totalInUSD}</td>
                            <td>${i.stopLossUSD}</td>
                            <td>${i.lossExitUSD}</td>
                            <td>${i.stopProfitUSD}</td>
                            <td>${i.profitExitUSD}</td>
                        </tr>
                    `)}
                    <tr>
                        <td>
                            <input id="cost" name="cost" type="number" class="long" value="10">
                        </td>
                        <td>
                            <input id="count" name="count" type="number" class="long"
                                value="${state.maxSharesAtOrUnder20}"
                            >
                        </td>
                        <td>
                            <button type="submit" style="visibility:hidden">Add Entry</button>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
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
