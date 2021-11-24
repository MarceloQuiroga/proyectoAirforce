<?php
include_once ("../model/productoModelo.php");
$response = array();

$productos = new productoModelo();
$productos = $productos->getProduts();
$response['list'] = $productos;

echo json_encode($response);