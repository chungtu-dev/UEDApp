import React from 'react';
import { Auth, database, firebase } from './Setup';

export const SignUpUser = (emailAddress, password) => {
    return new Promise(function (resolve, reject) {
        Auth()
            .createUserWithEmailAndPassword(emailAddress, password)
            .then(() => {
                resolve('Đăng Kí Thành Công');
            })
        firebase.database().ref('users/' + password).set({ emailAddress: emailAddress, password: password })
            .catch(error => {
                reject(error);
            });
    });
};

export const SignInUser = (emailAddress, password) => {
    return new Promise(function (resolve, reject) {
        Auth()
            .signInWithEmailAndPassword(emailAddress, password)
            .then(() => {
                resolve('Đăng Nhập Thành Công');
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const SignOutUser = () => {
    return new Promise(function (resolve, reject) {
        Auth()
            .signOut()
            .then(() => {
                resolve('Đã Đăng Xuất');
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const submitUser = (Id, Name, Position) => {
    return new Promise(function (resolve, reject) {
        let key;
        if (Id != null) {
            key = Id;
        }
        else {
            key = database()
                .ref()
                .push().key;
        }
        let dataToSave = {
            Id: key,
            Name: Name,
            Position: Position,
        };
        database()
            .ref('posts/' + key)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};
