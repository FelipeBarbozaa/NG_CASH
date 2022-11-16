import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
// // import User from './User';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
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