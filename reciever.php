<?php

$date = date("Y-m-d G:i:s T");
$assignment_id = $_POST['assignmentId'];
$hit_id = $_POST['hitId'];
$worker_id = $_POST['workerId'];
$turk_submit_to = $_POST['turkSubmitTo'];
$checked_yes = $_POST['checkedYes'];

$output = "{$date},{$assignment_id},{$hit_id},{$worker_id},{$checked_yes}\n";
file_put_contents("res_from_workers.csv", $output, FILE_APPEND);

echo $_POST['turkSubmitTo'];

?>