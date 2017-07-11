import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(values) {
    this.props.signupUser(values);
  }
  renderField(field) {
    const {meta: {touched, error}} = field;
    return (
      <fieldset className="form-group">
        <lable>{field.label} </lable>
        <input {...field.input} type={field.type} className="form-control"/>
        {touched && error && <div className="error">{error}</div>}
      </fieldset>
    );
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" label="Email:" type="text" component={this.renderField}/>
        <Field name="password" label="Password:" type="password" component={this.renderField}/>
        <Field name="passwordConfirm" label="Confirm Password:" type="password" component={this.renderField}/>
        <button action="submit" className="btn btn-primary">Sign up</button>
        {this.renderAlert()}
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter an email';
  }
  if (!values.password) {
    errors.password = 'Please enter an password';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an passwordConfirm';
  }
  if (values.password != values.passwordConfirm) {
    errors.password = "Passwords must match";
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error};
}

export default reduxForm({
  validate,
  form: 'SignupForm'
})(
  connect(mapStateToProps, actions)(Signup)
);
