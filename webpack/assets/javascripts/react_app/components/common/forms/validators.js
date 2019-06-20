import { translate as __, sprintf } from '../../../../react_app/common/I18n';

export const maxLengthMsg = (number) => [number, sprintf(__("is too long (maximum is %s characters)"), number)];

export const requiredMsg = () => __("can't be blank");

export const errorsToSentence = (...validators) => (value) => {
  const msgs = validators.reduce((memo, validator) => {
    const res = validator(value);
    return res ? [res, ...memo] : memo;
  }, [])
  const [last, ...rest] = msgs;
  return rest.length === 0 ? last : `${rest.reverse().join(', ')} and ${last}`;
}
