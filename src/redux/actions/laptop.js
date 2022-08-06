// state

const initialStateLaptops = {
  id: '605b183ac23c8d2083f6cf87',
  tabStatus: 4,
  employmentType: 1,
  permission: {
    role: 3,
  },
  staffCredentials: {
    credentials: [
      {
        docName: 'dot',
        docCategory: 'crop',
        expireDate: '2021-12-30',
        uploadDocLink: 'http://localhost',
        setReminder: {
          setRemainder: true,
          dateTime: '2021-12-29',
          type: 'helo',
        },
      },
      {
        docName: 'temp2',
        docCategory: 'perm',
        expireDate: '2021-12-30',
        uploadDocLink: 'http://localhost',
        setReminder: {
          setRemainder: true,
          dateTime: '2021-12-29',
          type: 'helo',
        },
      },
    ],
  },
};

// actions
const buyLaptop = () => {
  return {type: 'BUY_LAPTOP'};
};

// reducers

const laptopReducer = (state = initialStateLaptops, action) => {
  switch (action.type) {
    case 'BUY_LAPTOP':
      return {...state, numberOfLaptops: state.numberOfLaptops - 1, message: 'Laptop Bought'};
    default:
      return state;
  }
};

module.exports = {
  initialStateLaptops,
  laptopReducer,
  buyLaptop,
};
