document.addEventListener("DOMContentLoaded", function (event) {
	loadCuentas();
  document.getElementById("botonTransferir").onclick=transferir;
  document.getElementById("botonIngresar").onclick=ingresar;
}); 

function loadCuentas()
{
	var url = "../../controller/controllerCuentas.php";

	fetch(url, {
	  method: 'GET', 
	})
	.then(res => res.json()).then(result => {
	
		console.log(result.cuentas);
		
		var cuentas=result.cuentas;
    var newRow2 = "<option value=''>Escoge una cuenta</option>";	
   		
		var newRow ="";
   		
   		for (let i = 0; i < cuentas.length; i++) {
							
			newRow += "<option value='"+cuentas[i].ref+"'>"+cuentas[i].ref+"</option>";	
		}
	 
		document.getElementById("potencial").innerHTML=newRow;

    //Esto es para dar estilo al combobox y que cargen bien las cuentas, si no se pone este codigo aqui no carga por cuestion de tiempos.
    $(".custom-select").each(function() {
      var classes = $(this).attr("class"),
        id = $(this).attr("id"),
        name = $(this).attr("name");
      var template = '<div class="' + classes + '">';
      template +=
        '<span id="custom-select-trigger" class="custom-select-trigger">' +
        $(this).attr("placeholder") +
        "</span>";
      template += '<div class="custom-options">';
      $(this)
        .find("option")
        .each(function() {
          template +=
            '<span class="custom-option ' +
            $(this).attr("class") +
            '" data-value="' +
            $(this).attr("value") +
            '">' +
            $(this).html() +
            "</span>";
        });
      template += "</div></div>";

      $(this).wrap('<div class="custom-select-wrapper"></div>');
      $(this).hide();
      $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(
      function() {
        $(this)
          .parents(".custom-options")
          .addClass("option-hover");
      },
      function() {
        $(this)
          .parents(".custom-options")
          .removeClass("option-hover");
      }
    );
    $(".custom-select-trigger").on("click", function() {
      $("html").one("click", function() {
        $(".custom-select").removeClass("opened");
      });
      $(this)
        .parents(".custom-select")
        .toggleClass("opened");
      event.stopPropagation();
    });
    $(".custom-option").on("click", function() {
      $(this)
        .parents(".custom-select-wrapper")
        .find("select")
        .val($(this).data("value"));
      $(this)
        .parents(".custom-options")
        .find(".custom-option")
        .removeClass("selection");
      $(this).addClass("selection");
      $(this)
        .parents(".custom-select")
        .removeClass("opened");
      $(this)
        .parents(".custom-select")
        .find(".custom-select-trigger")
        .text($(this).text());
    });

    //##############################################################################################################################
    var opciones= document.querySelectorAll(".custom-option");
    opciones.forEach(element => {
      element.addEventListener("click", guardarNumCuenta, false);
    });

    document.getElementById("cuenta2form").addEventListener("change", loadCuenta2, false);

	})
	.catch(error => console.error('Error status:', error));	
}

function guardarNumCuenta(evt) {
  var ref=evt.currentTarget.getAttribute("data-value");
  document.getElementById("numCuenta").value=ref;
  loadCuenta();
}

function loadCuenta() {

  var ref=document.getElementById("numCuenta").value;
	
	var url = "../../controller/controllerCuenta.php";
	var data = { 'ref':ref};

	fetch(url, {
	  method: 'POST', // or 'POST'
	  body: JSON.stringify(data), // data can be `string` or {object}!
	  headers:{'Content-Type': 'application/json'}  //input data
	  
	})
	.then(res => res.json()).then(result => {
	
		console.log(result.cuenta);
    document.getElementById("saldoCuenta").value=result.cuenta.saldo;
    document.getElementById("numCuenta").value=result.cuenta.ref;
    document.getElementById("saldo1").value=result.cuenta.saldo;
    document.getElementById("cuenta1form").value=result.cuenta.ref;
    document.getElementById("tipoCuenta").innerHTML=result.cuenta.type;
    document.getElementById("infoCuenta").style.padding="30px";
    document.getElementById("breadcrumbs2").style.height="200px";

    if (ref==document.getElementById("cuenta2form").value) {
      document.getElementById("saldo2").value=result.cuenta.saldo;
    }

    var txt= "<br><h5>Saldo "+result.cuenta.saldo+"€</h5>";
    var tablaMovim="    <thead>"
                 +   "<tr>"
                 +     "<th scope='col'>Fecha</th>"
                 +     '<th scope="col">Referencia</th>'
                 +     '<th scope="col">Concepto</th>'
                 +     '<th scope="col">Tipo</th>'
                 +     '<th scope="col">Importe</th>'
                 +     '<th scope="col">Saldo</th>'
                 +   '</tr>'
                 + '</thead>'
                 + '<tbody >';

            
    for (let i = 0; i < result.cuenta.ArrMovimientos.length; i++) {
      tablaMovim+="<tr>"
                +"<th scope='row'>"+result.cuenta.ArrMovimientos[i].fecha+"</th>"
                +"<td>"+result.cuenta.ArrMovimientos[i].ref+"</td>"
                +"<td>"+result.cuenta.ArrMovimientos[i].concepto+"</td>"
                +"<td>"+result.cuenta.ArrMovimientos[i].tipo+"</td>"
                +"<td>"+result.cuenta.ArrMovimientos[i].importe+"</td>"
                +"<td>"+result.cuenta.ArrMovimientos[i].saldo+"</td>"
              +"</tr>"
    }

    tablaMovim+="</tbody>";

    document.getElementById("mensajeNocuenta").style.display="none";
    document.getElementById("tablaMovim").innerHTML=tablaMovim;

    document.getElementById("infoCuenta").innerHTML=txt;
    

    //Para que cargue bien la tabla de los movimientos (en caso de escoger la cuenta estando el apartado de movimientos selecionado) hay que hacer lo siguiente:

    var filtroActivado=document.querySelectorAll(".filter-active");
    filtroActivado.forEach(element => {
      element.click();
    });

	})
	.catch(error => console.error('Error status:', error));	

  
}


function loadCuenta2(evt) {

  var ref=evt.currentTarget.value;
	
	var url = "../../controller/controllerCuenta.php";
	var data = { 'ref':ref};

	fetch(url, {
	  method: 'POST', // or 'POST'
	  body: JSON.stringify(data), // data can be `string` or {object}!
	  headers:{'Content-Type': 'application/json'}  //input data
	  
	})
	.then(res => res.json()).then(result => {
	
		console.log(result.cuenta);
   	
    document.getElementById("saldo2").value=result.cuenta.saldo;

	})
	.catch(error => console.error('Error status:', error));	

  
}

function loadCuenta3(evt) {

  var ref=evt.currentTarget.value;
	
	var url = "../../controller/controllerCuenta.php";
	var data = { 'ref':ref};

	fetch(url, {
	  method: 'POST', // or 'POST'
	  body: JSON.stringify(data), // data can be `string` or {object}!
	  headers:{'Content-Type': 'application/json'}  //input data
	  
	})
	.then(res => res.json()).then(result => {
	
		console.log(result.cuenta);
   	
    document.getElementById("saldo3").value=result.cuenta.saldo;

	})
	.catch(error => console.error('Error status:', error));	

  
}


function transferir()
{
	var url = "../../controller/cTransferirMisCuentas.php";
  var cuenta1=document.getElementById("cuenta1form").value;
  var importe=document.getElementById("importeform").value;
  var concepto=document.getElementById("conceptoform").value;
  var cuenta2=document.getElementById("cuenta2form").value;
  var saldo1=document.getElementById("saldo1").value;
  var saldo2=document.getElementById("saldo2").value;
  

	var data = { 'cuenta1':cuenta1 , 'importe':importe , 'concepto':concepto , 'cuenta2':cuenta2 , 'saldo1':saldo1 , 'saldo2':saldo2};

	fetch(url, {
	  method: 'POST', // or 'POST'
	  body: JSON.stringify(data), // data can be `string` or {object}!
	  headers:{'Content-Type': 'application/json'}  //input data
	  
	})
	.then(res => res.json()).then(result => {
	
		alert(result.error);
    if (result.error=="transferencia realizada con exito") {
      document.getElementById("importeform").value="";
      document.getElementById("conceptoform").value="";
      document.getElementById("saldo2").value=result.saldo2;
      loadCuenta();
    }

		
	})
	.catch(error => console.error('Error status:', error));	
}

function ingresar()
{
	var url = "../../controller/cIngresar.php";
  var cuenta=document.getElementById("numCuenta").value;
  var importe=document.getElementById("importe2form").value;
  var concepto=document.getElementById("concepto2form").value;
  var saldo=document.getElementById("saldoCuenta").value;
  

	var data = { 'cuenta':cuenta , 'importe':importe , 'concepto':concepto , 'saldo':saldo};

	fetch(url, {
	  method: 'POST', // or 'POST'
	  body: JSON.stringify(data), // data can be `string` or {object}!
	  headers:{'Content-Type': 'application/json'}  //input data
	  
	})
	.then( res => res.json()).then(result => {
	
		alert(result.error);

    document.getElementById("importe2form").value="";
    document.getElementById("concepto2form").value="";
    if (result.error=="Ingreso realizado con exito") {
      loadCuenta();
    }
    
		
	})
	.catch(error => console.error('Error status:', error));	
}
