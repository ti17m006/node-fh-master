
const { DataType } = require('sequelize');
const TableName = require('./sql_tableNames').TableName;

const Role = {
    Admin: "Admin",
    Manager: "Manager",
    Worker: "Worker"
}

const Id = {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
};

const FullName = {
    type: DataTypes.STRING,
    allowNull: false
};

const Username = {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
}
const Password = {
    type: DataTypes.STRING,
    allowNull: false
}

exports.Manager = {
    id: Id,
    fullname: FullName,
    username: Username,
    password: Password
};

exports.Worker = {
    id: Id,
    fullname: FullName,
    username: Username,
    password: Password
};

exports.Geolocation = {
    id: Id,
    worker_id: {
        type: DataType.INTEGER,
        references: {
            model: TableName.Worker,
            key: 'id'
        }
    }
    // https://sequelize.org/master/class/lib/data-types.js~ARRAY.html
    // An array of type. Only available in Postgres.
    // location: 
};