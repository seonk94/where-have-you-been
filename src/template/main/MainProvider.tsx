import React, { useState, useReducer, createContext, Dispatch, useContext } from 'react';

type SetEditMode = { type: 'SET_EDIT_MODE', payload: boolean };

type Action = SetEditMode;
type MainTemplateState = {
  editMode: boolean;
};

const MainTemplateStateContext = createContext<MainTemplateState | null>(null);
const MainTemplateDispatchContext = createContext<Dispatch<Action> | null>(null);

function reducer(state: MainTemplateState, action: Action): MainTemplateState {
  switch (action.type) {
  case 'SET_EDIT_MODE':
    return {
      ...state,
      editMode : action.payload
    };
  default:
    throw new Error(`Unhandled action type`);
  }
}

export const useMainTemplateState = () => {
  const state = useContext(MainTemplateStateContext);
  if (!state) {
    // throw new Error('not wrapped with MainTemplateProvider');
    return {
      editMode : false
    };
  }
  return state;
};

export const useMainTemplateDispatch = () => {
  const dispatch = useContext(MainTemplateDispatchContext);
  if (!dispatch) {
    throw new Error('not wrapped with MainTemplateProvider');
  }
  return dispatch;
};

interface Props {
  children: React.ReactNode
}

function MainProvider({ children } : Props) {
  const [state, dispatch] = useReducer(reducer, {
    editMode : false
  });

  return (
    <MainTemplateStateContext.Provider value={state}>
      <MainTemplateDispatchContext.Provider value={dispatch}>
        {children}
      </MainTemplateDispatchContext.Provider>
    </MainTemplateStateContext.Provider>
  );
}

export default MainProvider;
