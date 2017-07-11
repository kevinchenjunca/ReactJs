import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinUser } from '../../actions';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});
    //Need to do something to log user in
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
  renderField(field) {
    return (
      <fieldset className="form-group">
        <lable>{field.label} </lable>
        <input {...field.input} type={field.type} className="form-control"/>
      </fieldset>
    );
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" label="Email:" type="text" component={this.renderField}/>
        <Field name="password" label="Password:" type="password" component={this.renderField}/>
        <button action="submit" className="btn btn-primary">Sign in</button>
        {this.renderAlert()}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'SigninForm'
})(
  connect(mapStateToProps, {signinUser})(Signin)
);
