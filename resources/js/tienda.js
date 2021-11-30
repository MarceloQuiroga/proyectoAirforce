$(document).ready(getProductos);

async function getProductos() {
    return new Promise ( (resolve, reject) => {
        $.ajax({
            url: index() + "controller/controllerProductos.php",
            method: "GET",
            dataType: 'json',
            success:function(response){

              console.group('PRODUCTOS')
                console.log(response.list)
              console.groupEnd();

              for (let i = 0; i < response.list.length; i++) {
                $('#listProductos').append(
                  "<div class='col producto px-0 border'>"+
                  "<img src='https://m.media-amazon.com/images/I/51TEcohAqHS._AC_SY355_.jpg' class='card-img-top' >"+
                    "<div class='car-title bg-light row py-2 mx-0'>"+
                      "<p class='h4 col m-0'>"+response.list[i].nombre+"</p>"+
                      "<p class='h5 col m-0 text-end'>"+response.list[i].precio+"</p>"+
                    "</div>"+
                  "</div>");
              }
                
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

$('#filtros input').on('change', loadProductsByFilters);

async function loadProductsByFilters() { //! CARGA LOS PRODUCTOS EN BASE LOS FILTROS

  var filters = getFiltersParams();
  if ( filters.filterStatus ) {
    console.log('Params Exist');
    console.log(filters);
  } else {
    console.log('Not Param Found');
    console.log(filters);
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
  