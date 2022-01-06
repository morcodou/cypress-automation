Feature: Purchase products

    Feature Description
    @Regression
    Scenario: ecommerce products delivery
        Given I open ecommerce page
        When I add item to cart
        And Validate the total of price
        Then Select the contry submit and verify Thank you message

    @Smoke
    Scenario: Filling the form
        Given I open ecommerce page
        When I fill the form details
            | name      | gender | email                | password    | birthday   |
            | JeanneDbb | Female | jeanne-bdd@email.com | PassonMeDbb | 2002-12-11 |
        And Validate the form fields
            | name      | birthday   |
            | JeanneDbb | 2002-12-11 |
        Then Submit and verify Thank you message
