import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useActions } from "../../hooks/useAction";
import { useInput } from "../../hooks/useInput";
import styles from '../../styles/Login.module.scss';
import { UserRole } from "../../types/user";

const SignupPage: NextPage = () => {
  const router = useRouter();
  const email = useInput("")
  const name = useInput("")
  const lastName = useInput("")
  const password = useInput("")
  const role = useInput("")


  const { registration } = useActions()


  const callback = () => {
    router.push({
      pathname: '/login'
    });
  }

  const onSignIn = () => {
    registration({
      email: email.value,
      password: password.value,
      name: name.value,
      lastName: lastName.value,
      role: role.value
    }, callback)
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
          <FormControl fullWidth style={{ marginTop: 10 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role.value}
              label="Age"
              onChange={role.onChange}
            >
              <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
              <MenuItem value={UserRole.CREATOR}>Creator</MenuItem>
              <MenuItem value={UserRole.USER}>User</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...name}
            style={{ marginTop: 10 }}
            label="Name"
          />
          <TextField
            {...lastName}
            style={{ marginTop: 10 }}
            label="LastName"
          />
          <TextField
            {...password}
            style={{ marginTop: 10 }}
            label="Password"
          />
          <Button variant="contained" style={{ marginTop: 20 }} onClick={onSignIn}>
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