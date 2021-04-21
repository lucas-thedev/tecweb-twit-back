let connection = require('./index');

let sql = connection.createConnection();

let command = {
    query (qry) {
        return new Promise((resolve, reject) => {
            sql.query(qry, function(error, results, fields){

                let res = results;
    
                if(error) {
                    resolve({error, message: 'SQL query failed'});
                } else {
                    resolve(res);
                }
            });
        })
    },

    index(table) {
        return 'SELECT * FROM ' + table;
    },

    store(table, fieldsArr, valuesArr) {
        let fields = fieldsArr.toString()
        let values = "'" + valuesArr.join("','") + "'"
        return 'INSERT INTO ' + table + '(' + fields + ')' + ' VALUES (' + values + ');';
    }
}

module.exports = command;