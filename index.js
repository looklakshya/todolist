show();
let add = document.getElementById("add");
add.addEventListener("click", update);

let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
   localStorage.clear();
   show();
});

function show() {
   let itemJsonArray = JSON.parse(localStorage.getItem("itemJson"));
   // Populate the DOM
   let tableBody = document.getElementById("tableBody");
   let str = "";
   if (itemJsonArray != null) {
      itemJsonArray.forEach((element, index) => {
         str += `<tr>
      <th scope="row">${index + 1}</th>
      <td>${element[0]}</td>
      <td>${element[1]}</td>
      <td><button class="btn btn-outline-danger btn-sm " onclick="del(${index})">Delete</button></td>
   </tr>`;
      });
   }
   tableBody.innerHTML = str;
}

function update() {
   console.log("Adding your Todo...");

   let title = document.getElementById("title").value;
   let desc = document.getElementById("desc").value;
   let itemJsonArray = [];

   if (localStorage.getItem("itemJson") == null) {
      itemJsonArray = [];
      if (title != "" && desc != "") {
         itemJsonArray.push([title, desc]);
      }
      localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
   } else {
      itemJsonArray = JSON.parse(localStorage.getItem("itemJson"));
      if (title != "" && desc != "") {
         itemJsonArray.push([title, desc]);
      }
      localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
   }

   // Populate the DOM
   let tableBody = document.getElementById("tableBody");
   let str = "";
   itemJsonArray.forEach((element, index) => {
      str += `<tr>
      <th scope="row">${index + 1}</th>
      <td>${element[0]}</td>
      <td>${element[1]}</td>
      <td><button class="btn btn-outline-danger btn-sm" onclick="del(${index})">Delete</button></td>
   </tr>`;
   });
   tableBody.innerHTML = str;
}

function del(index) {
   let itemJsonArray = JSON.parse(localStorage.getItem("itemJson"));
   itemJsonArray.splice(index, 1);
   localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
   console.log("Deleting...", index);
   show();
}
