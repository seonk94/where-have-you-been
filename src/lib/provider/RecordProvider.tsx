import { useQuery } from '@apollo/client';
import React, { useState, useReducer, createContext, Dispatch, useContext, useEffect } from 'react';
import { FindRecordsByUserIdResponse, GetRecordsResponse, GET_RECORDS, GET_RECORDS_BY_USERID, Record } from 'src/lib/graphql/record';



type SetList = { type: 'SET_LIST', payload: Record[] };
type PushList = { type: 'PUSH_LIST', payload: Record };
type DeleteList = { type: 'DELETE_LIST', payload: string };
type Action = SetList | PushList | DeleteList;

type RecordState = {
  list: Record[]
};

const RecordStateContext = createContext<RecordState | null>(null);
const RecordDispatchContext = createContext<Dispatch<Action> | null>(null);

function reducer(state: RecordState, action: Action): RecordState {
  switch (action.type) {
  case 'SET_LIST':
    return {
      ...state,
      list : action.payload
    };
  case 'PUSH_LIST':
    return {
      ...state,
      list : [...state.list, action.payload]
    };
  case 'DELETE_LIST':
    return {
      ...state,
      list : state.list.filter(record => record._id !== action.payload)
    };
  default:
    throw new Error(`Unhandled action type`);
  }
}

export const useRecordState = () => {
  const state = useContext(RecordStateContext);
  if (!state) {
    throw new Error('not wrapped with MainTemplateProvider');
  }
  return state;
};

export const useRecordDispatch = () => {
  const dispatch = useContext(RecordDispatchContext);
  if (!dispatch) {
    throw new Error('not wrapped with MainTemplateProvider');
  }
  return dispatch;
};

interface Props {
  children: React.ReactNode;
  userId: string;
}

function RecordProvider({ children, userId } : Props) {
  const [state, dispatch] = useReducer(reducer, {
    list : []
  });

  const { data, loading } =  useQuery<FindRecordsByUserIdResponse>(GET_RECORDS_BY_USERID, {
    variables : {
      userId : userId
    }
  });
  useEffect(() => {
    if (!loading && data) {
      dispatch({
        type : 'SET_LIST',
        payload : data.findRecordsByUserId.data
      });
    }
  }, [loading]);

  return (
    <RecordStateContext.Provider value={state}>
      <RecordDispatchContext.Provider value={dispatch}>
        {children}
      </RecordDispatchContext.Provider>
    </RecordStateContext.Provider>
  );
}

export default RecordProvider;