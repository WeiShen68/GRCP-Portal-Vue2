import { extend } from 'vee-validate';
import * as veeRules from 'vee-validate/dist/rules';
import i18n from '@/translations';

Object.keys(veeRules).forEach(k => extend(k, veeRules[k]));

const validators = {};

extend('maxWords', {
  message: (field, args) => i18n.t('labels.error.maxWords', { value: args[0] }),
  validate: (value, args) => {
    return new Promise(resolve => {
      const validated = value.split(' ').length > args[0] ? false : true;
      return resolve(validated);
    });
  },
});

extend('maxLength', {
  message: (field, args) => i18n.t('labels.error.maxLength', { value: args[0] }),
  validate: (value, args) => {
    return new Promise(resolve => {
      const validated = value.length > args[0] ? false : true;
      return resolve(validated);
    });
  },
});

extend('minLength', {
  message: (field, args) => i18n.t('labels.error.minLength', { value: args[0] }),
  validate: (value, args) => {
    return new Promise(resolve => {
      const validated = value.length < args[0] ? false : true;
      return resolve(validated);
    });
  },
});

extend('apiError', {
  message: (field, args) => args[0],
  validate: (value, args) => {
    return new Promise(resolve => {
      if (!args) {
        return resolve(true);
      }
      return resolve(false);
    });
  },
});

extend('fieldReject', {
  message: (field, args) => (!args[1] ? i18n.t('labels.error.fieldReject') : args[1]),
  validate: (value, args) => {
    return new Promise(resolve => {
      const oldValue = args[0];
      if (value == oldValue) {
        return resolve(false);
      }
      return resolve(true);
    });
  },
});

extend('is_not_with_msg', {
  message: (field, args) => (!args[1] ? i18n.t('labels.error.fieldReject') : args[1]),
  validate: (value, args) => {
    return new Promise(resolve => {
      if (value != args[0]) {
        return resolve(true);
      }
      return resolve(false);
    });
  },
});

extend('required_with_msg', {
  message: (field, args) => (!args[0] ? i18n.t('labels.error.fieldReject') : args[0]),
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1,
    };
  },
  computesRequired: true,
});

extend('cannotBe', {
  validate(value, { data, msg = null }) {
    let validated = false;

    if (Array.isArray(data)) validated = !data.includes(value);
    else if (value == data) validated = true;

    if (validated) return validated;

    return null == msg ? i18n.t('labels.error.cannotBe', { value }) : msg;
  },
  params: ['data', 'msg'],
});

export default validators;
