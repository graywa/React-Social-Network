import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from "./ProfileStatus"


describe("ProfileStatus component", () => {
  test("Status from props should be in the state", () => {
    const component = create(<ProfileStatus status='hakuna matata' />)
    const instance = component.getInstance()!
    // @ts-ignore
    expect(instance.state.status).toBe('hakuna matata')
  })
  test("After creation <span> should be displayed", () => {
    const component = create(<ProfileStatus status='hakuna matata' />)
    const root = compon6ent.root
    let span = root.findByType('span')
    expect(span).not.toBeNull()
  })
  test("After creation <input> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status='hakuna matata' />)
    const root = component.root
    expect(() => {
      let input = root.findByType('input')
    }).toThrow()
  })
  test("In span should be correct status", () => {
    const component = create(<ProfileStatus status='hakuna matata' />)
    const root = component.root
    let span = root.findByType('span')
    expect(span.children[0]).toBe('Статус: hakuna matata')
  })
  test("Instead <span> should be displayed <input>", () => {
    const component = create(<ProfileStatus status='hakuna matata' />)
    const root = component.root
    let span = root.findByType('span')
    span.props.onDoubleClick()
    let input = root.findByType('input')
    expect(input.props.value).toBe('hakuna matata')
  })
  test("Callback  should be called 1 time <input>", () => {
    let mockCallback = jest.fn()
    const component = create(<ProfileStatus status='hakuna matata' updateUserStatus={mockCallback}/>)
    const instance = component.getInstance()
    // @ts-ignore
    instance.offEdit()
    expect(mockCallback.mock.calls.length).toBe(1)
  })
})

