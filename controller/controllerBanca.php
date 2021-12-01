<?php
include_once ("../model/cuenta_model.php");
include_once ("../model/movimiento_model.php");

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
                $cuenta->ref = $ref;
                $cuenta->getCuentaByRef();
                
                // $response['debug'] = $cuenta->updateSaldo($importe);
                            
                if ( $cuenta->updateSaldo($importe) ) {

                    $movimiento = new movimiento_model();
                    $movimiento->ref = $cuenta->ref;
                    $movimiento->titular = $cuenta->nombre;
                    $movimiento->importe = $importe;
                    $movimiento->ref_cuenta = $cuenta->ref;
                    $movimiento->tipo = $_POST["solicitud"];
                    $movimiento->saldo = $cuenta->saldo;
                    $movimiento->concepto = $concepto;
                    $movimiento->fecha = date("Y-m-d");

                    if ( $movimiento->insertMovimiento() ) {
                        $response['movimientoRegistrado'] = true;
                        $cuenta->getCuentaByRef();
                        $response['cuenta'] = $cuenta;
                        $response['error'] = 'No Error';
                    } else {
                        $response['error'] = 'Error registrar el movimiento';
                    }                    
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