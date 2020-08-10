/*
 * @Author: yangzonglong
 * @Date: 2020-07-17 11:09:44
 * @version: v1.0.0
 * @Descripttion: 
 * @LastEditors: yangzonglong
 * @LastEditTime: 2020-07-17 13:47:01
 * @Auditor: 
 */
import server, { mergeOptions, TIMEOUT, METHOD } from './server';
import axios from 'axios';

jest.mock('axios');

const MOCK_URL = '/bk/api/project/Project/find';
const MOCK_DATA = { name: 'demo' }

test('server mergeOptions', () => {
  const options = mergeOptions(MOCK_URL, MOCK_DATA);
  expect(options).toEqual({ url: MOCK_URL, data: MOCK_DATA, method: METHOD, timeout: TIMEOUT });

  // get
  const optionsInGet = mergeOptions(MOCK_URL, MOCK_DATA, { method: 'GET' });
  expect(optionsInGet).toEqual({ url: MOCK_URL, params: MOCK_DATA, method: 'GET', timeout: TIMEOUT })
})

test('server success', async () => {
  axios.mockResolvedValueOnce({
    status: 200,
    data: {
      status: 200,
      result: {
        rows: []
      }
    }
  })
  const { rows } = await server(MOCK_URL, {});
  expect(rows.length).toBe(0);
})

test('server business error', async () => {
  const message = 'BUS_ERROR';
  axios.mockResolvedValueOnce({
    status: 200,
    data: {
      status: 501,
      message: { code: message, message: message }
    }
  })
  try {
    await server(MOCK_URL, {})
  } catch (error) {
    expect(error.message).toBe(message) 
    expect(error.code).toBe(message) 
  }
})

test('server login invalid', async () => {
  axios.mockResolvedValueOnce({
    status: 200,
    data: {
      status: -11
    }
  })
  expect(window.location.href).toBe('http://localhost/') 
})