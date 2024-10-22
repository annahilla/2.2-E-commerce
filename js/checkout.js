
// Exercise 6
function validate(event) {
	event.preventDefault()

	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");

	const letters = /^[A-Za-z]+$/;
	const numbers = /^[0-9]+$/;

	// Validate fields entered by the user: name, phone, password, and email
	if (fName.value == "" || !fName.value.match(letters) || fName.value.length < 3) {
		fName.classList.add("is-invalid");
		error++;
	} else {
		fName.classList.remove("is-invalid");
	}

	if (fEmail.value == "" || fEmail.value.length < 3 || !fEmail.value.includes("@")) {
		fEmail.classList.add("is-invalid");
		error++;
	} else {
		fEmail.classList.remove("is-invalid");
	}

	if (fAddress.value == "" || fAddress.value.length < 3) {
		fAddress.classList.add("is-invalid");
		error++;
	} else {
		fAddress.classList.remove("is-invalid");
	}

	if (fLastN.value == "" || !fLastN.value.match(letters) || fLastN.value.length < 3) {
		fLastN.classList.add("is-invalid");
		error++;
	} else {
		fLastN.classList.remove("is-invalid");
	}

	if (fPassword.value == "" || fPassword.value.length < 3 || fPassword.value.search(letters) == 0 || fPassword.value.search(numbers) == 0) {
		fPassword.classList.add("is-invalid");
		error++;
	} else {
		fPassword.classList.remove("is-invalid");
	}

	if (fPhone.value == "" || fPhone.value.length !== 9 || !fPhone.value.match(numbers)) {
		fPhone.classList.add("is-invalid");
		error++;
	} else {
		fPhone.classList.remove("is-invalid");
	}

	if (error > 0) {
		alert("Error");
	} else {
		alert("OK");
	}

}
