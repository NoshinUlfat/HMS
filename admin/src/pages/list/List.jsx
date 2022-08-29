import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";

const List = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default List;
