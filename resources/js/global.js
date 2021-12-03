$(document).ready(loadComponents);

async function loadComponents(){

    await getSession().then(async function(session) {
        await loadHeaderFooter();
        await loadContent(session);
        boostrapDropdown();
    })

}

function getRuta() {
    return $(location).attr('href').split('/').pop();
}

function index() {
    var index;
    switch (getRuta()) {
        case 'banca.html':
        case 'banca.html?':
        case 'banca.html#':
        case 'tienda.html':
        case 'tienda.html?':
        case 'tienda.html#':
        case 'error-page.html':
        case 'error-page.html?':
        case 'error-page.html#':
            index = '../../'
            break;

        default:
            index = '';
            break;
    }
    return index;
}

async function loadHeaderFooter(){
    return new Promise(async function (resolve,reject) {

       

        await new Promise ((resolve,reject)=> {
            $('#header').load(index()+'resources/pages/navbar.html', function(response,statusTxt, xhr){
            
                if(statusTxt == "success") {
                    switch (getRuta()) {
                        //!ESTA ES POR QUE NO TENEMOS EL HTML BIEN PUESTO EN SUSITIO Y LA REFERECIA CAMBIA PERO LUEGO USAREMOS LA DE ABAJO
                        default:
                            $('#casaR').attr('href', "");
                            $('#logoR').attr('src','resources/img/LOGO AirForce blanco.png');
                            $('#btnBanca').attr('href', "resources/pages/banca.html");
                            $('#btnTienda').attr('href', "resources/pages/tienda.html");
                        break; 
                        //! ESTA ES POR QUE NO TENEMOS EL HTML BIEN PUESTO EN SUSITIO Y LA REFERECIA CAMBIA PERO LUEGO USAREMOS LA DE ABAJO
                        
                        
                        case 'proyectoAirforce':
                            $('#casaR').attr('href', "");
                            $('#logoR').attr('src','resources/img/LOGO AirForce blanco.png');
                            $('#btnBanca').attr('href', "resources/pages/banca.html");
                            $('#btnTienda').attr('href', "resources/pages/tienda.html");
                            
                        break;
                
                        case 'banca.html':
                        case 'banca.html?':
                            $('#casaR').attr('href', "../../");
                            $('#casaI').attr('href', "../../");
                            $(this).removeClass('header-transparent')
                            $('#logoR').attr('src','../img/LOGO AirForce blanco.png');
                            $('#btnBanca').attr('href', "");
                            $('#btnTienda').attr('href', "../pages/tienda.html");
                        break;

                        case 'tienda.html':
                        case 'tienda.html?':
                            $('#casaR').attr('href', "../../");
                            $('#casaI').attr('href', "../../");
                            $(this).removeClass('header-transparent')
                            $('#logoR').attr('src','../img/LOGO AirForce blanco.png');
                            $('#btnBanca').attr('href', "../pages/banca.html");
                            $('#btnTienda').attr('href', "");
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
            $('#footer').load(index()+'resources/pages/footer.html', function(response, statusTxt, xhr){
                if (statusTxt == 'success') {
                    resolve();
                } else if (statusTxt == 'error') {
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
                    reject("Error: " + xhr.status + ": " + xhr.statusText);
                }
            })
        })

        resolve();

    })
}

function getSession() { //RECOGE LAS VARIABLES DE SESSION
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: index() +"controller/controllerIndex.php",
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
        $("#btnBanca").addClass("d-none"); //* OCULTA EL BOTON BANCA
        $("#btnTienda").addClass("d-none"); //* OCULTA EL BOTON TIENDA
        $("#dropdownLogin > a")[0].dataset.bsTarget = '#login'; //? ASIGNAR EL TARGET PARA MODAL LOGIN
        $("#dropdownLogin > a")[0].dataset.bsToggle = 'modal'; //? ASIGNAR EL TOGGLE PARA LA LLAMADA AL MODAL
        $("#dropdownLogin span").html('Login');  //? PONER LOGIN EN VEZ DE USERNAME EN EL BTN LOGIN 

    } else { //TODO *CON SESION*

        $("#dropdownLogin span").html(session['user']); //* MOSTRAMOS EL USUSARIO EN EL BOTON LOGIN
        $("#dropdownLogin ul").removeClass("d-none"); //* NOS DESACEMOS DEL BOTON LOGIN CON SU FUNCION
        $("#dropdownLogin > a")[0].dataset.bsTarget = '#'; //? QUITAMOS LA ASIGNACION TARGET PARA MODAL LOGIN
        $("#dropdownLogin > a")[0].dataset.bsToggle = ''; //? QUITAMOS LA ASIGNACION DEL TOGGLE PARA LA LLAMADA AL MODAL

        if (session['role'] == 'USER') {
            
            $("#btnTienda").removeClass("d-none");
            
        } else if (session['role'] == 'ADMIN') {
            
            $("#btnBanca").removeClass("d-none");
            $("#btnTienda").removeClass("d-none");
            
        }

        $("#dropdownLogin [name=logout]").on('click', logout); //! CREAMOS EL BOTON PAR HACER LA LLAMADA AL LOGOUT

    }
  
}

function boostrapDropdown() {
    const selectN = (el, all = false) => {
        el = el.trim()

        if (all) {
        return [...document.querySelectorAll(el)]
        }else if(el){
        return document.querySelector(el)
        }
    }

    const on = (type, el, listener, all = false) => {
        let selectEl = selectN(el, all)

        if (selectEl) {
            if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
            }else{
            selectEl.addEventListener(type, listener)
            }
        }
    }

    on('click', '.mobile-nav-toggle', function(e) {
        selectN('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })
}

function logout() {
    $.ajax({
        url: index() +"controller/controllerLogin.php",
        method: "GET",
        dataType: 'json',
        data:{
        request: 'logout'
        },
        success:function(response){
        console.log('logout');
        document.location.href = index();
        },
        error: function(xhr, textStatus, error){
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    
    })
}