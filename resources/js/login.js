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

  $.ajax({
    url: "controller/controllerLogin.php",
    method: "GET",
    dataType: 'JSON',
    data:{
      username: $('form.signIn input')[0].value,
      password: $('form.signIn input')[1].value
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

})