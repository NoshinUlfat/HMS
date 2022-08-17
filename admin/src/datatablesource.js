export const studentColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "student",
    headerName: "Student",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "studentId",
    headerName: "STD Id",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "level",
    headerName: "Level",
    width: 80,
  },

  {
    field: "term",
    headerName: "Term",
    width: 80,
  },

  {
    field: "present_address",
    headerName: "Present Address",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const provostColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "provost",
    headerName: "Provost",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "post",
    headerName: "Post",
    width: 100,
  },

  {
    field: "department",
    headerName: "Department",
    width: 100,
  },

  {
    field: "designation",
    headerName: "Designation",
    width: 100,
  },

  {
    field: "present_address",
    headerName: "Present Address",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hallColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "currentPeople",
    headerName: "Current People",
    width: 150,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 150,
  },
];
