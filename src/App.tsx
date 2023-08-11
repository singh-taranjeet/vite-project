import { useState } from "react";
import "./App.css";
import { StyledForm } from "./styles";

// create a react js app
// app will have a form to register a person's contact with multiple contact details

// form will have fields

// 1. Title [Text box, optional]
// 2. First Name [Text box, mandatory]
// 3. Last Name [Text box, optional]

// 4. Contacts
//     4.1 Type [dropdown with options => 1.Mobile No., 2.Phone No., 3. Email Id , mandatory]
//     4.2 Contact Value [text box, mandatory]

// => contacts section will have a add button to add new contact
// => the contact detail value should have validation for mobile number, phone number or for email id on the basis of selected type

// => so in form a person details will be entered with having multiple contacts (1. mobile no. value : 90XXXXXXXX, 2. email Id, value : abc@gmail.com)
const ContactType = {
  MobileNumber: "Mobile number",
  PhoneNumber: "Phone number",
  Email: "Email",
} as const;

interface TContact {
  type: string;
  value: string;
}

interface PersonType {
  title?: string;
  firstName: string;
  lastName?: string;
  contacts: TContact[];
}

function TextInput(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return <input {...props} className={`input ${props.className}`} />;
}

function App() {
  const [person, setPerson] = useState<PersonType>({
    title: "",
    firstName: "",
    lastName: "",
    contacts: [],
  });

  const [contact, setContact] = useState<TContact>({ type: "", value: "" });

  const [error, setError] = useState({
    firstName: "",
    contactType: "",
    contactValue: "",
  });

  function onChange(e: any) {
    const targetName = e.target.name;
    const value = e.target.value;

    resetError(targetName);

    switch (targetName) {
      case "title": {
        setPerson({
          ...person,
          title: value,
        });
        break;
      }
      case "firstName": {
        setPerson({
          ...person,
          firstName: value,
        });
        break;
      }
      case "lastName": {
        setPerson({
          ...person,
          lastName: value,
        });
        break;
      }

      case "contactValue": {
        setContact({
          ...contact,
          value,
        });
      }
    }
  }

  function resetError(field: string) {
    setError({
      ...error,
      [field]: "",
    });
  }

  function onSelect(e: any) {
    console.log("Event", e, e.target.value);
    resetError("contactValue");
    resetError("contactType");
    setContact({
      ...contact,
      type: e.target.value,
    });
  }

  function validateEmail(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  }

  function getContactValueType() {
    switch (contact.type) {
      case ContactType.MobileNumber:
        return "number";
      case ContactType.PhoneNumber:
        return "number";
      case ContactType.Email:
        return "email";
    }
  }

  function onSubmit(e: any) {
    e.preventDefault();

    let hasError = false;

    // Validate person's first name
    if (!person.firstName) {
      hasError = true;
      setError({
        ...error,
        firstName: "First name is required",
      });
    }

    // Validate if person has contact type
    if (!contact.type) {
      hasError = true;
      setError({
        ...error,
        contactType: "Contact Type is required",
      });
    }

    if (contact.type === ContactType.Email && !validateEmail(contact.value)) {
      setError({
        ...error,
        contactValue: "Not a valid email address",
      });
      hasError = true;
    } else if (
      (contact.type === ContactType.PhoneNumber ||
        contact.type === ContactType.MobileNumber) &&
      contact.value.length !== 10
    ) {
      setError({
        ...error,
        contactValue: "Not a valid phone number",
      });
      hasError = true;
    }

    if (!hasError) {
      setPerson({
        ...person,
        contacts: [...person.contacts, contact],
      });
      setContact({
        value: "",
        type: "",
      });
    }
  }

  console.log("Person", person);

  return (
    <>
      <StyledForm>
        <p className="heading">Enter the details of the person</p>
        <div className="wrapper">
          <TextInput
            type="text"
            name="title"
            placeholder="title"
            value={person?.title}
            onChange={onChange}
          />
          <TextInput
            type="text"
            required={true}
            placeholder={`${error.firstName ? error.firstName : "First Name"}`}
            className={`${error.firstName ? "input-error" : ""}`}
            name="firstName"
            value={person?.firstName}
            onChange={onChange}
          />
          <TextInput
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={person?.lastName}
            onChange={onChange}
          />
        </div>

        <div className="contact-section wrapper">
          <div className="wrapper">
            <label htmlFor="contact-type" className="heading">
              Select Contact Type
            </label>
            <select
              className={`${error.contactType ? "input-error input" : "input"}`}
              name="contact type"
              id="contact-type"
              value={contact.type}
              onChange={onSelect}
            >
              <option value={""}>Select Contact Type</option>
              <option value={ContactType.MobileNumber}>
                {ContactType.MobileNumber}
              </option>
              <option value={ContactType.PhoneNumber}>
                {ContactType.PhoneNumber}
              </option>
              <option value={ContactType.Email}>{ContactType.Email}</option>
            </select>
            {error.contactType ? (
              <p className="error">Error: {error.contactType}</p>
            ) : null}
            <div>
              <TextInput
                className={`${error.contactValue ? "input-error" : ""}`}
                type={getContactValueType()}
                name="contactValue"
                value={contact.value}
                onChange={onChange}
                placeholder={`Enter ${contact.type}`}
              />
              {error.contactValue ? (
                <p className="error">Error: {error.contactValue}</p>
              ) : null}
            </div>
          </div>

          <div>
            <button onClick={onSubmit}>Add</button>
          </div>

          <ul>
            {person.contacts.map((contact, index) => {
              return (
                <li key={`${contact.value}-${index}`}>
                  <div>{contact.type}:</div>
                  <div>{contact.value}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </StyledForm>
    </>
  );
}

export default App;
