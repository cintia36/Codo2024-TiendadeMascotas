const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePasswordStrength = (password) => {
  var re = /^\w+$/;
  if (!re.test(field.value)) {
      return false;
  }
  return true;
}

const validarContrasenia = (password) => {
  const passString = new String(password);
  const isFilled = !passString || passString.trim() !== '';
  // const minLengthOk = passString.length < 6;
  // const strenghtOk = validatePasswordStrength(passString);
  return isFilled; // && minLengthOk && strenghtOk;
}

const addForm= document.getElementById("form-validation");
addForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  e.stopPropagation();
  let hayError = false;
  const usuarioField = document.getElementById("usuario");
  const smallUsuario = document.getElementById("errorMail");
  const email = usuarioField.value;
  const contraseniaField = document.getElementById("contrasenia");
  const smallPassword = document.getElementById("errorContrasenia");
  const password = contraseniaField.value;

  if(!email || !validateEmail(email)) {
    hayError=true;
    smallUsuario.classList.add('has-error');
  } else {
    smallUsuario.classList.remove('has-error')
  }

  if(!password || !validarContrasenia(password)) {
    hayError=true;
    smallPassword.classList.add('has-error');
  } else {
    smallPassword.classList.remove('has-error')
  }

  return hayError;
  
});