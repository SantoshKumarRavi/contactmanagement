import React, { useState } from "react";
import Form from "../components/ContactForm";
const ContactScreeen = () => {
  const [createContact, setCreateContact] = useState(false);
  const [EditContact, setEditContact] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [EditContactIndex, setEditContactIndex] = useState(null);
  function deleteContact(index) {
    let filtered = [...contacts];
    filtered = filtered.filter((_, i) => i !== index);
    setContacts(filtered);
  }
  return (
    <div className="w-full h-full">
      {!createContact && !EditContact && (
        <div className="flex justify-center items-center">
          <button
            className="p-2  bg-blue-700 font-bold text-white"
            onClick={() => setCreateContact(true)}
          >
            Create Contact
          </button>
        </div>
      )}
      {createContact && !EditContact && (
        <div className="w-full h-[94vh] flex  justify-center items-center">
          <Form
            setCreateContact={setCreateContact}
            setEditContact={setEditContact}
            setContacts={setContacts}
            contacts={contacts}
          />
        </div>
      )}
      {!createContact && EditContact && (
        <div className="w-full h-[94vh] flex  justify-center items-center">
          <Form
            edit
            EditContactIndex={EditContactIndex}
            setCreateContact={setCreateContact}
            setEditContact={setEditContact}
            setContacts={setContacts}
            contacts={contacts}
          />
        </div>
      )}
      {!createContact && !EditContact && contacts.length === 0 && (
        <div className="flex h-4/5 items-center justify-center">
          No contacts
        </div>
      )}
      <div
        className={`w-full flex  flex-col md:flex-wrap md:flex-row items-center justify-center ${
          contacts.length > 0 ? "mt-4" : ""
        }`}
      >
        {!createContact &&
          !EditContact &&
          contacts?.map(({ firstName, LastName, status }, i) => {
            return (
              <div className="w-full md:w-1/2   md:max-w-sm p-4">
                <div className="bg-white shadow-lg p-4 flex flex-col">
                  <div className="flex justify-between">
                    <div>firstName</div>
                    <div>{firstName}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>LastName</div>
                    <div>{LastName}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>status</div>
                    <div>{status}</div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <div>
                      <button
                        className="bg-green-400 px-4 py-1 font-semibold"
                        onClick={() => {
                          setCreateContact(false);
                          setEditContact(true);
                          setEditContactIndex(i);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button
                        className="bg-red-500 px-4 py-1 font-semibold text-white"
                        onClick={() => deleteContact(i)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ContactScreeen;
