import React from 'react';
import successContext from './successContext';
import { shallow, mount } from 'enzyme';

const FunctionalComponent = () => {
    successContext.useSuccess();
    return <div />
}

describe('useSuccess', () => {
    it('should throw error when not wrapped in SuccessProvider', () => {
        expect(() => {
            shallow(<FunctionalComponent />);
        }).toThrow('useSuccess must be used within a SuccessProvider');
    });

    it('should does not throw error when wrapped in SuccessProvider', () => {
        expect(() => {
            mount(
                <successContext.SuccessProvider>
                    <FunctionalComponent />
                </successContext.SuccessProvider>
            )
        }).not.toThrow();
    })
});