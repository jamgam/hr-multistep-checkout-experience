class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'checkout'
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.setState({
      page
    });
  }

  render() {
    switch (this.state.page) {
      case 'checkout':
        return React.createElement("button", {
          onClick: () => this.changePage('accountcreation')
        }, "Checkout");

      case 'accountcreation':
        return React.createElement(AccountCreation, {
          changePage: this.changePage
        });

      case 'addressform':
        return React.createElement(AddressForm, {
          changePage: this.changePage
        });

      case 'paymentform':
        return React.createElement(PaymentForm, {
          changePage: this.changePage
        });
    }
  }

}

class AccountCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.changePage('addressform');
  }

  render() {
    return React.createElement("div", null, React.createElement("form", {
      onSubmit: this.onSubmit
    }, React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Name: "), React.createElement("input", {
      id: "name",
      onChange: this.onChange,
      type: "text",
      value: this.state.name
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Email: "), React.createElement("input", {
      id: "email",
      onChange: this.onChange,
      type: "text",
      value: this.state.email
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Password: "), React.createElement("input", {
      id: "password",
      onChange: this.onChange,
      type: "text",
      value: this.state.password
    })), React.createElement("div", null, React.createElement("button", {
      type: "submit"
    }, "Next"))));
  }

}

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.changePage('paymentform');
  }

  render() {
    return React.createElement("div", null, React.createElement("form", {
      onSubmit: this.onSubmit
    }, React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Address: ")), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Line 1: "), React.createElement("input", {
      id: "line1",
      onChange: this.onChange,
      type: "text",
      value: this.state.line1
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Line 2: "), React.createElement("input", {
      id: "line2",
      onChange: this.onChange,
      type: "text",
      value: this.state.line2
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "City: "), React.createElement("input", {
      id: "city",
      onChange: this.onChange,
      type: "text",
      value: this.state.city
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "State: "), React.createElement("input", {
      id: "state",
      onChange: this.onChange,
      type: "text",
      value: this.state.state
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Zip Code: "), React.createElement("input", {
      id: "zip",
      onChange: this.onChange,
      type: "text",
      value: this.state.zip
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Phone Number: "), React.createElement("input", {
      id: "phone",
      onChange: this.onChange,
      type: "text",
      value: this.state.phone
    })), React.createElement("div", null, React.createElement("button", {
      type: "submit"
    }, "Next"))));
  }

}

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cc: '',
      expdata: '',
      cvv: '',
      zip: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.changePage('addressform');
  }

  render() {
    return React.createElement("div", null, React.createElement("form", {
      onSubmit: this.onSubmit
    }, React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Credit Card Number: "), React.createElement("input", {
      id: "cc",
      onChange: this.onChange,
      type: "text",
      value: this.state.cc
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Expiry Date: "), React.createElement("input", {
      id: "expdate",
      onChange: this.onChange,
      type: "text",
      value: this.state.expdate
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "CVV: "), React.createElement("input", {
      id: "cvv",
      onChange: this.onChange,
      type: "text",
      value: this.state.cvv
    })), React.createElement("div", {
      className: "form"
    }, React.createElement("label", null, "Billing Zip Code: "), React.createElement("input", {
      id: "zip",
      onChange: this.onChange,
      type: "text",
      value: this.state.zip
    })), React.createElement("div", null, React.createElement("button", {
      type: "submit"
    }, "Next"))));
  }

}

ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));