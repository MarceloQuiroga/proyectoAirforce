<?php
include_once ("../model/productoModelo.php");
$response = array();

if ( isset($_POST['solicitud']) ) {

    switch ( $_POST['solicitud'] ) {
        case 'getProductos':
            $productos = new productoModelo();
            $response['list'] = $productos->getProduts();
            $response['error'] = 'No Error';
            break;

        case 'getProductosByFilters':

            $productos = new productoModelo();

            $tag = '';
                
            if (isset($_POST['droneType'])) {
                $tag = $tag . $_POST['droneType'] . ',';
            }

            if (isset($_POST['droneSize'])) {
                $tag = $tag . $_POST['droneSize'] . ',';
            }

            $tag = substr($tag, 0, -1);

            // $response['debug'] = ;
            $response['list'] = $productos->getProductsByTag($tag);
            $response['error'] = 'No Error';
            break;

        case 'getProductsBySearch':

            if (isset($_POST['search'])) {
                $productos = new productoModelo();
                $search = $_POST['search'];
                $response['list'] = $productos->getProductsByName($search);
            } else {
                $response['error'] = 'Parametro Search perdida';
            }

            break;
        
        default:
            $response['error'] = 'Solicitud No Admitida';
            break;
    }

} else {
    $response['error'] = 'Solicitud No Encontrada';
}

echo json_encode($response);