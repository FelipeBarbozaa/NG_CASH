import { Model, STRING } from 'sequelize';
import db from '.';
import Account from './Account';

class User extends Model {
  id?: string;
  username?: string;
  password?: string;
  accountId?: string;
  accountInfo?: {
    id: string;
    balance: number;
  }
}

User.init({
  id: {
    type: STRING(50),
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING(50),
    allowNull: false,
  },
  accountId: {
    allowNull: false,
    unique: true,
    type: STRING(50),
    field: 'account_id',
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false
});

User.belongsTo(Account, { foreignKey: 'accountId', as: 'accountInfo' });
Account.hasOne(User, { foreignKey: 'accountId', as: 'accountInfo' });

export default User;