<?php
    include('db_connect.php');

    $i = $_GET['index'];
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: DELETES");
    header('Content-Type: application/json');

    if(!is_null($i)){
        $result = $con->query("delete from tasks where id='$i'");
        if ($result) {
            echo '{';
                echo '"message": "Item was deleted"';
            echo '}';
        }
        else{
            echo '{';
                echo '"message": "Item was not deleted"';
            echo '}';
        }
    }
    else{
        $result = $con->query("delete from tasks where 1");
        if ($result) {
            echo '{';
                echo '"message": "Items were deleted"';
            echo '}';
        }
        else{
            echo '{';
                echo '"message": "Items were not deleted"';
            echo '}';
        }
    }
    $con->close();
?>