const firebaseConfig = {
  apiKey: "AIzaSyBV6Oq0lK6vbHzWAbaHRQDy3XgQ1K99OPM",
  authDomain: "educhat-c05b4.firebaseapp.com",
  databaseURL: "https://educhat-c05b4-default-rtdb.firebaseio.com",
  projectId: "educhat-c05b4",
  storageBucket: "educhat-c05b4.firebasestorage.app",
  messagingSenderId: "149157387044",
  appId: "1:149157387044:web:fc040d8febd1b5e30db1b1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// USER
function getUser(){
  return localStorage.getItem("edu_user") || "Guest";
}

// SAVE USER
function saveUser(){
  let name = document.getElementById("username").value;
  localStorage.setItem("edu_user", name);
  alert("Saved!");
}

// THEME
function setTheme(color){
  if(color === "dark"){
    document.body.style.background = "linear-gradient(135deg,#000,#222)";
  }
  if(color === "blue"){
    document.body.style.background = "linear-gradient(135deg,#141e30,#243b55)";
  }
}

/* ---------------- GROUP CHAT ---------------- */
function sendGroup(){
  let msg = document.getElementById("msg").value;

  db.ref("groupChat").push({
    name: getUser(),
    text: msg
  });
}

/* ---------------- PRIVATE CHAT ---------------- */
function sendPrivate(){
  let msg = document.getElementById("msg").value;
  let to = document.getElementById("to").value;

  db.ref("privateChat/" + to).push({
    from: getUser(),
    text: msg
  });
}

/* ---------------- VERIFY ---------------- */
function verify(){
  let name = document.getElementById("name").value;
  let proof = document.getElementById("proof").value;

  db.ref("verificationRequests").push({
    username: name,
    proofPayment: proof,
    status: "pending"
  });

  alert("Sent for verification");
}