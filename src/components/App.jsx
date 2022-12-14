import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export const App = () => {
  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(
    () =>
      parsedContacts ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const newContact = {
      name: data.name,
      number: data.number,
      id: nanoid(),
    };

    if (contacts.some(e => e.name === data.name)) {
      toast.info(`${data.name} is already in contacts 👇`);
    } else {
      return setContacts(prevState => [newContact, ...prevState]);
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filterContact} onDeleteContact={deleteContact} />
      <ToastContainer autoClose={2000} />
    </div>
  );
};
