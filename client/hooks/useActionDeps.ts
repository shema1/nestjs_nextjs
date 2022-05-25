import { useCallback } from "react";
import { useDispatch } from "react-redux";

import _ from "lodash";

const useActionDeps = (callback: any) => {
  const dispatch = useDispatch();

  return dispatch(callback())
};

export default useActionDeps;