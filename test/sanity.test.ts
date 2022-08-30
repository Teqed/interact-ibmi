import { assert, expect, test } from 'vitest';
import { returnZero } from '../src/util.js';
import menuMainFindUser from '../src/menu-main-finduser.js';

// Edit an assertion and save to see HMR in action

test(`returnZero`, async () => {
	expect(await returnZero()).toBe(0);
});
test(`menuMainFindUser`, async () => {
	const menuMainFindUser0 = await menuMainFindUser();
	console.log(menuMainFindUser0);
	expect(menuMainFindUser0).toBeUndefined();
});
