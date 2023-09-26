import SearchContact from "./contact/SearchContact";
import { PURPLE, BACKGROUND } from "../helpers/colors";

const Navbar = ({ query, search }) => {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fa fa-id-badge" style={{ color: PURPLE }} /> وب
              اپلیکیشن مدیریت <span style={{ color: PURPLE }}>مخاطبین</span>
            </div>
          </div>
          <div className="col">
            {/* prop drailing */}
            <SearchContact query={query} search={search} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
