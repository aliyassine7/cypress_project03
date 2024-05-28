import BookingPage from "../../../pages/BookingPage";
/// <reference types="cypress" />

const bookingPage = new BookingPage();

describe("Booking Function", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-3");
  });

  const validateVisibility = () => {
    bookingPage.getLabels().each(($el) => {
      cy.wrap($el).should("be.visible");
    });

    bookingPage.getDatePickers().each(($el) => {
      cy.wrap($el).should("be.visible");
    });

    bookingPage.getDropdowns().each(($el) => {
      cy.wrap($el).should("be.visible");
    });

    bookingPage.getBookButton().should("be.visible").and("be.enabled");
  };

  const validateBookingDates = (index) => {
    // expected <p> to have text Tue Jun 04 2024
    cy.get(".is-italic")
      .eq(index)
      .next()
      .then(($el) => {
        bookingPage
          .getSelectedDateWithDay(index)
          .then((selectedDateWithDay) => {
            expect($el).to.have.text(selectedDateWithDay);
          });
      });

    // expected Tue Jun 04 2024 to equal Tue Jun 04 2024
    cy.get(".is-italic")
      .eq(index)
      .next()
      .invoke("text")
      .then((text) => {
        bookingPage
          .getSelectedDateWithDay(index)
          .then((selectedDateWithDay) => {
            expect(text.trim()).to.equal(selectedDateWithDay);
          });
      });
  };

  it("Test Case 01 - Validate the default Book your trip form", () => {
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
    bookingPage.getSpecificDatePicker(1).should("be.disabled");
    bookingPage.getSpecificDropdown(3).should("have.value", "1");
    bookingPage.getSpecificDropdown(4).should("have.value", "Adult (16-64)");
  });

  it("Test Case 02 - Validate the Book your trip form when Round trip is selected", () => {
    bookingPage.clickRoundTripButton();
    bookingPage.getRoundTripButton().should("be.checked");
    bookingPage.getOneWayButton().should("not.be.checked");
    validateVisibility();
  });

  it("Test Case 03 - Validate the booking for 1 passenger and one way", () => {
    bookingPage.clickOneWayButton();
    bookingPage.selectSpecificDropdown(0, "Business");
    bookingPage.selectSpecificDropdown(1, "Illinois");
    bookingPage.selectSpecificDropdown(2, "Florida");

    bookingPage.getTypeAndAssertNextWeek(0);
    bookingPage.clickSelectedDateFromCalendar();

    bookingPage.selectSpecificDropdown(2, "Florida");
    bookingPage.selectSpecificDropdown(3, "1");
    bookingPage.selectSpecificDropdown(4, "Senior (65+)");
    bookingPage.clickBook();

    bookingPage.getDepartorReturnText(0).should("have.text", "DEPART");
    bookingPage.getDepartorReturnStates(0).should("have.text", "IL to FL");
    validateBookingDates(0);
    bookingPage
      .getBookingInfo(0)
      .should("have.text", "Number of Passengers: 1");
    bookingPage
      .getBookingInfo(1)
      .should("have.text", "Passenger 1: Senior (65+)");
    bookingPage.getBookingInfo(2).should("have.text", "Cabin class: Business");
  });

  it("Test Case 04 - Validate the booking for 1 passenger and round trip", () => {
    bookingPage.clickRoundTripButton();
    bookingPage.selectSpecificDropdown(0, "First");
    bookingPage.selectSpecificDropdown(1, "California");
    bookingPage.selectSpecificDropdown(2, "Illinois");

    bookingPage.getTypeAndAssertNextWeek(0);
    bookingPage.clickSelectedDateFromCalendar();

    bookingPage.getTypeAndAssertNextMonth(1);
    bookingPage.clickSelectedDateFromCalendar();

    bookingPage.selectSpecificDropdown(3, "1");
    bookingPage.selectSpecificDropdown(4, "Adult (16-64)");

    bookingPage.clickBook();

    bookingPage.getDepartorReturnText(0).should("have.text", "DEPART");
    bookingPage.getDepartorReturnStates(0).should("have.text", "CA to IL");
    validateBookingDates(0);
    bookingPage
      .getBookingInfo(0)
      .should("have.text", "Number of Passengers: 1");
    bookingPage
      .getBookingInfo(1)
      .should("have.text", "Passenger 1: Adult (16-64)");
    bookingPage.getBookingInfo(2).should("have.text", "Cabin class: First");

    bookingPage.getDepartorReturnText(1).should("have.text", "RETURN");
    bookingPage.getDepartorReturnStates(1).should("have.text", "IL to CA");
    validateBookingDates(1);
  });

  it("Test Case 05 - Validate the booking for 2 passengers and one way", () => {
    bookingPage.clickOneWayButton();
    bookingPage.selectSpecificDropdown(0, "Premium Economy");
    bookingPage.selectSpecificDropdown(1, "New York");
    bookingPage.selectSpecificDropdown(2, "Texas");

    bookingPage.getTypeAndAssertNextDay(0);
    bookingPage.clickSelectedDateFromCalendar();

    bookingPage.selectSpecificDropdown(3, "2");
    bookingPage.selectSpecificDropdown(4, "Adult (16-64)");
    bookingPage.selectSpecificDropdown(5, "Child (2-11)");

    bookingPage.clickBook();

    bookingPage.getDepartorReturnText(0).should("have.text", "DEPART");
    bookingPage.getDepartorReturnStates(0).should("have.text", "NY to TX");
    validateBookingDates(0);
    bookingPage
      .getBookingInfo(0)
      .should("have.text", "Number of Passengers: 2");
    bookingPage
      .getBookingInfo(1)
      .should("have.text", "Passenger 1: Adult (16-64)");
    bookingPage
      .getBookingInfo(2)
      .should("have.text", "Passenger 2: Child (2-11)");
    bookingPage
      .getBookingInfo(3)
      .should("have.text", "Cabin class: Premium Economy");
  });
});

/*

const tests3to5 = [
  {
    description: "Validate the booking for 1 passenger and one way",
    radio: 0,
    cabinClass: [0, "Business"],
    from: [1, "Illinois"],
    fromAbrev: 'IL',
    to: [2, "Florida"],
    toAbrev: 'FL',
    passengerNum: [3, "1"],
    passengers: ["Senior (65+)"],
  },
  {
    description: "Validate the booking for 1 passenger and round trip",
    radio: 1,
    cabinClass: [0, "First"],
    from: [1, "California"],
    fromAbrev: 'CA',
    to: [2, "Illinois"],
    toAbrev: 'IL',
    passengerNum: [3, "1"],
    passengers: ["Adult (16-64)"],
  },
  {
    description: "Validate the booking for 2 passengers and one way",
    radio: 0,
    cabinClass: [0, "Premium Economy"],
    from: [1, "New York"],
    fromAbrev: 'NY',
    to: [2, "Texas"],
    toAbrev: 'TX',
    passengerNum: [3, "2"],
    passengers: ["Adult (16-64)", "Child (2-11)"],
  },
]

  // tests3to5.forEach((test, index) => {
  //   it.only(`Test Case 0${index + 3} - ${test.description}`, () => {
  //   })
  // })

*/
