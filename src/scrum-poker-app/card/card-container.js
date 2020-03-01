import { LitElement, html, css } from 'lit-element';
import './card.js';

const CardState = {
    DEFAULT: 0,
    SELECTED: 1,
    VISIBLE: 2,
};

/**
 * @customElement
 * @polymer
 *
 * @class ScrumCard
 * @extends {LitElement}
 */
class ScrumCardContainer extends LitElement {
    static get properties() {
        return {};
    }

    static get styles() {
        return css`
            :host {
                height: 100%;
                width: 100%;
            }
            .container {
                height: 100%;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
            }
            .container > * {
                margin-right: 10px;
            }
            .big {
                z-index: 1;
                background-color: white;
                left: 50%;
                top: 50%;
                position: absolute;
                transform: translateX(-50%) translateY(-50%) scale(4);
                transition: ease-in-out 0.5s;
            }
        `;
    }

    static getStateClass(state) {
        switch (state) {
            case CardState.SELECTED:
                return 'big ';
            case CardState.VISIBLE:
                return 'big ';
            default:
                return '';
        }
    }

    constructor() {
        super();
        this.value = 0;
        this.state = CardState.DEFAULT;
        this.myArray = [1, 3, 5, 8, 13, 20, 40, 60, 100];
    }

    handleClick(e) {
        const newState = (e.target.state + 1) % 3;
        console.log(newState);
        const c = ScrumCardContainer.getStateClass(newState);
        e.target.className = c;
        e.target.state = newState;
    }

    render() {
        return html`
            <div class="container">
                ${html`
                    ${this.myArray.map(
                        (i) =>
                            html`
                                <scrum-card value="${i}" state="0" @click="${this.handleClick}"></scrum-card>
                            `,
                    )}
                `}
            </div>
        `;
    }
}

window.customElements.define('scrum-card-container', ScrumCardContainer);
