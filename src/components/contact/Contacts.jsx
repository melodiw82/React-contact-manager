import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import Contact from "./Contact";
import NOtFound from "../../assets/no-found.gif";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const Contacts = ({ contacts, loading, confirmDelete }) => {
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link
                  to={"/contacts/add"}
                  className="btn mx-2 my-1"
                  style={{ backgroundColor: PINK }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <Contact
                  key={contact.id}
                  contact={contact}
                  confirmDelete={() => {
                    confirmDelete(contact.id, contact.fullname);
                  }}
                />
              ))
            ) : (
              <div
                className="text-center py-4 rounded"
                style={{ backgroundColor: CURRENTLINE }}
              >
                <p className="h3" style={{ color: ORANGE }}>
                  مخاطب یافت نشد...
                </p>
                <img src={NOtFound} className="w-25" alt="پیدا نشد" />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
