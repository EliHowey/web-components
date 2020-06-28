import { htmlTemplate } from '../../src/utils/html-template.js';

const template = htmlTemplate`
	<style>
		:host {
			display: block;
			box-sizing: border-box;
		}

		:host[hidden] {
			display: none;
		}

		article {
			background-color: var(--color-white);
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
		}

		h2 {
			margin-top: 0;
		}

		.info,
		.code-snippet {
			padding: var(--card-spacing);
		}
		
		.info {
			border-bottom: thin solid var(--color-primary);
		}

		pre {
			padding: var(--card-spacing);
			font-size: 1rem;
			line-height: 1.5;
			-moz-tab-size: 4;
			tab-size: 4;
			overflow-x: auto;

			background-color: var(--color-neutral-dark);
			color: var(--color-neutral-light);
		}

		details {
			background-color: var(--color-primary);
			color: var(--color-white);
		}

		details[open] pre {
			display: flex;
			margin-left: calc(-1 * var(--card-spacing));
			margin-right: calc(-1 * var(--card-spacing));
			margin-bottom: calc(-1 * var(--card-spacing));
		}

		details[open] pre::after {
			content: '';
			padding-right: var(--card-spacing);
		}
	</style>

	<article>
		<div class="info">
			<h2><slot name="heading"></slot></h2>
			<slot></slot>
			<slot name="example"></slot>
		</div>

		<details class="code-snippet">
			<summary>See code</summary>
			<div class="code-container">
				<pre><code></code></pre>
			</div>
		</details>
	</article>
`;

export class ComponentCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._component = null;
        this._codeSnippet = null;
    }

    connectedCallback() {
        [this._component] = this.shadowRoot
            .querySelector('slot[name="example"]')
            .assignedNodes();

        this._codeSnippet = this.shadowRoot.querySelector('code');
        this._codeSnippet.textContent = this._processExampleHTML();
    }

    _processExampleHTML() {
        const lines = this._component.innerHTML
            .replace(' slot="example"', '')
            .trim()
            .split('\n')
            .map(line => line.trim());

        let indentNextLine = 0;

        const processed = lines.map(line => {
            const numOpeningTags = (line.match(/<[^/]+>/g) || []).length;
            const numClosingTags = (line.match(/<\/[A-Za-z-]+>/g) || []).length;
            const difference = numOpeningTags - numClosingTags;

            let transformedLine;

            if (difference > 0) {
                transformedLine = `${'\t'.repeat(indentNextLine)}${line}`;
            }
            if (difference === 0) {
                transformedLine = `${'\t'.repeat(
                    indentNextLine - difference
                )}${line}`;
            } else {
                transformedLine = line;
            }

            indentNextLine += difference;
            return transformedLine;
        });

        return processed.join('\n');
    }
}

customElements.define('component-card', ComponentCard);
