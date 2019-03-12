<?php
    include('db_connect.php');

    $i = $_GET['index'];
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header('Content-Type: application/json');
    
    if(!is_null($i)){
        $row_arr = array();
        $result = $con->query("select * from tasks where id='$i'") or die(mysqli_error($con));
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            array_push($row_arr, [  "id" =>  $row['id'],
                                    "caption" => $row['caption'],
                                    "is_completed" => $row['is_completed']
                                 ]
            );
            echo json_encode($row_arr);
        }
        else{
            echo '{';
                echo '"message": "No such item"';
            echo '}';
        }
    }
    else{
        $row_arr = array();
        $result = $con->query("select * from tasks") or die(mysqli_error($con));
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($row_arr, [  "id" =>  $row['id'],
                                        "caption" => $row['caption'],
                                        "is_completed" => $row['is_completed']
                                     ]
                );
            }
            echo json_encode($row_arr);
        }
        else{
            echo '{';
                echo '"message": "No item"';
            echo '}';
        }
    }
    $con->close();
?>