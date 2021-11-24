

//-----Login
$('form.signIn').on('submit',()=>{
  var username = $('form.signIn input')[0].value;
  var password = $('form.signIn input')[1].value;
  login(username, password);
  return false;
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
      if (response['logged']) {
        $('#login').modal('hide');//cerrar modal
      } else {
        alert(response['error']);
      }
    },
    error: function(xhr, textStatus, error){
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
    }
  }).then(loadComponents)
}

$('#formContra').on('input',()=>{
  var password = $('#formContra').val(); 
  var progressPass = 0;

  //* TAMAÑO
  if($('#formContra').val().length < 8) {
    $('.v-pass')[0].classList.add('list-group-item-danger')
    $('.v-pass')[0].classList.remove('list-group-item-success')
    $('.v-pass-size').fadeIn('slow');
  } else {
    $('.v-pass')[0].classList.remove('list-group-item-danger')
    $('.v-pass')[0].classList.add('list-group-item-success')
    $('.v-pass-size').fadeOut('slow');
    
    progressPass++;
  }


  //TODO *ESPECIAL CHARACTER*
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
    $('.v-pass-char').fadeOut('slow');
    progressPass++;
  } else {
    $('.v-pass')[1].classList.add('list-group-item-danger')
    $('.v-pass')[1].classList.remove('list-group-item-success')
    $('.v-pass-char').fadeIn('slow');
  }


  //? NUMBER
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
    $('.v-pass-num').fadeOut('slow');
    progressPass++;
  } else {
    $('.v-pass')[2].classList.add('list-group-item-danger')
    $('.v-pass')[2].classList.remove('list-group-item-success')
    $('.v-pass-num').fadeIn('slow');
  }

  // PROGRESS
  if (progressPass == 0) {
    $('.progressPass').addClass('bg-secondary')
    $('.progressPass').removeClass('bg-danger')
    $('.progressPass').removeClass('bg-warning')
    $('.progressPass').removeClass('bg-success')
    $('.progressPass').css('width','33.3%')
    $('.progressPass').html('Password weak')
  } else if (progressPass == 1) {
    $('.progressPass').removeClass('bg-secondary')
    $('.progressPass').addClass('bg-danger')
    $('.progressPass').removeClass('bg-warning')
    $('.progressPass').removeClass('bg-success')
    $('.progressPass').css('width','33.3%')
    $('.progressPass').html('Password soft')
  } else if (progressPass == 2) {
    $('.progressPass').removeClass('bg-secondary')
    $('.progressPass').removeClass('bg-danger')
    $('.progressPass').addClass('bg-warning')
    $('.progressPass').removeClass('bg-success')
    $('.progressPass').css('width','66.6%')
    $('.progressPass').html('Password medium')
  } else if (progressPass == 3) {
    $('.progressPass').removeClass('bg-secondary')
    $('.progressPass').removeClass('bg-danger')
    $('.progressPass').removeClass('bg-warning')
    $('.progressPass').addClass('bg-success')
    $('.progressPass').css('width','100%')
    $('.progressPass').html('Password hard')
  } 

})

$('form.signUp').on('submit',(event)=>{
  console.log(1)
  event.preventClick;

  var user = $('#formUser').val();
  var password = $('#formContra').val();
  var passwordV = $('#formPasswordVerify').val();

  if(password != passwordV) { //Diferentes Password
    alert("Error Contraseña Diferentes")
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

  return false;

})


//-----End Register