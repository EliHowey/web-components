// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, fixture } from '@open-wc/testing';
// eslint-disable-next-line no-unused-vars
import { Toggletip } from './custom-toggletip.js';

const template = `
	<custom-toggletip>
		<span slot="toggle">Toggle button</span>
		This is the toggletip main content.
	</custom-toggletip>
`;

/**
 * @typedef {import('./custom-toggletip.js').Toggletip} Toggletip
 */

describe('Toggletip', () => {
    it('is accessible when the toggle is collapsed', async () => {
        const el = /** @type {Toggletip} */ (await fixture(template));
        expect(el).to.be.accessible();
    });

    it('is accessible when the toggle is expanded', async () => {
        const el = /** @type {Toggletip} */ (await fixture(template));
        el.dispatchEvent(new Event('click'));
        expect(el).to.be.accessible();
    });

    it('updates its toggled state when clicked', async () => {
        const el = /** @type {Toggletip} */ (await fixture(template));
        expect(el._toggleButton.getAttribute('aria-expanded')).to.equal(
            'false'
        );

        el.dispatchEvent(new Event('click'));
        expect(el._toggleButton.getAttribute('aria-expanded')).to.equal('true');
    });
});
