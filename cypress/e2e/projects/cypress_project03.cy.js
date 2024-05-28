/// <reference types="cypress" />
import BookingPage from "../../../pages/BookingPage";

describe("Booking Function", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-3");
  });

  const bookingPage = new BookingPage();

  const testCases = [
    {
      description: 'Validate the booking for 1 passenger and one way',
      cabinClass: 'Business',
      from: 'Illinois',
      to: 'Florida',
      depart: '',
      numOfpassengers: '1',

    }
  ]

  const validateVisibility = () => {
    bookingPage.getLabels().each(($el) => {
      cy.wrap($el).should("be.visible");
    });

    bookingPage.getDropdowns().each(($el) => {
      cy.wrap($el).should("be.visible");
    });

    bookingPage.getDatePickers().each(($el) => {
      cy.wrap($el).should("be.visible");
    });
  };

  const validateDropdownValues = () => {
    bookingPage
      .getSpecificDropdown(3)
      .should("be.visible")
      .and("have.value", "1");
    bookingPage
      .getSpecificDropdown(4)
      .should("be.visible")
      .and("have.value", "Adult (16-64)");
  };

  const validateBookButton = () => {
    bookingPage
    .getBookButton()
    .should("be.visible")
    .and("be.enabled");
  }

  it("Test Case 01 - Validate the default Book your trip form", () => {
    /**
      Navigate to https://techglobal-training.com/frontend/project-3
      Validate that the “One way” radio button is displayed enabled and selected by default
      Validate that the “Round trip” radio button is displayed enabled and not selected by default
      Validate that the “Cabin Class” label and dropdown are displayed
      Validate that the “From” label and dropdown are displayed
      Validate that the “To” label and dropdown are displayed
      Validate that the “Depart” label and date picker is displayed
      Validate that the “Return” label and date picker is displayed and disabled
      Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
      Validate that the “Passenger 1” category label and dropdown are displayed and “Adult (16-64)” is the default
      Validate that the “BOOK” button is displayed and enabled
     */

    bookingPage
      .getOneWayButton()
      .should("be.visible")
      .and("be.enabled")
      .and("be.checked");

    bookingPage
      .getRoundTripButton()
      .should("be.visible")
      .and("be.enabled")
      .and("not.be.checked");

    validateVisibility();

    bookingPage
      .getSpecificDatePicker(1)
      .should("be.visible")
      .and("be.disabled");

    validateDropdownValues();
    validateBookButton();
  });

  it("Test Case 02 - Validate the Book your trip form when Round trip is selected", () => {
    /**
     * Navigate to https://techglobal-training.com/frontend/project-3
       Click on the “Round trip” radio button and validate it is selected
       Validate that the “One way” radio button is not selected
       Validate that the “Cabin Class” label and dropdown are displayed
       Validate that the “From” label and dropdown are displayed
       Validate that the “To” label and dropdown are displayed
       Validate that the “Depart” label and date picker is displayed
       Validate that the “Return” label and date picker is displayed
       Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
       Validate that the “Passenger 1” label and dropdown are displayed and “Adult (16-64)” is the default
       Validate that the “BOOK” button is displayed and enabled 
    */

    bookingPage.clickRoundTripButton();
    bookingPage.getRoundTripButton().should('be.checked');
    bookingPage.getOneWayButton().should('not.be.checked');
    validateVisibility();
    validateDropdownValues();
    validateBookButton();
  });
  
  it.only("Test Case 03 - Validate the booking for 1 passenger and one way", () => {
    bookingPage.clickOneWayButton();
    bookingPage.selectSpecificDropdown(0, 'Business');
    bookingPage.selectSpecificDropdown(1, 'Illinois');
    bookingPage.selectSpecificDropdown(2, 'Florida');
    bookingPage.getSpecificDatePicker(0).clear().type('06/03/2024');
    
  });

  it("Test Case 04 - Validate the booking for 1 passenger and round trip", () => {});

  it("Test Case 05 - Validate the booking for 2 passengers and one way", () => {});
});