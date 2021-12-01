$(document).ready(getProductos);

async function getProductos() {
    return new Promise ( (resolve, reject) => {
        $.ajax({
            url: index() + "controller/controllerProductos.php",
            method: "POST",
            dataType: 'json',
            data: {
              solicitud: 'getProductos'
            },
            success:function(response){

              console.group('PRODUCTOS')
                console.log(response.list)
              console.groupEnd();

              loadProducts(response.list)
                
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

async function loadProducts(productos) {
  
  productos.forEach(producto => {

    var img = '';

    $.get('../img/productos/' + producto.nombre + '.jpg').then(function (response,statusTxt, xhr) {
      if (statusTxt == 'success') {
        img = producto.nombre;
      } else {
        img = 'default';
      }

      $('#listProductos').append(
        "<div class='col producto px-0 border'>"+
        "<img src='../img/productos/"+img+".jpg' class='card-img-top' alt='Lo sentimos ha surgido un problema y no hemos podido traerle la imagen esperada.'>"+
          "<div class='car-title bg-light row py-2 mx-0'>"+
            "<p class='h4 col m-0'><a >"+producto.nombre+"</p>"+
            "<p class='h5 col m-0 text-end'>"+producto.precio+"€</p>"+
          "</div>"+
        "</div>");
      });

    })

}

$('#filtros input').on('change', loadProductsByFilters);

async function loadProductsByFilters() { //! CARGA LOS PRODUCTOS EN BASE LOS FILTROS

  var filters = getFiltersParams();
  if ( filters.filterStatus ) {
    console.log('Params Exist');
    console.log(filters);
  } else {
    console.log('Not Param Found');
    getProductos();
  }

}


function getFiltersParams() { //! RETURN FILTERS

  var filterData = new Array;
  var filters = Array.from($('#filtros input:not([name=filterStatus])'))
  var filterStatus = false;

  if ( event.target.name == 'filterStatus' ) {
    if ( event.target.checked ) {
      filterStatus = true;
      generateFilterData(filterData);
    } else {
      filterData['filterStatus'] = false
    }
  } else {
    generateFilterData(filterData);
  }
  
  function generateFilterData(filterData) { //! RETURN FILTERS
    filters.forEach(filter => {
      if ( filter.checked ) {
        filterStatus = true;
        if (filterData[filter.name] == undefined) { //TODO Bloque destinado a los filtros
          filterData[filter.name] = new Array(filter.value);
        } else {
          filterData[filter.name].push(filter.value)
        }

      }
    });
    if ( filterStatus ) {
      filterData['filterStatus'] = true
      $('[name=filterStatus]')[0].checked = true;
    } else {
      filterData['filterStatus'] = false
      $('[name=filterStatus]')[0].checked = false;
    }
  }

  return filterData;
}

$('#reset-type').click(()=>{ //! CLEAR TYPE-FILTER AND CALL LOADPRODUCTSBYFILTER
  var filtro = $('#collapseDronType').children(".form-check");
  Array.from(filtro).forEach(element => {
    element.children[0].checked = false;
    $('[name=filterStatus]')[0].checked
  });
  loadProductsByFilters();
})

$('#reset-size').click(()=>{ //! CLEAR SIZE-FILTER AND CALL LOADPRODUCTSBYFILTER
  var filtro = $('#collapseDronSize').children(".form-check");
  Array.from(filtro).forEach(element => {
    element.children[0].checked = false;
  });
  loadProductsByFilters();
})
  