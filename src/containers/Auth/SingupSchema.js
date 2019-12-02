import * as Yup from 'yup';

let re = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

const singupSchema = Yup.object().shape({
    login: Yup.string()
        .trim()
        .min(4, 'Login has to be longer than 4 characters!')
        .max(20, 'Login has to be shorter than 20 characters!!')
        .required('Login id required'),
    password: Yup.string()
        .min(6, 'Password has to be longer than 6 characters!')
        .matches(re, 'Password must contain uppercase character, lowercase character and a number!')
        .required('Password must contain uppercase character, lowercase character and a number!'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords are not the same!')
        .required('Password confirmation is required!'),
});

export default singupSchema;
