import React, { useState, useReducer, createContext, Dispatch, useContext } from 'react';
import { ListItem } from 'src/types';

type SetEditMode = { type: 'SET_EDIT_MODE', payload: boolean };

type Action = SetEditMode;
type MainTemplateState = {
  editMode: boolean;
  data: ListItem[]
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
    throw new Error('not wrapped with MainTemplateProvider');
    // return {
    //   editMode : false
    // };
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
    editMode : false,
    data : [
      {
        coordinate : [14138144.412188971, 4508760.443846234],
        content : '강남에서...',
        title : '강남',
        iconType : 'BuildingTwo',
        date : '2021-01-01'
      },
      {
        coordinate : [14134951.264779307, 4520037.752975805],
        content : '경복궁에서...',
        title : '경복궁',
        iconType : 'Palace',
        date : '2021-01-01'
      },
      {
        coordinate : [14074875.764536034, 4503258.59338613],
        content : '인천공항에서... 어쩌구 저쩌구 ',
        title : '인천공항',
        iconType : 'Aviation',
        date : '2021-01-01'
      }
    ]
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
