$(document).ready(security);

async function security () {
    await getSession().then((session)=> {
        if (session == null) {
          document.location.href = index() + 'resources/pages/error-page.html';
        } else if (session['role'] != 'ADMIN') {
            document.location.href = index() + 'resources/pages/error-page.html';
        }     
    })
    
}

$('form#formIngr').on('submit', makeDeposit)
$('form#formReti').on('submit', makeWithdrawal)

function makeDeposit() {
  $.ajax({
    url: index() +"controller/controllerBanca.php",
    method: "POST",
    dataType: 'json',
    data: {
      solicitud: 'deposit',
      ref: $('#custom-select-trigger').html(),
      importe: "+"+$('form#formIngr input')[0].value,
      concepto: $('form#formIngr input')[1].value
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

function makeWithdrawal() {
  $.ajax({
    url: index() +"controller/controllerBanca.php",
    method: "POST",
    dataType: 'json',
    data: {
      solicitud: 'Withdrawal',
      ref: $('#custom-select-trigger').html(),
      importe: "-"+$('form#formReti input')[0].value,
      concepto: $('form#formReti input')[1].value
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