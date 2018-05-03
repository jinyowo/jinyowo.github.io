// 모바일 에이전트 구분
var UA = navigator.userAgent;
var isMobile = {
    Android: function () {
        return UA.match(/Android/i) === null ? false : true;
    },
    BlackBerry: function () {
        return UA.match(/BlackBerry/i) === null ? false : true;
    },
    IOS: function () {
        return UA.match(/iPhone|iPad|iPod/i) === null ? false : true;
    },
    Opera: function () {
        return UA.match(/Opera Mini/i) === null ? false : true;
    },
    Windows: function () {
        return UA.match(/IEMobile/i) === null ? false : true;
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var lat = 37.5140909;
var lng = 127.0372836;
var position = new naver.maps.LatLng(37.5140909, 127.0372836);

var map = new naver.maps.Map('map', {
    center: position,
    zoom: 12,
    minZoom: 8,
    zoomControl: true,
    zoomControlOptions: { //줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_RIGHT
    }
});

// 마커 표시
var marker = new naver.maps.Marker({
    position: position,
    map: map,
    title: "더그레이스켈리 강남"
});


// 웹
var navermaps = 'http://map.naver.com/index.nhn?enc=utf8&level=2&lng=' + lng + '&lat=' + lat + '&pinTitle=더그레이스켈리&pinType=SITE';
var kakaomaps = 'http://map.daum.net/link/map/더그레이스켈리,' + lat + ',' + lng;
// 모바일 네이티브
if (isMobile.any()) {
    var navermaps = 'http://app.map.naver.com/launchApp/?menu=route&elat=37.5140958&elng=127.0372832&etitle=%EB%8D%94%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%8A%A4%EC%BC%88%EB%A6%AC%EA%B0%95%EB%82%A8&eelat=37.5138834&eelng=127.0373671&routeType=2';
}

// 마크 클릭시 인포윈도우 오픈
var infowindow = new naver.maps.InfoWindow({
    content: '<h5 style="margin-top: 0.5em;">더그레이스켈리</h5><div style="margin: 0 0.5em 0.5em 0.5em;"><button style="background-color: rgb(23, 183, 55); border-radius: 0.5em; height: 2.5em; line-height: 2.5em; padding: 0 1em 0 1em;" onclick="window.open(navermaps)">네이버 지도로 길찾기</button><button style="background-color: rgb(250, 224, 10); border-radius: 0.5em; height: 2.5em; line-height: 2.5em; padding: 0 1em 0 1em; color: black;" onclick="window.open(kakaomaps)">카카오 지도로 길찾기</button></div>'
});
infowindow.open(map, marker);

// 마커 클릭 이벤트 처리
naver.maps.Event.addListener(marker, "click", function (e) {
    if (infowindow.getMap()) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
});

// 지도 클릭시 인포윈도우 닫기
naver.maps.Event.addListener(map, "click", function (e) {
    if (infowindow.getMap()) {
        infowindow.close();
    }
});
