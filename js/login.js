var actionLogin = function () {
    var username = $('#txtUserName').val();
    var password = $('#txtPassword').val();

    $.ajax({
        url: 'http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
        type: 'GET'
    }).done(function (res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            if (username === res[i].TaiKhoan && password === res[i].MatKhau && res[i].MaLoaiNguoiDung === 'HV') {
                window.open('khoahoc.html');
                var jsonMang = JSON.stringify(res[i]);
                localStorage.setItem('NDLogin', jsonMang);
                console.log(res);
            }
            else if (username === res[i].TaiKhoan && password === res[i].MatKhau && res[i].MaLoaiNguoiDung === 'GV') {
                window.open('qlnguoidung.html');
                var jsonMang = JSON.stringify(res[i]);
                localStorage.setItem('NDLogin', jsonMang);
            }
            else {
                $('#alerUserPass').html('User hoặc Password không tồn tại !');
            }
        }
    }).fail(function (err) {
        console.log(err);
    })
}


var actionRegister = function () {
    var mangNguoiDungDK = [];
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var maLoaiNguoiDung = $('#maLoaiNguoiDung').val();

    var NguoiDungDangKy = new NguoiDung(taiKhoan,matKhau,hoTen,email,soDT,maLoaiNguoiDung)

    $('#alerRegister').html('Chúc mừng bạn đã đăng ký thành công !');
   
    $.ajax({
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
        type: 'POST',
        data: NguoiDungDangKy
    }).done(function(res){
        mangNguoiDungDK.push(NguoiDungDangKy);
        console.log(NguoiDungDangKy);
        taoBang(NguoiDungDangKy);
        
    }).fail(function(err){
        console.log(err);
    })
}