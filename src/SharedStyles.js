import { css } from 'lit-element';

export class SharedStyles {

    static riskProfile = css`
        .risk-profile {            
            border: 1px solid #ccc;
            background: #eee;
            padding: 0.5rem;
            border-radius: 0.3rem;
        }
        hr {
            border-top:1px solid #ccc;
        }
    `;
    static form = css`
        form label {
            font-size: 0.85rem;
        }
        form input {
            border-radius: 0.2rem;
            border: 1px solid #ccc;
            background: #FFF;
            max-width: 50px;
        }
        form input.long {
            max-width: 100px;
        }
        button {
            border-radius: 0.2rem;
            background: #555;
            color: #eee;
            text-transform: uppercase;
            border: 0px;
            font-size: 0.7rem;
            padding: 0.2rem 1rem;
        }
    `;

    static dataTable = css`
        table {
            margin: 1rem 0;
            border-collapse: collapse;
            width: 100%;
        }
        table caption {
            font-weight: bold;
            text-align: left;
        }
        td, th {
            border: 1px solid #CCC;
            padding: 0.25rem 0.5rem;
            text-align: left;
            font-size: 0.9rem;
        }
        th {
            text-transform: uppercase;
            background: #eee;
            font-size: 0.8rem;
        }
    `;

};
