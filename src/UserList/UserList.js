import React, { Component } from "react";
import { Redirect } from "react-router";

import { ExtReact, List, Button, Container } from "@sencha/ext-react";
import "./UserList.css";

class UserList extends Component {
  state = {
    redirect: false,
    data: this.props.userData
  };

  addPhoto = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/user" />;
    }

    return (
      <>
        <ExtReact>
          <Container>
            <List
              style={{
                backgroundColor: "#000!important",
                color: "#fff"
              }}
              className="list"
              itemTpl="<p><strong>First name: {firstName} </strong></p>  <p>Last name:{lastName}</p>"
              store={this.state}
              onClick={{
                element: "element",
                fn: () => this.addPhoto()
              }}
            />

            <Button
              style={{
                color: "blue"
              }}
              text="Add another user"
              handler={this.props.changed}
            />
          </Container>
        </ExtReact>
      </>
    );
  }
}

export default UserList;
