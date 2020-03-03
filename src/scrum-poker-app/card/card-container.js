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
            }
            .container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
            .container > * {
                margin-right: 10px;
                margin-bottom: 10px;
            }
            .container > *:nth-child(5),
            .container > *:nth-child(11),
            .container > *:nth-child(17) {
                margin-right: 0px;
            }
            .visible {
                background: linear-gradient(315deg, var(--highlight) 0%, var(--bg2) 81%);
                display: flex;
                z-index: 4;
                left: 50%;
                top: 50%;
                position: absolute;
                transform: translateX(-50%) translateY(-50%) scale(3) rotate3d(0, 1, 0, 180deg);
                transition: ease-in-out 0.5s;
            }
            .show {
                transform:  translateX(-50%) translateY(-50%) scale(3) rotate3d(0, 1, 0, 0deg) ;
            }
            .not-visible {
                background-color: rgba(0,0,0,0.0);
                transition: ease-in-out 0.5s;
                display: none;
            }

            .overlay {
                transition: ease-in-out 0.5s;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,0.0);
                display: none;
            }
            .active {
                transition: ease-in-out 0.5s;
                background-color: var(--bg);
                display: block;
                z-index: 1;
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

    toggleOverlay(elem) {
        const newState = (elem.state + 1) % 3;
        const el = this.shadowRoot.querySelector('.overlay');
        if (newState === CardState.SELECTED) {
            el.classList.add('active');
        } else if (newState === CardState.DEFAULT) {
            el.classList.remove('active');
        }
    }

    handleClick(e) {
        const newState = (e.target.state + 1) % 3;
        const value = e.target.value;
        const el = this.shadowRoot.querySelector('.dup-' + value);
        this.toggleOverlay(el);
        el.state = newState;
        const visible = [CardState.SELECTED, CardState.VISIBLE].includes(newState) ? ' visible' : ' not-visible';
        el.className = 'dup-' + value + visible + (newState === CardState.VISIBLE ? ' show' : '');
    }

    handleClick2(e) {
        const el = e.target;
        const newState = (el.state + 1) % 3;
        const value = el.value;
        this.toggleOverlay(el);
        const visible = [CardState.SELECTED, CardState.VISIBLE].includes(newState) ? ' visible' : ' not-visible';
        el.className = 'dup-' + value + visible + (newState === CardState.VISIBLE ? ' show' : '');
        setTimeout(() => {
            el.state = newState;
        }, 500);
    }

    render() {
        return html`
            <div class="container">
                ${html`
                    ${this.myArray.map(
                        (i) =>
                            html`
                                <scrum-card class="orig-${i}" value="${i}" state="0" @click="${this.handleClick}"></scrum-card>
                                <scrum-card class="dup-${i} not-visible" value="${i}" state="0" @click="${this.handleClick2}"></scrum-card>
                            `,
                    )}
                `}
                <div class="overlay"/>
            </div>
        `;
    }
}

window.customElements.define('scrum-card-container', ScrumCardContainer);
