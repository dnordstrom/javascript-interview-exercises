(() => {

  // Request notification permission on page load
  Notification.requestPermission()

  const companies = [
    { id: 1, name: 'Amazon', location: 'Seattle' },
    { id: 2, name: 'Apple', location: 'Cupertino' },
    { id: 3, name: 'Facebook', location: 'Menlo Park' },
    { id: 4, name: 'Google', location: 'Mountain View' },
    { id: 5, name: 'Leeroy', location: 'Sundsvall' },
    { id: 6, name: 'Tesla', location: 'Palo Alto' }
  ]

  const listElement = document.getElementById('list')

  // Iterate over companies, appending an LI element to the list for each
  companies.forEach(company => {
    const listItem = document.createElement('li')

    // Put these here so we don't have to lookup the company array on click
    listItem.setAttribute('data-company-id', company.id)
    listItem.setAttribute('data-company-name', company.name)
    listItem.setAttribute('data-company-location', company.location)

    // Text displayed on page
    listItem.textContent = `${company.name} (${company.location})`

    // Add item to the page
    listElement.appendChild(listItem)
  })

  listElement.addEventListener('click', ({ target }) => {
    // Check if clicked element is a list item with a company name. Adding a CSS
    // class to the element and using `listItem.classList.contains()` to check
    // for it is probably faster than matching against a CSS selector, but has
    // worse browser compatibility (and checking `className` itself is a bit
    // ugly if we add multiple class names).
    if (target.matches('li') && target.hasAttribute('data-company-name')) {
      notify(`${target.getAttribute('data-company-name')} clicked!`)
    }
  })

  /**
   * Display notification message in system tray. If notifications are not
   * supported (e.g. older browser or browsing locally with `file://`) or we
   * don't have appropriate permissions, use `console.log`.
   * 
   * `npx serve` or similar can be used to serve the HTML locally with support
   * for Notification API.
   * 
   * @param message Message to display
   */
  function notify(message) {
    // Check if notifications are supported and we were granted permission
    if (('Notification' in window) && Notification.permission === 'granted') {
      new Notification(message)
    } else {
      console.log(`NOTIFICATION: ${message}`)
    }
  }

})()
