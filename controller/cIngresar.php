<?php

    include_once '../model/cuenta_model.php';
    include_once '../model/movimiento_model.php';

    $data=json_decode(file_get_contents("php://input"),true);

    $ref=$data['cuenta'];
    $importe=$data['importe'];
    $concepto=$data['concepto'];
    $saldo=$data['saldo'];
    $tipo="Ingreso";
    $titular="Airforce";

    $response=array();

    if ($importe=="" || $importe==null || $importe=="0") {
        $msg="Introduce un importe valido";
    }elseif ($concepto=="" || $concepto==null) {
        $msg="Introduce un concepto";
    }else {

        $cuenta=new cuenta_model();
        $cuenta->ref=$ref;
        $newSaldo=($saldo+$importe);
        $cuenta->saldo=$newSaldo;
        $cuenta->updateCuenta();
    
        $mov=new movimiento_model();
        $mov->titular=$titular;
        $mov->importe="+". $importe;
        $mov->saldo=$newSaldo;
        $mov->ref_cuenta=$ref;
        $mov->tipo=$tipo;
        $mov->concepto=$concepto;
        $mov->insertMov();       
        
        $msg="Ingreso realizado con exito";
    }


    $response["error"]=$msg;

    echo json_encode($response);
    
    unset($response);

?>