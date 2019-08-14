const Sequelize = require('sequelize');

const sequelize = new Sequelize('checkout', 'student', 'student', {
  dialect: 'mysql'
});

module.exports.Payment = sequelize.define('payment', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  line1: Sequelize.STRING,
  line2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING,
  phone: Sequelize.STRING,
  cc: Sequelize.STRING,
  exp: Sequelize.STRING,
  cvv: Sequelize.STRING,
  billingzip: Sequelize.STRING,
});

sequelize.sync();

// module.exports = Payment;