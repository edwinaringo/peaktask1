module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      completed: DataTypes.BOOLEAN,
    });
  
    Task.associate = function(models) {
      
      Task.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
  
    return Task;
  };
  