

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

    console.log("RENDERING TABLE");
    return html`
        <h2>Risk Profile (${state.name})</h2>
        <div class="risk-profile">
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
            <form @submit="${this.submitAddRiskItemForm}">
            <table>
                <thead>
                    <tr>
                        <th title="${SrcAppData.definitions.cost.description}">Cost</th>
                        <th title="${SrcAppData.definitions.count.description}">Count</th>
                        <th title="${SrcAppData.definitions.totalIn.description}">Total in</th>
                        <th title="${SrcAppData.definitions.lossExit.description}">Loss exit</th>
                        <th title="${SrcAppData.definitions.profitExit.description}">Profit exit</th>
                        <th title="${SrcAppData.definitions.stopProfit.description}">Stop profit</th>
                        <th title="${SrcAppData.definitions.stopLoss.description}">Stop loss</th>
                        <th title="${SrcAppData.definitions.maxDailyLoss.description}">Max daily loss</th>
                        <th title="${SrcAppData.definitions.potentialDailyProfit.description}">Potential daily profit</th>
                        <th title="${SrcAppData.definitions.potentialWeeklyProfit.description}">Potential weekly profit</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.items.map(i => html`
                        <tr>
                            <td>${i.costUSD}</td>
                            <td>${i.count}</td>
                            <td>${i.totalInUSD}</td>
                            <td>${i.lossExitUSD}</td>
                            <td>${i.profitExitUSD}</td>
                            <td>${i.stopProfitUSD}</td>
                            <td>${i.stopLossUSD}</td>
                            <td>${i.maxDailyLossUSD}</td>
                            <td>${i.potentialDailyProfitUSD}</td>
                            <td>${i.potentialWeeklyProfitUSD}</td>
                        </tr>
                    `)}
                    <tr>
                        <td>
                            <input id="cost" name="cost" type="number" class="long" value="${SrcAppData.defaultState.defaultStockRiskItem.cost}">
                        </td>
                        <td>
                            <input id="count" name="count" type="number" class="long" value="${SrcAppData.defaultState.defaultStockRiskItem.count}">
                        </td>
                        <td>
                            <button type="submit" style="visibility:hidden">Add Entry</button>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            </form>


            <!-- <form @submit="${this.submitAddRiskItemForm}">
                <label for="cost"
                    title="${SrcAppData.definitions.cost.description}"
                >Cost</label>
                <input id="cost" name="cost" type="number" class="long" value="${SrcAppData.defaultState.defaultStockRiskItem.cost}">
                
                <label for="count"
                    title="${SrcAppData.definitions.count.description}"
                >Count</label>
                <input id="count" name="count" type="number" class="long" value="${SrcAppData.defaultState.defaultStockRiskItem.count}">
                
                <button type="submit">Add Entry</button>
            </form> -->
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
