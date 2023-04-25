import React, { useEffect, useState } from "react";

const Form = ({
  edit = false,
  setEditContact,
  setCreateContact,
  setContacts,
  EditContactIndex,
  contacts,
}) => {
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [status, setStatus] = useState("Active");
  useEffect(() => {
    if (edit && EditContactIndex !== null) {
      const { firstName, LastName, status } = contacts[EditContactIndex];
      setFirstName(firstName);
      setLastName(LastName);
      setStatus(status);
      //auto fill from api data or cache state from client
    }
  }, [edit,EditContactIndex,contacts]);
  function SaveContact() {
    if (!firstName || !LastName || !status) {
      return;
    }
    if (edit && EditContactIndex !== null) {
      let updated = [...contacts];
      updated[EditContactIndex] = {
        firstName: firstName,
        LastName: LastName,
        status: status,
      };
      setContacts(updated);
    } else {
      setContacts((pre) => [
        ...pre,
        {
          firstName: firstName,
          LastName: LastName,
          status: status,
        },
      ]);
    }
    setCreateContact(false);
    setEditContact(false);
  }
  return (
    <>
      <div className="max-w-sm rounded-lg shadow-2xl  p-6 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SaveContact();
          }}
        >
          <div className="relative mb-6 flex justify-between w-full">
            <label for="exampleInputFirstName" className="w-1/2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="outline-none border-solid border-2 border-primary pl-3 w-1/2"
              id="exampleInputFirstName"
              aria-describedby="FirstNameHelp"
              placeholder="Enter firstName"
              required
            />
          </div>
          <div className="relative mb-6 flex justify-between w-full">
            <label for="exampleInputLastName" className="w-1/2">
              Last Name
            </label>
            <input
              type="LastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className="outline-none border-solid border-2 border-primary pl-3 w-1/2"
              id="exampleInputLastName"
              aria-describedby="enterLastName"
              placeholder="Enter LastName"
              required
            />
          </div>
          <div className="relative w-full mb-6 flex justify-between">
            <label className="w-1/2">Status</label>
            <div className="w-1/2">
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  value="Active"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100"
                  required
                  onClick={(e) => {
                    console.log("test", e.target.value);
                    setStatus(e.target.value);
                  }}
                  checked={status === "Active"}
                />
                <label
                  for="default-radio-1"
                  className="ml-2 text-sm font-medium"
                >
                  Active
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  value="Inactive"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100"
                  required
                  onClick={(e) => setStatus(e.target.value)}
                  checked={status === "Inactive"}
                />
                <label
                  for="default-radio-2"
                  className="ml-2 text-sm font-medium"
                >
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="bg-blue-700 font-bold text-white w-full py-2"
            >
              Save{edit ? " Edited " : " "}Contact
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
