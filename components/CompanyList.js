/**
 * Class representing a list of companies, with click event listeners and method
 * for adding new items to the list. Create a company list either using the
 * constructor and adding individual items, or using `CompanyList#from` to
 * create a list from an array of company objects.
 *
 * @class CompanyList
 */
class CompanyList {
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
    this.element.addEventListener('click', this.onClick);
  }
  
  /**
   * Add a new item to the list of companies.
   *
   * @param {object} company
   * @memberof CompanyList
   */
  add(company) {
    const item = document.createElement('li')
    
    // Put these here so we don't have to lookup the company array on click
    item.setAttribute('data-company-id', company.id)
    item.setAttribute('data-company-name', company.name)
    item.setAttribute('data-company-location', company.location)
    
    // Text displayed on page
    item.textContent = `${company.name} (${company.location})`
    
    this.element.appendChild(item)
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
  static from(items, options = {}) {
    const list = new CompanyList(options)
    
    items.forEach(item => list.add(item))
  }
}