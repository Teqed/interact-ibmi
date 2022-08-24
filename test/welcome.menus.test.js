// eslint-disable-next-line node/no-unpublished-import
import { expect } from 'chai';
// eslint-disable-next-line import/extensions
import { welcome } from '../build/menus.js';

// eslint-disable-next-line no-undef
describe('#welcome()', () => {
	// eslint-disable-next-line no-undef
	context('without arguments', () => {
		// eslint-disable-next-line no-undef
		it('should return 0', async () => {
			const expectedValue = await welcome();
			expect(expectedValue).to.equal(0);
		});
	});
});
