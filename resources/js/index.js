
$(document).ready(getProductos);

async function getProductos() {
    return new Promise ( (resolve, reject) => {
        $.ajax({
            url: "controller/controllerProductos.php",
            method: "GET",
            dataType: 'json',
            success:function(response){

              console.log(response);
              resolve();

            },
            error: function(xhr, textStatus, error){
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
                resolve(error);
            }
          })
    })
}
