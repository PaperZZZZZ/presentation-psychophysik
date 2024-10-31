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
