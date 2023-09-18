import { useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";

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
