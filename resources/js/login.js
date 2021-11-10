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
    $("#dropdownLogin > a")[0].dataset.bsTarget = '#login';
    $("#dropdownLogin > a")[0].dataset.bsToggle = 'modal';

  }

}


//-----Login
$('form.signIn').on('submit',()=>{

  var username = $('form.signIn input')[0].value;
  var password = $('form.signIn input')[1].value;

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
        $('#login').show('hidden');
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

  return false;

})
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
$('form.signUp').on('submit',(event)=>{
  event.preventClick;

  var user = $('#formUser').val();
  var password = $('#formContra').val();
  var passwordV = $('#formPasswordVerify').val();

  if (password == passwordV) {
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
  }else{
    alert("Lo siento las contraseñas no son iguales por favor introduzca las contraseñas iguales.");
  }

  return false;

})


//-----End Register