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
            .rotate-hide {
                transform: rotate3d(0, 0, 1, 180);
                transition: ease-in-out 1s;
            }
            .visible {
                display: block;
                z-index: 1;
                background-color: white;
                left: 50%;
                top: 50%;
                position: absolute;
                transform: translateX(-50%) translateY(-50%) scale(4);
                transition: ease-in-out 0.5s;
            }
            .not-visible {
                display: none;
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
        // e.target.className = c;
        e.target.state = newState;
        const value = e.target.value;
        console.log(value);
        const el = this.shadowRoot.querySelector('.dup-' + value);
        console.log(el);
        const visible = [CardState.SELECTED, CardState.VISIBLE].includes(newState) ? ' visible' : 'not-visible';
        console.log(visible + (newState === CardState.SELECTED ? ' rotate-hide' : ''));
        el.className = 'dup-' + value + visible + (newState === CardState.SELECTED ? ' rotate-hide' : '');
        console.log(el.className);
    }

    handleClick2(e) {
        const newState = (e.target.state + 1) % 3;
        e.target.state = newState;
        const value = e.target.value;
        console.log(value);
        const el = e.target;
        const real = el.previousSibling;
        console.log(el);
        console.log(real);
        real.state = newState;

        const visible = [CardState.SELECTED, CardState.VISIBLE].includes(newState) ? ' visible' : 'not-visible';
        el.className = 'dup-' + value + visible + (newState === CardState.SELECTED ? ' rotate-hide' : '');
        console.log(el.className);
    }

    render() {
        return html`
            <div class="container">
                ${html`
                    ${this.myArray.map(
                        (i) =>
                            html`
                                <scrum-card value="${i}" state="0" @click="${this.handleClick}"></scrum-card>
                                <scrum-card class="dup-${i} not-visible" value="${i}" state="0" @click="${this.handleClick}"></scrum-card>
                            `,
                    )}
                `}
            </div>
        `;
    }
}

window.customElements.define('scrum-card-container', ScrumCardContainer);
