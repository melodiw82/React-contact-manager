import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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
} from "./services/contactService";

function App() {
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [contacts, setConatacts] = useState([]);
  const [groups, setGroups] = useState([]);
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

  // hooks cannot be async, await
  // you need to declare a function for that
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setConatacts(contactsData);
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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={<Contacts contacts={contacts} loading={loading} />}
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
