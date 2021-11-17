$(document).ready(() => {
    var currentPosition = $(location).attr('href').split('/').pop();
    var ruta;
    
    switch (currentPosition) {

        case 'proyectoAirforce':
            ruta = 'resources/';    
            break;
    
        case 'banca.html':
            ruta = '../'
            break;
            
        default:
            ruta = 'resources/';
            break;
    }


    $('#header').load(ruta+'pages/navbar.html', function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success") {

        var currentPosition = $(location).attr('href').split('/').pop();

        switch (currentPosition) {
            //!ESTA ES POR QUE NO TENEMOS EL HTML BIEN PUESTO EN SUSITIO Y LA REFERECIA CAMBIA PERO LUEGO USAREMOS LA DE ABAJO
            default:
                $('#casaR').attr('href', "");
                $('#logoR').attr('src','resources/img/LOGO AirForce.png');
                $('#botonBanca').attr('href', "resources/pages/banca.html");
            break; 
            //! ESTA ES POR QUE NO TENEMOS EL HTML BIEN PUESTO EN SUSITIO Y LA REFERECIA CAMBIA PERO LUEGO USAREMOS LA DE ABAJO
            
            
            case 'proyectoAirforce':
                $('#casaR').attr('href', "");
                $('#logoR').attr('src','resources/img/LOGO AirForce.png');
                $('#botonBanca').attr('href', "resources/pages/banca.html");
                
            break;

            case 'banca.html':
                $('#casaR').attr('href', "../../");
                $('#casaI').attr('href', "../../");
                $(this).removeClass('header-transparent')
                $('#logoR').attr('src','../img/LOGO AirForce blanco.png');
                $('#botonBanca').attr('href', "");

            break;
        }

        }

        if(statusTxt == "error") {
        alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
    })

    $('#footer').load(ruta+'pages/footer.html')
})




// var pathArray = window.location.pathname.split('/')

// for (let i = 0; i < pathArray.length; i++) {
//     console.log(pathArray[5]);
// }
    