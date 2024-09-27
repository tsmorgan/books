
  // Function to set a cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to get a cookie
  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Function to delete a cookie
  function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  // Scroll back to the last visible section if the cookie exists
  window.onload = function () {
    const lastVisibleElementId = getCookie('lastVisibleElement');
    console.log("lastVisibleElementId",lastVisibleElementId);
    if (lastVisibleElementId) {
      const element = document.getElementById(lastVisibleElementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Create an IntersectionObserver to track visible elements
  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When an element is visible, store its ID in the cookie
        setCookie('lastVisibleElement', entry.target.id, 1);
        console.log("setting",entry.target.id);
      }
    });
  }, {
    root: null,    // Default is the viewport
    threshold: 0.5 // 50% of the element must be visible
  });

  // Observe all elements with the class 'section'
  document.querySelectorAll('p').forEach((el) => {
    observer.observe(el);
  });

