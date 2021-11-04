<?php

if ($_SERVER['SERVER_NAME']== "bat.zerbitzaria.net") {
    include_once ("connect_data_SERV.php");
} else {
    include_once ("connect_data_LOCAL.php");
}

include_once ("usuario_class.php");

class usuario_model extends usuario_class {

     private $link;  // datu basera lotura - enlace a la bbdd  

     public function OpenConnect() {
          $konDat=new connect_data();
          try
          {
               $this->link=new mysqli($konDat->host,$konDat->userbbdd,$konDat->passbbdd,$konDat->ddbbname);
               // mysqli klaseko link objetua sortzen da dagokion konexio datuekin
               // se crea un nuevo objeto llamado link de la clase mysqli con los datos de conexión. 
          }
          catch(Exception $e)
          {
               echo $e->getMessage();
          }
          $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta 
                         //databasearen artean UTF -8 erabiltzera datuak trukatzeko
     }                   
          
     public function CloseConnect() {
          mysqli_close ($this->link);
     }

     /********* FUNCIONES **********/

     public function login() {

          $this->OpenConnect();
          
          $username=$this->username;
          $password=$this->password;

          $sql = "CALL spLogin('$username', '$password')";
          $result = $this->link->query($sql);
          
          if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
               return $row["Logged"];
          }     

          mysqli_free_result($result);
          $this->CloseConnect();

     }

     public function getUser(){
          $this->OpenConnect();
          $usuario = $this->usuario;
          $contrasenia = $this->contrasenia;

          $sql = "SELECT * FROM usuarios WHERE username='$usuario' AND `password`=$contrasenia";
          $result = $this->link->query($sql);

          if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
               return $row["Logged"];
          }          
          
          mysqli_free_result($result);
          $this->CloseConnect();

     }

     public function insertUser(){

          $this->OpenConnect();
          $usuario = $this->usuario;
          $contrasenia = $this->contrasenia;

          $sql = "INSERT INTO `usuarios`(`username`, `password`) VALUES ('$usuario','$contrasenia')";

          $result = $this->link->query($sql);

          if ($this->link->affected_rows == 1) {
          $msg = $sql." El usuario se ha registrado correctamente, numero de usuarios insertados: ".$this->link->affected_rows;
          } else {
          $msg = $sql." Fallo al registrar el usuario";
          }

          mysqli_free_result($result);
          $this->CloseConnect();


     }

}