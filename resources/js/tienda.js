
$(document).ready(getProductos);

async function getProductos() {
    return new Promise ( (resolve, reject) => {
        $.ajax({
            url: index() + "controller/controllerProductos.php",
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
                reject(error);
            }
          })
    })
}

$('#reset-type').click(()=>{
  var filtro = $('#collapseDronType').children(".form-check");
  Array.from(filtro).forEach(element => {
    element.children[0].checked = false;
  });
})

$('#reset-size').click(()=>{
  var filtro = $('#collapseDronSize').children(".form-check");
  Array.from(filtro).forEach(element => {
    element.children[0].checked = false;
  });
})
  
