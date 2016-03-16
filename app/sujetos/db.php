<?php
   /*
   * Collect all Details from Angular HTTP Request.
   */ 
    $mysqli = new mysqli("localhost", "root", "root", "tac3_bd");
    if ($mysqli->connect_errno) {
      $result = "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }
    else{
      $postdata = file_get_contents("php://input");
      if ($request = json_decode($postdata)){
        //write
        @$op = $request->op;
        switch ($op){
          case 'a': 
            @$lastname = $request->lastname;
            @$firstname = $request->firstname;
            @$dni = $request->dni;
            @$birthdate = $request->birthdate;
            $sql = "INSERT INTO `subjects`
                    (lastname, firstname, dni, birthdate)
                    VALUES('$lastname', '$firstname', '$dni', '$birthdate')";
          break;
          case 'b': 
            @$id = $request->id;
            $sql = "DELETE FROM `subjects`
                    WHERE id = '$id'";
          break;
          case 'm': 
            @$id = $request->id;
            @$lastname = $request->lastname;
            @$firstname = $request->firstname;
            @$dni = $request->dni;
            @$birthdate = $request->birthdate;
            $sql = "UPDATE `subjects`
                    SET lastname = '$lastname', 
                      firstname = '$firstname', 
                      dni = '$dni',
                      birthdate = '$birthdate'
                    WHERE id = '$id'";
          break;

        }

        if (!$mysqli->query($sql))
          $result = "Table query failed: (" . $mysqli->errno . ") " . $mysqli->error;
        else
          $result = "TODO OK";
        
      }
      else{
        //read
        $sql ="SELECT * from subjects";
        $myArray = array();
        if ($result = $mysqli->query($sql)) {
            $tempArray = array();
            while($row = $result->fetch_object()) {
                    $tempArray = $row;
                    array_push($myArray, $tempArray);
                }
            $result = json_encode($myArray);
        }
      }
    }

    echo $result;
    
    
?>