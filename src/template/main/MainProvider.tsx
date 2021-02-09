import { useQuery } from '@apollo/client';
import React, { useState, useReducer, createContext, Dispatch, useContext, useEffect } from 'react';
import { GetRecordsResponse, GET_RECORDS, Record } from 'src/lib/graphql/record';

type SetCenter = { type: 'SET_CENTER', payload: number[] };
type SetEditMode = { type: 'SET_EDIT_MODE', payload: boolean };
type AddData = { type: 'ADD_DATA', payload: Record };
type InitData = { type: 'INIT_DATA', payload: Record[] };
type DeleteData = { type: 'DELETE_DATA', payload: Record };
type Action = SetEditMode | AddData | DeleteData | SetCenter | InitData;
type MainTemplateState = {
  editMode: boolean;
  center: number[];
  data: Record[]
};

const MainTemplateStateContext = createContext<MainTemplateState | null>(null);
const MainTemplateDispatchContext = createContext<Dispatch<Action> | null>(null);

function reducer(state: MainTemplateState, action: Action): MainTemplateState {
  switch (action.type) {
  case 'SET_CENTER': 
    return {
      ...state,
      center : action.payload
    };
  case 'SET_EDIT_MODE':
    return {
      ...state,
      editMode : action.payload
    };
  case 'INIT_DATA':
    return {
      ...state,
      data : action.payload
    };
  case 'ADD_DATA':
    return {
      ...state,
      data : [...state.data, action.payload]
    };
  case 'DELETE_DATA':
    return {
      ...state,
      data : state.data.filter(item => item._id !== action.payload._id)
    };
  default:
    throw new Error(`Unhandled action type`);
  }
}

export const useMainTemplateState = () => {
  const state = useContext(MainTemplateStateContext);
  if (!state) {
    throw new Error('not wrapped with MainTemplateProvider');
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
    center : [126.949860, 37.586954],
    data : []
  });

  const { data, loading } = useQuery<GetRecordsResponse>(GET_RECORDS);
  useEffect(() => {
    if (!loading && data) {
      dispatch({
        type : 'INIT_DATA',
        payload : data.allRecords.data
      });
    }
  }, [loading]);
  return (
    <MainTemplateStateContext.Provider value={state}>
      <MainTemplateDispatchContext.Provider value={dispatch}>
        {children}
      </MainTemplateDispatchContext.Provider>
    </MainTemplateStateContext.Provider>
  );
}

export default MainProvider;
