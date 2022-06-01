// module.exports = {
//     get: (req, res) => {
//         res.statusCode = 200
//         res.setHeader('Access-Control-Allow-Origin', '*') 
//         var sql = 'SELECT SUM(hours_assigned) FROM RoleAssignment'
//         db.all(sql, [],  (err, rows ) => {
//             if (err) {
//                 throw err
//             }
//             res.json(rows)
//         })
//     },
//     post: (req, res) => {
//         res.statusCode = 200
//         res.setHeader('Access-Control-Allow-Origin', '*')

//         sql = "UPDATE DepartmentAssignment SET name = '" + req.body.name + "' WHERE id = " + req.body.id
//         db.run(sql, [],  err => {
//             if (err) {
//                 throw err
//             }
//             res.end()
//         })
//     }
// }