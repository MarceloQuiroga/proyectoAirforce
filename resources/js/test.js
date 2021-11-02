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
  $('form#genPrestamo')
    .off('click')
    .on('submit', genPrestamo);
  $('form#genLeasing')
    .off('click')
    .on('submit', genLeasing);
}

function genPrestamo(event) {
    event.preventClick;
    var formulario = Array.from($("form#genPrestamo .form-control"));
    
    formulario.forEach(element => {
        //console.log(element.value);
    });

    var cantidad = formulario[1].value;
    var tiempo = formulario[2].value;
    var interes = formulario[3].value/100;

    var calculo = (1-Math.pow(1+interes,-tiempo)) / interes;
    var cuota = (cantidad / calculo);

    var datos = {
        "dataType" : "prestamo",   
        "cantidad" : cantidad,
        "tiempo" : tiempo,
        "interes" : interes,
        "cuota" : cuota
    };

    genTableInfo(datos);

    return false;
}

function genLeasing(event) {
    event.preventClick;
    var formulario = Array.from($("form#genLeasing .form-control"));
    
    formulario.forEach(element => {
        //console.log(element.value);
    });

    var cantidad = formulario[1].value;
    var timeLapse = formulario[3].value;
    var tiempo = formulario[2].value * (12/timeLapse);
    var interes = (formulario[4].value / 100) / formulario[2].value;

    var calculo1 = cantidad * Math.pow((1+interes),-1);
    var calculo2 = (1-Math.pow(1+interes,-(tiempo+1))) / interes;
    
    var cuota = (calculo1 / calculo2);
    var BEZ = cuota * (formulario[5].value/100);

    var datos = {
        "dataType" : "leasing",
        "cantidad" : cantidad,   
        "timeLapse" : timeLapse,
        "tiempo" : tiempo,
        "interes" : interes,
        "BEZ" : BEZ,
        "cuota" : cuota
    };

    genTableInfo(datos);

    return false;
}

function genTableInfo(datos) {

    if (datos["dataType"] == "prestamo") { //Bloque de datos procede desde Prestamos

        /******************************VARIABLES***********************************/
        txt = document.getElementById("tableInfoPrestamo");
        var genTxt = "";
        var interesCuota;
        var amortizacionCuota;
        var amortizacionCapital;
        var CapitalxAmortizar = datos["cantidad"];
        /*************************************************************************/

        for (var i = 0; i <= datos["tiempo"]; i++) {

            if (i == 0) {
                genTxt = "<tr>"
               +     "<th scope='row'>" + i + "</th>"
               +     "<td>---</td>"
               +     "<td>---</td>"
               +     "<td>---</td>"
               +     "<td>---</td>"
               +     "<td>" + datos["cantidad"] + " € </td>";
    
               txt.innerHTML = genTxt;
    
            } else {
    
                /****************************************FORMULAS*******************************************/
                interesCuota = CapitalxAmortizar * datos["interes"];
                amortizacionCuota = datos["cuota"] - interesCuota;
                CapitalxAmortizar = CapitalxAmortizar - amortizacionCuota;
                amortizacionCapital = ((i == 1)?amortizacionCuota:amortizacionCuota + amortizacionCapital);
                /*******************************************************************************************/
                
                genTxt  +=    "<tr>"
                        +     "<th>" + i + "</th>"
                        +     "<td>" + parseFloat(datos["cuota"]).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(interesCuota).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(amortizacionCuota).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(amortizacionCapital).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(CapitalxAmortizar).toFixed(2) + " € </td>";
    
                console.log("debug: " + datos["cuota"]) //DEBUG TOOL
    
            }
            
        }

    } else if (datos["dataType"] == "leasing") { //Bloque de datos procede desde Leasing

         /******************************VARIABLES***********************************/
         txt = document.getElementById("tableInfoLeasing");
         var genTxt = "";
         var interesCuota;
         var amortizacion;
         var CapitalxAmortizar = datos["cantidad"];
         /*************************************************************************/

         genTxt = "<tr>"
               +     "<th scope='row'>" + i + "</th>"
               +     "<td>---</td>"
               +     "<td>---</td>"
               +     "<td>---</td>"
               +     "<td>---</td>"
               +     "<td>---</td>"
               +     "<td>" + datos["cantidad"] + " € </td>";
    
         txt.innerHTML = genTxt;

         for (var i = 0; i <= datos["tiempo"]; i++) {
         
            /****************************************FORMULAS*******************************************/
            interesCuota =  ((i == 0)?0:CapitalxAmortizar * datos["interes"]);
            amortizacion = ((i == 0)?datos["cuota"]:datos["cuota"]-interesCuota);
            CapitalxAmortizar = CapitalxAmortizar -amortizacion;
            /*******************************************************************************************/

            genTxt  +=    "<tr>"
                        +     "<th>" + i + "</th>"
                        +     "<td>" + parseFloat(datos["cuota"]).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(datos["BEZ"]).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat((datos["cuota"]-datos["BEZ"])).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(interesCuota).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(amortizacion).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(CapitalxAmortizar).toFixed(2) + " € </td>";

        }

        console.log("debug: " + datos["BEZ"]) //DEBUG TOOL

    }

    console.log(txt);
    txt.innerHTML = genTxt; //INYECTA EL CODIGO GENERADO EN LA TABLA

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