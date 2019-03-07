var DSND = [];
var DSKH = [];
var ajaxNguoiDung = new AjaxNguoiDung();
var ajaxKhoaHoc = new AjaxKhoaHoc();

// Chức năng: hiển thị modal thêm người dùng
var hienThiModal1 = function(){
    $('#modal-ND').css('display', 'block');
    $('#modal-KH').css('display', 'none');
    // đổi title của modal
    $('.modal-title').html('Thêm người dùng');
    var btnGroups = `
        <button class="btn btn-success" id="btnThemND">Thêm</button>
        <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footer').html(btnGroups);
}
var hienThiModal2 = function(){
    $('#modal-ND').css('display', 'none');
    $('#modal-KH').css('display', 'block');

    var jsonMangNV = localStorage.getItem("NguoiDungDangNhap");
    nguoiDungDangNhap = JSON.parse(jsonMangNV);
    $('#NguoiTao').val(nguoiDungDangNhap.TaiKhoan);
    $('#NguoiTao').attr('readonly', true);
    // đổi title của modal
    $('.modal-title').html('Thêm khoá học');
    var btnGroups = `
        <button class="btn btn-success" id="btnThemKH" data-toggle="modal" data-target="#myModal">Thêm</button>
        <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footer').html(btnGroups);
}

// Chức năng: thêm người dùng
var themNguoiDung = function(){
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var maLoaiNguoiDung = $('#MaLoaiNguoiDung').val();

    // tao doi tuong nguoi dung
    var NguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung);
    
    // kết nối server, thêm người dùng mới
    ajaxNguoiDung.ajaxAddUser(NguoiDungMoi).done(function(result){
        console.log(result);
        // cach 1:
        // getUserListFromDB();
        // cach 2:
        DSND.push(NguoiDungMoi);
        taoBang1(DSND);
    }).fail(function(error){
        console.log(error);
    })

    // ẩn modal
    $('.close').trigger('click');

    // clear input
    $('.modal-body input').val('');
}
var themKhoaHoc = function(){
    var jsonMangNV = localStorage.getItem("NguoiDungDangNhap");
    nguoiDungDangNhap = JSON.parse(jsonMangNV);

    var maKhoaHoc = $('#MaKhoaHoc').val();
    var tenKhoaHoc = $('#TenKhoaHoc').val();
    var moTa = $('#MoTa').val();
    var hinhAnh = $('#HinhAnh').val();
    var luotXem = $('#LuotXem').val();
    var nguoiTao = nguoiDungDangNhap.TaiKhoan;

    // tao doi tuong khoa hoc
    var KhoaHocMoi = new KhoaHoc(maKhoaHoc, tenKhoaHoc, moTa, hinhAnh, luotXem, nguoiTao);
    
    // kết nối server, thêm khoá học mới
    ajaxKhoaHoc.ajaxAddCourse(KhoaHocMoi).done(function(result){
        console.log(result);
        // cach 1:
        // getUserListFromDB();
        // cach 2:
        DSKH.push(KhoaHocMoi);
        taoBang2(DSKH);
        console.log(DSKH);
    }).fail(function(error){
        console.log(error);
    })

    // ẩn modal
    $('.close').trigger('click');

    // clear input
    $('.modal-body input').val('');
}

// tao bang
var taoBang1 = function(DSHienThi){
    var content = '';
    for(var i = 0; i < DSHienThi.length; i++){
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${DSHienThi[i].TaiKhoan}</td>
                <td>${DSHienThi[i].MatKhau}</td>
                <td>${DSHienThi[i].HoTen}</td>
                <td>${DSHienThi[i].Email}</td>
                <td>${DSHienThi[i].SoDT}</td>
                <td>
                    <button class="btn btn-success btnXoaND" data-taikhoan="${DSHienThi[i].TaiKhoan}">Xoá</button>
                    <button class="btn btn-info btnLayThongTinND"   
                            data-taikhoan="${DSHienThi[i].TaiKhoan}"
                            data-matkhau="${DSHienThi[i].MatKhau}"
                            data-hoten="${DSHienThi[i].HoTen}"
                            data-email="${DSHienThi[i].Email}"
                            data-sodt="${DSHienThi[i].SoDT}"
                            data-maloainguoidung="${DSHienThi[i].MaLoaiNguoiDung}"
                            data-toggle="modal"
                            data-target="#myModal"
                    >Cập Nhật</button>
                </td>
            </tr>
        `
    }
    $('#tblDanhSachNguoiDung').html(content);
}
var taoBang2 = function(DSHienThi){
    var content = '';
    for(var i = 0; i < DSHienThi.length; i++){
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${DSHienThi[i].MaKhoaHoc}</td>
                <td>${DSHienThi[i].TenKhoaHoc}</td>
                <td>${DSHienThi[i].MoTa}</td>
                <td>${DSHienThi[i].HinhAnh}</td>
                <td>${DSHienThi[i].LuotXem}</td>
                <td>${DSHienThi[i].NguoiTao}</td>
                <td>
                    <button class="btn btn-success btnXoaKH" data-makhoahoc="${DSHienThi[i].MaKhoaHoc}">Xoá</button>
                    <button class="btn btn-info btnLayThongTinKH"   
                            data-makhoahoc="${DSHienThi[i].MaKhoaHoc}"
                            data-tenkhoahoc="${DSHienThi[i].TenKhoaHoc}"
                            data-mota="${DSHienThi[i].MoTa}"
                            data-hinhanh="${DSHienThi[i].HinhAnh}"
                            data-luotxem="${DSHienThi[i].LuotXem}"
                            data-nguoitao="${DSHienThi[i].NguoiTao}"
                            data-toggle="modal"
                            data-target="#myModal"
                    >Cập Nhật</button>
                </td>
            </tr>
        `
    }
    $('#tblDanhSachKhoaHoc').html(content);
}

