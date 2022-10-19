/*
Project Name: BridgeIt • Chat App
Author: Omiklo
Website: https://omiklo.com/
Contact: hello@omiklo.com
File: password addon Js File
*/

// password addon
document.getElementById('password-addon').addEventListener('click', function () {
	var passwordInput = document.getElementById("password-input");
	if (passwordInput.type === "password") {
		passwordInput.type = "text";
	} else {
		passwordInput.type = "password";
	}
});
