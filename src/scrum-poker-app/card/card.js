import { LitElement, html, css } from 'lit-element';

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
class ScrumCard extends LitElement {
    static get properties() {
        return {
            value: {
                type: 'number',
                value: 0,
            },
            state: {
                type: 'number',
                value: CardState.DEFAULT,
                reflect: true,
            },
        };
    }

    static get styles() {
        return css`
            :host {
                background-color: var(--fg-dark);
                display: inline-block;
                padding: 10px;
                width: 25vw;
                height: 25vw;
                font-size: 36px;
                border-radius: 10px;
                box-shadow: -2px 2px 4px 0px rgba(0, 0, 0, 0.4), 2px 2px 3px 0px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 900;
                cursor: pointer;
            }
            span {
                color: var(--fg-light);
            }

            .selected > span {
                color: var(--fg-light);
                visibility: hidden;
            }
        `;
    }

    static getStateClass(state) {
        switch (state) {
            case CardState.SELECTED:
                return 'big selected ';
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
    }

    render() {
        const classes = 'card ' + ScrumCard.getStateClass(this.state);
        return html`
            <div class="${classes}">
                <span>
                    ${this.value}
                </span>
            </div>
        `;
    }
}

window.customElements.define('scrum-card', ScrumCard);
