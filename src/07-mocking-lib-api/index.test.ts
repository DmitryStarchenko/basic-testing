import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => {
    const throttledFn = (...args: unknown[]) => fn(...args);
    throttledFn.cancel = jest.fn();
    throttledFn.flush = jest.fn();
    return throttledFn;
  }),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockClient = {
      get: jest.fn().mockResolvedValue({ data: 'test data' }),
    };
    mockedAxios.create.mockReturnValue(mockClient as unknown as AxiosInstance);

    await throttledGetDataFromApi('/posts/1');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockClient = {
      get: jest.fn().mockResolvedValue({ data: 'test data' }),
    };
    mockedAxios.create.mockReturnValue(mockClient as unknown as AxiosInstance);

    const testPath = '/posts/1';
    await throttledGetDataFromApi(testPath);

    expect(mockClient.get).toHaveBeenCalledWith(testPath);
  });

  test('should return response data', async () => {
    const expectedData = { id: 1, title: 'Test Post' };
    const mockClient = {
      get: jest.fn().mockResolvedValue({ data: expectedData }),
    };
    mockedAxios.create.mockReturnValue(mockClient as unknown as AxiosInstance);

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(expectedData);
  });
});
