import {
  F,
  pipe,
  is,
  merge,
  either,
  both,
  anyPass,
  compose,
  isEmpty,
  isNil,
  ifElse,
  complement,
  not,
  equals,
  lt,
  lte,
  gt,
  gte,
  test,
  trim,
  identity
} from 'ramda';

type ValidType = {
  value: any,
  queueIndex: number,
  errorIndex: number,
  result: boolean,
  text: ?string,
  params: Object
};

type ValidFunc = (target: ValidType) => ValidType;

/**
 * validWith
 * @desc 將要驗證的內容轉換驗證格式
 * @param {Array<any>} funcs 驗證方法
 * @returns {ValidFunc}
 * @example validWith(is(String))
 */
export const validWith = (...funcs: Array<any>) => pipe(validTarget, ...funcs);

/**
 * validResult
 * @desc 驗證結果
 * @param {(value: any) => boolean} condition 比對條件
 * @param {?string} text 錯誤訊息
 * @param {any} target 驗證對象
 * @returns {ValidType}
 * @example
 *   validResult(is(String), '資料必須爲字串')({"value":100,"queueIndex":0,"errorIndex":0,"result":true,"text":null})
 *   // 結果：
 *     {
 *        value: 100, queueIndex: 1, errorIndex: 1,
 *        result: false, text: "資料必須爲字串", params:{}
 *     }
 */
export const validResult = (
  condition: (value: any) => boolean,
  text: ?string,
  params: Object = {}
) => (target: ValidType) => {
  const { value, result, queueIndex } = target;
  if (!result) return merge(target, { queueIndex: queueIndex + 1 });

  const pass = condition(value);

  return {
    value,
    queueIndex: queueIndex + 1,
    errorIndex: queueIndex + 1,
    result: pass,
    text: pass ? null : text,
    params: pass ? {} : params
  };
};

/**
 * validTarget
 * @desc 驗證的物件格式
 * @param {any} target 驗證對象
 * @returns {ValidType}
 * @example
 *   validTarget('username')
 *   //結果：{"value":"username","queueIndex":0,"errorIndex":0,"result":true,"text":null,"params":{}}
 */
export const validTarget = (target: any): ValidType => ({
  value: target,
  queueIndex: 0,
  errorIndex: 0,
  result: true,
  text: null,
  params: {}
});

/**
 * _stringValid
 * @private
 * @desc 字串的檢查
 * @param {(value: any) => boolean} condition 比對條件
 * @param {?string} text 錯誤訊息
 * @returns {ValidFunc}
 * @example
 *   _stringValid(test(/^[0-9]*$/), '聯絡電話格式不正確')
 *   _stringValid(test(new RegExp('^.{0}(.{' + number + '})*$')),`内容长度需为 ${number} 个字元`,{ number })
 */
export const _stringValid = (
  condition: (value: any) => boolean,
  text: ?string,
  params: Object = {}
) => pipe(isString, validResult(either(isEmpty, condition), text, params));

/**
 * _numberValid
 * @private
 * @desc 數值的檢查
 * @param {(value: any) => boolean} condition 比對條件
 * @param {?string} text 錯誤訊息
 * @returns {ValidFunc}
 * @example
 *   _numberValid(test(/^([0-9]*)$/),'格式需爲正整數');
 *   _numberValid(gt(max), `数值必须小于 ${max}`, { max });
 */
export const _numberValid = (
  condition: (value: any) => boolean,
  text: ?string,
  params: Object = {}
) => pipe(isNumber, validResult(condition, text, params));

/**
 * cutInFailedText
 * @desc 穿插錯誤訊息，前一個檢查項目出錯的回報訊息
 * @param {string} cutInText 錯誤訊息
 * @param {ValidType} target 檢查目標
 * @returns {ValidType}
 * @example
 *    cutInFailedText('valid_id')({"value":"username","queueIndex":0,"errorIndex":0,"result":true,"text":null,"params":{}})
 *    // 結果： {value: "username", queueIndex: 0, errorIndex: 0, result: true, text: null, params:{}}
 */
export const cutInFailedText = (cutInText: string) => (target: ValidType) => {
  const { result, queueIndex, errorIndex } = target;
  return !result && queueIndex === errorIndex
    ? merge(target, { text: cutInText })
    : target;
};

/**
 * isString
 * @desc [any] 檢查內容是否爲字串
 * @returns {ValidFunc}
 */
export const isString: any = validResult(is(String), 'valid isString');

/**
 * isNumber
 * @desc [any] 檢查內容是否爲數值
 * @returns {ValidFunc}
 */
export const isNumber = validResult(
  both(complement(equals(NaN)), is(Number)),
  'valid isNumber'
);

/**
 * isBoolean
 * @desc [any] 檢查內容是否爲布林值
 * @returns {ValidFunc}
 */
export const isBoolean = validResult(is(Boolean), 'valid isBoolean');

