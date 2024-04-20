const loginForm = document.getElementById('login--form')
const inputEmail = document.getElementById('email')
const inputPass = document.getElementById('password')
const formError = document.getElementById('form--error')
const openModal = document.getElementById('modal')
const userName = document.getElementById('user--name')

 const users = JSON.parse(localStorage.getItem('users')) || [];
 console.log(users)
 

const activeUser = JSON.parse(sessionStorage.getItem('activeUser'))
console.log(activeUser)

 const showUserName = () => {
   userName.textContent = `${activeUser?.name} ${activeUser?.lastName}` || '';
  };

// const showUserName = () => {
//     if (activeUser && activeUser.name && activeUser.lastName) {
//         userName.textContent = `Bienvenido, ${activeUser.name} ${activeUser.lastName}`;
//     } else {
//         userName.textContent = 'Bienvenido, Usuario';
//     }
// };

const saveToSessionStorage = (user) => {
    sessionStorage.setItem('activeUser', JSON.stringify(user))
}

const existingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim())
 }

const matchinPass = (input) => {
    const user = users.find(user => user.email === inputEmail.value.trim())

    return user.password === input.value.trim()
}

const empty = (input) => {
    return !input.value.trim().length;
}

const showError = (message) => {
    formError.textContent = message
}



const welcomeMessage = () => {
    modal.style.display = "block";

  setTimeout(() => {
        // Redirigir la página después de 3 segundos
        window.setTimeout(() => {
            window.location.href = "../pages/home.html";
        }, 5000); // 3000 milisegundos = 3 segundos
    }, 10000); // Esperar 1 segundo antes de comenzar a contar los 3 segundos
}

const validAccount = () => {
    let valid = false;

    if(empty(inputEmail)) {
        showError('Por favor llena los campos')
        return
    }

    if(!existingEmail(inputEmail)) {
        showError('El email ingresado no es valido')
        return
    }

    if(!matchinPass(inputPass)) {
        showError('Los datos ingresados no son correctos')
        return
    }

    if(empty(inputPass)) {
        showError('Por favor llena los campos')
        return
    }



    //funcion del modal aqui
    showUserName()
    welcomeMessage()
    valid = true;
    formError.textContent = ''
    
    return valid

}



const login = (e) => {
    e.preventDefault()

    if(validAccount()) {
        const user = users.find(user => user.email === inputEmail.value.trim())
        saveToSessionStorage(user)
        showUserName();
        welcomeMessage()
        

        setTimeout(()=> {
            window.location.href = "../pages/home.html";
        }, 3000); // 3000 milisegundos = 3 segundos
        }
    
    }


const init = () => {
    showUserName()
    loginForm.addEventListener('submit', login)

}

init();
