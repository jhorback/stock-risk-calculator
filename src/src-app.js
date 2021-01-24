import { html, css, LitElement } from 'lit-element';
import {repeat} from 'lit-html/directives/repeat.js';
import { SrcAppData } from "./src-app-data.js";
import { SharedStyles } from "./SharedStyles";
import "./src-risk-profile-table.js";


class SrcApp extends LitElement {
  static get styles() {
    return css`
      :host {        
        display: block;
        color: var(--my-element-text-color, #000);
      }
      [hidden] {
        display: none !important;
      }
      h1 {
        font-size: 1.4rem;
        margin: 0;
        padding: 0;
      }
      .title-bar {
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      main {
        padding: 1rem;
      }
      ${SharedStyles.form}
      ${SharedStyles.riskProfile}
    `;
  }

  static get properties() {
    return {
      state: {
        type: Object,
        attribute: false
      },
      showAddProfileForm: {
        type: Boolean,
        attribute: false
      }
    };
  }

  constructor() {
    super();
    this.state = SrcAppData.defaultState;
    this.showAddProfileForm = true;
  }

  $ = {
    dataEl: null,
    maxSharesAtOrUnder20: null,
    maxSharesOver20: null
  };

  render() {
    const { state } = this;
    console.log("RENDERING APP");

    return html`
      <div class="title-bar">
        <h1>${state.title}</h1>
        <div>
          <button
            @click="${this.toggleShowAddProfileForm}"
          >Add Risk Profile</button>
        </div>
      </div>
      <src-app-data @state-change="${this.stateChange}"></src-app-data>

      <main>
        <form
          @submit="${this.submitAddRiskForm}"
          ?hidden="${!this.showAddProfileForm}"
          class="risk-profile"
          >
          <div>
            <div>
              <label for="name"
                title="${SrcAppData.definitions.name.description}"
              >Name</label>
              <input id="name" name="name" type="text" class="long" required placeholder="${state.defaultStockRisk.name}">
            </div>
            <div>
              <label for="riskPerTrade"
                title="${SrcAppData.definitions.riskPerTrade.description}"
              >Risk per trade</label>
              <input id="riskPerTrade" name="riskPerTrade"
                type="number"
                value="${state.defaultStockRisk.riskPerTrade}"
                @keyup=${this.riskPerTradeKeyUp}
                @change=${this.riskPerTradeKeyUp}
                >
            </div>
            <hr>
            <div>
              <label for="maxSharesAtOrUnder20"
                title="${SrcAppData.definitions.maxSharesAtOrUnder20.description}"
              >${SrcAppData.definitions.maxSharesAtOrUnder20.name}</label>
              <input id="maxSharesAtOrUnder20" name="maxSharesAtOrUnder20" type="number" value="${state.defaultStockRisk.maxSharesAtOrUnder20}">
            </div>
            <div>
              <label for="maxSharesOver20"
                title="${SrcAppData.definitions.maxSharesOver20.description}"
              >${SrcAppData.definitions.maxSharesOver20.name}</label>
              <input id="maxSharesOver20" name="maxSharesOver20" type="number" value="${state.defaultStockRisk.maxSharesOver20}">
            </div>
            <hr>
            <div>
              <label for="tradesPerDay"
                title="${SrcAppData.definitions.tradesPerDay.description}"
              >Trades per day</label>               
              <input id="tradesPerDay" name="tradesPerDay" type="number" value="${state.defaultStockRisk.tradesPerDay}">
            </div>
            <div>
              <label for="tradingDaysPerWeek"
                title="${SrcAppData.definitions.tradingDaysPerWeek.description}"
              >Trading days per week</label>        
              <input id="tradingDaysPerWeek" name="tradingDaysPerWeek" type="number" value="${state.defaultStockRisk.tradingDaysPerWeek}">
            </div>
            <div>
              <label for="winningDayPercentage"
                title="${SrcAppData.definitions.winningDayPercentage.description}"
              >Winning day percentage</label>        
              <input id="winningDayPercentage" name="winningDayPercentage" type="number" step="0.01" value="${state.defaultStockRisk.winningDayPercentage}">
            </div>
            <button type="submit">Add</button>
          </div>
        </form>
      <div>
        ${repeat(state.stockRisks, sr => sr.id, sr => html`
          <src-risk-profile-table
            .state="${sr}"
            @add-stock-risk-item="${this.addRiskProfileItem}"
          ></src-risk-profile-table>
        `)}
      </div>
      </main>
    `;
  }

  firstUpdated() {
    this.$.dataEl = this.shadowRoot.querySelector("src-app-data");
    this.$.maxSharesAtOrUnder20 = this.shadowRoot.querySelector("#maxSharesAtOrUnder20");
    this.$.maxSharesOver20 = this.shadowRoot.querySelector("#maxSharesOver20");
  }

  stateChange(event) {
    this.state = {
      ...event.target.state
    };
    console.log("STATE", this.state);
  }

  toggleShowAddProfileForm() {
    this.showAddProfileForm = !this.showAddProfileForm;
  }

  submitAddRiskForm(event) {
    event.preventDefault();

    this.toggleShowAddProfileForm();
    const entries = new FormData(event.target).entries();
    const values = Array.from(entries).reduce((values, item) => {
      values[item[0]] = item[1];
      return values;
    }, {});

    this.$.dataEl.addRiskProfile(values);
  }

  addRiskProfileItem({detail: {id, cost, count}}) {
    this.$.dataEl.addRiskProfileItem({id, cost, count});
  }

  riskPerTradeKeyUp(event) {
    const val = event.target.value;
    this.$.maxSharesAtOrUnder20.value = val * 2;
    this.$.maxSharesOver20.value = val * 4;
  }
}

window.customElements.define("src-app", SrcApp);
