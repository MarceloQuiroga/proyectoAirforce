$(document).ready(getProductos);

async function getProductos(filtros) {

  var data = {solicitud:'getProductos'};

  if (filtros != undefined && filtros.constructor === Object) {

    data = {solicitud:'getProductosByFilters'};
    data = Object.assign(data, filtros)
    
  }

  console.log(data);

  return new Promise ( (resolve, reject) => {
      $.ajax({
          url: index() + "controller/controllerProductos.php",
          method: "POST",
          dataType: 'json',
          data: data,
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

function loadProducts(productos) {  

  $('#listProductos').html('');
  
  productos.forEach(async producto => {

    var img = '';

    await new Promise ((resolve,reject)=> {
      $.get('../img/productos/' + producto.nombre + '.jpg', function(response,statusTxt, xhr){
        if ( statusTxt == 'success' ) {
          img = producto.nombre;
          resolve();
        }
      }).fail(()=>{img='default';resolve()})
    })

    $('#listProductos').append(
      "<div class='col producto px-0 border'>"+
      "<img src='../img/productos/"+img+".jpg' class='card-img-top' alt='Lo sentimos ha surgido un problema y no hemos podido traerle la imagen esperada.'>"+
        "<div class='car-title bg-light row py-2 mx-0'>"+
          "<p class='h4 col m-0'><a >"+producto.nombre+"</p>"+
          "<p class='h5 col m-0 text-end'>"+producto.precio+"€</p>"+
        "</div>"+
      "</div>");

    })

}

$('#filtros input').on('change', loadProductsByFilters);

async function loadProductsByFilters() { //! CARGA LOS PRODUCTOS EN BASE LOS FILTROS

  // var filters = getFiltersParams();
  var filters = chargeFilters();

  console.log(filters);

  if ( filters != undefined ) {
    getProductos(filters);
  } else {
    getProductos();
  }

}

function chargeFilters() {

  var filterData = {};
  var filters = Array.from($('#filtros input:not([name=filterStatus])'));

  var filterStatus = false;



  if ( event.target.name == 'filterStatus' ) {
    if ( event.target.checked ) {
      generateFilterData(filterData);
    }
  } else {
    generateFilterData(filterData);
  }

  function generateFilterData(filterData) { //! RETURN FILTERS

    var droneType = '';
    var droneSize = '';

    filters.forEach(filter => {
      if ( filter.checked ) {
        filterStatus = true;

        switch (filter.name) {
          case 'droneType':
            droneType += filter.value + ',';
            break;

          case 'droneSize':
            droneSize += filter.value + ',';
            break;
        
          default:
            break;
        }
      }
    });

    var newObj;

    if (droneType != '') {
      droneType = droneType.substr(0, droneType.length - 1)
      newObj = {droneType:droneType}
      filterData = Object.assign(filterData, newObj);
    }

    if (droneSize != '') {
      droneSize = droneSize.substr(0, droneSize.length - 1)
      newObj = {droneSize:droneSize}
      filterData = Object.assign(filterData, newObj);
    }

  }

  if ( filterStatus ) {
    $('[name=filterStatus]')[0].checked = true;
    return filterData;
  } else {
    $('[name=filterStatus]')[0].checked = false;
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
    console.log(filterData);

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

$('#buscador').on('input', getHelpBar);
function getHelpBar() {
  // PROXIMAMENTE...  
}

$('.btn-search').on('click', getProductosBySearch);

function getProductosBySearch() {

  console.log($('input[type="search"]'));

  var search = $('#buscador').val();

  if ( search.length == 0 ) {
    getProductos();
  } else {
    
    $.ajax({
      url: index() + "controller/controllerProductos.php",
      method: "POST",
      dataType: 'json',
      data: {
        solicitud: 'getProductsBySearch',
        search: $('#buscador').val()
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

  }

}

$('.order_by .dropdown-item').on('click',()=>{
  $.ajax({
    url: index() + "controller/controllerProductos.php",
    method: "POST",
    dataType: 'json',
    data: {
      solicitud: 'orderProducts',
      order: event.target.value
    },
    success:function(response){

      console.group('PRODUCTOS')
        console.log(response.list)
      console.groupEnd();

      loadProducts(response.list)

    },
    error: function(xhr, textStatus, error){
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
        reject(error);
    }
  })

})