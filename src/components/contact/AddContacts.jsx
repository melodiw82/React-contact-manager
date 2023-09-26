import { Link } from "react-router-dom";

import { Spinner } from "../";
import { GREEN, PURPLE, COMMENT } from "../../helpers/colors";
import NOTE_IMG from "../../assets/man-taking-note.png";

const AddContacts = ({ loading, groups, contact, setContactInfo, createContactForm }) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={NOTE_IMG}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />

            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساختن مخاطب جدید
                  </p>
                </div>
              </div>
            </div>
            <hr style={{ backgroundColor: GREEN }} />
            <div className="row mt-5">
              <div className="col-md-4">
                <form onSubmit={createContactForm}>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      placeholder="نام و نام خانوادگی"
                      required={true}
                      value={contact.fullname}
                      onChange={setContactInfo}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="photo"
                      placeholder="آدرس تصویر"
                      required={true}
                      value={contact.photo}
                      onChange={setContactInfo}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      className="form-control"
                      name="mobile"
                      placeholder="شماره موبایل"
                      required={true}
                      value={contact.mobile}
                      onChange={setContactInfo}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="آدرس ایمیل"
                      required={true}
                      value={contact.email}
                      onChange={setContactInfo}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      name="job"
                      placeholder="شغل"
                      required={true}
                      value={contact.job}
                      onChange={setContactInfo}
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      name="group"
                      required={true}
                      className="form-control"
                      value={contact.group}
                      onChange={setContactInfo}
                    >
                      <option value="">انتخاب گروه</option>
                      {groups.length > 0 &&
                        groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mx-2">
                    <input
                      type="submit"
                      className="btn"
                      style={{ backgroundColor: PURPLE }}
                      value="ساخت مخاطب"
                    />
                    <Link
                      to={"/contacts"}
                      className="btn mx-2"
                      style={{ backgroundColor: COMMENT }}
                    >
                      انصراف
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContacts;
