import { Sequelize } from '@sequelize/core';


const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'ibmi',
});

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
  } catch (error) {
	console.error('Unable to connect to the database:', error);
  }

  