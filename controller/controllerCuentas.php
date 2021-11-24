<?php

    include_once '../model/cuenta_model.php';
    
    $response=array();
    
    $cuenta=new cuenta_model();
    
    $response['cuentas']= $cuenta->getCuentas();
    
    echo json_encode($response);
    
    unset($response);