<?php

    include_once '../model/cuenta_model.php';
    include_once '../model/movimiento_model.php';

    $data=json_decode(file_get_contents("php://input"),true);

    $ref1=$data['cuenta1'];
    $importe=$data['importe'];
    $concepto=$data['concepto'];
    $validez=$data['validez'];
    /*$ref2=$data['cuenta2'];*/
    $saldo1=$data['saldo'];
    $tipo="transferecnia";
    $titular="Airforce";


    $response=array();

    if ($ref1=="" || $ref1==null) {
        $msg="Ha habido un problema con la cuenta1";
    }elseif ($saldo1=="" || $saldo1==null) {
        $msg="Ha habido un error con el saldo1";
    }elseif ($importe > $saldo1) {
        $msg="Saldo insuficiente";
    }elseif ($importe=="" || $importe==null || $importe=="0") {
        $msg="Introduce un importe valido";
    }elseif ($concepto=="" || $concepto==null) {
        $msg="Introduce un concepto";
    }elseif (!$validez) {
        $msg="Numero de cuenta no valido";
    }else {

    $cuenta1=new cuenta_model();
    $cuenta1->ref=$ref1;
    $newSaldo1=($saldo1-$importe);
    $cuenta1->saldo=$newSaldo1;
    $cuenta1->updateCuenta();


    $mov1=new movimiento_model();
    $mov1->titular=$titular;
    $mov1->importe="-". $importe;
    $mov1->saldo=$newSaldo1;
    $mov1->ref_cuenta=$ref1;
    $mov1->tipo=$tipo;
    $mov1->concepto=$concepto;
    $mov1->insertMov();
    
    
    $msg="transferencia realizada con exito";
    $response["saldo"]=$newSaldo1;

    }

    $response["error"]=$msg;
    
    echo json_encode($response);
    
    unset($response);

?>