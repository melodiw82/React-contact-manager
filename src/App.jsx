import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import {
  AddContacts,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";

function App() {
  const [loading, setLoading] = useState(false);
  const [contacts, setConatacts] = useState([]);
  const [groups, setGroups] = useState([]);

  // hooks cannot be async, await
  // you need to declare a function for that
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await axios.get(
          "http://localhost:9000/contacts"
        );
        const { data: groupsData } = await axios.get(
          "http://localhost:9000/groups"
        );

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
        <Route path="contacts/add" element={<AddContacts />} />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route path="/conatcts/edit/:contactId" element={<EditContact />} />
      </Routes>
    </>
  );
}

export default App;
