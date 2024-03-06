import {
  DataTypes,
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeTeams extends Model<InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizeTeams.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'teams',
  underscored: true,
});

export default SequelizeTeams;
