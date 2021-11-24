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
    
    $response=array();
    $msg="Ingreso realizado con exito";
    $response["error"]=$msg;

    echo json_encode($response);
    
    unset($response);

?>