// Chuc nang: Xoa nguoi dung
var xoaNguoiDung = function(){
    // B1: lay ra data-taikhoan ma btn đang lưu
    var taiKhoan = $(this).attr('data-taikhoan');  // attr tương ứng getAtribute
    ajaxNguoiDung.ajaxDeleteUser(taiKhoan).done(function(res){
        console.log(res);
        var index = timViTriTheoTaiKhoan(DSND, taiKhoan);
        if(index !== -1){
            DSND.splice(index, 1);
            taoBang1(DSND);
        }
    }).fail(function(err){
        console.log(err);
    })
}
var xoaKhoaHoc = function(){
    // B1: lay ra data-taikhoan ma btn đang lưu
    var maKhoaHoc = $(this).attr('data-makhoahoc');  // attr tương ứng getAtribute
    ajaxKhoaHoc.ajaxDeleteCourse(maKhoaHoc).done(function(res){
        console.log(res);
        var index = timViTriTheoMaKhoaHoc(DSKH, maKhoaHoc);
        if(index !== -1){
            DSKH.splice(index, 1);
            taoBang2(DSKH);
        }
    }).fail(function(err){
        console.log(err);
    })
}

// Lay thong tin nguoi dung
var layThongTinNguoiDung = function(){
    // B1: lay ra thong tin ma btn đang lưu
    var taiKhoan = $(this).attr('data-taikhoan');
    var matKhau = $(this).attr('data-matkhau');
    var hoTen = $(this).attr('data-hoten');
    var email = $(this).attr('data-email');
    var soDT = $(this).attr('data-sodt');
    var maLoaiNguoiDung = $(this).attr('data-maloainguoidung');

    // B2: set gia tri cho input
    $('#TaiKhoan').val(taiKhoan);
    $('#MatKhau').val(matKhau);
    $('#HoTen').val(hoTen);
    $('#Email').val(email);
    $('#SoDienThoai').val(soDT);
    $('#MaLoaiNguoiDung').val(maLoaiNguoiDung);

    // B3: cap nhat lai modal
    capNhatModal1();

    // khoa input
    $('#TaiKhoan').attr('readonly', true);
}
var layThongTinKhoaHoc = function(){
    // B1: lay ra thong tin ma btn đang lưu
    var maKhoaHoc = $(this).attr('data-makhoahoc');
    var tenKhoaHoc = $(this).attr('data-tenkhoahoc');
    var moTa = $(this).attr('data-mota');
    var hinhAnh = $(this).attr('data-hinhanh');
    var luotXem = $(this).attr('data-luotxem');
    var nguoiTao = $(this).attr('data-nguoitao');

    // B2: set gia tri cho input
    $('#MaKhoaHoc').val(maKhoaHoc);
    $('#TenKhoaHoc').val(tenKhoaHoc);
    $('#MoTa').val(moTa);
    $('#HinhAnh').val(hinhAnh);
    $('#LuotXem').val(luotXem);
    $('#NguoiTao').val(nguoiTao);

    // B3: cap nhat lai modal
    capNhatModal2();

    // khoa input
    $('#MaKhoaHoc').attr('readonly', true);
    $('#NguoiTao').attr('readonly', true);
}
// Hàm hiển thị modal Cập nhật người dùng
var capNhatModal1 = function(){
    $('#modal-ND').css('display', 'block');
    $('#modal-KH').css('display', 'none');
    // đổi title của modal
    $('.modal-title').html('Cập nhật người dùng');
    var btnGroups = `
        <button class="btn btn-success btnCapNhatND" data-toggle="modal" data-target="#myModal">Cập nhật</button>
        <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footer').html(btnGroups);
}
var capNhatModal2 = function(){
    $('#modal-ND').css('display', 'none');
    $('#modal-KH').css('display', 'block');
    // đổi title của modal
    $('.modal-title').html('Cập nhật khoá học');
    var btnGroups = `
        <button class="btn btn-success btnCapNhatKH" data-toggle="modal" data-target="#myModal">Cập nhật</button>
        <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
    `
    $('.modal-footer').html(btnGroups);
}
// Cập nhật người dùng
var capNhatNguoiDung = function(){
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var maLoaiNguoiDung = $('#MaLoaiNguoiDung').val();

    // tao doi tuong nguoi dung
    var NguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung);

    ajaxNguoiDung.ajaxUpdateUser(NguoiDungMoi).done(function(res){
        var index = timViTriTheoTaiKhoan(DSND, taiKhoan);
        if(index !== -1){
            DSND[index] = NguoiDungMoi;
            taoBang1(DSND);
        }
        console.log(res);
    }).fail(function(err){
        console.log(err);
    })

    // mo lai input
    $('#TaiKhoan').attr('readonly', false);
}
var capNhatKhoaHoc = function(){
    // var jsonMangNV = localStorage.getItem("NguoiDungDangNhap");
    // nguoiDungDangNhap = JSON.parse(jsonMangNV);
    
    var maKhoaHoc = $('#MaKhoaHoc').val();
    var tenKhoaHoc = $('#TenKhoaHoc').val();
    var moTa = $('#MoTa').val();
    var hinhAnh = $('#HinhAnh').val();
    var luotXem = $('#LuotXem').val();
    var nguoiTao = $('#NguoiTao').val();
    // var nguoiTao = nguoiDungDangNhap.TaiKhoan;

    // tao doi tuong khoa hoc
    var KhoaHocMoi = new KhoaHoc(maKhoaHoc, tenKhoaHoc, moTa, hinhAnh, luotXem, nguoiTao);

    ajaxKhoaHoc.ajaxUpdateCourse(KhoaHocMoi).done(function(res){
        var index = timViTriTheoMaKhoaHoc(DSKH, maKhoaHoc);
        if(index !== -1){
            DSKH[index] = KhoaHocMoi;
            taoBang2(DSKH);
        }
        console.log(res);
    }).fail(function(err){
        console.log(err);
    })

    // mo lai input
    $('#MaKhoaHoc').attr('readonly', false);
}

// Tim vi tri taikhoan
var timViTriTheoTaiKhoan = function(danhSach, taiKhoan){
    for(var i = 0; i < danhSach.length; i++){
        if(danhSach[i].TaiKhoan === taiKhoan){
            return i;
        }
    }
    return -1;
}
var timViTriTheoMaKhoaHoc = function(danhSach, maKhoaHoc){
    for(var i = 0; i < danhSach.length; i++){
        if(danhSach[i].MaKhoaHoc === maKhoaHoc){
            return i;
        }
    }
    return -1;
}

// tìm khoá học theo mã
var timKiemKhoaHoc = function(){
    var danhSachTimKiem = [];
    var keyword = $('#TimKiemKH').val();
    for(var i = 0; i < DSKH.length; i++){
        if(DSKH[i].MaKhoaHoc.toLowerCase().indexOf(keyword.toLowerCase().trim()) !== -1){
            danhSachTimKiem.push(DSKH[i]);
        }
    }
    taoBang2(danhSachTimKiem);
}

                            // ------------------AJAX-------------------------//
var getUserListFromDB = function(){
    ajaxNguoiDung.ajaxGetUserFromDB().done(function(res){
        console.log(res);
        // code chay khi server tra ve ket qua
        DSND = res;
        taoBang1(DSND);
    }).fail(function(err){
        console.log(err);
    })
}
getUserListFromDB();
var getCourseListFromDB = function(){
    ajaxKhoaHoc.ajaxGetCourseFromDB().done(function(res){
        console.log(res);
        // code chay khi server tra ve ket qua
        DSKH = res;
        taoBang2(DSKH);
    }).fail(function(err){
        console.log(err);
    })
}
getCourseListFromDB();

                                    // -----------gắn sự kiện----------//
$('#btnThemNguoiDung').click(hienThiModal1);
// $('#btnThemNguoiDung').click(function(){

// });
$('#btnThemKhoaHoc').click(hienThiModal2);

// Đối với các thẻ mà dc tạo động thông qua code js (string template), thì ta sẽ tạo sự kiện khác
// phải dùng 1 thẻ bao ngoài là body
$('body').delegate('#btnThemND', 'click', themNguoiDung);
$('body').delegate('.btnXoaND' , 'click', xoaNguoiDung);
$('body').delegate('.btnLayThongTinND', 'click', layThongTinNguoiDung);
$('body').delegate('.btnCapNhatND', 'click', capNhatNguoiDung);

$('body').delegate('#btnThemKH', 'click', themKhoaHoc);
$('body').delegate('.btnXoaKH' , 'click', xoaKhoaHoc);
$('body').delegate('.btnLayThongTinKH', 'click', layThongTinKhoaHoc);
$('body').delegate('.btnCapNhatKH', 'click', capNhatKhoaHoc);