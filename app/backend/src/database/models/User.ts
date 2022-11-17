import { Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: string;
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

export default User;