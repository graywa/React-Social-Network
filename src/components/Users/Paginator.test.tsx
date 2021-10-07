import React from 'react'
import {create} from 'react-test-renderer'
import Paginator from "./Paginator"


describe("Paginator component", () => {
  test("Pages count is 11, but displayed 10 pages", () => {
    const component = create(
      <Paginator currentPage={1} onPageChanged={x => x}  portionSize={10} totalUsers={11} usersOnPage={1} />)
    const root = component.root
    let spans = root.findByType('span')
    // @ts-ignore
    expect(spans.length).toBe(10)
  })

})
