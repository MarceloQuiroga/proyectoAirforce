$(document).ready(security);

async function security () {
    await getSession().then((session)=> {
        if (session == null) {
            document.location.href = ruta + 'resources/pages/error-page.html';
        } else if (session['role'] != 'ADMIN') {
            document.location.href = ruta + 'resources/pages/error-page.html';
        }     
    })
}