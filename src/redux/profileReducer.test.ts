import profileReducer, {actionCreatorsProfile, } from './profileReducer'

let state = {
  postsData: [
    {id: 1, message: 'Why is it so difficult?', likesCount: 221},
    {id: 2, message: 'I learn English sometimes', likesCount: 85},
    {id: 3, message: 'Good morning night city ', likesCount: 4},
    {id: 4, message: 'I played football every day ', likesCount: 33},
    {id: 5, message: 'I\'m twenty-five ', likesCount: 15},
  ],
  newPostText: 'How are you?',
  profile: null,
  userAva: null,
  status: ''
}

it('state should be incremented', () => {
  //1. Test data
  let action = actionCreatorsProfile.addPostActionCreator('Hello World')

  //2. Action
  let newState = profileReducer(state, action)

  //3.Expectation
  expect(newState.postsData.length).toBe(6)
})

it('new message should be correct', () => {

  //1. Test data
  let action = actionCreatorsProfile.addPostActionCreator('Hello World')

  //2. Action
  let newState = profileReducer(state, action)

  //3.Expectation
  expect(newState.postsData[5].message).toBe('Hello World')
})

it('after delete post postsData should be decrement', () => {

  //1. Test data
  let action = actionCreatorsProfile.deletePost(1)

  //2. Action
  let newState = profileReducer(state, action)

  //3.Expectation
  expect(newState.postsData.length).toBe(4)
})