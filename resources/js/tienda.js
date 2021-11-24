
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

$('#filtros input').on('change',()=>{
  var filters = Array.from($('#filtros input'))
  var filterON = new Array;
  filters.forEach(element => {
    if (element.checked) {
      console.log(element.value);
      filterON[element.name] = element.value;
    }
  });
  console.log(filterON);
})

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
  