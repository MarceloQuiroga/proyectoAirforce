$(document).ready(() => {
    $('#header').load('resources/pages/navbar.html', function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success") {

        var currentPosition = $(location).attr('href').split('/').pop();

        console.log(currentPosition);
        console.log($(''));
        switch (currentPosition) {
            //!ESTA ES POR QUE NO TENEMOS EL HTML BIEN PUESTO EN SUSITIO Y LA REFERECIA CAMBIA PERO LUEGO USAREMOS LA DE ABAJO
            case 'index.html':
                $('#casaR').attr('href', "");
                $('#logoR').attr('src','resources/img/LOGO AirForce.png');
                $('#botonBanca').attr('href', "resources/pages/banca.php");
            break; 
            //! ESTA ES POR QUE NO TENEMOS EL HTML BIEN PUESTO EN SUSITIO Y LA REFERECIA CAMBIA PERO LUEGO USAREMOS LA DE ABAJO
            
            
            case 'proyectoAirforce':
                $('#casaR').attr('href', "");
                $('#logoR').attr('src','resources/img/LOGO AirForce.png');
                $('#botonBanca').attr('href', "resources/pages/banca.php");
                
            break;

            case 'banca.html':
                $('#casaR').attr('href', "../");
                $('#logoR').attr('src','../img/LOGO AirForce.png');
                $('#botonBanca').attr('href', "");

            break;
        }

        }

        if(statusTxt == "error") {
        alert("Error: " + xhr.status + ": " + xhr.statusText);
        }

    })

})




// var pathArray = window.location.pathname.split('/')

// for (let i = 0; i < pathArray.length; i++) {
//     console.log(pathArray[5]);
// }
    