// eslint-disable-next-line node/no-unpublished-import
import { expect } from 'chai';
// eslint-disable-next-line import/extensions
import { returnZero } from '../build/menus.js';

// eslint-disable-next-line no-undef
describe('#returnZero()', () => {
	// eslint-disable-next-line no-undef
	context('without arguments', () => {
		// eslint-disable-next-line no-undef
		it('should return 0', async () => {
			const expectedValue = await returnZero();
			expect(expectedValue).to.equal(0);
		});
	});
});
