import React, { useEffect, useState } from "react";
import { ButtonAppBar } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { UserApi } from "../api";

const MainView: React.FC = () => {
  // state

  const [UserList, setUserList] = useState([]);
  const [refesh, setrefesh] = useState(false);
  const user = useSelector((state: any) => state.user);
  const token = localStorage.getItem("token")
    ? (localStorage.getItem("token") as string)
    : "";
  const navigate = useNavigate();

  // define collumns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",

      headerName: "User name",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      flex: 1,
      editable: false,
    },
    {
      field: "bio",
      headerName: "Bio",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 300,

      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => handleDelete(params.row.email)}
            >
              Delete
            </Button>
          </Stack>
        );
      },
    },
  ];

  // method
  const fetchAll = async () => {
    try {
      const res = await UserApi.getAll(token);
      if (res.status === 200) {
        setUserList(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (email: string) => {
    try {
      const res = await UserApi.delete(email);
      if (res.status === 200) {
        setrefesh(!refesh);
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  // call api

  useEffect(() => {
    fetchAll();
  }, [refesh]);

  // check route
  useEffect(() => {
    if (!user || !localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <ButtonAppBar user={user?.obj?.object} />
      <Box sx={{ height: 400, width: "1200px", margin: "auto" }}>
        <DataGrid
          rows={UserList}
          columns={columns}
          disableColumnFilter={true}
          hideFooter={true}
        />
      </Box>
    </div>
  );
};

export default MainView;
