import { useReducer } from "react";
import axios from "axios";
import reducer, { initialState } from "./reducer";
import { fetching, success, error } from "./actionCreators";
import { STATUS } from "../../helpers/constants";

const useApiRequest = (endpoint, { verb = "get", token = {} } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const makeRequest = async (body) => {
    dispatch(fetching());
    try {
      const { data } = await axios[verb](endpoint, {
        ...body,
        ...token,
      });
      dispatch(success(data));
      return data;
    } catch ({ response = null, ...exception }) {
      dispatch(error(response, exception));
      return exception;
    }
  };
  return [state, makeRequest];
};

export default useApiRequest;
