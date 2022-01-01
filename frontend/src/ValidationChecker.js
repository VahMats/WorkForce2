const validationFunctions = {
    email: ({email})=> emailValidation(email),
    username: ({username}) => usernameValidation(username),
    password: ({password}) => passwordValidation(password),
    confirmPassword: ({password, confirmPassword}) => confirmPasswordValidation(password, confirmPassword),
    firstName: ({firstName}) => nameValidation(firstName),
    lastName: ({lastName}) => nameValidation(lastName),
    gender: ({gender}) => genderValidation(gender),
    dateOfBirth: ({dateOfBirth}) => dateOfBirthValidation(dateOfBirth),
}

export default (data, validationType) => {
    const resultData = {
        fields: {},
        isValid: false,
        error: ''
    }

    if(!data) {
        resultData.error = 'Invalid Data.'
        return resultData
    }

    const isFieldsValid = contentValidation(data, validationType);

    if(!isFieldsValid.valid) {
        resultData.error = 'Please fill all required fields.'
        resultData.valid = isFieldsValid.valid
        return resultData
    }

    isFieldsValid.fieldData.forEach(type => {
        const validationFunction = validationFunctions[type];
        resultData.fields[type] = validationFunction(data)
    })

    const falseCurrent = Object.keys(resultData.fields).filter(e=>!resultData.fields[e].valid)
    resultData.isValid = falseCurrent.length ? false : true;
    let lastMessege = []
    falseCurrent.forEach(elem=>{lastMessege.push(elem)})
    resultData.error =  lastMessege
    return resultData

}

function contentValidation(data, type) {
    let isValid = false;
    const requiredRegister = ['gender', 'dateOfBirth', 'confirmPassword', 'password', 'email', 'username', 'lastName', 'firstName'];
    const requiredLogin = ['username', 'password'];
    const requiredEdit = ['gender', 'dateOfBirth', 'email', 'username', 'lastName', 'firstName'];

    let fieldData = ''

    switch (type) {
        case 'login':
            fieldData = requiredLogin;
            break
        case 'register':
            fieldData = requiredRegister;
            break
        case 'edit':
            fieldData = requiredEdit;
            break
    }
    // const fieldData = type === 'login' ? requiredLogin : requiredRegister

    const fields = Object.keys(data)
    console.log(fields)
    const filtered = fieldData.filter(elem => fields.includes(elem))

    switch (type) {
        case 'login':
            isValid = filtered.length === requiredLogin.length;
            break;
        case 'register':
            isValid = filtered.length === requiredRegister.length;
            break;
        case 'edit':
            isValid = filtered.length === requiredEdit.length;
            break;
    }

    // isValid = type === "login" ? filtered.length === requiredLogin.length : filtered.length === requiredRegister.length


    return {
        valid: isValid,
        fieldData
    };
}

function nameValidation(name) {
    if (name.length > 2) {
        return {
            valid: true,
            error: ''
        }
    }
    else return {
        valid: false,
        error: 'name'
    }
}

function emailValidation(email) {
    const sampleForEmail = /\S+@\S+\.\S+/
    if (sampleForEmail.test(email)) {
        return {
            valid: true,
            error: ''
        }
    }
    else return {
        valid: false,
        error: 'email'
    }
}

function usernameValidation(username) {
    if (username.length > 3) {
        return {
            valid: true,
            error: ''
        }
    }
    else return {
        valid: false,
        error: 'username'
    }
}

function genderValidation(gender) {
    if (gender.length !== 0){
        return {
            valid: true,
            error: ''
        }
    }
    else return {
        valid: false,
        error: 'gender'
    }
}

function dateOfBirthValidation(dateOfBirth) {
    if (dateOfBirth.length !== 0){
        return {
            valid: true,
            error: ''
        }
    }
    else return {
        valid: false,
        error: 'dateOfBirth'
    }
}

function passwordValidation(password) {
    const sampleForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

    // if (confirmPassword) {
    //     if (sampleForPassword.test(password) && confirmPassword === password) {
    //         return {
    //             valid: true,
    //             error: ''
    //         }
    //     }
    //     else return {
    //         valid: false,
    //         error: 'password'
    //     }
    // }

    if (sampleForPassword.test(password))  {
        return {
            valid: true,
            error: ''
        }
    }

    else return {
        valid: false,
        error: 'password'
    }
}

function confirmPasswordValidation (password, confirmPassword){
    const sampleForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    if (sampleForPassword.test(password) && confirmPassword === password) {
        return {
            valid: true,
            error: ''
        }
    }
    else return {
        valid: false,
        error: 'confirmPassword'
    }
}
