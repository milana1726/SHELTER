function myFunction() {
    let nav_hidden = document.getElementById("nav_hidden");
    if (nav_hidden.style.display === "block") {
        nav_hidden.style.display = "none";
    } else {
        nav_hidden.style.display = "block";
    }
}