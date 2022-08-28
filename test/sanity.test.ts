import { assert, expect, test } from 'vitest'
import { returnZero } from '../src/menus'

// Edit an assertion and save to see HMR in action

test('returnZero()', async () => {
  expect(await returnZero()).toBe(0)
})
