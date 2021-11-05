$(document).ready(beginning);

function beginning(){
  scriptMarcelo();
  //scriptIñigo();
  //scriptImrane();
}

function preventClick(event){
    event.preventDefault();
    event.stopPropagation();
  }

function scriptMarcelo(){
  $('form#login')
    .off('click')
    .on('submit', login);
}

function login() {

    event.preventClick;
    
    $.ajax({
        url: "controller/controllerLogin.php",
        method: "GET",
        data:{
            username: $("form#login input")[0].value,
            password: $("form#login input")[1].value
        },
        success:function(response){
        console.log(response);
        },
        error: function(xhr, textStatus, error){
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    })
    
    return false;

}