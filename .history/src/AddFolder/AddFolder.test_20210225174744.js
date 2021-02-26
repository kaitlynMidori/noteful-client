import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddFolder from './AddFolder'

// describe(`AddItemForm component`, () => {
//   it('renders the complete form', () => {
//     const wrapper = shallow(<AddFolder />)
//     expect(toJson(wrapper)).toMatchSnapshot()
//   })
// })
describe (`AddItemForm component`, () => { 
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
})