

document.addEventListener('DOMContentLoaded', function() {

    let userIcon = document.getElementById('user-icon');
    userIcon.addEventListener('click', toggleUserPanel);

    let logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', logout);

})


function toggleUserPanel() {
    let panel = document.getElementById("userPanel");
    let icon = document.getElementById("user-icon");
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
        let iconRect = icon.getBoundingClientRect();
        let xOffset = 10;
        let panelLeft = iconRect.left - panel.offsetWidth + xOffset;
        panel.style.top = iconRect.bottom + "px";
        panel.style.left = Math.max(panelLeft, 0) + "px";
    }
}

function logout() {
    localStorage.removeItem('token');

    document.cookie = "token=null; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = '/';
}