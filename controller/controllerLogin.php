<?php

include_once ("../model/usuario_model.php");

$data=json_decode(file_get_contents("php://input"),true);

$username = $data['username'];
$password = $data['password'];

$user = new usuario_model();

$response = array(); //RETURN

if (isset($username) && isset($password)) {
    $user -> username = $username;
    $user -> password = $password;
    $login = $user -> login(); //VALIDACION LOGIN
    debug_to_console($login);
    if ($login == "true") {
        $response['logged'] = true;
        $response['error'] = "No Error";
    } else {
        $response['logged'] = false;
        $response['error'] = "Error: Wrong Password";
    }
} else {
    $response['Logged'] = false;
    $response['error']="Ez da username edo password pasatu/No se ha pasado el usuario o la contraseña";
}

function debug_to_console($data) {
    echo "<script>console.log('Debug Objects: " . $data . "' );</script>";
}
  
echo json_encode($response);

unset($response);
unset($user);

return $response;

?>