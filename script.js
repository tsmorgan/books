  // v2
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

  // Scroll back to the last visible section if the cookie exists
  window.onload = function () {
    const lastVisibleElementId = getCookie('lastVisibleElement');
    if (lastVisibleElementId) {
      const element = document.getElementById(lastVisibleElementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Set to store all currently visible elements
  const visibleElements = new Set();
  let topid = '';

  // Create an IntersectionObserver to track visible elements
  let observer = new IntersectionObserver((entries) => {
    // Update the set of visible elements
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleElements.add(entry.target); // Add element to the set if visible
      } else {
        visibleElements.delete(entry.target); // Remove element from the set if not visible
      }
    });

    // Find the top-most visible element by sorting the set
    if (visibleElements.size > 0) {
      let topMostVisible = Array.from(visibleElements).sort((a, b) => {
        return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
      })[0];

      if (topMostVisible.id !== topid)
      {
        topid = topMostVisible.id;
        // Store the top-most visible element's ID in the cookie
        setCookie('lastVisibleElement', topMostVisible.id, 1);
        console.log("setting",topMostVisible.id);
      }
    }
  }, {
    root: null,    // Default is the viewport
    threshold: 0.1 // 10% of the element must be visible
  });

  // Observe all elements with the class 'section'
  document.querySelectorAll('p').forEach((el) => {
    observer.observe(el);
  });