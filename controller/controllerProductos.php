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
                $tag = $tag . 'droneType:' . $_POST['droneType'] . ',';
            }

            if (isset($_POST['droneSize'])) {
                $tag = $tag . 'droneSize:' . $_POST['droneSize'] . ',';
            }

            $response['debug'] = substr($tag, 0, -1);

            // if (isset($_POST['droneType']) || isset($_POST['droneSize'])) {

            //     if (isset($_POST['droneType'])) {
            //         $droneType = $_POST['droneType'];
            //     }

            //     if (isset($_POST['droneSize'])) {
            //         $droneSize = $_POST['droneSize'];;
            //     }

            // } else {
            //     $response['error'] = 'Error parametro de filtros no recibido';
            // }

            // $response['list'] = $productos->getProdutsByFilters();
            $response['error'] = 'No Error';
            break;
        
        default:
            $response['error'] = 'Solicitud No Admitida';
            break;
    }

} else {
    $response['error'] = 'Solicitud No Encontrada';
}

echo json_encode($response);