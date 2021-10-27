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

    var txt = document.getElementById("tableInfo");
    txt.innerHTML = "";

    if (datos[dataType] == "prestamo") { //Bloque de datos procede desde Prestamos

        /*************************************************************************/

    } else if (datos[dataType] == "leasing") { //Bloque de datos procede desde Leasing

    }

    var genTxt = "";
    var interesCuota;
    var amortizacionCuota;
    var amortizacionCapital;
    var CapitalxAmortizar = formulario[1].value;

    for (var i = 0; i <= formulario[2].value; i++) {

        if (i == 0) {
            genTxt = "<tr>"
           +     "<th scope='row'>" + i + "</th>"
           +     "<td>---</td>"
           +     "<td>---</td>"
           +     "<td>---</td>"
           +     "<td>---</td>"
           +     "<td>" + formulario[1].value + " € </td>";

           txt.innerHTML = genTxt;

        } else {

            //FORMULAS
            interesCuota = CapitalxAmortizar * (formulario[3].value/100);
            amortizacionCuota = cuota - interesCuota;
            CapitalxAmortizar = CapitalxAmortizar - amortizacionCuota;
            amortizacionCapital = ((i == 1)?amortizacionCuota:amortizacionCuota + amortizacionCapital);
            //FORMULAS
            
            genTxt += "<tr>"
                    +     "<th>" + i + "</th>"
                    +     "<td>" + parseFloat(cuota).toFixed(2) + " € </td>"
                    +     "<td>" + parseFloat(interesCuota).toFixed(2) + " € </td>"
                    +     "<td>" + parseFloat(amortizacionCuota).toFixed(2) + " € </td>"
                    +     "<td>" + parseFloat(amortizacionCapital).toFixed(2) + " € </td>"
                    +     "<td>" + parseFloat(CapitalxAmortizar).toFixed(2) + " € </td>";

            console.log("interesCuota: " + i + " " +  interesCuota);
            console.log("amortizacionCuota: " + i + " " +  amortizacionCuota);
            console.log("amortizacionCapital: " + i + " " +  amortizacionCapital);
            console.log("CapitalxAmortizar: " + i + " " +  CapitalxAmortizar);

            console.log("debug: " + cuota)

        }
        
        
        
    }

    txt.innerHTML = genTxt;

    console.log(txt);

}