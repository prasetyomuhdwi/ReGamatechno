var app = angular.module('CompanyApp', []);

app.controller('mainController', function ($scope, $http) {
    $http.get('/about/').then(function (response) {
        $scope.abouts = response.data;
    });
    $http.get('/product/').then(function (response) {
        $scope.products = response.data;
        $scope.h = ($scope.products.length * 30) / 2
        $scope.h = $scope.h + "vw"
        $("#ClientS").css({ "margin-top": $scope.h });
    });

    function owl() {
        $('.site-main #group8 .owl-carousel').owlCarousel({
            loop: true, autoplay: true, dots: true, responsive: {
                0: {
                    items: 1
                }
            }
        });
    };

    $http.get('/team/').then(function (response) {
        $scope.eMaster = response.data;
        $scope.teams = angular.copy($scope.eMaster);

        $.each($scope.teams, function (i, a) {
            $('#teams').append('<div class="client row"><div class="col-lg-4 col-md-12 client-img"><img src="/img/Uploads/' + a.lokasi + '"width="60%"alt="' + a.nim + '"class="img-fluid"/></div><div class="col-lg-8 col-md-12 about-client"><h4 class="text-uppercase">Nama : ' + a.nama + '</h4><h6 class="text-uppercase">NIM : ' + a.nim + '</h6><p class="para">Tugas : ' + a.divisi + '</p></div></div>')
        });

        owl();
    });

});


app.controller('AdminController', function ($scope, $http, $location) {
    // * Global //
    $scope.username = "Admin";
    $scope.devs =
        [{
            d: 'Frontend Landing Page'
        }, {
            d: 'Frontend Admin'
        }, {
            d: 'Backend'
        }, {
            d: 'Designer'
        }, {
            d: 'Speaker'
        }];
    $http.get('/about/').then(function (response) {
        $scope.abouts = response.data;
    });

    var ID = window.location.href.split("id=")[1];
    var path = window.location.pathname;
    var page = path.split("/").pop();

    $scope.Input = {}

    const urlParams = new URLSearchParams(window.location.search);
    const err = urlParams.get('error');
    const nama = urlParams.get('nama');
    const nim = urlParams.get('nim');
    const divisi = urlParams.get('divisi');
    const deskripsi = urlParams.get('deskripsi');
    const tag = urlParams.get('tag');

    // * Team //
    $http.get('/team/').then(function (response) {
        $scope.teams = response.data;
    });
    $scope.deleteTeam = function (id) {
        $http.delete('/team/' + id).then(function (response) {
            location.reload();
        })
    }

    if (nama != null || nim != null || divisi != null) {
        $scope.Input.nama = nama;
        $scope.Input.nim = nim;
        $scope.Input.divisi = divisi;
    }

    if (err == 11000) {
        document.querySelector("#Alert").removeAttribute("hidden")
    }


    if (ID != undefined && page == "admin_editteam") {
        $http.get('/team/' + ID).then(function (response) {
            $scope.eMaster = JSON.parse(JSON.stringify(response.data.team));
            $scope.editData = angular.copy($scope.eMaster);
        });
    }


    // * Product //
    $scope.deletePro = function (id) {
        $http.delete('/product/' + id).then(function (response) {
            location.reload();
        })
    }
    $http.get('/product/').then(function (response) {
        $scope.products = response.data;
    });

    if (nama != null || deskripsi != null || tag != null) {
        $scope.Input.nama = nama;
        $scope.Input.deskripsi = deskripsi;
        $scope.Input.tag = tag;
    }

    if (ID != undefined && page == "admin_editproducts") {
        $http.get('/product/' + ID).then(function (response) {
            $scope.eMaster = JSON.parse(JSON.stringify(response.data.product));
            $scope.formDataUpdate = angular.copy($scope.eMaster);
        });
    }

    // * Abouts
    $scope.delAbout = function (id) {
        $http.delete('/about/' + id).then(function (response) {
            location.reload();
        })
    }

    // * Clients //
    $scope.clients = [
        {
            "lokasi": "angkasa-pura-solusi.png",
            "nama": "angkasa pura solusi"
        },
        {
            "lokasi": "Bank-BCA.png",
            "nama": "Bank BCA"
        },
        {
            "lokasi": "Bank-BNI.png",
            "nama": "Bank BNI"
        },
        {
            "lokasi": "Bank-BRI.png",
            "nama": "Bank BRI"
        },
        {
            "lokasi": "Bank-Indonesia.png",
            "nama": "Bank Indonesia"
        },
        {
            "lokasi": "Bank-Jateng.png",
            "nama": "Bank Jateng"
        },
        {
            "lokasi": "Bank-Mega.png",
            "nama": "Bank Mega"
        },
        {
            "lokasi": "Berau-Coal.png",
            "nama": "Berau Coal"
        },
        {
            "lokasi": "BPJT.png",
            "nama": "BPJT"
        },
        {
            "lokasi": "bukit-asam-fondation.png",
            "nama": "bukit asam fondation"
        }
    ]
});
