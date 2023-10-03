function ViewModel (email, error) {
  // Constructor function to create logic dependent nunjucks page
  this.pageTitle = 'What is your email address?'
  this.model = {
    label: {
      text: 'Email'
    },
    classes: 'govuk-input--width-20',
    id: 'email',
    name: 'email',
    type: 'email'
  }

  if (email != null) {
    this.model.value = email
  }

  // If error is passed to model then this error property is added to the model and therefore radio macro
  if (error) {
    this.model.errorMessage = {
      text: 'Enter email in the correct format'
    }
  }
}

module.exports = ViewModel
