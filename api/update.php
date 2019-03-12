<?php
    include('./db_connect.php');
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");

    parse_str(file_get_contents("php://input"));

    if(!empty(trim($updatedCaption))){
        
        $result = $con->query("update tasks set caption='$updatedCaption', is_completed='$is_completed' where id='$id'") or die(mysqli_error($con));
    
        echo '{';
            echo '"message": "Item was updated"';
        echo '}';
    }
    else{
        echo '{';
            echo '"message": "Item was not updated"';
        echo '}';
    }
    $con->close();
?>