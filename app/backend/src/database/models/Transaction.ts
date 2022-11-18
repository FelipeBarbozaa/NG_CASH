import { Model, STRING, DATE, DECIMAL } from 'sequelize';
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
		type: STRING(50),
		primaryKey: true,
		allowNull: false,
	},
	debitedAccountId: {
		type: STRING(50),
		allowNull: false,
    field: 'debited_account_id'
	},
	creditedAccountId: {
		type: STRING(50),
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
    field: 'created_at'
  },
	}, {
		sequelize: db,
		modelName: 'transactions',
		timestamps: false
	});

export default Transaction;