// Testing Middleware

// 💣 remove this todo test (it's only here so you don't get an error about missing tests)

// 🐨 you'll need both of these:
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

test('responds with 401 and UnauthorizedError', () => {
  // define mocks
  const error = new UnauthorizedError('some_error_code', {
    message: 'Some message',
  })
  const req = {}
  const res = {json: jest.fn(() => res), status: jest.fn(() => res)}
  const next = jest.fn()

  // execute middleware
  errorMiddleware(error, req, res, next)

  // expects
  expect(next).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(401)

  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    code: error.code,
    message: error.message,
  })
})

test('calls nexts if headersSent if true', () => {
  // define mocks
  const error = new UnauthorizedError('some_error_code', {
    message: 'Some message',
  })
  const req = {}
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
    headersSent: true,
  }
  const next = jest.fn()

  // execute middleware
  errorMiddleware(error, req, res, next)

  // expects
  expect(next).toHaveBeenCalledTimes(1)
  expect(next).toHaveBeenCalledWith(error)

  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).not.toHaveBeenCalled()
})

test('responds with 500 and error message and stack', () => {
  // define mocks
  const error = new Error('Some error message')
  const req = {}
  const res = {json: jest.fn(() => res), status: jest.fn(() => res)}
  const next = jest.fn()

  // execute middleware
  errorMiddleware(error, req, res, next)

  // expects
  expect(next).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(500)

  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    message: error.message,
    stack: error.stack,
  })
})
