/// <reference types="cypress" />

class BookingPage {

  // LOCATORS
  
    getRadioButtons() {
      return cy.get(".radio");
    }
  
  getOneWayButton() {
    return cy.get('.radio').children().first()
  }
  
  getRoundTripButton() {
    return cy.get('.radio').children().last()
  }
  
  getSpecificRadioButton(index) {
    return this.getRadioButtons().eq(index);
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
  
  getDepartorReturnText(index) {
    return cy.get('.is-underlined').eq(index)
  }
  
  getDepartorReturnStates(index) {
    return cy.get('.is-italic').eq(index)
  }
  
  getBookingInfo(index) {
    return cy.get('.mt-4 > p').eq(index)
  }
  
  getTypeAndAssertNextDay(index) {
    return this.getSpecificDatePicker(index).invoke('val') // retrieving value attr 
  .then((currentDate) => { // parsing the current date 
    const currentDateObj = new Date(currentDate); // returns this format -> 2024-05-28T02:46:22.008Z
    const oneWeekFromDate = new Date(currentDate);
    oneWeekFromDate.setDate(currentDateObj.getDate() + 1);
    // Formatting the date as MM/DD/YYYY
    const formattedDate = oneWeekFromDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    // Input the new date into the date picker
    this.getSpecificDatePicker(index).clear().type(formattedDate); //typing the new date
    this.getSpecificDatePicker(index).should('have.value', formattedDate);
  })
  }
  
  getTypeAndAssertNextWeek(index) {
    return this.getSpecificDatePicker(index).invoke('val') // retrieving value attr 
  .then((currentDate) => { // parsing the current date 
    const currentDateObj = new Date(currentDate); // returns this format -> 2024-05-28T02:46:22.008Z
    const oneWeekFromDate = new Date(currentDate);
    oneWeekFromDate.setDate(currentDateObj.getDate() + 7);
    // Formatting the date as MM/DD/YYYY
    const formattedDate = oneWeekFromDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    // Input the new date into the date picker
    this.getSpecificDatePicker(index).clear().type(formattedDate); //typing the new date
    this.getSpecificDatePicker(index).should('have.value', formattedDate);
  })
  }
  
  getTypeAndAssertNextMonth(index) {
    return this.getSpecificDatePicker(index).invoke('val') // retrieving value attr 
  .then((currentDate) => { // parsing the current date 
    const currentDateObj = new Date(currentDate); // returns this format -> 2024-05-28T02:46:22.008Z
    const oneWeekFromDate = new Date(currentDate);
    oneWeekFromDate.setDate(currentDateObj.getDate() + 30);
    // Formatting the date as MM/DD/YYYY
    const formattedDate = oneWeekFromDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    // Input the new date into the date picker
    this.getSpecificDatePicker(index).clear().type(formattedDate); //typing the new date
    this.getSpecificDatePicker(index).should('have.value', formattedDate);
  })
  }
  
  getSelectedDateWithDay(index) {
    let selectedDateWithDay;
    return this.getSpecificDatePicker(index).invoke('val').then((currentDate) => {
      const currentDateObj = new Date(currentDate);
      // Formatting the date to include day of the week
      selectedDateWithDay = currentDateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })
      .split('').filter(char => char !== ',').join(''); //removing commas or .replace(/,/g, '') using regex
  
  
      return selectedDateWithDay;
    })
  }
  
  getSelectedDateFromCalendar() {
    return cy.get('[aria-selected="true"]');
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
    this.getBookButton().click()
  }
  
  selectSpecificDropdown(index, option) {
    this.getSpecificDropdown(index).select(option)
  }
  
  clickRadioButton(index) {
    this.getSpecificRadioButton(index).children().first().click();
  }
  
  clickSelectedDateFromCalendar() {
    this.getSelectedDateFromCalendar().click();
  }
}
  
  export default BookingPage;