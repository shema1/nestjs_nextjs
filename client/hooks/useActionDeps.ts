import { useCallback } from "react";
import { useDispatch } from "react-redux";

import _ from "lodash";

const useActionDeps = (callback: any, deps: any = []) => {
  const dispatch = useDispatch();

  // // return useCallback((...values) => {
  // return dispatch(callback())
  // // }, [])

  return useCallback((...values) => {
    let isExist = false;
    return isExist ? null : dispatch(callback(...values));
  }, deps);
};

export default useActionDeps;