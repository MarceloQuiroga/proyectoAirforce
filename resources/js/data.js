document.addEventListener("DOMContentLoaded", function (event) {
	loadCuentas();
  document.getElementById("botonTransferir").onclick=transferir;
  document.getElementById("botonTransferir2").onclick=transferir2;
  document.getElementById("botonIngresar").onclick=ingresar;
  document.getElementById("botonRetirar").onclick=retirar;
  $('#saldo1').focus(function(){
    this.blur();
  });
  $('#saldo2').focus(function(){
    this.blur();
  });
  $('#saldo3').focus(function(){
    this.blur();
  });
  $('#cuenta1form').focus(function(){
    this.blur();
  });
  $('#cuenta1form2').focus(function(){
    this.blur();
  });
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
    txt2 = "<option value='' hidden>Escoge una cuenta</option>";

   		
		var newRow ="";
   		
   		for (let i = 0; i < cuentas.length; i++) {
							
			newRow += "<option value='"+cuentas[i].ref+"'>"+cuentas[i].ref+"</option>";	
      txt2 += "<option value='"+cuentas[i].ref+"'>"+cuentas[i].ref+"</option>";
		}
	 
		document.getElementById("potencial").innerHTML=newRow;
    document.getElementById("cuenta2form").innerHTML=txt2;

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
    document.getElementById("saldo3").value=result.cuenta.saldo;
    document.getElementById("euro").value=" €";
    document.getElementById("euro3").innerHTML=" €";

    document.getElementById("cuenta1form").value=result.cuenta.ref;
    document.getElementById("cuenta1form2").value=result.cuenta.ref;


    if (ref==document.getElementById("cuenta2form").value) {
      document.getElementById("saldo2").value=result.cuenta.saldo;
    }

    var txt= "<div class='infoCuenta' data-aos='zoom-in' data-aos-delay='10'>" 
            /*+ "<h3 data-aos='fade-down' data-aos-delay='500'>Saldo</h3>"*/        
            +"<span data-aos='zoom-in' data-aos-delay='400' id='sald'><h5 class='TituloSaldoCirculo'>Saldo</h5><h5 class='FontSaldo'>"+result.cuenta.saldo+" €</h5></span>"
            +"</div>";
    
    var tablaMovim= "<table id='tablaMovim' style='text-align: center;' class='table' data-aos='fade-down' data-aos-delay='100'>"
            
    tablaMovim+="    <thead>"
                 +   "<tr>"
                 +     "<th scope='col' style='color:#18d26e;'>Fecha</th>"
                 +     '<th scope="col" style="color:#18d26e;">Referencia</th>'
                 +     '<th scope="col" style="color:#18d26e;">Concepto</th>'
                 +     '<th scope="col" style="color:#18d26e;">Tipo</th>'
                 +     '<th scope="col" style="color:#18d26e;">Importe</th>'
                 +     '<th scope="col" style="color:#18d26e;">Saldo</th>'
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
    tablaMovim+="</table>";

    document.getElementById("circuloSaldo").style.display="flex";
    document.getElementById("mensajeNocuenta").style.display="none";
    
    document.getElementById("DivTituloBanca").innerHTML="<h2 data-aos='fade-down' data-aos-delay='100' id='tipoCuenta'>"+result.cuenta.type+"</h2>"

    
    document.getElementById("tabla1").innerHTML=tablaMovim;

    document.getElementById("circuloSaldo").innerHTML=txt;
    document.getElementById("circuloSaldo").setAttribute('data-aos', 'fade-down');
    document.getElementById("circuloSaldo").setAttribute('data-aos-delay', '10');
    

    //Para que cargue bien la tabla de los movimientos (en caso de escoger la cuenta estando el apartado de movimientos ionado) hay que hacer lo siguiente:

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
    document.getElementById("euro2").value=" €";

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



function transferir2()
{
	var url = "../../controller/cTransferirOtraCuenta.php";
  var cuenta1=document.getElementById("cuenta1form2").value;
  var importe=document.getElementById("importeform2").value;
  var concepto=document.getElementById("conceptoform2").value;
  var IBAN=document.getElementById("cuenta2form2").value;
  var saldo=document.getElementById("saldo3").value;



  function fn_ValidateIBAN(IBAN) {

    //Se pasa a Mayusculas
    IBAN = IBAN.toUpperCase();
    //Se quita los blancos de principio y final.
    IBAN = IBAN.trim();
    IBAN = IBAN.replace(/\s/g, ""); //Y se quita los espacios en blanco dentro de la cadena

    var letra1,letra2,num1,num2;
    var isbanaux;
    var numeroSustitucion;
    //La longitud debe ser siempre de 24 caracteres
    if (IBAN.length != 24) {
        return false;
    }

    // Se coge las primeras dos letras y se pasan a números
    letra1 = IBAN.substring(0, 1);
    letra2 = IBAN.substring(1, 2);
    num1 = getnumIBAN(letra1);
    num2 = getnumIBAN(letra2);
    //Se sustituye las letras por números.
    isbanaux = String(num1) + String(num2) + IBAN.substring(2);
    // Se mueve los 6 primeros caracteres al final de la cadena.
    isbanaux = isbanaux.substring(6) + isbanaux.substring(0,6);

    //Se calcula el resto, llamando a la función modulo97, definida más abajo
    resto = modulo97(isbanaux);
    if (resto == 1){
        return true;
    }else{
        return false;
    }
  }

  function modulo97(iban) {
      var parts = Math.ceil(iban.length/7);
      var remainer = "";

      for (var i = 1; i <= parts; i++) {
          remainer = String(parseFloat(remainer+iban.substr((i-1)*7, 7))%97);
      }

      return remainer;
  }

  function getnumIBAN(letra) {
      ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return ls_letras.search(letra) + 10;
  }

  var validez = fn_ValidateIBAN(IBAN);

	var data = { 'cuenta1':cuenta1 , 'validez':validez , 'importe':importe , 'concepto':concepto , 'saldo':saldo};

	fetch(url, {
	  method: 'POST', // or 'POST'
	  body: JSON.stringify(data), // data can be `string` or {object}!
	  headers:{'Content-Type': 'application/json'}  //input data
	  
	})
	.then(res => res.json()).then(result => {
	
		alert(result.error);
    if (result.error=="transferencia realizada con exito") {
      document.getElementById("importeform2").value="";
      document.getElementById("conceptoform2").value="";
      document.getElementById("saldo3").value=result.saldo;
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

function retirar()
{
	var url = "../../controller/cRetirar.php";
  var cuenta=document.getElementById("numCuenta").value;
  var importe=document.getElementById("importe3form").value;
  var concepto=document.getElementById("concepto3form").value;
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
    if (result.error=="Retiro realizado con exito") {
      loadCuenta();
    }
    
		
	})
	.catch(error => console.error('Error status:', error));	
}
