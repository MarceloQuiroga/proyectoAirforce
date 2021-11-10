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

          $sql = "CALL spLogin('$this->username', '$this->password')";
          $result = $this->link->query($sql);
          $loged = false;          
          
          if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            
            
               $this->cod=$row['cod'];
               $this->username=$row['username'];
               $this->password=$row['password'];
               $this->role=$row['role'];
               $this->cod_cliente=$row['cod_cliente'];

               $loged = true;
            
          }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $loged;
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

     public function findUser(){
          $this->OpenConnect();
          $username = $this->username;

          $sql = "SELECT * FROM usuarios WHERE username='$username'";
          $result = $this->link->query($sql);

          if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
               return $row["Exists"] = true;
          }else{
               return $row["Exists"] = false;
          }
          
          $this->CloseConnect();

     }

     public function register(){

          $this->OpenConnect();
          $usuario = $this -> username;
          $password = $this -> password;

          $sql = "INSERT INTO `usuarios`(`username`, `password`) VALUES ('$usuario','$password')";

          $result = $this->link->query($sql);

          $this->CloseConnect();
          return $result;

     }

}