import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import {
  AddContacts,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";

import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
} from "./services/contactService";
import {
  COMMENT,
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
} from "./helpers/colors";

function App() {
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [contacts, setConatacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contact, setConatact] = useState({
    // to avoid writing form validation for each one
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });

  const navigate = useNavigate();
  const [query, setQuery] = useState({ text: "" });

  // hooks cannot be async, await
  // you need to declare a function for that
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setConatacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        setConatacts(contactsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [forceRender]);

  const createContactForm = async (event) => {
    event.preventDefault();

    try {
      const { status } = await createContact(contact);

      if (status === 201) {
        setConatact({});
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const setContactInfo = (event) => {
    setConatact({ ...contact, [event.target.name]: event.target.value });
  };

  const confirm = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              از پاک کردن مخاطب {contactFullname} اطمینان داری؟
            </p>

            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              حذف کن
            </button>

            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactData } = await getAllContacts();
        setConatacts(contactData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  // implementing search using .filter()
  const contactSearch = (event) => {
    setQuery({ ...query, text: event.target.value });
    const allContacts = contacts.filter((contact) => {
      // return cause it's multiple lines
      return contact.fullname
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredContacts(allContacts);
  };

  return (
    <>
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contacts
              contacts={filteredContacts}
              loading={loading}
              confirmDelete={confirm}
            />
          }
        />
        <Route
          path="contacts/add"
          element={
            <AddContacts
              loading={loading}
              groups={groups}
              setContactInfo={setContactInfo}
              contact={contact}
              createContactForm={createContactForm}
            />
          }
        />
        <Route
          path="/contacts/:contactId"
          element={<ViewContact />}
          loading={loading}
        />
        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
