var constants = {};

constants.dataTypes = [
    { name: "STRING", lengthField: true },
    { name: "INTEGER", lengthField: true, unsignable: true, zerofillable: true },
    { name: "BIGINT", lengthField: true, unsignable: true, zerofillable: true },
    { name: "FLOAT", lengthField: true, decimalLengthField: true, unsignable: true, zerofillable: true },
    { name: "DECIMAL", lengthField: true, decimalLengthField: true },
    { name: "DATE", isDate: true },
    { name: "BOOLEAN" },
    { name: "ENUM", isEnum: true }
];

constants.associationTypes = [
    { id: 0, name: 'hasOne' },
    { id: 1, name: 'belongsTo' },
    { id: 2, name: 'hasMany' }
];

module.exports = constants;