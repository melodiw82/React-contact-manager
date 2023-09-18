import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import {
  AddContacts,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";

function App() {
  const [contacts, setConatacts] = useState([]);
  const [loading, setLoading] = useState(false);

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
