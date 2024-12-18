var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkLinkInput = document.getElementById("bookmarkLink");

var bookmarkList = [];


if (localStorage.getItem("bookmarkContainer") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkContainer"));
  displayData();
}

function addBookmark() {
    const bookmarkName = bookmarkNameInput.value.trim();
    const bookmarkLink = bookmarkLinkInput.value.trim();

    if (bookmarkName === "" || bookmarkLink === "") {
        alert("Both fields are required!");
        return;
    }

    const pattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (!pattern.test(bookmarkLink)) {
        alert("Please enter a valid URL starting with http:// or https://");
        return;
    }

    const capitalizedBookmarkName = bookmarkName.charAt(0).toUpperCase() + bookmarkName.slice(1); //to make the first letter a capital

    const bookmark = {
        name: capitalizedBookmarkName,
        link: bookmarkLink
    };

    bookmarkList.push(bookmark);

    localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));

    clearForm();
    displayData();
}


function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkLinkInput.value = "";
}

function displayData() {
  var cartona = "";

  for (var i = 0; i < bookmarkList.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarkList[i].name}</td>
        <td><a href="${bookmarkList[i].link}" target="_blank" class="btn btn-success"> <i class="fa-solid fa-eye"></i> Visit</a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> Delete</button></td>
      </tr>
    `;
  }

  document.getElementById("display-Data").innerHTML = cartona;
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);

  localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
  displayData();
}
