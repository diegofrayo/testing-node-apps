// Testing Pure Functions

// 💣 remove this todo test (it's only here so you don't get an error about missing tests)

import cases from 'jest-in-case'

// 🐨 import the function that we're testing
import {isPasswordAllowed} from '../auth'

// 🐨 write tests for valid and invalid passwords
// 💰 here are some you can use:
//
// valid:
// - !aBc123
//
// invalid:
// - a2c! // too short
// - 123456! // no alphabet characters
// - ABCdef! // no numbers
// - abc123! // no uppercase letters
// - ABC123! // no lowercase letters
// - ABCdef123 // no non-alphanumeric characters

// Way 1: Bad output messages

test('isPasswordAllowed returns true for valid passwords', () => {
  const cases = [{input: '!aBc123', output: true}]

  cases.forEach((i) => {
    expect(isPasswordAllowed(i.input)).toBe(i.output)
  })
})

test('isPasswordAllowed returns false for invalid passwords', () => {
  const cases = [
    {input: 'a2c!', output: false},
    {input: '123456!', output: false},
    {input: 'ABCdef!', output: false},
    {input: 'abc123!', output: false},
    {input: 'ABC123!', output: false},
    {input: 'ABCdef123', output: false},
  ]

  cases.forEach((i) => {
    expect(isPasswordAllowed(i.input)).toBe(i.output)
  })
})

// Way 2: So so output messages

describe('isPasswordAllowed only allows some passwords', () => {
  const allowedPasswords = ['!aBc123']
  const disallowedPasswords = [
    'a2c!',
    '123456!',
    'ABCdef!',
    'abc123!',
    'ABC123!',
    'ABCdef123',
  ]

  allowedPasswords.forEach((password) => {
    test(`allows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true)
    })
  })

  disallowedPasswords.forEach((password) => {
    test(`disallows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(false)
    })
  })
})

// Way 3: A better solution

cases(
  'isPasswordAllowed: valid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(true)
  },
  {
    'valid password': {
      password: '!aBc123',
    },
  },
)

cases(
  'isPasswordAllowed: invalid passwords',
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(false)
  },
  {
    'no letters': {
      password: '!ac123',
    },
    'no numbers': {
      password: '!aBcsfsfsdfs',
    },
    short: {
      password: '1',
    },
  },
)

// Way 4: The best solution

function casify(obj) {
  return Object.entries(obj).map(([name, data]) => {
    return {
      name: `${data.input} - ${name}`,
      ...data,
    }
  })
}

cases(
  'isPasswordAllowed: the best solution',
  (options) => {
    expect(isPasswordAllowed(options.input)).toBe(options.output)
  },
  casify({
    'valid password': {
      input: '!aBc123',
      output: true,
    },
    'no letters': {
      input: '!ac123',
      output: false,
    },
    'no numbers': {
      input: '!aBcsfsfsdfs',
      output: false,
    },
    short: {
      input: '1',
      output: false,
    },
  }),
)
