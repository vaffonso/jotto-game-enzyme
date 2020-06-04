import checkPropTypes from 'check-prop-types';

/**
 * Return node with given data-test attribute value.
 * @param {ShallowWrapper} wrapper  - Enzyme shallow wrapper.
 * @param {String} val - Value of data-test attribute search.
 */
export const findByTestAttr = (wrapper, val, element = '') =>
  wrapper.find(`${element}[data-test="${val}"]`);

/**
 *
 * @param {*} component
 * @param {*} conformingProps
 */
export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  expect(propError).toBeUndefined;
};
