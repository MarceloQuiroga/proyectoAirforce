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
    var tiempo = formulario[2].value * formulario[3].value;
    var interes = (formulario[4].value/100)/tiempo;
    var bez = formulario[5].value;

    var calculo = (1-Math.pow(1+interes,-tiempo+1)) / interes;

    var salida = (cantidad * (1-Math.pow(1+interes,-1)));

    console.log(salida);

    //genTableInfo(formulario, salida);

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

        

    }

    console.log(txt);
    txt.innerHTML = genTxt; //INYECTA EL CODIGO GENERADO EN LA TABLA

}