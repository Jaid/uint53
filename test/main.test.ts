import {expect, it} from 'bun:test'

const {default: uint53} = await import('#src/main.ts')

it('should run', () => {
  expect(uint53).toBe(1) // TODO Test actual functionality
})
