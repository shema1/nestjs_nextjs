import React, { useEffect } from 'react';
import Table from '../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { userActionCreators } from '../../store/actions-creators';
import { userSelector } from "../../store/selectors";

interface UsersProps {

}

const Users: React.FC<UsersProps> = () => {

  const dispatch = useDispatch();

  const getUsers = () => dispatch(userActionCreators.getUsers());

  const users = useSelector(userSelector.getUsersList)

  const columns = [
    {
      name: "ID",
      key: "_id"
    },
    {
      name: "Name",
      key: "name"
    },
    {
      name: "Last name",
      key: "lastName"
    },
    {
      name: "Email",
      key: "email"
    }
  ];

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    console.log("users", users)
  }, [users])


  return (
    <div>
      <Table
        data={users}
        columns={columns}
      />
    </div>
  );
};

export default Users;