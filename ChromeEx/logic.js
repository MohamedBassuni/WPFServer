var totalPages = 0;

document.addEventListener('DOMContentLoaded', (event) => {
	ShowHideSpinner(false);
	showSucessMessage(false);
	showErrorMessage(false);
	LoadData(1);
	document.getElementById('syncButton').addEventListener("click", function () {
		syncData();
	});

})

function LoadData(pageNumber) {
	showSucessMessage(false);
	showErrorMessage(false);
	getUsers(pageNumber).then(function (value) {
		fillTableData(value['data']);
		drawPagination(value['page'], value['total_pages']);
		this.totalPages = value['total_pages'];
		assignClickEventToAnchor();
	});
}

function fillTableData(data) {
	var rows = [];
	for (var i = 0; i < data.length; i++) {
		var tr = "<tr>" +
			"<td>" + data[i]["email"] + "</td>"
			+ "<td>" + data[i]["first_name"] + "</td>"
			+ "<td>" + data[i]["last_name"] + "</td>"
			+ "<td><img src='" + data[i]["avatar"] + "'height=50 width=50></img></td>"
			+ "</tr>";
		rows.push(tr);
	}
	document.getElementById('dataTable').getElementsByTagName('tbody')[0].innerHTML = rows.join(" ");
}

function drawPagination(currentPage, totalPages) {

	document.getElementById('paging').innerHTML = '';

	var previousPageNumber = currentPage - 1 < 1 ? 1 : currentPage - 1;
	var nextPageNumber = currentPage + 1 > totalPages ? totalPages : currentPage + 1;

	var previousLi = '<li class="page-item"><a class="page-link" href="#" data-value="' + previousPageNumber + '">&laquo;</a></li>';
	var nextLi = '<li class="page-item"><a  class="page-link" href="#" data-value="' + nextPageNumber + '">&raquo;</a></li>';

	var li = previousLi;

	for (var i = 1; i <= totalPages; i++) {
		var activePageClass = i == currentPage ? "page-item active" : "page-item";
		li += '<li class="' + activePageClass + '"><a class="page-link" href="#" data-value="' + i + '">' + i + '</a></li>';
	}

	li += nextLi;
	document.getElementById('paging').innerHTML = li;
}

function assignClickEventToAnchor() {
	let elementsArray = document.getElementsByClassName('page-link');
	if (elementsArray)
		for (var i = 0; i < elementsArray.length; i++) {
			elementsArray[i].addEventListener("click", function () {
				LoadData(this.dataset.value);
			});
		}
}

function syncData() {
	showSucessMessage(false);
	showErrorMessage(false);
	ShowHideSpinner(true)
	getAllUser().then(function (users) {
		var url = "http://localhost:5000/api/users/PostUsers";
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", url);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.onreadystatechange = function () {
			if (xhttp.status == 200) {
				showSucessMessage(true);
			}
			else {
				showErrorMessage(true);
			}
			ShowHideSpinner(false)
		}
		xhttp.send(JSON.stringify(users));
	});


}

async function getAllUser() {
	let promise = new Promise(function (myResolve) {
		var users = [];
		for (var i = 1; i <= totalPages; i++) {
			getUsers(i).then(function (value) {
				for (var j = 0; j < value.data.length; j++) {
					users.push(value.data[j])
				}
				if (value['page'] == totalPages)
					myResolve(users);
			});
		}
	});
	return promise;
}

async function getUsers(pageNumber) {
	let promise = new Promise(function (myResolve) {
		var url = "https://reqres.in/api/users?page=" + pageNumber;
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4) {
				myResolve(JSON.parse(xhttp.response));
			}
		}
		xhttp.send();
	});
	return promise;
}

function ShowHideSpinner(showSpinner) {

	var spinner = document.getElementById("spinner");
	var paging = document.getElementById("pagination");

	if (showSpinner) {
		spinner.style.display = "block";
		paging.style.display = "none";
	} else {
		spinner.style.display = "none";
		paging.style.display = "block";
	}
}

function showSucessMessage(showMessage) {
	var sucessAlter = document.getElementById("sucessAlter");
	var errorAlter = document.getElementById("errorAlter");

	if (showMessage) {
		sucessAlter.style.display = "block";
		errorAlter.style.display = "none";
	} else {
		sucessAlter.style.display = "none";
		errorAlter.style.display = "none";
	}
}

function showErrorMessage(showMessage) {
	var sucessAlter = document.getElementById("sucessAlter");
	var errorAlter = document.getElementById("errorAlter");

	if (showMessage) {
		sucessAlter.style.display = "none";
		errorAlter.style.display = "block";
	} else {
		sucessAlter.style.display = "none";
		errorAlter.style.display = "none";
	}
}