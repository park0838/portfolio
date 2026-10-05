(function () {
    'use strict';

    var root = document.documentElement;

    // --- 다크 모드 ---
    var toggle = document.querySelector('.theme-toggle');

    function render() {
        var dark = root.getAttribute('data-theme') === 'dark';
        toggle.textContent = dark ? '라이트 모드' : '다크 모드';
    }

    toggle.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        if (next === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
        try { localStorage.setItem('theme', next); } catch (e) {}
        render();
    });
    render();

    // --- PDF로 저장 ---
    var printBtn = document.querySelector('.print-btn');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    // --- 최종 수정일: 서버가 알려 주는 파일 수정 시각을 사용 ---
    var updated = document.getElementById('updated');
    var modified = new Date(document.lastModified);
    if (updated && !isNaN(modified)) {
        var pad = function (n) { return (n < 10 ? '0' : '') + n; };
        var ymd = modified.getFullYear() + '-' + pad(modified.getMonth() + 1) + '-' + pad(modified.getDate());
        updated.textContent = ymd;
        updated.setAttribute('datetime', ymd);
    }

    // --- 이메일 주소 복사 ---
    var copyBtn = document.querySelector('.copy-btn');
    var copyStatus = document.querySelector('.copy-status');
    var copyTimer;

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var area = document.createElement('textarea');
            area.value = text;
            area.setAttribute('readonly', '');
            area.style.position = 'fixed';
            area.style.opacity = '0';
            document.body.appendChild(area);
            area.select();
            var ok = false;
            try { ok = document.execCommand('copy'); } catch (e) {}
            document.body.removeChild(area);
            if (ok) { resolve(); } else { reject(); }
        });
    }

    if (copyBtn && copyStatus) {
        copyBtn.addEventListener('click', function () {
            var text = copyBtn.getAttribute('data-copy');
            copyText(text).then(function () {
                copyStatus.textContent = '복사했습니다.';
            }, function () {
                copyStatus.textContent = '복사하지 못했습니다. ' + text + ' 를 직접 선택해 주세요.';
            });
            clearTimeout(copyTimer);
            copyTimer = setTimeout(function () { copyStatus.textContent = ''; }, 3000);
        });
    }

    // --- 푸터 연도 ---
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
})();
