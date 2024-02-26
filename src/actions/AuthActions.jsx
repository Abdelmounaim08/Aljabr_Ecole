
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../API/Axios';
// Types d'actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_PAID_MONTHS = 'SET_PAID_MONTHS';
export const LOGOUT = 'LOGOUT';
export const FILTER_UNPAID_MONTHS = 'FILTER_UNPAID_MONTHS';
export const VALID = 'VALID';

// Action de connexion réussie
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

// Action de connexion échouée
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action de déconnexion
export const logout = () => ({
  type: LOGOUT,
});

// Action asynchrone d'authentification

export const login = (credentials) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post('/login', credentials)
        .then((response) => {
          const user = response.data;
          const redirectUrl = '/admin/profile/'; // Définissez ici l'URL de redirection souhaitée
          dispatch(loginSuccess(user));
          resolve(redirectUrl); // Renvoie l'URL de redirection à utiliser dans then
        })
        .catch((error) => {
          dispatch(loginFailure(error.message));
          reject(error); // Renvoie l'erreur à utiliser dans catch
        });
    });
  };
};

export const fetchPaidMonths = (CNE) => {
  return (dispatch) => {
    axiosInstance
      .get(`/paiment?CNE=${CNE}`)
      .then((response) => {
        const paidMonths = response.data.filter((item) => item.CNE === CNE);
        dispatch(setPaidMonths(paidMonths));
        console.log(paidMonths);
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const setPaidMonths = (paidMonths) => {
  return {
    type: SET_PAID_MONTHS,
    paidMonths
  };
};

export const filterUnpaidMonths = (allMonths, paidMonths) => {
  return {
    type: FILTER_UNPAID_MONTHS,
    allMonths,
    paidMonths
  };
};

export const valid = (eleve) => ({
  type: VALID,
  payload: eleve,
});