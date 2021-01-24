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
        background: var(--app-background, #red);
        color: var(--font-color, #000);
      }
      [hidden] {
        display: none !important;
      }
      h1 {
        font-size: 1.2rem;
        opacity: 0.8;
        margin: 0;
        padding: 0;
      }
      .title-bar {
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        fill: var(--font-color, #000);
      }
      .title-bar div:first-child {
        flex-grow: 1;
      }
      .title-bar div:last-child {
        padding-left: 1rem;
      }
      main {
        padding: 0 1rem 0;
      }
      .add-profile-form-container {
        max-width: 300px;
        margin: 0rem auto 2rem;
      }
      .add-profile-form {
        display: block;
        border: 1px solid var(--border-color, #ccc);
        background: var(--highlight-background, #eee);
        padding: 0.5rem;
        border-radius: 0.3rem;
        font-size: 0.8rem;
      }
      .add-profile-form h2 {
        margin: 0;
      }
      .add-profile-form table {
        table-layout: fixed;
        width: 100%;
      }
      .add-profile-form .buttons {
        text-align: right;
      }
      ${SharedStyles.form}
      ${SharedStyles.riskProfile}
      ${SharedStyles.dataTable}
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
    this.showAddProfileForm = false;
  }

  $ = {
    dataEl: null,
    maxSharesAtOrUnder20: null,
    maxSharesOver20: null
  };

  render() {
    const { state } = this;

    return html`
      <div class="title-bar">
        <div>
          <h1>${state.title}</h1>
        </div>
        <div ?hidden="${this.showAddProfileForm}">
          <button
            @click="${this.toggleShowAddProfileForm}"
          >Add Risk Profile</button>          
        </div>
        <div @click="${this.toggleTheme}">
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path d="M24 0H0v24h24z" fill="none"/><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"/>
          </svg>
        </div>
      </div>
      <src-app-data @state-change="${this.stateChange}"></src-app-data>

      <main>
        <div class="add-profile-form-container">
          <form
            @submit="${this.submitAddRiskForm}"
            ?hidden="${!this.showAddProfileForm}"
            class="add-profile-form"
            >
            <div>
              <h2>Add a risk profile</h2>
              <hr>
              <table>
                <tr>
                  <td>                
                    <label for="name"
                      title="${SrcAppData.definitions.name.description}"
                    >Name</label>
                  </td>
                  <td>
                    <input id="name" name="name" type="text" required placeholder="${state.defaultStockRisk.name}">
                  </td>
                </tr>
                <tr>
                  <td>
                  <label for="riskPerTrade"
                    title="${SrcAppData.definitions.riskPerTrade.description}"
                  >Risk per trade</label>
                  </td>
                  <td>
                  <input id="riskPerTrade" name="riskPerTrade"
                    type="number"
                    value="${state.defaultStockRisk.riskPerTrade}"
                    @keyup=${this.riskPerTradeKeyUp}
                    @change=${this.riskPerTradeKeyUp}
                    >
                  </td>
                </tr>
              </table>
              <hr>
              <table>
                <tr>
                  <td>
                    <label for="maxSharesAtOrUnder20"
                      title="${SrcAppData.definitions.maxSharesAtOrUnder20.description}"
                    >${SrcAppData.definitions.maxSharesAtOrUnder20.name}</label>
                  </td>
                  <td>
                    <input id="maxSharesAtOrUnder20" name="maxSharesAtOrUnder20" type="number" value="${state.defaultStockRisk.maxSharesAtOrUnder20}">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="maxSharesOver20"
                      title="${SrcAppData.definitions.maxSharesOver20.description}"
                    >${SrcAppData.definitions.maxSharesOver20.name}</label>
                  </td>
                  <td>
                    <input id="maxSharesOver20" name="maxSharesOver20" type="number" value="${state.defaultStockRisk.maxSharesOver20}">  
                  </td>
                </tr>
              </table>
              <hr>
              <table>
                <tr>
                  <td>
                      <label for="tradesPerDay"
                        title="${SrcAppData.definitions.tradesPerDay.description}"
                      >Trades per day</label>   
                  </td>
                  <td>
                    <input id="tradesPerDay" name="tradesPerDay" type="number" value="${state.defaultStockRisk.tradesPerDay}">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="tradingDaysPerWeek"
                      title="${SrcAppData.definitions.tradingDaysPerWeek.description}"
                    >Trading days per week</label> 
                  </td>
                  <td>
                    <input id="tradingDaysPerWeek" name="tradingDaysPerWeek" type="number" value="${state.defaultStockRisk.tradingDaysPerWeek}">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="winningDayPercentage"
                      title="${SrcAppData.definitions.winningDayPercentage.description}"
                    >Winning day percentage</label>    
                  </td>
                  <td>
                     <input id="winningDayPercentage" name="winningDayPercentage" type="number" step="0.01" value="${state.defaultStockRisk.winningDayPercentage}">
                  </td>
                </tr>
              </table>
              <hr>
              <div class="buttons">
                <button type="button" @click="${this.toggleShowAddProfileForm}">Cancel</button>
                <button type="submit">Add</button>
              </div>
            </div>
          </form>
        </div>

      <div>
        ${repeat(state.stockRisks, sr => sr.id, sr => html`
          <src-risk-profile-table
            .state="${sr}"
            @add-stock-risk-item="${this.addRiskProfileItem}"
          ></src-risk-profile-table>
        `)}
      </div>

      <div class="definitions">
        <table class="data-table">
          <caption>Definitions</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            ${Object.keys(SrcAppData.definitions).map(key => html`
              <tr>
                <td>${SrcAppData.definitions[key].name}</td>
                <td>${SrcAppData.definitions[key].description}</td>
              </tr>
            `)}
          </tbody>
        </table>
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

  toggleTheme() {
    document.querySelector("html").classList.toggle("dark-theme");
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