/**
 * isRequired
 * @desc [any] 判斷必填欄位
 * @returns {ValidFunc}
 */
export const isRequired = validResult(
  ifElse(isNil, F, ifElse(is(Boolean), identity, complement(isEmpty))),
  'valid isRequired'
);

/**
 * isMatch
 * @desc [any] 自訂格式檢查
 * @param {RegExp} regexp RegExp物件
 * @returns {ValidFunc}
 */
export const isMatch = (regexp: RegExp) =>
  validResult(test(regexp), 'valid isMatch');

/**
 * isNotHasWhiteSpace
 * @desc [string] 判斷是否有空白
 * @returns {ValidFunc}
 */
export const isNotHasWhiteSpace = _stringValid(
  pipe(test(/\s/i), not),
  'valid isNotHasWhiteSpace'
);

/**
 * isNotJustWhiteSpace
 * @desc [string] 判斷是否只是空白
 * @returns {ValidFunc}
 */
export const isNotJustWhiteSpace = _stringValid(
  pipe(trim, isEmpty, not),
  'valid isNotJustWhiteSpace'
);

/**
 * isNormal
 * @desc [string] 檢查內容格式
 *       格式爲數字、字母字元或底線( _ )與連接號( - )
 * @returns {ValidFunc}
 */
export const isNormal = _stringValid(
  test(/^[A-Za-z0-9_-]*$/),
  'valid isNormal'
);

/**
 * isNaturalNumber
 * @desc [number] 檢查內容是否爲正整數
 * @returns {ValidFunc}
 */
export const isNaturalNumber = _numberValid(
  test(/^([0-9]*)$/),
  'valid isNaturalNumber'
);

/**
 * isNumberLessThen
 * @desc [number] 檢查內容是否小於某值
 * @param max {number} [最大值]
 * @returns {ValidFunc}
 */
export const isNumberLessThen = (max: number) =>
  _numberValid(gt(max), `valid isNumberLessThen`, { max });

/**
 * isNumberLessThenOrEqual
 * @desc [number] 檢查內容是否小於等於某值
 * @param max {number} [最大值]
 * @returns {ValidFunc}
 */
export const isNumberLessThenOrEqual = (max: number) =>
  _numberValid(gte(max), `valid isNumberLessThenOrEqual`, { max });

/**
 * isNumberMoreThen
 * @desc [number] 檢查內容是否大於某值
 * @param min {number} [最小值]
 * @returns {ValidFunc}
 */
export const isNumberMoreThen = (min: number) =>
  _numberValid(lt(min), 'valid isNumberMoreThen', { min });

/**
 * isNumberMoreThenOrEqual
 * @desc [number] 檢查內容是否大於等於某值
 * @param min {number} [最小值]
 * @returns {ValidFunc}
 */
export const isNumberMoreThenOrEqual = (min: number) =>
  _numberValid(lte(min), 'valid isNumberMoreThenOrEqual', { min });

/**
 * isLengthEqual
 * @desc [string] 檢查字數長度
 * @param number {number} [上限字數]
 * @returns {ValidFunc}
 */
export const isLengthEqual = (number: number) =>
  _stringValid(
    test(new RegExp('^.{0}(.{' + number + '})*$')),
    'valid isLengthEqual',
    { number }
  );

/**
 * isLengthLessThanOrEqual
 * @desc [string] 檢查字數長度上限
 * @param max {number} [上限字數]
 * @returns {ValidFunc}
 */
export const isLengthLessThanOrEqual = (max: number) =>
  _stringValid(
    test(new RegExp('^.{0,' + max + '}$')),
    `valid isLengthLessThanOrEqual`,
    { max }
  );

/**
 * isLengthMoreThanOrEqual
 * @desc [string] 檢查字數最少長度
 * @param min {number} [最少字數]
 * @returns {ValidFunc}
 */
export const isLengthMoreThanOrEqual = (min: number) =>
  _stringValid(
    test(new RegExp('^.{' + min + ',}$')),
    'valid isLengthMoreThanOrEqual',
    { min }
  );

/**
 * isEquals
 * @desc [string | number | boolean] 檢查比對項目是否相同
 * @param match {any} [比對項目]
 * @returns {ValidFunc}
 */
export const isEquals = (match: any) =>
  pipe(
    validResult(
      anyPass([is(String), is(Number), is(Boolean)]),
      'isEqualsFormat'
    ),
    validResult(either(isEmpty, equals(match)), 'isEqualsMatch')
  );

/**
 * isPhone
 * @desc [string] 是否爲電話
 * @param target {validTarget} [檢查目標]
 * @returns {ValidFunc}
 */
export const isPhone = _stringValid(test(/^[0-9]*$/), 'valid isPhone');

/**
 * isEmail
 * @desc [string] 電子郵件格式
 * @param target {validTarget} [檢查目標]
 * @returns {ValidFunc}
 */
export const isEmail = _stringValid(
  test(
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  ),
  'valid isEmail'
);
