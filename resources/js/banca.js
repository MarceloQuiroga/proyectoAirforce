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
}
