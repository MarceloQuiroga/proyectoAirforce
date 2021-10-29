<?php

include_once ("../model/usuario_model.php");

$usuario= new usuario_model();

$list=array();/*
$list=$usuario->setList(); */

$response=array();
$response['list']=$list; 
$response['error']="no error"; 

echo json_encode($response);

unset ($usuario);
unset ($list);