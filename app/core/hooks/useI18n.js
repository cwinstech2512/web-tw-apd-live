/* @flow */
import { useDispatch } from 'react-redux';
import usePathSelector from './usePathSelector';
import { getTranslateFunction, setLanguage } from 'redux-i18n';

/**
 * useI18n
 * @link https://github.com/APSL/redux-i18n
 * @desc 語系 hook
 * @returns {[TranslateFunction, I18nState]}
 *
 * @typedef {function} TranslateFunction 取得轉換函式，redux-i18n 的 action
 *
 * @typedef {Object} I18nState
 * @property {string} lang 當前語系
 * @property {?string} newFallbackLang 備用語系
 * @property {Object} translations 所有語系物件
 * @property {boolean} forceRefresh
 * @property {function} setLanguage 切換語系，redux-i18n 的 action
 *
 * @example
 *
 * import { useI18n } from '@core/hooks'
 *
 * export const LangComponent = () => {
 *   const [t, i18n] = useI18n();
 *   // 目前語系
 *   console.log(i18n.lang);
 *
 *   //切換語系
 *   i18n.setLanguage('zhcn');
 *
 *   //轉換語系文字
 *   return <div>{t('locale key')}</div>
 * }
 */
const useI18n = () => {
  /* dispatch */
  const dispatch = useDispatch();
  /* state */
  const i18n = usePathSelector('i18nState');
  /* translate function */
  const t = getTranslateFunction(
    i18n.translations,
    i18n.lang,
    i18n.fallbackLang
  );
  /* state */
  const i18nState = {
    ...i18n,
    setLanguage: locale => {
      dispatch(setLanguage(locale));
    }
  };

  return [t, i18nState];
};

export default useI18n;
