import { htmlTemplate } from '../utils/html-template.js';

const template = htmlTemplate`
	<style>
		:host {
			position: relative;
		}

		button {
			font: inherit;
		}

		.toggletip-contents {
			position: absolute;
			top: calc(100% + 0.5em);
			left: 0;

			box-sizing: border-box;
			min-width: min-content;
			width: max-content;
			max-width: var(--toggletip-max-width, calc(100vw - 2rem));
			border: thin solid rgba(0, 0, 0, 0.25);
			padding: 1em;

			background-color: #fff;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
		}
		
		[aria-expanded='false'] + .toggletip-contents {
			display: none;
		}
	</style>

	<button aria-describedby="contents" aria-expanded="false">
		<slot name="toggle"></slot>
	</button>

	<aside id="contents" class="toggletip-contents">
		<span role="tooltip" aria-live="polite"><slot></slot></span>
	</aside>

`;

export class Toggletip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this._toggleButton = this.shadowRoot.querySelector('button');

        this.addEventListener('click', () => {
            this._toggle();
        });
    }

    _toggle() {
        const isToggled =
            this._toggleButton.getAttribute('aria-expanded') === 'true';
        this._toggleButton.setAttribute('aria-expanded', !isToggled);
    }
}
