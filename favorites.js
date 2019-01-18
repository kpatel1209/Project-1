//create a button
//use the button to add recipes to array
//
favorites = [];


console.log("hi");


<script src="https://www.gstatic.com/firebasejs/5.7.3/firebase.js"></script>
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAkaESYDbfE9ZxvDKUpWFHPuYiecA7RgxU",
    authDomain: "munchies-ea890.firebaseapp.com",
    databaseURL: "https://munchies-ea890.firebaseio.com",
    projectId: "munchies-ea890",
    storageBucket: "munchies-ea890.appspot.com",
    messagingSenderId: "589920849398"
};
firebase.initializeApp(config);

let database = firebase.database();


// use json id to pull info

let id = "";
let name = "";
let prep = "";
let diet = "";
let serv = "";

$("#submit").on("click", function (event) {

    name = $("#name").val();
    prep = $("#prep").val();
    diet = $("#diet").val();
    serv = $("#serv").val();

    database.ref().push({
        id: id,
        name: name,
        prep: prep,
        diet: diet,
        serv: serv,
    });
});

database.ref().on("child_added", function (snap) {
    console.log(snap.val().name);
    console.log(snap.val().prep);
    console.log(snap.val().diet);
    console.log(snap.val().serv)
})
$().append(`
    <tr>
        <th>${snap.val().name}</th>
        <th>${snap.val().prep}</th>
        <th>${snap.val().diet}</th>
        <th>${snap.val().serv}</th>
    </tr>`);
