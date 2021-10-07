import {render, screen} from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/redux-store'
import {HashRouter} from 'react-router-dom'

/*test('renders learn react link', () => {
    render(<HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})*/

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
, div)
ReactDOM.unmountComponentAtNode(div)
})


