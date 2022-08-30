/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line node/no-unpublished-import
import { assert, expect, test } from 'vitest';
import { returnZero } from '../src/util.js';
import menuMainFindUser from '../src/menu-main-finduser.js';

// Edit an assertion and save to see HMR in action

test(`returnZero`, async () => {
	expect(await returnZero()).toBe(0);
});
