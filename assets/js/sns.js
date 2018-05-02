var SnsShare = function (info) {
    this._kakaoBtnId = info.kakao.id;
    this._kakaoKey = info.kakao.key;
    this._lineBtnId = info.line.id;
    this._copyBtnId = info.copy.id;

    this._title = info.title;
    this._content = info.content;
    this._link = info.link;
    this._imgSrc = info.imgSrc;

    this.init();
};

SnsShare.prototype = {
    constructor: SnsShare,

    init: function () {
        this._initialize();
        this._attachEvent();
        this._initClipboardJS();
    },

    _initialize: function () {
        this.$kakaoShareBtn = $(this._kakaoBtnId);
        this.$lineShareBtn = $(this._lineBtnId);
        this.$URLCopyBtn = $(this._copyBtnId);
        this.$tooltip = $('[data-role="tooltip"]');
    },

    _attachEvent: function () {
        this.$kakaoShareBtn.on('click', $.proxy(this._onClickKakaoShareBtn, this));
        this.$lineShareBtn.on('click', $.proxy(this._onClickLineShareBtn, this));
        this.$URLCopyBtn.on('click', $.proxy(this._onClickURLCopyBtn, this));
    },

    _initClipboardJS: function () {
        var self = this;

        this.clipboard = new ClipboardJS(this._copyBtnId, {
            text: function () {
                return self._title + self._content + '\n' + self._link;
            }
        });

        this.clipboard.on('success', function (e) {
            self._showTooltip();
            e.clearSelection();
        });

        this.clipboard.on('error', function () {
            console.log('error');
        });
    },

    /**
     * 카카오톡 공유하기
     * @param e
     */
    _onClickKakaoShareBtn: function (e) {
        e.preventDefault();

        Kakao.init(this._kakaoKey);

        Kakao.Link.createTalkLinkButton({
            container: this._kakaoBtnId,
            label: this._content,
            image: {
                src: this._imgSrc,
                width: '800',
                height: '533'
            },
            webButton: {
                text: '모바일 초대장 연결',
                url: this._link
            }
        });
    },

    /**
     * 라인 공유하기
     * @param e
     */
    _onClickLineShareBtn: function (e) {
        e.preventDefault();

        var lineUrl = 'http://line.me/R/msg/text/?';
        var url = lineUrl + encodeURIComponent(this._title + this._content + '\n' + this._link);

        window.open(url, 'Line share', '');
    },

    /**
     * URL 복사하기
     * @param e
     * @private
     */
    _onClickURLCopyBtn: function (e) {
        e.preventDefault();
    },

    /**
     * Copied 툴팁 보이기
     * @param e
     * @param msg
     */
    _showTooltip: function () {
        this.$tooltip.addClass('tooltipped tooltipped-e');
        this.$tooltip.attr('aria-label', 'Copied!');

        setTimeout(function() {
            this.$tooltip.removeClass('tooltipped tooltipped-e')
                .removeAttr('aria-label');
        }.bind(this), 1500);
    }
};
