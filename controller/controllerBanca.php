<?php
include_once ("../model/cuenta_model.php");
$response = array();

if ( isset($_POST["solicitud"]) ) {

    switch ($_POST["solicitud"]) {
        case 'deposit':
        case 'Withdrawal':
            if ( isset($_POST["importe"]) && isset($_POST["concepto"]) && isset($_POST["ref"]) ) {

                $ref= $_POST["ref"];
                $importe = $_POST["importe"];
                $concepto = $_POST["concepto"];

                $cuenta = new cuenta_model();    
                            
                if ( $cuenta->updateSaldo($ref,$importe) ) {
                    $response['cuenta'] = true;
                    $response['error'] = 'No Error';
                } else {
                    $response['error'] = 'Error al realizar la operación en la bbdd';
                }


            } else {
                $response['error'] = 'Parámetros no encontrados: Importe/Concepto';
            }
            break;
        
        default:
            $response['error'] = 'Solicitud No Admitida';
            break;
    }
    
} else {
    $response['error'] = 'Solicitud No Encontrada';
}

// $solicitud = $_POST["solicitud"];
// $importe = $_POST["importe"];
// $concepto = $_POST["concepto"];


echo json_encode($response);

?>