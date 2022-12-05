const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
        defaultValue: 40, 
      }

    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      },
      defaultValue: 20, 
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      validate: {
        isNumeric: {msg: 'It must be an integer number.'},
      }
    }
  });
};
