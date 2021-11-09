$(".log-in").click(function(){
    $(".signIn").addClass("active-dx");
    $(".signUp").addClass("inactive-sx");
    $(".signUp").removeClass("active-sx");
    $(".signIn").removeClass("inactive-dx");
  });
  
  $(".back").click(function(){
    $(".signUp").addClass("active-sx");
    $(".signIn").addClass("inactive-dx");
    $(".signIn").removeClass("active-dx");
    $(".signUp").removeClass("inactive-sx");
  });


$('form.signIn').on('submit',()=>{

  var username = $('form.signIn input')[0].value;
  var password = $('form.signIn input')[1].value;

  $.ajax({
    url: "controller/controllerLogin.php",
    method: "GET",
    dataType: 'JSON',
    data:{
      username: username,
      password: password
    },
    success:function(response){
      console.log(response);
      // $("[data-bs-target='#login'] a")[0].innerHTML = "hola"; //! ESTO SERIA OTRA MANERA DE HACERLO
      if (response['logged']) {
        $("#dropdownLogin span").html(username);
        $("#dropdownLogin ul").removeClass("d-none");
      }
    },
    error: function(xhr, textStatus, error){
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
    }
})

  return false;

})

$("#dropdownLogin [name=logout]").on('click', ()=>{
  
  $.ajax({
    url: "controller/controllerLogin.php",
    method: "GET",
    dataType: 'JSON',
    data:{
      logout: true
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

})