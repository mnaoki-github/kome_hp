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

        // if (filePath.startsWith('b')) {
            // metaOgImg.content = rootFolderName + '/img/blog/' + filePath.split('.').shift() + '-1.jpg';
        // } else {
            metaOgImg.content = rootFolderName + '/img/' + 'ogp_image.jpg';
        // }

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
        const footerNav = document.querySelector('#footer-nav')
        const navList = [
            ['お知らせ', '/news.html'],
            ['プライパシーポリシー', '/policy.html'],
        ];

        for (i = 0; i < navList.length; i++) {
            const navItem = document.createElement('li');
            const navLink = document.createElement('a');
            navLink.href = rootFolderName + navList[i][1];
            navLink.textContent = navList[i][0];

            navItem.appendChild(navLink);
            footerNav.appendChild(navItem);
        }
    };

    function makeSticky() {
        const sticky = document.querySelector('#sticky');
        const stickyInsta = document.createElement('a');
        const instaLogo = document.createElement('i');
        instaLogo.classList.add('fa-brands', 'fa-instagram');

        stickyInsta.href = 'https://www.instagram.com/stay_with_kome?igsh=OGE0cjl3ODZ0YnVz';
        stickyInsta.target = '_blank'

        stickyInsta.appendChild(instaLogo);
        sticky.appendChild(stickyInsta);
    };

    makeMetaElement();
    makeHeader();
    makeFooterNav()
    makeSticky();

    // コメの年齢
    function getKomeAge() {

        const age = document.querySelector('#age');

        if (age === null) {
            return;
        }

        const birthday = new Date(document.querySelector('#birthday').textContent);
        const today = new Date();
        const y = today.getFullYear() - birthday.getFullYear()
        let m = today.getMonth() - birthday.getMonth()

        if (today.getDate() < birthday.getDate()) {
            m--;
        }
        age.textContent = `${y}歳${m}カ月`;
    }

    getKomeAge();

    // list initialize
    let listData = [];
    let blogList = [];
    let cnt = 0;
    let cntBlog = 0;

    async function getNewsData() {

        const requestURL = rootFolderName + '/newslist.json';
        const request = new Request(requestURL);
        const response = await fetch(request);
        const data = await response.json();

        listData = data;
        blogList = data.filter((prop) => {
            if (prop.type === 'blog') {
                return prop;
            };
        });

        // 初期リスト作成
        mkList(cnt, listData, '#news-list');
        mkList(cntBlog, blogList, '#blog-list');

        mkTop4Blog(blogList);
    };

    function mkList(j, data, idName) {
        const ul = document.querySelector(idName);

        if (ul === null) {
            return;
        }

        for (let i = j; i < j + 5; i++) {
            if (i === data.length - 1) {
                const clickBtn = document.querySelector('.btn');
                clickBtn.classList.add('hide');
            }
            if (i === data.length) {
                return;
            }
            const li = document.createElement('li');
            li.classList.add('newsItem');

            const div = document.createElement('div');
            const spanDate = document.createElement('span');
            const spanCategory = document.createElement('span');

            spanDate.textContent = data[i].date;
            spanDate.classList.add('date');

            spanCategory.textContent = data[i].type;
            let title = document.createElement('a');

            if (data[i].type === 'blog') {
                spanCategory.classList.add('category', 'blogItem');
                title.href = rootFolderName + '/blog/' + data[i].file;
            } else {
                spanCategory.classList.add('category');
                title = document.createElement('span');
            }
            title.textContent = data[i].title;

            div.appendChild(spanDate);
            div.appendChild(spanCategory);
            li.appendChild(div);
            li.appendChild(title);

            ul.appendChild(li);
        };
        cnt += 5;
        cntBlog += 5;
    }

    // newsのbtnクリックで表示増やす
    function listAdd() {
        const openBtn = document.querySelector('#news-open-btn');
        if (openBtn === null) {
            return;
        }

        openBtn.addEventListener('click', () => {
            mkList(cnt, listData, '#news-list');
        })
    };

    // blogのbtnクリックで表示増やす
    function blogListAdd() {
        const openBtn = document.querySelector('#blog-open-btn');
        if (openBtn === null) {
            return;
        }
        openBtn.addEventListener('click', () => {
            mkList(cntBlog, blogList, '#blog-list');
        })
    };


    function mkTop4Blog(lists) {
        const sectionElment = document.querySelector('.blog-block');
        if (sectionElment === null) {
            return;
        }

        for (let i = 0; i < 4; i++) {
            const divElement = document.createElement('div');
            const aElement = document.createElement('a');
            const imgElement =document.createElement('img');
            const spanElement =document.createElement('span');

            divElement.classList.add('article');
            aElement.classList.add('article-link');
            aElement.href ='./blog/' +lists[i].file;
            imgElement.src='./img/blog/'+ lists[i].file.replace('.html','-1.jpg');

            spanElement.classList.add('article-title');
            spanElement.textContent=lists[i].title;

            aElement.appendChild(imgElement);
            
            divElement.appendChild(aElement);
            divElement.appendChild(spanElement);

            sectionElment.appendChild(divElement);
        }

    };


    getNewsData();
    listAdd();
    blogListAdd();
}