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


    $response=array();

    if ($ref1=="" || $ref1==null) {
        $msg="Ha habido un problema con la cuenta1";
    }elseif ($ref2=="" || $ref2==null) {
        $msg="Ha habido un probelma con la cuenta2";
    }elseif ($saldo1=="" || $saldo1==null) {
        $msg="Ha habido un error con el saldo1";
    }elseif ($saldo2=="" || $saldo2==null) {
        $msg="Ha habido un error con el saldo2";
    }elseif ($importe=="" || $importe==null || $importe=="0") {
        $msg="Introduce un importe valido";
    }elseif ($importe > $saldo1) {
        $msg="Saldo insuficiente";
    }elseif ($concepto=="" || $concepto==null) {
        $msg="Introduce un concepto";
    }else {

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
    
    
    $msg="transferencia realizada con exito";
    $response["saldo1"]=$newSaldo1;
    $response["saldo2"]=$newSaldo2;

    }

    $response["error"]=$msg;
    
    echo json_encode($response);
    
    unset($response);

?>