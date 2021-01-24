import { css } from 'lit-element';

export class SharedStyles {
    static riskProfile = css`
        .risk-profile {
            display: flex;
            justify-content: space-evenly;
            padding-bottom: 1rem;
        }
        .risk-profile > div {
            border: 1px solid var(--border-color, #ccc);
            background: var(--highlight-background, #eee);
            padding: 0.5rem 1rem;
            border-radius: 0.1rem;
            xbox-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        hr {
            height: 1px;
            border: none;
            color: var(--border-color, #ccc); 
            background-color: var(--border-color, #ccc);
        }
    `;
    static form = css`
        form label {
            font-size: 0.85rem;
        }
        form input {
            border-radius: 0.2rem;
            border: 1px solid var(--border-color, #ccc);
            background: var(--input-background, #fff);
            color: var(--input-color, #000);
            max-width: 100%;
        }
        button {
            border-radius: 0.2rem;
            border:1px solid var(--border-color, red);
            background-color: var(--button-background-color, #555);
            color: var(--button-color, #eee);
            text-transform: uppercase;
            font-size: 0.7rem;
            padding: 0.2rem 1rem;
        }
    `;

    static dataTable = css`
        table.data-table {
            margin: 1rem 0;
            border-collapse: collapse;
            width: 100%;
        }
        table.data-table caption {
            font-weight: bold;
            text-align: left;
        }
        table.data-table tbody td, th {
            padding: 0.25rem 0em;
            text-align: left;
            font-size: 0.9rem;
            border-bottom: 1px solid var(--border-color, #ccc);
        }
        table.data-table th {
            opacity: 0.7;
            font-size: 0.6rem;
        }
        table.data-table tfoot td {
            padding-top: 1rem;
        }
    `;

};
