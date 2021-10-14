<?php

	$name = $email = $message = "";
	$nameError = $emailError = $messageError = "";
	$isSuccess = false;
	$emailTo = "amanelaa@yahoo.com";

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$name = verifyInput($_POST["name"]);
		$email = verifyInput($_POST["email"]);
		$message = verifyInput($_POST["message"]);
		$isSuccess = true;
		$emailText = "";

		if(empty($name))
		{
			$nameError = "Please enter your name";
			$isSuccess = false;
		}
		else 
		{
			$emailText .= "Name: $name\n";
		}

		if(!isEmail($email)) 
		{
			$emailError = "Invalid email address entered!";
			$isSuccess = false;
		}
		else 
		{
			$emailText .= "Email: $email\n";
		}

		if(empty($message))
		{
			$messageError = "Please enter your message";
			$isSuccess = false;
		}
		else 
		{
			$emailText .= "Message: $message\n";
		}

		if($isSuccess)
		{	
			$headers = "From: $name <$email>\r\nReply to: $email";
			mail($emailTo, "A message from your website", $emailText, $headers);
			$name = $email = $message = "";

		}

	}

	function isEmail($var)
	{
		return filter_var($var, FILTER_VALIDATE_EMAIL);
	}

	function verifyInput($var) 
	{
		$var = trim($var);
		$var = stripslashes($var);
		$var = htmlspecialchars($var);
		return $var;
	}

?>

