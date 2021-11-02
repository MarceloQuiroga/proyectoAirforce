<?php
include_once ("connect_data.php");
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
     return $this->link->query($sql);
     
     $this->CloseConnect();

}

}