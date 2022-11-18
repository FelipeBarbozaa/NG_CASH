import { Model, DECIMAL, STRING } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init({
  id: {
    type: STRING(50),
    allowNull: false,
    primaryKey: true,
  },
  balance: {
    type: DECIMAL(),
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false
});

export default Account;