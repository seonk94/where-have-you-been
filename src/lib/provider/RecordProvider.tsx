import { useQuery } from '@apollo/client';
import React, { useState, useReducer, createContext, Dispatch, useContext, useEffect } from 'react';
import { GetRecordsResponse, GET_RECORDS, Record } from 'src/lib/graphql/record';



type InitData = { type: 'INIT_DATA', payload: Record[] };
type Action = InitData;
type MainTemplateState = {
  data: Record[]
};

const MainTemplateStateContext = createContext<MainTemplateState | null>(null);
const MainTemplateDispatchContext = createContext<Dispatch<Action> | null>(null);

function reducer(state: MainTemplateState, action: Action): MainTemplateState {
  switch (action.type) {
  case 'INIT_DATA':
    return {
      ...state,
      data : action.payload
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

function RecordProvider({ children } : Props) {
  const [state, dispatch] = useReducer(reducer, {
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

export default RecordProvider;