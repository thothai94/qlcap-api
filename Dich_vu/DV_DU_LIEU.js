var http = require("http");
var cors = require('cors');
var Luu_tru = require("../Xu_ly/XL_LUU_TRU_MONGODB")
var Gmail = require("../Xu_ly/XL_GUI_THU_DIEN_TU")
var Token = require("../Xu_ly/XL_Get_token")

var Xu_ly_Tham_so = require('querystring')
var Port = normalizePort(process.env.PORT || 1000)
var Du_lieu = {}

var Danh_sach_Tuyen_cap = Luu_tru.Doc_Thong_tin_Tuyen_cap()
var Danh_sach_Doan_cap = Luu_tru.Doc_Thong_tin_Doan_cap()
var Danh_sach_Soi_cap = Luu_tru.Doc_Thong_tin_Soi_cap()

Danh_sach_Tuyen_cap.then(Kq => {
    Du_lieu.Danh_sach_Tuyen_cap = Kq
})
Danh_sach_Doan_cap.then(Kq => {
    Du_lieu.Danh_sach_Doan_cap = Kq
})
Danh_sach_Soi_cap.then(Kq => {
    Du_lieu.Danh_sach_Soi_cap = Kq
})


var Dich_vu = http.createServer(
    (Yeu_cau, Dap_ung) => {
        var Chuoi_Nhan = ""
        var Chuoi_Kq = "{}"
        var Dia_chi = Yeu_cau
            .url
            .replace("/", "").replace("?", "")
        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi)
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
        Yeu_cau.on('end', () => {
            if (Ma_so_Xu_ly == "getToken") {
                var Doi_tuong_Kq = {}
                var token = Token.getToken()
                Doi_tuong_Kq.token = token
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);
            }
            else if (Ma_so_Xu_ly == "Doc_Danh_sach_Tuyen_cap") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Tuyen_cap = Du_lieu.Danh_sach_Tuyen_cap
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);

            }
            else if (Ma_so_Xu_ly == "Doc_Danh_sach_Doan_cap") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Doan_cap = Du_lieu.Danh_sach_Doan_cap
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);

            }
            else if (Ma_so_Xu_ly == "Doc_Danh_sach_Soi_cap") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Soi_cap = Du_lieu.Danh_sach_Soi_cap
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);

            }
            else if (Ma_so_Xu_ly == "Them_Tuyen_cap") {
                var Kq
                var Tuyen_cap = JSON.parse(Chuoi_Nhan)
                Kq = Luu_tru.Ghi_moi_Doi_tuong("ql_tuyen", Tuyen_cap)
                Kq.then(result => {
                    Du_lieu.Danh_sach_Tuyen_cap.push(Tuyen_cap)
                    Chuoi_Kq = JSON.stringify(Tuyen_cap)
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                })
            }
            else if (Ma_so_Xu_ly == "Them_Soi_cap") {
                var Kq
                var Soi_cap = JSON.parse(Chuoi_Nhan)
                Kq = Luu_tru.Ghi_moi_Doi_tuong("ql_soi", Soi_cap)
                Kq.then(result => {
                    Du_lieu.Danh_sach_Soi_cap.push(Soi_cap)
                    Chuoi_Kq = JSON.stringify(Soi_cap)
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                })
            }
            else if (Ma_so_Xu_ly == "Them_Doan_cap") {
                var Kq
                var Doan_cap = JSON.parse(Chuoi_Nhan)
                Kq = Luu_tru.Ghi_moi_Doi_tuong("ql_doan", Doan_cap)
                Kq.then(result => {
                    Du_lieu.Danh_sach_Doan_cap.push(Doan_cap)
                    Chuoi_Kq = JSON.stringify(Doan_cap)
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                })
            }
            else if (Ma_so_Xu_ly == "Cap_nhat_Soi_cap") {
                var Kq = ""
                var Danh_sach_Cap_nhat = JSON.parse(Chuoi_Nhan)
                Danh_sach_Cap_nhat.forEach(Soi_cap_Cap_nhat => {
                    var Soi_cap = Du_lieu.Danh_sach_Soi_cap.find(x => x.soi_id == Soi_cap_Cap_nhat.soi_id)
                    Soi_cap.ten_soi = Soi_cap_Cap_nhat.ten_soi
                    Soi_cap.doan_id = Soi_cap_Cap_nhat.doan_id
                    Soi_cap.cl_id = Soi_cap_Cap_nhat.cl_id
                    Soi_cap.dvsd_id = Soi_cap_Cap_nhat.dvsd_id
                    Soi_cap.trang_thai = Soi_cap_Cap_nhat.trang_thai
                    Soi_cap.thiet_bi = Soi_cap_Cap_nhat.thiet_bi
                    Soi_cap.tbsd_id = Soi_cap_Cap_nhat.tbsd_id
                    var Dieu_kien = { "soi_id": Soi_cap.soi_id }
                    var Gia_tri_Cap_nhat = {
                        $set: {
                            "ten_soi": Soi_cap.ten_soi,
                            "doan_id": Soi_cap.doan_id,
                            "cl_id": Soi_cap.cl_id,
                            "dvsd_id": Soi_cap.dvsd_id,
                            "trang_thai": Soi_cap.trang_thai,
                            "thiet_bi": Soi_cap.thiet_bi,
                            "tbsd_id": Soi_cap.tbsd_id
                        }
                    }

                    Kq = Luu_tru.Cap_nhat_Doi_tuong("ql_soi", Dieu_kien, Gia_tri_Cap_nhat)

                    Kq.then(result => {
                        console.log(result)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    })

                })
            }
            else if (Ma_so_Xu_ly == "Cap_nhat_Doan_cap") {
                var Kq = ""
                var Danh_sach_Cap_nhat = JSON.parse(Chuoi_Nhan)
                Danh_sach_Cap_nhat.forEach(Doan_cap_Cap_nhat => {
                    var Doan_cap = Du_lieu.Danh_sach_Doan_cap.find(x => x.doan_id == Doan_cap_Cap_nhat.doan_id)
                    Doan_cap.ten_doan = Doan_cap_Cap_nhat.ten_doan
                    Doan_cap.mo_ta = Doan_cap_Cap_nhat.mo_ta
                    Doan_cap.ly_trinh_dau = Doan_cap_Cap_nhat.ly_trinh_dau
                    Doan_cap.ly_trinh_cuoi = Doan_cap_Cap_nhat.ly_trinh_cuoi
                    Doan_cap.tong_so_soi = Doan_cap_Cap_nhat.tong_so_soi
                    Doan_cap.suy_hao_thiet_ke = Doan_cap_Cap_nhat.suy_hao_thiet_ke
                    Doan_cap.trang_thai = Doan_cap_Cap_nhat.trang_thai
                    Doan_cap.stt = Doan_cap_Cap_nhat.stt
                    Doan_cap.cu_ly = Doan_cap_Cap_nhat.cu_ly
                    Doan_cap.tcs_id = Doan_cap_Cap_nhat.tcs_id
                    Doan_cap.ptld_id = Doan_cap_Cap_nhat.ptld_id
                    Doan_cap.hcc_lc_id = Doan_cap_Cap_nhat.hcc_lc_id
                    Doan_cap.tuyen_id = Doan_cap_Cap_nhat.tuyen_id
                    Doan_cap.so_soi_id = Doan_cap_Cap_nhat.so_soi_id
                    var Dieu_kien = { "doan_id": Doan_cap.doan_id }
                    var Gia_tri_Cap_nhat = {
                        $set: {
                            "ten_doan": Doan_cap.ten_doan,
                            "mo_ta": Doan_cap.mo_ta,
                            "ly_trinh_dau": Doan_cap.ly_trinh_dau,
                            "ly_trinh_cuoi": Doan_cap.ly_trinh_cuoi,
                            "tong_so_soi": Doan_cap.tong_so_soi,
                            "suy_hao_thiet_ke": Doan_cap.suy_hao_thiet_ke,
                            "trang_thai": Doan_cap.trang_thai,
                            "stt": Doan_cap.stt,
                            "cu_ly": Doan_cap.cu_ly,
                            "tcs_id": Doan_cap.tcs_id,
                            "ptld_id": Doan_cap.ptld_id,
                            "hcc_lc_id": Doan_cap.hcc_lc_id,
                            "tuyen_id": Doan_cap.tuyen_id,
                            "so_soi_id": Doan_cap.so_soi_id
                        }
                    }

                    Kq = Luu_tru.Cap_nhat_Doi_tuong("ql_doan", Dieu_kien, Gia_tri_Cap_nhat)

                    Kq.then(result => {
                        console.log(result)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    })

                })
            }
            else if (Ma_so_Xu_ly == "Cap_nhat_Tuyen_cap") {
                var Kq = ""
                var Danh_sach_Cap_nhat = JSON.parse(Chuoi_Nhan)
                Danh_sach_Cap_nhat.forEach(Tuyen_cap_Cap_nhat => {
                    var Tuyen_cap = Du_lieu.Danh_sach_Tuyen_cap.find(x => x.tuyen_id == Tuyen_cap_Cap_nhat.tuyen_id)
                    Tuyen_cap.ten_tuyen = Tuyen_cap_Cap_nhat.ten_tuyen
                    Tuyen_cap.trang_thai = Tuyen_cap_Cap_nhat.trang_thai
                    Tuyen_cap.chieu_dai_tuyen = Tuyen_cap_Cap_nhat.chieu_dai_tuyen
                    Tuyen_cap.ly_trinh_dau = Tuyen_cap_Cap_nhat.ly_trinh_dau
                    Tuyen_cap.ly_trinh_cuoi = Tuyen_cap_Cap_nhat.ly_trinh_cuoi
                    Tuyen_cap.ghi_chu = Tuyen_cap_Cap_nhat.ghi_chu
                    Tuyen_cap.nam_khai_thac = Tuyen_cap_Cap_nhat.nam_khai_thac
                    Tuyen_cap.quoc_lo = Tuyen_cap_Cap_nhat.quoc_lo
                    Tuyen_cap.ptld_id = Tuyen_cap_Cap_nhat.ptld_id
                    Tuyen_cap.suy_hao_thiet_ke = Tuyen_cap_Cap_nhat.suy_hao_thiet_ke
                    var Dieu_kien = { "tuyen_id": Tuyen_cap.tuyen_id }
                    var Gia_tri_Cap_nhat = {
                        $set: {
                            "ten_tuyen": Tuyen_cap.ten_tuyen,
                            "trang_thai": Tuyen_cap.trang_thai,
                            "chieu_dai_tuyen": Tuyen_cap.chieu_dai_tuyen,
                            "ly_trinh_dau": Tuyen_cap.ly_trinh_dau,
                            "ly_trinh_cuoi": Tuyen_cap.ly_trinh_cuoi,
                            "ghi_chu": Tuyen_cap.ghi_chu,
                            "nam_khai_thac": Tuyen_cap.nam_khai_thac,
                            "quoc_lo": Tuyen_cap.quoc_lo,
                            "ptld_id": Tuyen_cap.ptld_id,
                            "suy_hao_thiet_ke": Tuyen_cap.suy_hao_thiet_ke
                        }
                    }

                    Kq = Luu_tru.Cap_nhat_Doi_tuong("ql_tuyen", Dieu_kien, Gia_tri_Cap_nhat)

                    Kq.then(result => {
                        console.log(result)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    })

                })
            }
            else if (Ma_so_Xu_ly == "Xoa_Tuyen_cap") {
                var Kq = ""
                var Danh_sach_Xoa = JSON.parse(Chuoi_Nhan)
                Danh_sach_Xoa.forEach(Tuyen_cap_Xoa => {
                    var Tuyen_cap = Du_lieu.Danh_sach_Tuyen_cap.find(x => x.tuyen_id == Tuyen_cap_Xoa.tuyen_id)

                    var Dieu_kien = { "tuyen_id": Tuyen_cap.tuyen_id }
                    Kq = Luu_tru.Xoa_Doi_tuong("ql_tuyen", Dieu_kien)

                    Kq.then(result => {
                        Du_lieu.Danh_sach_Tuyen_cap = Du_lieu.Danh_sach_Tuyen_cap.filter(x => x.tuyen_id != Tuyen_cap_Xoa.tuyen_id)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    }).catch(err => {
                        Chuoi_Kq = "Error"
                    })

                })

            } 
            else if (Ma_so_Xu_ly == "Xoa_Soi_cap") {
                var Kq = ""
                var Danh_sach_Xoa = JSON.parse(Chuoi_Nhan)
                Danh_sach_Xoa.forEach(Soi_cap_Xoa => {
                    var Soi_cap = Du_lieu.Danh_sach_Soi_cap.find(x => x.soi_id == Soi_cap_Xoa.soi_id)

                    var Dieu_kien = { "soi_id": Soi_cap.soi_id }
                    Kq = Luu_tru.Xoa_Doi_tuong("ql_soi", Dieu_kien)

                    Kq.then(result => {
                        Du_lieu.Danh_sach_Soi_cap = Du_lieu.Danh_sach_Soi_cap.filter(x => x.soi_id != Soi_cap_Xoa.soi_id)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    }).catch(err => {
                        Chuoi_Kq = "Error"
                    })
                })

            } 
            else if (Ma_so_Xu_ly == "Xoa_Doan_cap") {
                var Kq = ""
                var Danh_sach_Xoa = JSON.parse(Chuoi_Nhan)
                Danh_sach_Xoa.forEach(Doan_cap_Xoa => {
                    var Doan_cap = Du_lieu.Danh_sach_Doan_cap.find(x => x.doan_id == Doan_cap_Xoa.doan_id)

                    var Dieu_kien = { "doan_id": Doan_cap.doan_id }
                    Kq = Luu_tru.Xoa_Doi_tuong("ql_doan", Dieu_kien)

                    Kq.then(result => {
                        Du_lieu.Danh_sach_Doan_cap = Du_lieu.Danh_sach_Doan_cap.filter(x => x.doan_id != Doan_cap_Xoa.doan_id)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    }).catch(err => {
                        Chuoi_Kq = "Error"
                    })
                })

            } 
             else {
                Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);
            }
        })

    })
// Dich_vu.listen(Port,
//     console.log("Dịch vụ Dữ liệu đang thực thi ...: " + Port)
// );

//Them function
Dich_vu.listen(Port).use(cors());
Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string'
        ? 'Pipe ' + Port
        : 'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}