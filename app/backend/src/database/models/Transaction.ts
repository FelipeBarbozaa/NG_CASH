import { Model, INTEGER, DATE, DECIMAL } from 'sequelize';
import db from '.';

class Transaction extends Model {
	id!: number;
	debitedAccountId!: number;
	creditedAccountId!: number;
	value!: number;
  createdAt!: Date;
}

Transaction.init({
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	debitedAccountId: {
		type: INTEGER,
		allowNull: false,
    field: 'debited_account_id'
	},
	creditedAccountId: {
		type: INTEGER,
		allowNull: false,
    field: 'credited_account_id'
	},
	value: {
		type: DECIMAL(10, 2),
		allowNull: false,
	},
  createdAt: {
    type: DATE,
    allowNull: false,
  },
	}, {
		sequelize: db,
		modelName: 'transactions',
		timestamps: false
	});

export default Transaction;