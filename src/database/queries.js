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
        return 'SELECT * FROM ' + table + ' WHERE id_user= ' + id +  ' ORDER BY created_at DESC'
    },

    get(table, username) {
        return 'SELECT * FROM ' + table + ' WHERE username = ' + `"${username}"`
    },

    getWithCondition(table, condition) {
        return 'SELECT * FROM ' + table + ' WHERE ' + condition;
    },

    getByField(table, fieldKey, fieldValue) {
        return 'SELECT * FROM ' + table + ` WHERE ${fieldKey} = ` + `"${fieldValue}"`
    },

    store(table, fieldsArr, valuesArr) {
        let fields = fieldsArr.toString()
        let values = "'" + valuesArr.join("','") + "'"
        return 'INSERT INTO ' + table + '(' + fields + ')' + ' VALUES (' + values + ');'
    },

    delete (table, condition){
        return 'DELETE FROM ' + table + ' WHERE ' + condition + ' ;'
    },

    update (table, column, data, condition){
        let queryWithCondition = 'UPDATE ' + table + ' SET ' + column + ' = ' + data + ' WHERE ' + condition + ' ;'
        let queryWithoutCondition = 'UPDATE ' + table + ' SET ' + column + ' = ' + data +' ;'
        
        if (condition){
            console.log('QUERY: ', queryWithCondition)
            return queryWithCondition
        }

        console.log('QUERY: ', queryWithCondition)

        return queryWithoutCondition
    }
}

module.exports = command