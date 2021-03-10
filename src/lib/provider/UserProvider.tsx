import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type State = {
  userId: null | number;
}

type Action = { type: 'SET_USERID'; userId: number | null };

type UserDispatch = Dispatch<Action>

const UserStateContext = createContext<State | null>(null);
const UserDispatchContext = createContext<UserDispatch | null>(null);

export async function getMe(dispatch : UserDispatch) {
  try {
    const res : { id: number, connected_at: string} = await window.Kakao.API.request({
      url : '/v2/user/me'
    });
    dispatch({ type : 'SET_USERID', userId : res.id });
  } catch(e) {
    console.error(e);
  }
}

function reducer(state: State, action: Action) {
  switch(action.type) {
  case 'SET_USERID':
    return {
      ...state,
      userId : action.userId
    };
  default: 
    throw new Error('UserProvider Action Error');
  }
}

export function UserProvider({ children } : { children : React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    userId : null
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UserStateContext);
  if (!state) throw new Error('UserStateContext error');
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error('UserDispatchContext error');
  return dispatch;
}