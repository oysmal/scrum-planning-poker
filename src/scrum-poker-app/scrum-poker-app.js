import { LitElement, html, css } from 'lit-element';
import './card/card-container.js';

/**
 * @customElement
 * @polymer
 */
class ScrumPokerApp extends LitElement {
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'Welcome To Scrum Poker App',
            },
        };
    }

    static get styles() {
        return css`
            :host {
                height: 100%;
                position: absolute;
                width: 100%;
            }
        `;
    }

    constructor() {
        super();
        this.prop1 = 'Welcome To Scrum Poker App';
    }

    render() {
        return html`
            <scrum-card-container />
        `;
    }
}

window.customElements.define('scrum-poker-app', ScrumPokerApp);
