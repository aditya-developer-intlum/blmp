import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../helpers/Firebase';
// import * as Api from '../../helpers/ApiService';
import * as Api from '../../services/admin/auth';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => {
  return await Api.login({ email: email, password: password })
    .then(async response => {
      return await response.json();
    })
    .catch(async error => {
      return await error.json();
    });
};

const loginWithEmailPasswordAsyncStaff = async (email, password, vendor, restaurant) => {
  return await Api.staffLogin({ email: email, password: password, vendor: vendor, restaurant: restaurant })
    .then(async response => {
      return await response.json();
    })
    .catch(async error => {
      return await error.json();
    });
};

function* loginWithEmailPassword({ payload }) {
  const { history, usertype } = payload;
  
  try {
    let loginUser;
    if(usertype==='staff') {
      const { email, password, vendor, restaurant } = payload.user;
      loginUser = yield call(loginWithEmailPasswordAsyncStaff, email, password, vendor, restaurant);
    } else {
      const { email, password } = payload.user;
      loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    }
    if (loginUser.status === 'Success') {
      localStorage.setItem('user_id', loginUser.user.id);
      localStorage.setItem('user_name', loginUser.user.name);
      localStorage.setItem('token', loginUser.auth.token);
      if (loginUser.user.role_id === 1) {
        yield put(loginUserSuccess({ uid: loginUser.user.id, token: loginUser.auth.token, restaurant: 0, permissions: '' }));
        localStorage.setItem('user_type', 'admin');
        history.push('/admin');
        window.location.reload();
      } else if (loginUser.user.role_id === 2) {
        yield put(loginUserSuccess({ uid: loginUser.user.id, token: loginUser.auth.token, restaurant: 0, permissions: '' }));
        localStorage.setItem('user_type', 'vendor');
        history.push('/vendor');
        window.location.reload();
      } else if (loginUser.user.role_id === 3) {
        yield put(loginUserSuccess({ uid: loginUser.user.id, token: loginUser.auth.token, restaurant: loginUser.restaurant_id, permissions: loginUser.user.permissions.permissions }));
        localStorage.setItem('user_type', 'staff');
        localStorage.setItem('restaurant_id', loginUser.restaurant_id);
        localStorage.setItem('permission_list', loginUser.user.permissions.permissions);
        history.push(`/staff/dashboard`);
        window.location.reload();
      }
    } else {
      yield put(loginUserError(Array.isArray(loginUser.error) ? loginUser.error.map(val => val.message).join(" , ") : 'Email ID or Password Mismatch!'));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => authUser)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      localStorage.setItem('user_id', registerUser.user.uid);
      yield put(registerUserSuccess(registerUser));
      history.push('/');
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await Api.logout({})
  return 'success';
};

function* logout({ payload }) {
  const { history } = payload;
  try {
    const UserType = localStorage.getItem('user_type');
    const response = yield call(logoutAsync, history);
    if(response === 'success') {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_type');
      localStorage.removeItem('token');
      if(UserType==='admin') {
        history.push('/auth/admin');
      } else if(UserType==='vendor') {
        history.push('/auth/vendor');
      }
    }
  } catch (error) { }
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
