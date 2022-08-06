import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getAllContacts, getSingleContact, deleteContact} from '../redux/actions/contacts';
import '../styles/ContactList.css';
const Swal = window.Swal;
function ContactList({getAllContacts, contacts, onPopup, setContacts, editUser, getSingleContact, deleteContact}) {
  const [ contact, setContact ] = useState({});
  const [ loading, setLoading ] = useState(false);
  useEffect(() => {
    getAllContacts();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  // useEffect(
  //   () => {
  //     if (Object.keys(props.newUser).length > 0) {
  //       const oldContacts = [ ...contacts ];
  //       console.log(props.newUser.id);
  //       if (oldContacts.filter((contact) => contact.id === props.newUser.id).length === 0) {
  //         let latestId = oldContacts.length + 1;
  //         let user = {...props.newUser, id: latestId};
  //         oldContacts.push(user);
  //         setContacts(oldContacts);
  //         props.setContacts(oldContacts);
  //         Swal.fire('Good job!', 'Contact Added Successfully!', 'success');
  //       }
  //     }
  //   },
  //   [ props.newUser ],
  // );
  const viewDetails = (id) => {
    const oldContacts = [ ...contacts ];
    let singleUser = oldContacts.filter((singleContact) => singleContact.id === id)[0];
    setContact(singleUser);
  };
  const editContact = (id) => {
    const oldContacts = [ ...contacts ];
    let singleUser = oldContacts.filter((singleContact) => singleContact.id === id)[0];
    getSingleContact(id);
    onPopup();
    editUser(singleUser);
  };
  const deleteContacts = (id) => {
    deleteContact(id);
  };
  return (
    <div className="row ml-md-4 ml-lg-4 ml-sm-4 pl-md-0">
      <div className="text-center">{loading && <h1>Loading...</h1>}</div>
      {contacts.length === 0 && <p className="text-danger text-center">No Contacts Found!</p>}
      {contacts.length > 0 && (
        <table className="table table-hover col-sm-12 col-md-12 col-lg-6">
          <thead className="border-0">
            <tr>
              <th scope="col">Basic Info</th>
              <th scope="col">Company</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id}>
                <td className="d-flex flex-row">
                  <div>
                    <div className="nameImage text-center text-white rounded-circle p5">
                      {contact.firstName.substring(0, 1)} {contact.lastName.substring(0, 1)}
                    </div>
                  </div>
                  <div className="ml-2">
                    {contact.firstName} {contact.lastName}
                    <span className="small d-block">{contact.email}</span>
                  </div>
                </td>
                <td>{contact.company}</td>
                <td>
                  <div className="d-flex flex-column flex-md-row">
                    <div className="d-flex flex-row">
                      <i className="fa fa-eye action" title="View Contact" onClick={() => viewDetails(contact.id)} />
                      &nbsp;&nbsp;&nbsp;
                      <i className="fa fa-edit action" title="Edit Contact" onClick={() => editContact(contact.id)} />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="d-flex flex-row">
                      <i
                        className="fa fa-trash action"
                        title="Delete Contact"
                        onClick={() => deleteContacts(contact.id)}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {Object.keys(contact).length > 0 && (
        <div className="col-sm-12 col-md-12 col-lg-6 pr-0 pl-2">
          <div className="ml-lg-5 col-md-12 bg-lightgray">
            <div className="d-flex flex-column align-items-center pt-4 pb-5">
              <div className="nameImage nameImageBig text-center text-white rounded-circle p5">
                {contact.firstName.substring(0, 1)} {contact.lastName.substring(0, 1)}
              </div>
              <h3>
                {contact.firstName} {contact.lastName}
              </h3>
              <span>{contact.company}</span>
            </div>
            <DetailsRow title={'Full Name'} value={contact.firstName + ' ' + contact.lastName} />
            <DetailsRow title={'Email'} value={contact.email} />
            <DetailsRow title={'Phone'} value={contact.phoneNumber} />
            <DetailsRow title={'Company'} value={contact.company} />
            <DetailsRow title={'Address'} value={contact.address} />
          </div>
        </div>
      )}
    </div>
  );
}
const DetailsRow = (props) => {
  return (
    <div>
      <div className="d-flex flex-row pb-3">
        <span className="col-md-4 text-lightgray">{props.title}:</span>
        <span className="col-lg-offset-2 col-md-6">{props.value}</span>
      </div>
      <hr />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contactsReducer.contacts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllContacts: () => dispatch(getAllContacts()),
    getSingleContact: (id) => dispatch(getSingleContact(id)),
    deleteContact: (id) => dispatch(deleteContact(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
