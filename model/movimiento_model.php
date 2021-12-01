<?php
if ($_SERVER['SERVER_NAME']== "bat.zerbitzaria.net") {
    include_once ("connect_data_SERV.php");
} else {
    include_once ("connect_data_LOCAL.php");
}

include_once ("movimiento_class.php");

class movimiento_model extends movimiento_class {

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
     
    
     public function getMovimientos(){

        $this->OpenConnect();
        $ref_cuenta=$this->ref_cuenta;
        $sql="SELECT * from registro WHERE ref_cuenta='$ref_cuenta' order by ref desc";
        $movimientos=array();
        
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {         
            //FILL LIST with all families
            $movimiento=new movimiento_model();
            $movimiento->ref=$row['ref'];
            $movimiento->fecha=$row['fecha'];
            $movimiento->titular=$row['titular'];
            $movimiento->importe=$row['importe'];
            $movimiento->ref_cuenta=$row['ref_cuenta'];
            $movimiento->tipo=$row['tipo'];
            $movimiento->saldo=$row['saldo'];
            $movimiento->concepto=$row['concepto'];

            //$arrmov = (array) $movimiento;
            
            array_push($movimientos, $movimiento);   
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $movimientos;

    }

    public function insertMov(){       

        $this->OpenConnect();

        $titular=$this->titular;
        $importe=$this->importe;
        $saldo=$this->saldo;
        $ref_cuenta=$this->ref_cuenta;
        $tipo=$this->tipo;
        $concepto=$this->concepto;

        $fecha=date("Y-m-d");

        $sql="INSERT INTO registro (fecha, titular, importe, ref_cuenta,  tipo, saldo, concepto) VALUES ('$fecha', '$titular', '$importe', '$ref_cuenta',  '$tipo', $saldo, '$concepto');";
        $result= $this->link->query($sql);
        $this->CloseConnect();

    }

    public function insertMovimiento(){       

        $this->OpenConnect();   

        $sql="INSERT INTO registro (fecha, titular, importe, ref_cuenta,  tipo, saldo, concepto) VALUES ('$this->fecha', '$this->titular', '$this->importe', '$this->ref_cuenta',  '$this->tipo', $this->saldo, '$this->concepto');";
        $result= $this->link->query($sql);
        return $result;

        $this->CloseConnect();

    }

}