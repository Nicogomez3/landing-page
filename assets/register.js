const registerForm = document.getElementById('register-form');
const inputName = document.getElementById('name');
const inputLastName = document.getElementById("lastName");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("password");
const inputPhone = document.getElementById("phone")


//Array de usuarios 

const users = JSON.parse(localStorage.getItem('users')) || []

//Funcion para guardar en el LS
const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users))
}


//Funciones auxiliares

//Funcion para validar que no esté vacio el input
const empty = (input) => {
    return !input.value.trim().length;
}

//Funcion para validar el largo del input

const between = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
}

//Funcion para validar mail

const emailValid = (input) => {
    const regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    return regex.test(input.value.trim())
}

//Funcion para validar password
 const passSecure = (input) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return regex.test(input.value.trim());
 }

 //Funcion para validar telefono

 const phoneValid = (input) => {
    const regex = /^(?:(?:\+|00)54[\s.-]?)?(?:(?:11|2\d)(?:(?:[\s.-]?\d){8})|(?:[1-9]\d{2,3})(?:(?:[\s.-]?\d){6,7}))$/;


    return regex.test(input.value.trim());
 }

 //Funcion para validar revisar que el usuario no exista en el array de Users

 const existingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim())
 }



//Funcion error/exito

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success')
    formField.classList.add('error');
    const error = formField.querySelector("small")
    error.style.display = "block";
    error.textContent = message;
}

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.style.display = "none";
    error.content = '';
}


const checkTextInput = (input) => {
    let valid = false;
    const minCh = 3;
    const maxCh = 25;


    if(empty(input)) {
       showError(input, "Este campo es obligatorio")
       return;
    }

    if(!between(input, minCh, maxCh)) {
        showError(input, `Este campo debe tener entre ${minCh} Y ${maxCh} caracteres `)
        return;
    }

    showSuccess(input)
    valid = true;
    return valid;
}

const checkEmail = (input) => {
    let valid = false;

    if(empty(input)) {
        showError(input, "Este campo es obligatorio")
        return;
    }

    if(!emailValid(input)) {
        showError(input, "El email no es valido")
        return
    }

    if(existingEmail(input)) {
        showError(input, "El email ingresado ya existe")
        return
    }

    showSuccess(input)
    valid = true;
    return valid;
}


const checkPassword = (input) => {
    let valid = false;

    if(empty(input)) {
        showError(input, "La contraseña es obligatoria")
        return
    }

    if(!passSecure(input)) {
        showError(input, "La contraseña debe contenter al menos 8 caracteres, 1 mayuscula, 1 minuscula, y un simbolo")
        return
    }

    showSuccess(input)
    valid = true;
    return valid;
}

const checkPhone = (input) => {
    let valid = false

    if(empty(input)) {
        showError(input, "El telefono o celular es obligatorio")
        return
    }

    if(!phoneValid(input)) {
        showError(input, "El telefono ingresado no es valido")
        return
    }

    showSuccess(input)
    valid = true;
    return valid;


}

const validateForm = (e) => {
    e.preventDefault()
    console.log(`form enviado`)

    let nameValid = checkTextInput(inputName);
    let lastNameValid = checkTextInput(inputLastName);
    let emailValid = checkEmail(inputEmail);
    let passValid = checkPassword(inputPass);
    let phoneValid = checkPhone(inputPhone);

    let validForm = nameValid && lastNameValid && emailValid && passValid && phoneValid;

    if(validForm) {
        users.push({
            name: inputName.value,
            lastName: inputLastName.value,
            email: inputEmail.value,
            password: inputPass.value,
            phone: inputPhone.value
        })
        saveToLocalStorage(users)
        alert(`te registraste con exito`)
        window.location.href = "login.html"
    }
}


const init = () => {
    registerForm.addEventListener('submit', validateForm)
    inputName.addEventListener('input', () => checkTextInput(inputName));
    inputLastName.addEventListener('input', () => checkTextInput(inputLastName));
    inputEmail.addEventListener('input', () => checkEmail(inputEmail));
    inputPass.addEventListener('input', () => checkPassword(inputPass));
    inputPhone.addEventListener('input', () => checkPhone(inputPhone));
    
}

init()


