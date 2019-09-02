/**
 * Class representing a list of companies, with click event listeners and method
 * for adding new items to the list. Create a company list either using the
 * constructor and adding individual items, or using `CompanyList#from` to
 * create a list from an array of company objects.
 *
 * @class CompanyList
 */
class CompanyList {
  /** Array of companies (name, ID, location) */
  companies = []
  activeFilters = []

  /**
   * Creates an instance of CompanyList.
   *
   * @param {object} [{ selector = '#list' }={}] Options (e.g. selector)
   * @memberof CompanyList
   */
  constructor({ selector = '#list' } = {}) {
    this.element = document.querySelector(selector) // List element
    
    // Add click event listener to list element. Clicks on individual child
    // items will bubble up to this parent--no need for multiple listeners.
    this.element.addEventListener('click', this.onClick.bind(this))

    // Create location filter element and insert it above the list
    this.filterElement = document.createElement('div')
    document.body.insertBefore(this.filterElement, this.element)

    // Listen for clicks on location filter
    this.filterElement.addEventListener('click', this.onFilterClick.bind(this))
  }

  /**
   * Render location filter buttons on page. A button for each unique location
   * is added to the filter container created in the constructor.
   *
   * @memberof CompanyList
   */
  renderFilters() {
    const locations = this.getLocations() // Get unique locations

    // Empty filters to re-render
    this.filterElement.innerHTML = ''

    // Create and show filter buttons for locations
    locations.forEach(location => {
      const button = document.createElement('a')
      
      button.innerText = location
      button.href = '' // Make the link look like a link
      button.style.marginRight = '1rem'
      button.style.fontWeight =
        this.activeFilters.includes(location) ? 'bold' : 'normal'

      this.filterElement.appendChild(button)
    })
  }

  /**
   * Render the list on the page, filtered based on location filter if one or
   * more locations are selected. Returns itself to allow chained calls.
   *
   * @returns {CompanyList}
   * @memberof CompanyList
   */
  render() {
    let visibleCompanies

    // Get a filtered list of which companies should be visible based on
    // selected location filter (if necessary)
    if (this.activeFilters.length) {
      visibleCompanies = this.companies.filter(company => {
        return this.activeFilters.includes(company.location)
      })
    } else {
      visibleCompanies = this.companies // No filter selected
    }

    // Empty the list to re-render
    this.element.innerHTML = ''

    // Create and append list items
    visibleCompanies.forEach(company => {
      const item = document.createElement('li')
    
      // Put these here so we don't have to lookup the company array on click
      item.setAttribute('data-company-id', company.id)
      item.setAttribute('data-company-name', company.name)
      item.setAttribute('data-company-location', company.location)
      
      // Text displayed on page
      item.textContent = `${company.name} (${company.location})`
      
      this.element.appendChild(item)
    })

    return this
  }

  /**
   * Click handler for location filter. Adds or removes clicked location from
   * active filters and re-renders list.
   *
   * @param {Event} event Click event
   * @memberof CompanyList
   */
  onFilterClick(event) {
    event.preventDefault()

    // Only act on link clicks
    if (event.target.matches('a')) {
      // Check if clicked location is currently filtered
      const index = this.activeFilters.indexOf(event.target.innerText)

      // Toggle filter state
      if (index !== -1) {
        this.activeFilters.splice(index, 1)
      } else {
        this.activeFilters.push(event.target.innerText)
      }

      // Re-render list and filters
      this.render().renderFilters()
    }
  }
  
  /**
   * Add a new item to the list of companies.
   *
   * @param {object} company
   * @memberof CompanyList
   */
  add(company) {
    this.companies.push(company)
  }

  /**
   * Returns an array of all distinct company locations.
   *
   * @returns {array}
   * @memberof CompanyList
   */
  getLocations() {
    // Return unique locations by creating a set from the companies array, then
    // parsing the set back into an array. "Not great, but not terrible"
    // Chernobyl coding.
    return [...new Set(this.companies.map(company => company.location))]
  }
  
  /**
   * Handle all click events for list and its children.
   *
   * @param {*} { target }
   * @memberof CompanyList
   */
  onClick({ target }) {
    // Check if clicked element is a list item with a company name. Adding a
    // CSS class to the element and using `listItem.classList.contains()` to
    // check for it is probably faster than matching against a CSS selector,
    // but has worse browser compatibility (and checking `className` itself
    // is a bit ugly if we add multiple class names).
    if (target.matches('li') &&
        target.hasAttribute('data-company-name') &&
        target.hasAttribute('data-company-location')) {
      
      const name = target.getAttribute('data-company-name')
      const location = target.getAttribute('data-company-location')
      
      Notifier.notify(`${name} is located in ${location}`)
    }
  }
  
  /**
   * Create and return a `CompanyList` instance from an array of company data.
   * Objects in the array should contain id, name, and location.
   *
   * @param {object} items Array of companies
   * @param {object} options `CompanyList` constructor options
   * @memberof CompanyList
   */
  static from(companies, options = {}) {
    const list = new CompanyList(options)
    
    list.companies = companies

    return list
  }
}