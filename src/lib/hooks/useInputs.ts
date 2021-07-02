import { useCallback, useReducer } from 'react';

type DefaultValues = {
  [key: string] : string;
}

type UseInputsAction = {
  name : string;
  value : string;
}

function reducer<T>(state : T, action : UseInputsAction) {
  return {
    ...state,
    [action.name] : action.value
  };
}

export default function useInputs(defaultValues : DefaultValues) {
  const [state, dispatch] = useReducer(reducer, defaultValues);
  const onChange = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      name : e.target.name,
      value : e.target.value
    });
  }, []);

  return [state, onChange, dispatch] as [
    typeof state,
    typeof onChange,
    typeof dispatch
  ];
}