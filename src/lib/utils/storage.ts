/**
 * Dependence
 */
import { ErrorUtils } from './error';

/**
 * Interface of storage utils
 */
export interface StorageUtils {
  /**
   * Get data from local storage safely
   * @param {string} key - Storage key
   * @param {T} defaultValue - Default value if key is missing
   * @returns {T} - Parsed data or default value
   */
  get<T>(key: string, defaultValue: T): T;

  /**
   * Save data to local storage safely
   * @param {string} key - Storage key
   * @param {T} value - Data to save
   */
  set<T>(key: string, value: T): void;
}

/**
 * Storage utils
 * @type {StorageUtils}
 */
export const StorageUtils: StorageUtils = {} as StorageUtils;

/**
 * Get data from local storage safely
 * @param {string} key - Storage key
 * @param {T} defaultValue - Default value if key is missing
 * @returns {T} - Parsed data or default value
 */
StorageUtils.get = function <T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    ErrorUtils.log(error, `StorageUtils: Error getting key "${key}"`);
    return defaultValue;
  }
};

/**
 * Save data to local storage safely
 * @param {string} key - Storage key
 * @param {T} value - Data to save
 */
StorageUtils.set = function <T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    ErrorUtils.log(error, `StorageUtils: Error setting key "${key}"`);
  }
};
