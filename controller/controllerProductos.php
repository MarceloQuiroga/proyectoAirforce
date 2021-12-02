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
        
        default:
            $response['error'] = 'Solicitud No Admitida';
            break;
    }

} else {
    $response['error'] = 'Solicitud No Encontrada';
}

echo json_encode($response);