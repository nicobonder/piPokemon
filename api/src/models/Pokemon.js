const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 40, 
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 40, 
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
        defaultValue: 50, 
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 70, 
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 40, 
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 20, 
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.pinterest.com%2Fpin%2F720646377863963523%2F&psig=AOvVaw07k5kVYyySuvC5Gtcla0LP&ust=1670513276352000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPDv0IXp5_sCFQAAAAAdAAAAABAJ",
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
