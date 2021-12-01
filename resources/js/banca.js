$(document).ready(security);

async function security () {
    await getSession().then((session)=> {
        if (session == null) {
            alert('ERROR PORFAVOR LOGEATE EN EL SISTEMA')
            document.location.href = ruta;
        } else if (session['role'] != 'ADMIN') {
            alert('NO TIENES ACCESO A LA BANCA')
            document.location.href = ruta;
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