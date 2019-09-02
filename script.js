(() => {

  const companies = [
    { id: 1, name: 'Amazon', location: 'Seattle' },
    { id: 2, name: 'Apple', location: 'Cupertino' },
    { id: 3, name: 'Facebook', location: 'Menlo Park' },
    { id: 4, name: 'Google', location: 'Mountain View' },
    { id: 5, name: 'Leeroy', location: 'Sundsvall' },
    { id: 6, name: 'Tesla', location: 'Palo Alto' }
  ]

  // Create CompanyList instance for `#list` element using the API data
  CompanyList.from(companies, { selector: '#list'})

})()
