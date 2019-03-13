import React, { Component } from "react";
import { Container } from "@sencha/ext-modern";
//import { Panel } from '@sencha/ext-modern';
//import { TextArea } from '@sencha/ext-modern';
import './Home.css'

import UserList from "../UserList/UserList";

import { ExtReact, Button, FormPanel, TextField } from "@sencha/ext-react";

class Home extends Component {

  state = {
    users: [],
    userForm: {
      firstName: "First Name",
      lastName: "Last name"
    },
    submitted: false
  };
  

  onFieldChange = Ext.Function.createBuffered(() => {
    const user = {};

    for (let name in this.refs) {
        user[name] = this.refs[name].cmp.getValue();
    }
    this.setState({userForm: user});

  });

  showComponent = () => {
    this.setState({ submitted: false, userForm: {firstName: 'First Name', lastName: 'Last Name'} });
  };

  onSubmit = e => {

    const userForm = {
      ...this.state.userForm
    };


    this.setState(prevState => ({
        users: [...prevState.users, userForm],
        submitted: true
      }));

  };

  render() {
      
    return (
      <>
        {!this.state.submitted ? (
          <Container padding="20" >
            <ExtReact>
              <FormPanel title="Form Panel" ref={form => (this.form = form)}>
                <TextField
                  ref="firstName"
                  label={this.state.userForm.firstName}
                  onChange={this.onFieldChange}
                />
                <TextField
                  ref="lastName"
                  label={this.state.userForm.lastName}
                  onChange={this.onFieldChange}
                />

                <Button text="Add user" handler={this.onSubmit} />
              </FormPanel>
            </ExtReact>
          </Container>
        ) : (
          <UserList
            changed={this.showComponent}
            userData={this.state.users}
          />
        )}
      </>
    );
  }
}

export default Home;
