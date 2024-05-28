/// <reference types="cypress" />

class BookingPage {

  // LOCATORS
  
  getOneWayButton() {
    return cy.get('.radio').children().first()
  }
  
  getRoundTripButton() {
    return cy.get('.radio').children().last()
  }
  
  getLabels() {
    return cy.get('.label')
  }
  
  getSpecificLabel(index) {
    return this.getLabels().eq(index)
  }
  
  getDropdowns() {
    return cy.get('.select select')
  }
  
  getSpecificDropdown(index) {
    return this.getDropdowns().eq(index)
  }
  
  getBookButton() {
    return cy.get('.Button_c_button__TmkRS')
  }
  
  getDatePickers() {
    return cy.get('.react-datepicker__input-container > input')
  }
  
  getSpecificDatePicker(index) {
    return this.getDatePickers().eq(index)
  }
  
  
  // METHODS
  
  // clicks 'One way' radio button
  clickOneWayButton() {
    this.getOneWayButton().click()
  }
  
  // clcks 'Round trip' radio button
  clickRoundTripButton() {
    this.getRoundTripButton().click()
  }
  
  // clicks 'BOOK' submission button
  clickBook() {
    this.getBookButton().click
  }
  
  selectSpecificDropdown(index, option) {
    this.getSpecificDropdown(index).select(option)
  }
}
  
  export default BookingPage;