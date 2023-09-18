import { useState } from "react";

import {
  AddContacts,
  EditContact,
  ViewContact,
  Contacts,
  Navbar,
} from "./components";

function App() {
  const [contacts, setConatacts] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar />

      <Contacts contacts={contacts} loading={loading} />
    </>
  );
}

export default App;
