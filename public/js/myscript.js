//form validation
var oForm = document.getElementById("myForm");
var oShow = document.getElementById("show")
function validateForm() {
	for (var i = 0; i < oForm.elements.length; i++) {
		if (oForm.elements[i].type == "text" && oForm.elements[i].value == "") {
			oShow.innerHTML = "please input all relevant information";
			return false;
		}

	}
	//saveForm();
}
//get 64bit code from picture
function previewFile() {
	var preview = document.getElementById("image");
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();

	reader.addEventListener("load", function () {
		preview.src = reader.result;
		document.getElementById("write").innerHTML = reader.result;
	}, false);

	if (file) {
		reader.readAsDataURL(file);
	}
}
//initializing the array outside the functon
// var entry = [];
// //condition to retrieve data from memory
// if (localStorage.getItem("Json")) {
// 	entry = JSON.parse(localStorage.getItem("Json"))
// }
// console.log(entry);
//saving form into the memory
function saveForm() {

	var oJson = {
		"fname": "name1",
		"lname": "name2",
		"email": "vemail",
		"pnumber": "number",
		"vote": "0",
		"date": "o",
		"pimage": "o"
	}
	// initializing the json object key values
	oJson.fname = document.getElementById("fname").value;
	oJson.lname = document.getElementById("lname").value;
	oJson.email = document.getElementById("email").value;
	oJson.pnumber = document.getElementById("num").value;
	oJson.date = Date.parse(Date());
	//oJson.pimage = document.getElementById("write").innerHTML;
	entry.push(oJson);
	console.log(oJson);
	var sJson = JSON.stringify(entry);
	localStorage.setItem("Json", sJson);
}

//slide show 
var slideIndex = 0;
showSlides();

function showSlides() {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) { slideIndex = 1 }
	for (i = 0; i < slides.length; i++) {
		slides[i].className = slides[i].className.replace(" active", "");
	}
//	slides[slideIndex - 1].style.display = "block";
	setTimeout(showSlides, 3000); // Change image every 2 seconds
}