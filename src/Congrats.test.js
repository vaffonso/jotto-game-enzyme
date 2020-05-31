import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "./testUtils";
import Congrats from "./Congrats";

const defaultProps = {
  success: false
};

/**
 * Factory of shallow wrapper for current test
 * @function
 * @param {Object} props Component props specific for this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

describe("Congrats tests", () => {
  it("renders without errror", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.length).toBe(1);
  });
  it("should render non-empty congratulatory message when `success` prop is true", () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, "component-text");
    expect(component.length).toBe(1);
  });
  it("should render no text congrats message when `success` prop is false", () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, "component-text");
    expect(component.length).toBe(0);
  });
  it("does not throw warning with expected props", () => {
    const expectedProps = { success: true };
    const propError = checkProps(Congrats, expectedProps);
    expect(propError).toBe(undefined);
  });
});
