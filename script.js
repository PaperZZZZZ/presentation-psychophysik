// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAxKzNms__qGpMSgYjEleE7GjeoQrJ5AgE",
    authDomain: "psychophysik-presentation.firebaseapp.com",
    projectId: "psychophysik-presentation",
    storageBucket: "psychophysik-presentation.firebasestorage.app",
    messagingSenderId: "1093429379803",
    appId: "1:1093429379803:web:37e35f196e6e7f56a342fe"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to handle user selection and store in Firestore
function submitChoice(choice) {
    db.collection("selections").add({
        choice: choice,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => alert("Choice submitted!"))
    .catch((error) => alert("Error submitting choice: " + error));
}
// Function to fetch data and create a .txt file
// Function to fetch all data and create a downloadable .txt file
function exportDataAsTextFile() {
    db.collection("selections")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
          let data = "User Choice, Timestamp\n"; // Header for .txt file

          snapshot.forEach((doc) => {
              const choice = doc.data().choice;
              const timestamp = doc.data().timestamp.toDate().toISOString();
              data += `${choice}, ${timestamp}\n`;
          });

          // Create a Blob from the data
          const blob = new Blob([data], { type: "text/plain" });
          const url = URL.createObjectURL(blob);

          // Create a link to download the file
          const link = document.createElement("a");
          link.href = url;
          link.download = "selections.txt";
          link.click();

          // Clean up the URL
          URL.revokeObjectURL(url);
      })
      .catch((error) => {
          console.error("Error fetching data:", error);
      });
}

