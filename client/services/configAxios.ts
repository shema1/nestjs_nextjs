import axios from "axios";
import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const configAxios = (store) => {
    axios.defaults.baseURL = 'http://localhost:5000/';
    axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    //axios.defaults.headers.common.Pragma = 'no-cache';

    axios.interceptors.request.use(async config => {
        //   if (config.url !== endpoints.signIn() && config.url !== endpoints.refreshtoken() && RefreshTokenService.isRefreshing) {
        //       await RefreshTokenService.addNewPromise();
        //   }

        const state: RootState = store.getState();
        const accessToken = state.auth.access_token;
        // const expiryDate = selectors.getTokenExpiryDate(store.getState());
        // if (!accessToken) {
        //     return updateRequestAuthorizationHeader(config);
        // }
        // if (config.url !== endpoints.signIn() && config.url !== endpoints.refreshtoken() && !RefreshTokenService.isRefreshing && expiryDate && moment().isAfter(moment(expiryDate))) {
        //     await refreshToken(store);
        //     const newAccessToken = selectors.getAccessToken(store.getState());
        //     return !newAccessToken ? {
        //         ...updateRequestAuthorizationHeader(config),
        //         cancelToken: new axios.CancelToken(cancel => cancel(coreConstants.ERROR_SIGNIN_TYPES.tokenExpired))
        //     } : updateRequestAuthorizationHeader(config, newAccessToken);
        // }
        return updateRequestAuthorizationHeader(config, accessToken);
    }, error => Promise.reject(error));

    const updateAuthorizationHeader = (config, accessToken = '', isError = false) => {
        const c = config;
        let header = isError ? c.headers : c.headers.common;
        if (accessToken) {
            header.Authorization = `bearer ${accessToken}`;
        } else {
            header = _.omit(header, ['Authorization']);
        }
        return c;
    };


    const updateRequestAuthorizationHeader = (config, accessToken = '') => updateAuthorizationHeader(config, accessToken);

}

export default configAxios;