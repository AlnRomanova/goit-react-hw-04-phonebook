import React, { Component } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handlerSubmit = e => {
    e.preventDefault();
    this.props.addContact({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.handlerSubmit}>
        <label htmlFor="" className={css.formLabel}>
          {' '}
          Name
          <input className={css.formInput}
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor=""  className={css.formLabel}>
          {' '}
          Number
          <input className={css.formInput}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleNameChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.btn}>Add contacts</button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
}
