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

  $("#dropdownLogin [name=logout]").on('click', logout);

}