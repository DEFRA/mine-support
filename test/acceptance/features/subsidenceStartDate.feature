Feature: Date of Subsidence Page checks

    Scenario: Enter a date for the start of subsidence

        Given I open the url "/claim/date-of-subsidence"
        Then I expect that the url contains "/claim/date-of-subsidence"
        Then I expect that the title contains "When did the subsidence start?"
        Given I clear the inputfield "#dateOfSubsidence__day"
        And I add "01" to the inputfield "#dateOfSubsidence__day"
        And I clear the inputfield "#dateOfSubsidence__month"
        And I add "01" to the inputfield "#dateOfSubsidence__month"
        And I clear the inputfield "#dateOfSubsidence__year"
        And I add "1970" to the inputfield "#dateOfSubsidence__year"
        And I click on the button "#submit"
        Then I expect that the url contains "/claim/mine-type"
