import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { useInput } from "../../hooks/useInput";
import { authActionCreators } from "../../store/actions-creators";
import styles from '../../styles/Login.module.scss';


const Login: NextPage = () => {

  const dispatch = useDispatch();

  const router = useRouter();
  const email = useInput("");
  const password = useInput("");

  const login = (data, callback) => dispatch(authActionCreators.login(data, callback));

  const callback = () => {
    router.push({
      pathname: '/'
    });
  }

  const onLogin = () => {
    login({ email: email.value, password: password.value }, callback);
  }

  const onSignUp = () => {
    router.push({
      pathname: '/signup'
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.app}>
        <form className={styles.form}>
          <h1>Login</h1>
          <TextField
            {...email}
            style={{ marginTop: 10 }}
            label="Email"
          />
          <TextField
            {...password}
            style={{ marginTop: 10 }}
            label="Password"
          />
          <Button variant="contained" style={{ marginTop: 20 }} onClick={onLogin}>
            Log in
          </Button>
          <Button onClick={onSignUp}>
            Sign up
          </Button>
        </form>
      </div >
    </div >
  );
}

export default Login
