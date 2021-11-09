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
  $('form#register')
    .off('click')
    .on('submit', register);
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

    document.getElementById("botonPrestamos").click();

    if(document.getElementById("tableInfoPrestamo")){
        document.getElementById('tablas').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        console.log("weeeeee");
    }else{
        alert("no se encutnra tabla");
    }

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
    
    //Cargar los productos del filter tambien despues de dar submit en el modal de prestamos y que asi nos aparezca la tabla;
    document.getElementById("botonPrestamos").click();

    return false;
}

function genTableInfo(datos) {

    if (datos["dataType"] == "prestamo") { //Bloque de datos procede desde Prestamos

        /******************************VARIABLES***********************************/
        /*txt = document.getElementById("tableInfoPrestamo");*/
        txt = "<table class='table mt-5>'"
            +   "<thead>"
            +       "<tr>" 
            +         "<th class='col'>N</th>"
            +         "<th class='col'>a</th>"
            +         "<th class='col'>I ᵢ</th>"
            +         "<th class='col'>A ᵢ</th>"
            +         "<th class='col'>K ᵢ</th>"
            +         "<th class='col'>C ᵢ</th>"
            +       "</tr>"
            +   "</thead>"
            +   "<tbody id='tableInfoPrestamo'>"
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
    
                txt += genTxt;                   
    
            } else {
    
                /****************************************FORMULAS*******************************************/
                interesCuota = CapitalxAmortizar * datos["interes"];
                amortizacionCuota = datos["cuota"] - interesCuota;
                CapitalxAmortizar = CapitalxAmortizar - amortizacionCuota;
                amortizacionCapital = ((i == 1)?amortizacionCuota:amortizacionCuota + amortizacionCapital);
                /*******************************************************************************************/
                
                txt  +=    "<tr>"
                        +     "<th>" + i + "</th>"
                        +     "<td>" + parseFloat(datos["cuota"]).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(interesCuota).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(amortizacionCuota).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(amortizacionCapital).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(CapitalxAmortizar).toFixed(2) + " € </td>";
    
                        
                console.log("debug: " + datos["cuota"]) //DEBUG TOOL
    
            }
            
            
        }

        txt += "</tbody>"
            + "</table>";

        document.getElementById("ComparacionTablas").innerHTML=txt;

    } else if (datos["dataType"] == "leasing") { //Bloque de datos procede desde Leasing

         /******************************VARIABLES***********************************/
         txt = "<table class='table mt-5>'"
            +   "<thead>"
            +       "<tr>" 
            +         "<th class='col'>N</th>"
            +         "<th class='col'>a</th>"
            +         "<th class='col'>IVA</th>"
            +         "<th class='col'>tot</th>"
            +         "<th class='col'>I ᵢ</th>"
            +         "<th class='col'>K ᵢ</th>"
            +         "<th class='col'>C ᵢ</th>"
            +       "</tr>"
            +   "</thead>"
            +   "<tbody id='tableInfoLeasing'>"
        var genTxt = "";
         var interesCuota;
         var amortizacion;
         var CapitalxAmortizar = datos["cantidad"];
         /*************************************************************************/

         

         for (var i = 0; i <= datos["tiempo"]; i++) {
         
            /****************************************FORMULAS*******************************************/
            interesCuota =  ((i == 0)?0:CapitalxAmortizar * datos["interes"]);
            amortizacion = ((i == 0)?datos["cuota"]:datos["cuota"]-interesCuota);
            CapitalxAmortizar = CapitalxAmortizar -amortizacion;
            /*******************************************************************************************/

            if (i == 0) {

                genTxt = "<tr>"
                +     "<th scope='row'>---</th>"
                +     "<td>---</td>"
                +     "<td>---</td>"
                +     "<td>---</td>"
                +     "<td>---</td>"
                +     "<td>---</td>"
                +     "<td>" + datos["cantidad"] + " € </td>";
     
                txt += genTxt; 
                
                txt  +=    "<tr>"
                        +     "<th>" + i + "</th>"
                        +     "<td>" + parseFloat(datos["cuota"]).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(datos["BEZ"]).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat((datos["cuota"]-datos["BEZ"])).toFixed(2) + " € </td>"
                        +     "<td> - </td>"
                        +     "<td>" + parseFloat(amortizacion).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(CapitalxAmortizar).toFixed(2) + " € </td>";
                
            }

            txt  +=    "<tr>"
                        +     "<th>" + i + "</th>"
                        +     "<td>" + parseFloat(datos["cuota"]).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(datos["BEZ"]).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat((datos["cuota"]-datos["BEZ"])).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(interesCuota).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(amortizacion).toFixed(2) + " € </td>"
                        +     "<td>" + parseFloat(CapitalxAmortizar).toFixed(2) + " € </td>";

        }

        console.log("debug: " + datos["BEZ"]) //DEBUG TOOL

        txt += "</tbody>"
            + "</table>";

        document.getElementById("ComparacionTablas").innerHTML=txt;

    }

    console.log(txt);

}

function login() {

    event.preventClick;
    
    $.ajax({
        url: "controller/controllerLogin.php",
        method: "GET",
        dataType: 'JSON',
        data:{
            username: $("form#login input")[0].value,
            password: $("form#login input")[1].value
        },
        success:function(response){
        console.log(response);
            
            if (response['logged']) {
                $('#loginbtn')[0].dataset.bsToggle = 'dropdown';
            }

        },
        error: function(xhr, textStatus, error){
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    })
    
    return false;

}

function scroll(params) {
    document.getElementById('tablas').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

// document.getElementById("tablas").onclick=scroll;

function register(event) {

    event.preventClick;

    var data = $("form#register input");

    if (data[1].value == data[2].value) {
        $.ajax({
            url: "controller/controllerRegister.php",
            method: "POST",
            data:{
                username: data[0].value,
                password: data[1].value
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
    }else{
        alert("Lo siento las contraseñas no son iguales por favor introduzca las contraseñas iguales.");
    }
    

    return false;
}