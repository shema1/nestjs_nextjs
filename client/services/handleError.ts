
import { toast } from 'react-toastify';
import React from 'react';
import _ from "lodash"

const handleError = (error: any) => {
  console.log("errror", error)
  const errorData = error?.response?.data

  if (!errorData) {
   return  toast.error("Undefined error", {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  if (_.isArray(errorData)) {
    _.map(errorData, (elem) => {
      toast.error(elem.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  } else {
    toast.error(errorData.message, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

}

export default handleError