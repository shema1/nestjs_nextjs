import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useActions } from "../../hooks/useAction";
import { useInput } from "../../hooks/useInput";
import styles from '../../styles/Login.module.scss';

const SignupPage: NextPage = () => {
  const router = useRouter();
  const email = useInput("")
  const name = useInput("")
  const password = useInput("")

  const { registration } = useActions()


  const callback = () => {
    router.push({
      pathname: '/login'
    });
  }

  const onSignIn = () => {
    registration({ email: email.value, password: password.value, name: name.value }, callback)
  }

  return (
    <div className={styles.container}>
      <div className={styles.app}>
        <form className={styles.form}>
          <h1>Sign up</h1>
          <TextField
            {...email}
            style={{ marginTop: 10 }}
            label="Email"
          />
          <TextField
            {...name}
            style={{ marginTop: 10 }}
            label="Name"
          />
          <TextField
            {...password}
            style={{ marginTop: 10 }}
            label="Password"
          />
          <Button variant="contained" style={{marginTop: 20}} onClick={onSignIn}>
            Sign up
          </Button>
          <Button onClick={callback}>
            login
          </Button>
        </form>
      </div >
    </div>
  );
};

export default SignupPage;