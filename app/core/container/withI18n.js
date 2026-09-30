import { Component, createFactory } from 'react';
import PropTypes from 'prop-types';
import { _connect3 } from './_connect';

const i18nHoc = WrapperComponent => {
  const factory = createFactory(WrapperComponent);

  class withI18n extends Component {
    static contextTypes = {
      t: PropTypes.func.isRequired
    };

    /**
     * 語系文字
     * @param alias   [語系代號]
     * @param params  [代號參數]
     * @returns string
     */
    i18nText = (alias, params = {}) => {
      return this.context.t(alias, params);
    };

    render() {
      return factory({
        ...this.props,
        i18nText: this.i18nText
      });
    }
  }

  return _connect3()(withI18n);
};

export default i18nHoc;
