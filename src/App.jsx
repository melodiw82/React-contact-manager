import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  AddContacts,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";

import { getAllContacts, getAllGroups } from "./services/contactService";

function App() {
  const [loading, setLoading] = useState(false);
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
          element={<AddContacts loading={loading} groups={groups} />}
        />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route path="/conatcts/edit/:contactId" element={<EditContact />} />
      </Routes>
    </>
  );
}

export default App;
