import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import store from '../dummy-store';
import AddNote from './AddNote';

describe(`AddNote component`, () => {
    const props = {
      store: store
    }
  
    it('renders AddNote by default', () => {
      const wrapper = shallow(<AddNote />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  
    it('renders form from store when in props', () => {
      const component = shallow(<AddNote {...props} />)
        .find('form')
      expect(toJson(component)).toMatchSnapshot()
    })
  })