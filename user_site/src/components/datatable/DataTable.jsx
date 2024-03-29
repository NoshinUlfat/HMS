import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "./datatablesource";
import { useState } from "react";

const Datatable = ({showInfo, rowData}) => {

  console.log("INFOOOOOOOOO  ",showInfo)
  console.log("ROWS ",userRows)
  console.log("Cols ",userColumns)
  console.log("Row data ",rowData)

  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button style={{ textDecoration: "none" }} onClick={event => showInfo(params.row.id)}>
              <div className="viewButton">View</div>
            </button>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Reject
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Applications
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={6}
        rowsPerPageOptions={[6]}
        checkboxSelection disableSelectionOnClick
      />
    </div>
  );
};

export default Datatable;