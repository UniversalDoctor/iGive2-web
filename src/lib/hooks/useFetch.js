import { useState, useEffect, useReducer } from 'react';
import * as api from '../api';

export const useFetch = (url, initialData) => {
  const [fetchUrl, setUrl] = useState(url);

  const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return { ...state, isLoading: true, isError: false };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error('Undefined action type');
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await api.get(fetchUrl);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [fetchUrl]);

  return [state, setUrl];
};

export default useFetch;
