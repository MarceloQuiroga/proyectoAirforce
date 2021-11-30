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
    banca();
}

async function banca() {
  test(await getCuentas());
}

function test(cuentas) {
  txt = '';
  txt2 = "<option value='' hidden>Escoge una cuenta</option>";
  cuentas.forEach(cuenta => {
    txt += "<option value='"+cuenta.ref+"'>"+cuenta.ref+"</option>";
    if (cuenta.ref!=document.getElementById("cuenta1form").value) {
      txt2 += "<option value='"+cuenta.ref+"'>"+cuenta.ref+"</option>";
    }
    
  });
  $("#cuentasList").html(txt);
  $("#cuenta2form").html(txt2);
}

function getCuentas() { // DEVUELVE LAS CUENTAS
    return new Promise((resolve, reject) => {
      $.ajax({
        url: index() +"controller/controllerCuentas.php",
        method: "GET",
        dataType: 'json',
        success:function(response){
            resolve(response.cuentas);
        },
        error: function(xhr, textStatus, error){
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
            reject();
        }
      })
    })
}


function delloadCuentas() {

	var url = "../../controller/controllerCuentas.php";

	fetch(url, {
	  method: 'GET', 
	})
	.then(res => res.json()).then(result => {
	
		console.log(result.cuentas);
		
		var cuentas=result.cuentas;
   		
		var newRow ="";
   		
   		for (let i = 0; i < cuentas.length; i++) {
							
			newRow += "<option value='"+cuentas[i].ref+"'>"+cuentas[i].ref+"</option>";	
		}
    console.log("He rellenado el combobox"); 		 
		document.getElementById("potencial").innerHTML=newRow;
    document.getElementById("cuenta2form").innerHTML=newRow;

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




