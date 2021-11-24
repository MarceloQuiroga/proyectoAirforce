
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
  var filterData = new Array;
  if (event.target.name == 'filterStatus') { //TODO *Verifica que es el boton filtro*
    if (event.target.checked) { //! Verifica que el boton esta activado
      filterData[event.target.name] = 'ON'
    } else {
      filterData[event.target.name] = 'OFF'
    }
  } else { //? Los otros filtros (NO BOTON DE ACTIVAR FILTRO)
    
    if (event.target.checked) { //TODO *Auto activa el filtro*
      if ($('[name=filterStatus]')[0].checked) {//! COMPRUEBA QUE NO ESTE ACTIVO
        filterData['filterStatus'] = 'ON'
      } else {
        $('[name=filterStatus]')[0].checked = true;
        filterData['filterStatus'] = 'ON'
      }
    }
    var filters = Array.from($('#filtros input'))
    filters.forEach(element => {//* RECORREMOS EL ARRAY PARA SACAR EL FILTRO ACTIVO
      if (!element.name == 'filterStatus') {
        if (element.checked) {
          if (filterData[element.name] == undefined) {
            filterData[element.name] = new Array(element.value);
          } else {
            filterData[element.name].push(element.value)
          }
        }
      }
    });
  }

  console.log(filterData);

  
   
  
    // if (event.target.checked) {
    //   var filters = Array.from($('#filtros input'))
    
    //   filters.forEach(element => {
    //     if (element.checked) {

    //       if (filterData[element.name] == undefined) {
    //         filterData[element.name] = new Array(element.value);
    //       } else {
    //         filterData[element.name].push(element.value)
    //       }

    //     }
    //   });
    // } else {
    //   filterData[event.target.name] = 'OFF'
    // }
  

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
  