import {describe, expect, test} from 'bun:test'

import {hexToUint53} from '../src/main.ts'

describe('hexToUint53', () => {
  test('all zeros', () => {
    expect(hexToUint53('0000000000000')).toBe(0)
  })
  test('value 1', () => {
    expect(hexToUint53('0000000001')).toBe(1)
  })
  test('hex a', () => {
    expect(hexToUint53('000000000000a')).toBe(10)
  })
  test('truncates long prefix beyond 14 chars', () => {
    expect(hexToUint53('aaaaaaaaaa0000000000000a')).toBe(10)
  })
  test('discards high bits of partial char', () => {
    expect(hexToUint53('aaaaaaaaaaa000000000000a')).toBe(10)
  })
  test('keeps low bit of partial char', () => {
    expect(hexToUint53('aaaaaaaaaab000000000000a')).toBe(4_503_599_627_370_506)
  })
  test('empty string', () => {
    expect(hexToUint53('')).toBe(0)
  })
  test('max safe integer', () => {
    expect(hexToUint53('ffffffffffffff')).toBe(Number.MAX_SAFE_INTEGER)
  })
  test('single char', () => {
    expect(hexToUint53('f')).toBe(15)
  })
  test('exactly 13 chars max value', () => {
    expect(hexToUint53('fffffffffffff')).toBe(4_503_599_627_370_495)
  })
  test('exactly 14 chars max value', () => {
    expect(hexToUint53('ffffffffffffff')).toBe(Number.MAX_SAFE_INTEGER)
  })
  test('exactly 14 chars all zeros', () => {
    expect(hexToUint53('00000000000000')).toBe(0)
  })
  test('uppercase hex', () => {
    expect(hexToUint53('FF')).toBe(255)
  })
})
