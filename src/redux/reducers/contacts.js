export const {initialStateContacts} = require('../actions/contacts');

export const contactsReducer = (state = initialStateContacts, action) => {
  switch (action.type) {
    case 'GET_ALL_CONTACTS':
      return {...state};
    case 'ADD_CONTACT': {
      let contacts = [ ...state.contacts ];
      let lastId =
        contacts.length > 0 && contacts[contacts.length - 1].id ? parseInt(contacts[contacts.length - 1].id) + 1 : 1;
      let contact = action.contact;
      contact.id = lastId;
      contacts.push(contact);
      return {...state, contacts};
    }
    case 'GET_SINGLE_CONTACT': {
      let contacts = [ ...state.contacts ];
      return {...state, contact: contacts.filter((contact) => contact.id === action.id)[0], isEdit: true};
    }
    case 'EDIT_CONTACT': {
      let contacts = [ ...state.contacts ];
      const findIndex = contacts.findIndex((contact) => contact.id === action.id);
      contacts[findIndex] = action.contact;
      return {...state, contacts};
    }
    case 'DELETE_CONTACT': {
      let contacts = [ ...state.contacts ];
      let getIndex = contacts.findIndex((singleContact) => singleContact.id === action.id);
      contacts.splice(getIndex, 1);
      return {...state, contacts};
    }
    default:
      return state;
  }
};
