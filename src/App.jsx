import { useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";

function App() {
  const [contacts, setConatacts] = useState([]);

  return (
    <>
      <Navbar />

      <Contacts contacts={contacts} />
    </>
  );
}

export default App;
