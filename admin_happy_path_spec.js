describe("Admin Happy Path", () => {
    before(() => {
      cy.visit('/'); // Start at the landing page
    });
  
    it("Registers successfully", () => {
      cy.visit('/register');
      cy.get('input[name="email"]').type('admin@example.com');
      cy.get('input[name="password"]').type('securePassword');
      cy.get('input[name="confirmPassword"]').type('securePassword');
      cy.get('input[name="name"]').type('Admin User');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard'); // Confirm navigation to dashboard
    });
  
    it("Logs in successfully", () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('admin@example.com');
      cy.get('input[name="password"]').type('securePassword');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });
  
    it("Creates a new presentation successfully", () => {
      cy.get('button').contains('New presentation').click();
      cy.get('input#presentationName').type('Test Presentation');
      cy.get('button').contains('Create').click();
      cy.get('.presentation-title').should('contain', 'Test Presentation');
    });
  
    it("Updates the thumbnail and name of the presentation", () => {
      cy.get('.edit-button').click(); // Assuming there is an edit button for each presentation
      cy.get('input[name="title"]').clear().type('Updated Presentation Name');
      cy.get('input[name="thumbnail"]').type('https://example.com/thumbnail.jpg');
      cy.get('button').contains('Save').click();
      cy.get('.presentation-title').should('contain', 'Updated Presentation Name');
      cy.get('.presentation-thumbnail').should('have.attr', 'src', 'https://example.com/thumbnail.jpg');
    });
  
    it("Adds slides in a slideshow deck successfully", () => {
      cy.get('button').contains('Add Slide').click(); // Add the first slide
      cy.get('.slide').should('have.length', 1);
      cy.get('button').contains('Add Slide').click(); // Add a second slide
      cy.get('.slide').should('have.length', 2);
    });
  
    it("Switches between slides successfully", () => {
      cy.get('.slide').eq(0).click(); // Select the first slide
      cy.get('.current-slide').should('contain', 'Slide 1'); // Verify slide 1 is active
      cy.get('.slide').eq(1).click(); // Select the second slide
      cy.get('.current-slide').should('contain', 'Slide 2'); // Verify slide 2 is active
    });
  
    it("Deletes a presentation successfully", () => {
      cy.get('.delete-button').click(); // Assuming there's a delete button for presentations
      cy.get('.confirmation-modal button').contains('Yes').click();
      cy.get('.presentation-title').should('not.exist'); // Ensure presentation is deleted
    });
  
    it("Logs out of the application successfully", () => {
      cy.get('button').contains('Logout').click();
      cy.url().should('include', '/login');
    });
  
    it("Logs back into the application successfully", () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('admin@example.com');
      cy.get('input[name="password"]').type('securePassword');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });
  });
  