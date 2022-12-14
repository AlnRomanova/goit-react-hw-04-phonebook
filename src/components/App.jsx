import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };


  addContact = data => {
    const newContact = {
      name: data.name,
      number: data.number,
      id: nanoid(),
    };

    if (this.state.contacts.some(e => e.name === data.name)) {
      alert(`${data.name} is already in contacts`);
    } else {
      return this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContact = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount () {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if(parsedContacts) {
      this.setState({ contacts: parsedContacts });
    };
  };

  componentDidUpdate (preProps, prevState) {
    if(this.state.contacts !== prevState.contacts) {
     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    };
  };

  render() {
    const { filter } = this.state;
    const filteredContact = this.filterContact();
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addContact}
        />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContact}
          onDeleteContact={this.deleteContact}
        />
      </div>

    );
  }
}
