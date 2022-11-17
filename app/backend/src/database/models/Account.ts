import { Model, DECIMAL, STRING } from 'sequelize';
import db from '.';
// // import User from './User';

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

// Sale.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Sale.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

export default Account;