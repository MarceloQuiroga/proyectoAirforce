<?php

    include_once '../model/cuenta_model.php';

    $data=json_decode(file_get_contents("php://input"),true);
    $ref=$data['ref'];

    $cuenta=new cuenta_model();
    $cuenta->ref=$ref;

    $response=array();
    $response['cuenta']= $cuenta->getCuenta();
    
    echo json_encode($response);
    
    unset($response);

?>