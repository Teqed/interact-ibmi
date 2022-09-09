/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line node/no-unpublished-import
import { assert, expect, test, vi, describe, it } from 'vitest';
import inquirer from 'inquirer';
import { returnZero } from '../src/util.js';
import { genericListMenu } from '../src/menu/util.js';
import { type GenericListPrompt } from '../src/types.js';

// Edit an assertion and save to see HMR in action

test(`returnZero`, async () => {
	expect(await returnZero()).toBe(0);
});

test(`Mock a function`, async () => {
	const function1 = vi.fn();

	function1(`hello`, 1);

	expect(vi.isMockFunction(function1)).toBe(true);
	expect(function1.mock.calls[0]).toEqual([`hello`, 1]);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	function1.mockImplementation(argument => argument);

	function1(`world`, 2);

	expect(function1.mock.results[1].value).toBe(`world`);
});
