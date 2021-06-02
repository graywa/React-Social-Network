import React from 'react'
import {create} from 'react-test-renderer'
import Paginator from "./Paginator"


describe("Paginator component", () => {
  test("Pages count is 11, but displayed 10 pages", () => {
    const component = create(<Paginator portionSize={10} totalUsers={11} usersOnPage={1} />)
    const root = component.root
    let span = root.findByType('span')
    expect(span.length).toBe(10)
  })

})
