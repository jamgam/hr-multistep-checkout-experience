class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'checkout',
      id: '',
      data: ''
    };
    this.changePage = this.changePage.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.changeUserId = this.changeUserId.bind(this);
  }

  changePage(page, data = null) {
    if (data) {
      this.setState({
        page,
        data
      });
    } else {
      this.setState({
        page
      });
    }
  }

  getUserId() {
    return this.state.id;
  }

  changeUserId(id) {
    this.setState({
      id
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
          changeUserId: this.changeUserId,
          getUserId: this.getUserId,
          changePage: this.changePage
        });

      case 'addressform':
        return React.createElement(AddressForm, {
          getUserId: this.getUserId,
          changePage: this.changePage
        });

      case 'paymentform':
        return React.createElement(PaymentForm, {
          getUserId: this.getUserId,
          changePage: this.changePage
        });

      case 'confirmationpage':
        return React.createElement(ConfirmationPage, {
          data: this.state.data,
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
    postInfo('user', this.state, result => {
      this.props.changeUserId(result);
      this.props.changePage('addressform');
    });
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
    let id = this.props.getUserId();
    updateInfo('update', id, this.state, response => {
      this.props.changePage('paymentform');
    });
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
      exp: '',
      cvv: '',
      billingzip: ''
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
    let id = this.props.getUserId();
    updateInfo('update', id, this.state, response => {
      getRecord(id, data => {
        this.props.changePage('confirmationpage', data);
      });
    });
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
      id: "exp",
      onChange: this.onChange,
      type: "text",
      value: this.state.exp
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
      id: "billingzip",
      onChange: this.onChange,
      type: "text",
      value: this.state.billingzip
    })), React.createElement("div", null, React.createElement("button", {
      type: "submit"
    }, "Next"))));
  }

}

const ConfirmationPage = props => {
  var str = '';
  var data = JSON.parse(props.data);
  let ignore = ['id', 'createdAt', 'updatedAt'];

  for (let key in data) {
    if (!ignore.includes(key)) {
      str += `${key}: ${data[key]}\n`;
    }
  }

  return React.createElement("div", {
    style: {
      whiteSpace: 'pre'
    }
  }, str, React.createElement("button", {
    onClick: () => props.changePage('checkout')
  }, "Confirm"));
};

const postInfo = (route, options, cb = () => {}) => {
  fetch('http://localhost:3000/' + route, {
    method: 'POST',
    body: JSON.stringify(options),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.text();
  }).then(text => {
    cb(text);
  });
};

const updateInfo = (route, id, options, cb = () => {}) => {
  fetch('http://localhost:3000/' + route, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      options
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.text();
  }).then(text => {
    cb(text);
  });
};

const getRecord = (id, cb = () => {}) => {
  var url = new URL('http://localhost:3000/payment');
  var params = {
    id
  };
  url.search = new URLSearchParams(params);
  fetch(url).then(response => {
    return response.text();
  }).then(text => {
    cb(text);
  });
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));