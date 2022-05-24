import React, { useEffect } from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Table from '../../components/Table';

interface UsersProps {

}
const Users: React.FC<UsersProps> = () => {

  const { getUsers } = useActions()

  const { users } = useTypedSelector(state => state.user);

  // const columns: GridColDef[] = [
  //   { field: '_id', headerName: "ID", v },
  //   { field: 'name', headerName: "Name" },
  //   { field: 'lastName', headerName: "Last name" },
  //   { field: 'email', headerName: "Email" },
  // ]

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

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    console.log("users", users)
  }, [users])


  return (
    <div>
      asdas
      <Table
        data={users}
        columns={columns}
      />
      {/* <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      /> */}
    </div>
  );
};

export default Users;