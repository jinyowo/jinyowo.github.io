var SnsShare = function (info) {
	// this.info = info;
	//
    // this.lineInfo = info.line;
    // this.bandInfo = info.band;
	// this.kakaoInfo = info.kakao;
    // this.kakaostoryInfo = info.kakaostory;

	this.init();
};

SnsShare.prototype = {
	constructor: SnsShare,

	init: function () {
        this._lineInit();
        this._naverbandInit();
	    this._kakaoInit();
	    this._kakaostoryInit();
	},

    _lineInit: function () {

    },

    _naverbandInit: function () {

    },

    _kakaoInit: function () {
        Kakao.init('e0a3da945d985a84682babc289bbc413');

        Kakao.Link.createTalkLinkButton({
            container: '#kakao-share-btn',
            label: '조성훈&허진 결혼식에 초대합니다.',
            image: {
                src: 'https://raw.githubusercontent.com/jinyowo/jinyowo.github.io/master/wedding/images/main.jpg',
                width: '800',
                height: '533'
            },
            webButton: {
                text: '모바일 초대장 연결',
                url: 'http://jinyowo.github.io'
            }
        });
    },

    _kakaostoryInit: function () {
        Kakao.Story.open({
            container: '#kakaostory-share-btn',
            url: 'https://developers.kakao.com',
            text: '카카오 개발자 사이트로 놀러오세요! #개발자 #카카오 :)'
        });
    }
};
