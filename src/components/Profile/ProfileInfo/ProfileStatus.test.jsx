import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
  test("Status from props should be in the state", () => {
    const component = create(<ProfileStatus status='hakuna matata' />)
    const instance = component.getInstance()
    expect(instance.state.status).toBe('hakuna matata')
  })
  test("After creation span should be displayed correct status", () => {
    const component = create(<ProfileStatus status='hakuna matata' />)
    const root = component.root
    let span = root.findByType('span')
    expect(span).not.toBeNull()
  })
  test("In span should be text", () => {
    const component = create(<ProfileStatus status='hakuna matata' />)
    const root = component.root
    const span = root.findByType('span')
    expect(span.children[0]).toBe('hakuna matata')
  })
})

