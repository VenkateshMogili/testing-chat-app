export const initialStateContacts = {
  contacts: [
    {
      id: 1,
      firstName: 'Leanne Graham',
      lastName: 'Bret',
      email: 'Sincere@april.biz',
      address: 'Sample',
      phoneNumber: '1231231231',
      company: 'Romaguera-Crona',
    },
    {
      id: 2,
      firstName: 'Leanne Sample',
      lastName: 'Sample',
      email: 'v@gmail.com',
      address: 'Sample',
      phoneNumber: '1231231231',
      company: 'Romaguera-Crona',
    },
  ],
};
export const getAllContacts = () => {
  return {type: 'GET_ALL_CONTACTS'};
};

export const addContact = (contact) => {
  return {type: 'ADD_CONTACT', contact};
};

export const editContact = (contact, id) => {
  return {type: 'EDIT_CONTACT', contact, id};
};

export const deleteContact = (id) => {
  return {type: 'DELETE_CONTACT', id};
};
export const getSingleContact = (id) => {
  return {type: 'GET_SINGLE_CONTACT', id};
};
