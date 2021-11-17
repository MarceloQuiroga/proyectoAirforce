$(document).ready(loadComponents);

async function loadComponents(){
    await testAsync();
    getSession();
}

function testAsync(){
    return new Promise((resolve,reject)=>{

        var currentPosition = $(location).attr('href').split('/').pop();

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
        
        $('#footer').load(ruta+'pages/footer.html');

        resolve();
    })
}

function leerCookie(nombre) {
    var lista = document.cookie.split(";");
    for (i in lista) {
        var busca = lista[i].search(nombre);
        if (busca > -1) {micookie=lista[i]}
        }
    var igual = micookie.indexOf("=");
    var valor = micookie.substring(igual+1);
    return valor;
    }


function getSession() { //RECOGE LAS VARIABLES DE SESSION
    var session;
    console.log();
    
    var currentPosition = $(location).attr('href').split('/').pop();

        switch (currentPosition) {
    
            default:
                ruta = 'controller';
                document.cookie = "rutaHome=controller"
                console.log(leerCookie('rutaHome'));
                break;
        
            case 'banca.html':
                document.cookie = 'rutaBanca=../../../controller';
                console.log(leerCookie('rutaBanca'));
                break;
        }
    console.log("esto es la ruta: "+leerCookie('rutaBanca'))

    $.ajax({
      url: leerCookie('ruta')+"/controllerIndex.php",
      method: "GET",
      dataType: 'json',
      success:function(response){
        session = response['SESSION'];
      },
      error: function(xhr, textStatus, error){
          console.log(xhr.statusText);
          console.log(textStatus);
          console.log(error);
      }
    }).then(()=>{loadContent(session)})
}

function loadContent(session) { //GENERA EL COTENIDO EN FUNCION DE LA SESSION
    
    console.log(session); //*VEMOS LA VARIABLE DE SESIÓN*

    if (session == null) { //TODO *SIN SESION*
        
        $("#dropdownLogin ul").addClass("d-none"); //* OCULTA EL DROPDOWN
        $("#botonBanca").addClass("d-none"); //* OCULTA EL BOTON BANCA
        $("#dropdownLogin > a")[0].dataset.bsTarget = '#login'; //? ASIGNAR EL TARGET PARA MODAL LOGIN
        $("#dropdownLogin > a")[0].dataset.bsToggle = 'modal'; //? ASIGNAR EL TOGGLE PARA LA LLAMADA AL MODAL
         
    } else { //TODO *CON SESION*

        $("#dropdownLogin span").html(session['user']); //* MOSTRAMOS EL USUSARIO EN EL BOTON LOGIN
        $("#dropdownLogin ul").removeClass("d-none"); //* NOS DESACEMOS DEL BOTON LOGIN CON SU FUNCION
        $("#dropdownLogin > a")[0].dataset.bsTarget = '#'; //? QUITAMOS LA ASIGNACION TARGET PARA MODAL LOGIN
        $("#dropdownLogin > a")[0].dataset.bsToggle = ''; //? QUITAMOS LA ASIGNACION DEL TOGGLE PARA LA LLAMADA AL MODAL

        if (session['role'] == 'USER') {
            
            
            
        } else if (session['role'] == 'ADMIN') {
            
            $("#botonBanca").removeClass("d-none");
            
        }

        $("#dropdownLogin [name=logout]").on('click', logout); //! CREAMOS EL BOTON PAR HACER LA LLAMADA AL LOGOUT

    }
  
}

function logout() {
    $.ajax({
        url: "controller/controllerLogin.php",
        method: "GET",
        dataType: 'json',
        data:{
        request: 'logout'
        },
        success:function(response){
        console.log(response);
        $("#dropdownLogin span").html('Login');
        },
        error: function(xhr, textStatus, error){
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    
    }).then(getSession)
  }