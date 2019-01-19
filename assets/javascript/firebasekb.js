
    console.log("hello from firebase.js");
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCnqpZZJikXCjzHKhDph_QqTHDGXO3WJiQ",
        authDomain: "munchies-70217.firebaseapp.com",
        databaseURL: "https://munchies-70217.firebaseio.com",
        projectId: "munchies-70217",
        storageBucket: "munchies-70217.appspot.com",
        messagingSenderId: "147067036281"
    };

    firebase.initializeApp(config);

    firebase.auth().signInWithEmailAndPassword("jsatlien@gmail.com", "jackwashere").then(function(user) {
        console.log(user);
        let userId = user.user.uid;
        sessionStorage.setItem("currentUser", userId);
        let faves = firebase.database().ref('users/' + userId).child("favorites");
        faves.on("value", function (snapshot) {
            console.log("MY FAAAAVES!!!!", snapshot.val())
            let snap = snapshot.val();
        })
    });

    


    

    // const db = firebase.database;   // database service
    // const auth = firebase.auth;     // authentication service