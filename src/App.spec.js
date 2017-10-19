import App from './App';
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { initialState as featureComponent } from './reducers/app.reducer';

// setup enzyme
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import mockStore from './mockStore';

configure({ adapter: new Adapter() });


describe('<App />', () => {
  it('renders with default props', () => {
    const store = mockStore({ featureComponent });
    const wrapper = shallow(
      <App store={store} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
