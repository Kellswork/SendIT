function openNav() {
  const nav = document.getElementById('mobileNav');
 if (nav.style.display === 'block') nav.style.display = 'none';
 else nav.style.display = 'block';
}

function openNotification() {
  const displayNotification = document.querySelector('.dropdown-notification');
 if (displayNotification.style.display === 'block') displayNotification.style.display = 'none';
 else displayNotification.style.display = 'block';
}