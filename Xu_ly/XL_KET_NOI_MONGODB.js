var MongoClient = require('mongodb').MongoClient;

var DbConnection = function () {
    var db = null
    var instance = 0
    
    async function DbConnect() {
        try {
            var url=`mongodb://huutoan94:zodGuk-9fifge-rudbeq@ds113636.mlab.com:13636/qlcap`
            var _db = await MongoClient.connect(url)
            return _db.db(`qlcap`)
        } catch (Loi) {
            return Loi
        }
    }

    async function Get() {
        try {
            instance++
            console.log(`số lượng gọi đến kết nối CSDL: ${instance} lần`)

            if (db != null) {
                console.log(`kết nối CSDL đã tồn tại`)
                return db
            } else {
                console.log(`tạo một kết nối CSDL mới`)
                db = await DbConnect()
                return db
            }
        } catch (Loi) {
            return Loi
        }
    }

    return {
        Get: Get
    }
}


module.exports = DbConnection();