
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue,
    get
}
    from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

import {
    getAuth,
    signOut,
    onAuthStateChanged
}
    from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCDHxSfP1xt1u8FzwWh69ioPiR5L9dHvac",
    authDomain: "growaplant-42952.firebaseapp.com",
    projectId: "growaplant-42952",
    storageBucket: "growaplant-42952.firebasestorage.app",
    messagingSenderId: "431783641051",
    appId: "1:431783641051:web:2171d7ee3a74736721b1fe",
    databaseURL: "https://growaplant-42952-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);

const eventsRef = ref(db, "schoolEvents");

let schoolCalendar;

document.addEventListener("DOMContentLoaded", () => {

    schoolCalendar =
        new FullCalendar.Calendar(
            document.getElementById("calendar"),
            {
                initialView: "dayGridMonth",
                height: 700,

                eventClick: function (info) {

                    document.getElementById("detailsBox").style.display = "block";

                    document.getElementById("detailsTitle").textContent =
                        info.event.title;

                    document.getElementById("detailsDate").textContent =
                        info.event.start.toLocaleDateString();

                    document.getElementById("detailsDescription").textContent =
                        info.event.extendedProps.description ||
                        "No description available.";
                }
            }
        );

    schoolCalendar.render();

    setTimeout(() => {
        schoolCalendar.updateSize();
    }, 300);

    onValue(eventsRef, (snapshot) => {

        schoolCalendar.removeAllEvents();

        const data = snapshot.val();

        if (!data) return;

        Object.keys(data).forEach(key => {

            schoolCalendar.addEvent({
                id: key,
                title: data[key].title,
                start: data[key].start,
                description: data[key].description
            });

        });

    });

});

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const snapshot = await get(
        ref(db, "users/" + user.uid)
    );

    const userData = snapshot.val();

    console.log("User Data:", userData);

    const role = userData?.role || "student";

    document.getElementById("userStatus").textContent =
        "Logged in as: " + role;

    // Hide everything first
    document.getElementById("eventSection").style.display = "none";

    // Show teacher-only sections
    if (role === "teacher") {
        document.getElementById("eventSection").style.display = "block";
    }
});

window.addEvent = function () {

    push(eventsRef, {
        title:
            document.getElementById(
                "eventTitle"
            ).value,

        start:
            document.getElementById(
                "eventDate"
            ).value,

        description:
            document.getElementById(
                "eventDescription"
            ).value
    });

    alert("Event Added");

}

window.logout = async function () {

    await signOut(auth);

    window.location.href =
        "index.html";

}