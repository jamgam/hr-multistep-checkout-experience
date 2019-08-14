class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'checkout',
      id: '',
    };
    this.changePage = this.changePage.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.changeUserId = this.changeUserId.bind(this);
  }

  changePage(page) {
    this.setState({
      page
    });
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
      return <button 
        onClick={()=> this.changePage('accountcreation')}>Checkout</button>;
    case 'accountcreation':
      return <AccountCreation 
        changeUserId={this.changeUserId}
        getUserId={this.getUserId}
        changePage={this.changePage} />;
    case 'addressform':
      return <AddressForm 
        getUserId={this.getUserId}
        changePage={this.changePage} />;
    case 'paymentform':
      return <PaymentForm 
        getUserId={this.getUserId}
        changePage={this.changePage} />;
    case 'confirmationpage':
      return <ConfirmationPage />;

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
    postInfo('user', this.state, (result) => {
      console.log('response from server: ', result);
      this.props.changeUserId(result);
      this.props.changePage('addressform');
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form">
            <label>Name: </label>
            <input id="name" onChange={this.onChange} type="text" value={this.state.name}></input>
          </div>
          <div className="form">
            <label>Email: </label>
            <input id="email" onChange={this.onChange} type="text" value={this.state.email}></input>
          </div>
          <div className="form">
            <label>Password: </label>
            <input id="password" onChange={this.onChange} type="text" value={this.state.password}></input>
          </div>
          <div>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    );
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
      phone: '',
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
    console.log('ID: ', this.props.getUserId());
    updateInfo('update', id, this.state).then(response => {
      this.props.changePage('paymentform');
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form">
            <label>Address: </label>
          </div>
          <div className="form">
            <label>Line 1: </label>
            <input id="line1" onChange={this.onChange} type="text" value={this.state.line1}></input>
          </div>
          <div className="form">
            <label>Line 2: </label>
            <input id="line2" onChange={this.onChange} type="text" value={this.state.line2}></input>
          </div>
          <div className="form">
            <label>City: </label>
            <input id="city" onChange={this.onChange} type="text" value={this.state.city}></input>
          </div>
          <div className="form">
            <label>State: </label>
            <input id="state" onChange={this.onChange} type="text" value={this.state.state}></input>
          </div>
          <div className="form">
            <label>Zip Code: </label>
            <input id="zip" onChange={this.onChange} type="text" value={this.state.zip}></input>
          </div>
          <div className="form">
            <label>Phone Number: </label>
            <input id="phone" onChange={this.onChange} type="text" value={this.state.phone}></input>
          </div>
          <div>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    );
  }
}

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cc: '',
      exp: '',
      cvv: '',
      billingzip: '',
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
    updateInfo('update', id, this.state).then(response => {
      this.props.changePage('confirmationpage');
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form">
            <label>Credit Card Number: </label>
            <input id="cc" onChange={this.onChange} type="text" value={this.state.cc}></input>
          </div>
          <div className="form">
            <label>Expiry Date: </label>
            <input id="exp" onChange={this.onChange} type="text" value={this.state.exp}></input>
          </div>
          <div className="form">
            <label>CVV: </label>
            <input id="cvv" onChange={this.onChange} type="text" value={this.state.cvv}></input>
          </div>
          <div className="form">
            <label>Billing Zip Code: </label>
            <input id="billingzip" onChange={this.onChange} type="text" value={this.state.billingzip}></input>
          </div>
          <div>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    );
  }
}

const ConfirmationPage = props => {
  
};

const postInfo = (route, options, cb = ()=>{}) => {
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

const updateInfo = (route, id, options, cb = ()=>{}) => {
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


ReactDOM.render(<App />, document.querySelector('#app'));