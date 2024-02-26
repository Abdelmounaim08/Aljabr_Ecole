import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, VALID, SET_PAID_MONTHS ,FILTER_UNPAID_MONTHS} from '../actions/AuthActions';

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  eleve: null,
  allMonths: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  paidMonths: [],
  unpaidMonths: []
 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return initialState;
    case SET_PAID_MONTHS:
      return {
        ...state,
        paidMonths: action.paidMonths
      };
    case FILTER_UNPAID_MONTHS:
      const unpaidMonths = action.allMonths.filter(month => !action.paidMonths.includes(month));
      return {
        ...state,
        unpaidMonths
      };
    case VALID:
      return {
        ...state,
        eleve: action.payload,
        paidMonths: [],
        unpaidMonths: []
      };
    default:
      return state;
  }
};

export default authReducer;