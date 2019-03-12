<?php
    include('./db_connect.php');
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");

    // $row = json_decode(file_get_contents("php://input"));

    $caption = $_POST['caption'];

    if(!empty(trim($caption))){
        
        $result = $con->query("insert into tasks values(null,'$caption',0)") or die(mysqli_error($con));
    
        echo '{';
            echo '"message": "Item was created"';
        echo '}';
    }
    else{
        echo '{';
            echo '"message": "Item was not created"';
        echo '}';
    }
    $con->close();
?>