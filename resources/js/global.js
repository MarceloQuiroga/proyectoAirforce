$(document).ready(loadComponents);
var ruta;
async function loadComponents(){
    await load();
    await getSession().then((session)=> loadContent(session))
}

async function load(){
    return new Promise(async function (resolve,reject) {

        var currentPosition = $(location).attr('href').split('/').pop();
        console.log(currentPosition);

        switch (currentPosition) {
    
            case 'proyectoAirforce':
                ruta = '';    
                break;
        
            case 'banca.html' || 'banca.html?' || 'tienda.html' || 'tienda.html?':
                ruta = '../../'
                console.log(1);
                break;

            default:
                console.log('default');
                ruta = '';
                break;
        }

        await new Promise ((resolve,reject)=> {
            $('#header').load(ruta+'resources/pages/navbar.html', function(response,statusTxt, xhr){
            
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
                
                        case 'banca.html' || 'banca.html?' || 'tienda.html' || 'tienda.html?':
                            $('#casaR').attr('href', "../../");
                            $('#casaI').attr('href', "../../");
                            $(this).removeClass('header-transparent')
                            $('#logoR').attr('src','../img/LOGO AirForce blanco.png');
                            $('#botonBanca').attr('href', "");
                
                        break;
                    }
                    resolve();            
                }
            
                if(statusTxt == "error") {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
                reject("Error: " + xhr.status + ": " + xhr.statusText);
                }
            })
        })

        await new Promise ((resolve,reject) => {
            $('#footer').load(ruta+'resources/pages/footer.html', function(response, statusTxt, xhr){
                if (statusTxt == 'success') {
                    resolve();
                } else if (statusTxt == 'error') {
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
                    reject();
                }
            })
        })

        resolve();
    })
}

function getSession() { //RECOGE LAS VARIABLES DE SESSION
    return new Promise((resolve,reject)=>{

        var currentPosition = $(location).attr('href').split('/').pop();

        switch (currentPosition) {
    
            default:
                ruta = "";
                break;
        
            case 'banca.html':
                ruta = "../../"; 
                break;
            case 'banca.html?':
                ruta = "../../controller";
                break;
        }

        $.ajax({
            url: ruta+"controller/controllerIndex.php",
            method: "GET",
            dataType: 'json',
            success:function(response){
                resolve(response['SESSION']);
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

function loadContent(session) { //GENERA EL COTENIDO EN FUNCION DE LA SESSION
    
    console.group('SESSION'); 
        console.log(session); //*VEMOS LA VARIABLE DE SESIÓN*
    console.groupEnd();

    if (session == null) { //TODO *SIN SESION*
        $("#dropdownLogin ul").addClass("d-none"); //* OCULTA EL DROPDOWN
        $("#botonBanca").addClass("d-none"); //* OCULTA EL BOTON BANCA
        $("#dropdownLogin > a")[0].dataset.bsTarget = '#login'; //? ASIGNAR EL TARGET PARA MODAL LOGIN
        $("#dropdownLogin > a")[0].dataset.bsToggle = 'modal'; //? ASIGNAR EL TOGGLE PARA LA LLAMADA AL MODAL
        $("#dropdownLogin span").html('Login');  //? PONER LOGIN EN VEZ DE USERNAME EN EL BTN LOGIN 

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
        url: ruta+"controller/controllerLogin.php",
        method: "GET",
        dataType: 'json',
        data:{
        request: 'logout'
        },
        success:function(response){
        console.log(response);
        document.location.href = ruta;
        },
        error: function(xhr, textStatus, error){
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    
    })
}