$(document).ready(getSession);

function getSession() { //RECOGE LAS VARIABLES DE SESSION
  var session;
  $.ajax({
    url: "controller/controllerIndex.php",
    method: "GET",
    dataType: 'json',
    success:function(response){
      session = response['SESSION'];
    },
    error: function(xhr, textStatus, error){
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
    }
  }).then(()=>{loadContent(session)})
}

function loadContent(session) { //GENERA EL COTENIDO EN FUNCION DE LA SESSION
  console.log(session);

  if (session != null) {
    console.log('Second Time Mode')

    $("#dropdownLogin span").html(session['user']);
    $("#dropdownLogin > a")[0].dataset.bsTarget = '#';
    $("#dropdownLogin > a")[0].dataset.bsToggle = '';
    $("#botonBanca").removeClass("d-none");
    $("#dropdownLogin ul").removeClass("d-none");

    if (session['role'] == 1) { //ADMIN MODE


      $('[data-target=banca]').removeClass("d-none");

    }


  } else { //FIRST TIME
    console.log('First Time Mode')
    $("#dropdownLogin ul").addClass("d-none");
    $("#botonBanca").addClass("d-none");
    $("#dropdownLogin > a")[0].dataset.bsTarget = '#login';
    $("#dropdownLogin > a")[0].dataset.bsToggle = 'modal';

  }

}


//-----Login
$('form.signIn').on('submit',()=>{
  var username = $('form.signIn input')[0].value;
  var password = $('form.signIn input')[1].value;
  login(username, password);
})

function login(username, password) {

  $.ajax({
    url: "controller/controllerLogin.php",
    method: "GET",
    dataType: 'json',
    data:{
      request: 'login',
      username: username,
      password: password
    },
    success:function(response){
      console.log(response);
      // $("[data-bs-target='#login'] a")[0].innerHTML = "hola"; //! ESTO SERIA OTRA MANERA DE HACERLO
      if (response['logged']) {
        $('#login').modal('hide');
        //cerrar modal
      } else {
        alert(response['error']);
      }
    },
    error: function(xhr, textStatus, error){
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
    }
  }).then(getSession)
}

//-----End Login

//-----Logout
$("#dropdownLogin [name=logout]").on('click', ()=>{
  
  $.ajax({
    url: "controller/controllerLogin.php",
    method: "GET",
    dataType: 'json',
    data:{
      request: 'logout'
    },
    success:function(response){
      console.log(response);
      $("#dropdownLogin span").html('Login');
    },
    error: function(xhr, textStatus, error){
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
    }

}).then(getSession)

})
//-----End Logout


//-----Register

function register () {

}

$('#formContra').on('input',()=>{

  var key = event.data;
  var password = $('#formContra').val();

  /*TAMAÑO*/
  if($('#formContra').val().length >= 8) {
    $('.v-pass')[0].classList.remove('list-group-item-danger')
    $('.v-pass')[0].classList.add('list-group-item-success')
  } else {
    $('.v-pass')[0].classList.add('list-group-item-danger')
    $('.v-pass')[0].classList.remove('list-group-item-success')
  }


  /*ESPECIAL CHARACTER*/
  var specialsChar = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
  var specialCharacterStatus = false;
  for(var i = 0; i < Array.from(password).length && !specialCharacterStatus; i++) {
    if(Array.from(specialsChar).indexOf(Array.from(password)[i]) != "-1"){//Verifica si contiene un caracter especial
      specialCharacterStatus = true;
    } else {
      specialCharacterStatus = false;
    }
  }
  if(specialCharacterStatus){
    $('.v-pass')[1].classList.remove('list-group-item-danger')
    $('.v-pass')[1].classList.add('list-group-item-success')
  } else {
    $('.v-pass')[1].classList.add('list-group-item-danger')
    $('.v-pass')[1].classList.remove('list-group-item-success')
  }

  /*NUMBER*/
  var hasNumber = false;
  for(var i = 0; i < Array.from($('#formContra').val()).length && !hasNumber; i++) {
    if (!isNaN(Array.from(password)[i])) {
      hasNumber = true;
    } else {
      hasNumber = false;
    }
  }
  if (hasNumber) {
    $('.v-pass')[2].classList.remove('list-group-item-danger')
    $('.v-pass')[2].classList.add('list-group-item-success')
  } else {
    $('.v-pass')[2].classList.add('list-group-item-danger')
    $('.v-pass')[2].classList.remove('list-group-item-success')
  }

  
  
  

})

$('form.signUp').on('submit',(event)=>{
  event.preventClick;

  var user = $('#formUser').val();
  var password = $('#formContra').val();
  var passwordV = $('#formPasswordVerify').val();

  if(password != passwordV) { //Diferentes Password
    $("span.validation").removeClass("d-none");
    $("span.validation")[0].innerHTML = "Error Contraseña Diferentes";
  } else {
    if (password.length < 8) { //Verifica si la contraseña es mayor a 8
      $("span.validation").removeClass("d-none");
      $("span.validation")[0].innerHTML = "La contraseña tiene que tener minimo 8 digitos.";
    } else {
      var character = false;
      for(var i = 0; i < Array.from(password).length && character == false; i++) {
        if(Array.from(specialsChar).indexOf(Array.from(password)[i]) != "-1"){//Verifica si contiene un caracter especial
          character = true;
        }
      }
      var passwordVerify = false;
      for(var i = 0; i < Array.from(password).length && passwordVerify == false; i++) {
        if(!isNaN(Array.from(password)[i])){ //Verifica si contiene un numero
          passwordVerify = true;
        }
      }
  
      if (passwordVerify == false || character == false){
        $("span.validation").removeClass("d-none");
        $("span.validation")[0].innerHTML = "La contraseña requiere de minimo un numero y un caracter especial.";
      } else {
        $.ajax({
          url: "controller/controllerRegister.php",
          method: "POST",
          dataType: 'JSON',
          data:{
              username: user,
              password: password
          },
          success:function(response){
            console.log(response);
            
            if(response['registered']) {
              login(user,password)
            }
      
            if (response['debug'] != null) {
              alert(response['debug']);
            }
      
          },
          error: function(xhr, textStatus, error){
              console.log(xhr.statusText);
              console.log(textStatus);
              console.log(error);
          }
        })
      }
    }
  }

  return false;

})


//-----End Register