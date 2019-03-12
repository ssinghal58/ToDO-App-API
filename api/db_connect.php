<?php
    $con = mysqli_connect("127.0.0.1","root","goldtree9","todo") or die(mysqli_error($con));
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }
?>