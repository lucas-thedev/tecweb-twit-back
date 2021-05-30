let connection = require('./index')

let sql = connection.createConnection()

let command = {
    query (qry) {
        return new Promise((resolve, reject) => {
            sql.query(qry, function(error, results, fields){

                let res = results;
    
                if(error) {
                    resolve({error, message: 'SQL query failed'})
                } else {
                    resolve(res);
                }
            });
        })
    },

    all(table) {
        return 'SELECT * FROM ' + table + ' ORDER BY created_at DESC'
    },

    index(table, id) {
        return 'SELECT * FROM ' + table + ' WHERE id_user= ' + id
    },

    get(table, username) {
        return 'SELECT * FROM ' + table + ' WHERE username = ' + `"${username}"`
    },

    getByField(table, fieldKey, fieldValue) {
        return 'SELECT * FROM ' + table + ` WHERE ${fieldKey} = ` + `"${fieldValue}"`
    },

    store(table, fieldsArr, valuesArr) {
        let fields = fieldsArr.toString()
        let values = "'" + valuesArr.join("','") + "'"
        return 'INSERT INTO ' + table + '(' + fields + ')' + ' VALUES (' + values + ');'
    }
}

module.exports = command