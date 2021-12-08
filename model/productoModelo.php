<?php

if ($_SERVER['SERVER_NAME']== "bat.zerbitzaria.net") {
    include_once ("connect_data_SERV.php");
} else {
    include_once ("connect_data_LOCAL.php");
}

include_once ("producto_class.php");

class productoModelo extends producto_class {

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

     public function getProduts() {

        $this->OpenConnect();

        $sql = "SELECT * FROM productos";
        $result = $this->link->query($sql);         
        $list = array();

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        
            $newProduct = new productoModelo();

            $newProduct->cod=$row['cod'];
            $newProduct->nombre=$row['nombre'];
            $newProduct->descripcion=$row['descripcion'];
            $newProduct->precio=$row['precio'];
            $newProduct->tag=$row['tag'];

            array_push($list, $newProduct);
        
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
     }

     public function getProductsByTag($filters) {

          $this->OpenConnect();

          $sql = "SELECT * FROM productos WHERE tag ";

          foreach (explode(',', $filters) as $value) {
               $sql = $sql . " LIKE '%$value%' AND tag ";
          }
          $sql = substr($sql, 0, -9);
          
          $result = $this->link->query($sql);         
          $list = array();

          while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        
               $newProduct = new productoModelo();
   
               $newProduct->cod=$row['cod'];
               $newProduct->nombre=$row['nombre'];
               $newProduct->descripcion=$row['descripcion'];
               $newProduct->precio=$row['precio'];
               $newProduct->tag=$row['tag'];
   
               array_push($list, $newProduct);
           
           }
           mysqli_free_result($result);
           $this->CloseConnect();
           return $list;

     }

     public function getProductsByName($name) {

          $this->OpenConnect();

          $sql = "SELECT * FROM productos WHERE nombre LIKE '%$name%' ";
          $result = $this->link->query($sql);         
          $list = array();

          while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        
               $newProduct = new productoModelo();
   
               $newProduct->cod=$row['cod'];
               $newProduct->nombre=$row['nombre'];
               $newProduct->descripcion=$row['descripcion'];
               $newProduct->precio=$row['precio'];
               $newProduct->tag=$row['tag'];
   
               array_push($list, $newProduct);
           
           }
           mysqli_free_result($result);
           $this->CloseConnect();
           return $list;

     }


}