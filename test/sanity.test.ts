import { assert, expect, test } from 'vitest'
import { returnZero } from '../build/menus'

// Edit an assertion and save to see HMR in action

test('returnZero()', async () => {
  expect(await returnZero()).toBe(0)
})
