<?php

    include_once '../model/cuenta_model.php';
    include_once '../model/movimiento_model.php';

    $data=json_decode(file_get_contents("php://input"),true);

    $ref1=$data['cuenta1'];
    $importe=$data['importe'];
    $concepto=$data['concepto'];
    $ref2=$data['cuenta2'];
    $saldo1=$data['saldo1'];
    $saldo2=$data['saldo2'];
    $tipo="transferecnia";
    $titular="Airforce";


    $cuenta1=new cuenta_model();
    $cuenta1->ref=$ref1;
    $newSaldo1=($saldo1-$importe);
    $cuenta1->saldo=$newSaldo1;
    $cuenta1->updateCuenta();

    $cuenta2=new cuenta_model();
    $cuenta2->ref=$ref2;
    $newSaldo2=($saldo2+$importe);
    $cuenta2->saldo=($saldo2+$importe);
    $cuenta2->updateCuenta();

    $mov1=new movimiento_model();
    $mov1->titular=$titular;
    $mov1->importe="-". $importe;
    $mov1->saldo=$newSaldo1;
    $mov1->ref_cuenta=$ref1;
    $mov1->tipo=$tipo;
    $mov1->concepto=$concepto;
    $mov1->insertMov();

    $mov2=new movimiento_model();
    $mov2->titular=$titular;
    $mov2->importe="+". $importe;
    $mov2->saldo=$newSaldo2;
    $mov2->ref_cuenta=$ref2;
    $mov2->tipo=$tipo;
    $mov2->concepto=$concepto;
    $mov2->insertMov();
    
    $response=array();
    $msg="transferencia realizada con exito";
    $response["error"]=$msg;
    $response["saldo1"]=$newSaldo1;
    $response["saldo2"]=$newSaldo2;
    
    echo json_encode($response);
    
    unset($response);

?>