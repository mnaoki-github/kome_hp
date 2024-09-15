'use strick';
{

    // 共通メタ要素作成
    function makeMetaElement() {
        makeFaviconElement();
        makeStyleElements();
        metaOgUrlElement();
        metaOgImgElement();
    };

    // ドメイン名
    const domainName = 'https://mnaoki-github.github.io';
    // メインフォルダ名
    const rootFolderName = domainName + '/kome_hp';
    // const rootFolderName = 'http://127.0.0.1:5500';
    // headタグ
    const head = document.querySelector('head');
    //  favicon設定
    function makeFaviconElement() {
        const faviconFileLink = '/img/favicon.ico';
        const faviconLink = rootFolderName + faviconFileLink;
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = faviconLink;
        head.appendChild(favicon);
    };
    //  style設定
    function makeStyleElements() {
        const styleFileLinks = [
            '/css/fontawesome/css/fontawesome.css',
            '/css/fontawesome/css/brands.css',
            '/css/fontawesome/css/solid.css',
            '/css/styles.css'
        ];
        const styleLinks = styleFileLinks.map((link) => {
            return rootFolderName + link;
        });

        styleLinks.forEach((styleLink) => {
            const style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = styleLink;
            head.appendChild(style);
        });
    };

    function metaOgUrlElement() {
        const filePath = window.location.pathname;
        const metaOgUrl = document.createElement('meta');
        metaOgUrl.setAttribute('property', 'og:url');

        if (filePath.startsWith('b')) {
            metaOgUrl.content = rootFolderName + '/blog' + filePath;
        } else {
            metaOgUrl.content = rootFolderName + filePath;
        }

        head.appendChild(metaOgUrl);

    };

    function metaOgImgElement() {
        const filePath = window.location.pathname.split('/').pop();
        const metaOgImg = document.createElement('meta');
        metaOgImg.setAttribute('property', 'og:image');

        if (filePath.startsWith('b')) {
            metaOgImg.content = rootFolderName + '/img/blog/' + filePath.split('.').shift() + '-1.jpg';
        } else {
            metaOgImg.content = rootFolderName + '/img/' + 'opg_image.jpg';
        }

        head.appendChild(metaOgImg);

    };

    function makeHeader() {
        const header = document.querySelector('header');
        const logo = document.createElement('h1');
        const logoLink = document.createElement('a');
        logoLink.href = rootFolderName + '/index.html';
        logoLink.textContent = '家猫コメ';
        logo.appendChild(logoLink);

        const navItems = [
            ['Home', '/index.html'],
            ['News', '/news.html'],
            ['Blog', '/blog.html'],
        ];

        const nav = document.createElement('div');
        const ul = document.createElement('ul');
        ul.classList.add('nav');

        for (let i = 0; i < navItems.length; i++) {
            const navItem = document.createElement('li');
            const item = document.createElement('a');

            item.href = rootFolderName + navItems[i][1];
            item.textContent = navItems[i][0];

            navItem.appendChild(item);
            ul.appendChild(navItem);
        }

        nav.appendChild(ul);

        header.appendChild(logo);
        header.appendChild(nav);

    };


    function makeFooterNav() {
        const footerNav =document.querySelector('#footer-nav')
        const navList =[
            ['お知らせ','/news.html'],
            ['プライパシーポリシー','/policy.html'],
        ];

            for (i=0;i<navList.length;i++) {
                const navItem =document.createElement('li');
                const navLink =document.createElement('a');
                navLink.href=rootFolderName + navList[i][1];
                navLink.textContent=navList[i][0];

                navItem.appendChild(navLink);
                footerNav.appendChild(navItem);
            }
    };

    function makeSticky() {
        const sticky =document.querySelector('#sticky');
        const stickyInsta =document.createElement('a');
        const instaLogo =document.createElement('i');
        instaLogo.classList.add('fa-brands', 'fa-instagram');

        stickyInsta.href ='https://www.instagram.com/stay_with_kome?igsh=OGE0cjl3ODZ0YnVz';
        stickyInsta.target='_blank'

        stickyInsta.appendChild(instaLogo);
        sticky.appendChild(stickyInsta);
    };

    makeMetaElement();
    makeHeader();
    makeFooterNav()
    makeSticky();

    // コメの年齢
    function getKomeAge() {

        if (window.location.pathname!=='/index.html') {
            return;

        }
        const age = document.querySelector('#age');
        const birthday = new Date(document.querySelector('#birthday').textContent);
        const today = new Date();
        const y = today.getFullYear() - birthday.getFullYear()
        let m = today.getMonth() - birthday.getMonth()

        if (today.getDate() < birthday.getDate()) {
            m--;
        }
        return `${y}歳${m}カ月`;
    }
    age.textContent = getKomeAge();
}


