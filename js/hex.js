/* =======================================
   定数定義
======================================= */
/* 環境設定 */
const HEX_HOSTS={
  PRODUCTION:[
    'hokuriku-ex.co.jp',
    'www.hokuriku-ex.co.jp'
  ],
  DEVELOPMENT:[
    '02sample28.hopweb.net'
  ]
};

/* URL設定 */
const HEX_URLS={
  RECRUIT:{
    PRODUCTION:'https://hokuriku-ex.co.jp/subsite/recruit/',
    DEVELOPMENT:'http://02sample28.hopweb.net/addon/gartencloud/ajax_gethtml_site_from_db.php?gc_design_set_ID=24'
  }
};

/* 現在の環境 */
const HEX_IS_PRODUCTION=HEX_HOSTS.PRODUCTION.indexOf(location.hostname)!==-1;

/* トップページセクション */
const HOME_SECTIONS={
  HOPWEB:'gc_auto_frame_home_0', /* ヒーロー画像 */
  WELCOME:'gc_auto_frame_home_1', /* Welcomeメッセージ */
  ABOUT:'gc_auto_frame_home_2', /* 私たちについて */
  FIRST:'gc_auto_frame_home_3', /* 初めての方へ */
  SERVICE:'gc_auto_frame_home_4', /* サービス案内 */
  PICKUP:'gc_auto_frame_home_5', /* 注目アイテム */
  NEWS_SECTION:'gc_auto_frame_home_6', /* お知らせセクション */
  NEWS:'gc_auto_frame_home_7', /* 重要なお知らせ */
  BLOG:'gc_auto_frame_home_8', /* スタッフブログ */
  BANNER:'gc_auto_frame_home_9', /* バナー */
  MOVIE:'gc_auto_frame_home_10', /* プロモーション動画 */
  RECRUIT:'gc_auto_frame_home_11', /* 採用情報 */
  CONTACT:'gc_auto_frame_home_12', /* お問い合わせ */
  CALENDAR:'gc_auto_frame_home_13', /* 営業日カレンダー */
  AREA:'gc_auto_frame_home_14', /* 施工エリア */
  FOOTER:'gc_auto_frame_home_15', /* フッター */
  FIXED_FOOTER:'gc_auto_frame_home_16' /* 固定フッター */
};

/* トップページ交互背景対象 */
const HOME_DISPLAY_SECTIONS=[
  HOME_SECTIONS.WELCOME,
  HOME_SECTIONS.ABOUT,
  HOME_SECTIONS.FIRST,
  HOME_SECTIONS.SERVICE,
  HOME_SECTIONS.PICKUP,
  HOME_SECTIONS.NEWS_SECTION,
  HOME_SECTIONS.BANNER,
  HOME_SECTIONS.MOVIE
];

/* スマホ左右余白対象 */
const HOME_PADDING_SECTIONS=[
  HOME_SECTIONS.WELCOME,
  HOME_SECTIONS.ABOUT,
  HOME_SECTIONS.FIRST,
  HOME_SECTIONS.SERVICE,
  HOME_SECTIONS.PICKUP,
  HOME_SECTIONS.NEWS_SECTION,
  HOME_SECTIONS.NEWS,
  HOME_SECTIONS.BLOG,
  HOME_SECTIONS.BANNER,
  HOME_SECTIONS.MOVIE,
  HOME_SECTIONS.RECRUIT
];

/* =======================================
   共通処理
======================================= */
/* DOM読込み完了後に実行 */
function hexReady(callback){
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',callback);
  }else{
    callback();
  }
}

/* ページ読込み完了後に実行 */
function hexLoad(callback){
  if(document.readyState==='complete'){
    callback();
  }else{
    window.addEventListener('load',callback);
  }
}

/* =======================================
   トップページ交互背景
======================================= */
hexLoad(function(){
  var count=0;

  HOME_DISPLAY_SECTIONS.forEach(function(sectionId){
    var section=document.getElementById(sectionId);
    if(!section)return;

    section.classList.remove('hex-home-bg-white','hex-home-bg-gray');

    if(count%2===1){
      section.classList.add('hex-home-bg-gray');
    }else{
      section.classList.add('hex-home-bg-white');
    }

    count++;
  });
});

/* =======================================
   トップページSP左右余白
======================================= */
hexLoad(function(){
  HOME_PADDING_SECTIONS.forEach(function(sectionId){
    var section=document.getElementById(sectionId);
    if(!section)return;

    /* 以前付けた外側のクラスを削除 */
    section.classList.remove('hex-home-side-padding');

    var contents=section.querySelectorAll(
      '.gc_auto_frame_spotitem_box'
    );

    contents.forEach(function(content){
      content.classList.add('hex-home-side-padding');
    });
  });
});

/* =======================================
   下層ページ背景色範囲指定
======================================= */
hexReady(function(){
  document.querySelectorAll('.hex-bg-start').forEach(function(start){
    var body=start.closest('.content_body');
    if(!body)return;

    var end=body.querySelector('.hex-bg-end');
    if(!end)return;

    var startBlock=start.closest(
      ':scope > span'
    ) || start;

    var endBlock=end.closest(
      ':scope > span'
    ) || end;

    /* HOPWEBの直下ブロックまで取得 */
    while(startBlock.parentElement!==body){
      startBlock=startBlock.parentElement;
    }

    while(endBlock.parentElement!==body){
      endBlock=endBlock.parentElement;
    }

    var color=start.dataset.bgColor || '#fff';
    var wrapper=document.createElement('div');

    wrapper.className='hex-bg-range';

    var customClass=start.dataset.bgClass;

    if(customClass){
      customClass
        .split(/\s+/)
        .filter(Boolean)
        .forEach(function(className){
          wrapper.classList.add(className);
        });
    }

    wrapper.style.setProperty(
      '--hex-bg-range-color',
      color
    );

    body.insertBefore(wrapper,startBlock.nextSibling);

    var current=wrapper.nextSibling;

    while(current && current!==endBlock){
      var next=current.nextSibling;
      wrapper.appendChild(current);
      current=next;
    }

    startBlock.style.display='none';
    endBlock.style.display='none';
  });
});

/* =======================================
   URLアンカー補正
======================================= */
hexLoad(function(){
  var hash=location.hash;
  var anchor='';
  var offset=160;
  var count=0;

  if(!hash)return;

  anchor=decodeURIComponent(hash.replace('#',''));

  function scrollToAnchor(){
    var target=null;
    var top=0;

    target=document.getElementById(anchor);

    if(!target){
      target=document.querySelector('a[name="'+anchor+'"]');
    }

    if(!target){
      count++;
      if(count<10){
        setTimeout(scrollToAnchor,300);
      }
      return;
    }

    top=target.getBoundingClientRect().top+window.pageYOffset-offset;

    window.scrollTo({
      top:top,
      behavior:'smooth'
    });
  }

  setTimeout(scrollToAnchor,500);
});

/* =======================================
   共通アンカーナビ
======================================= */
hexLoad(function(){
  setTimeout(function(){
    hexInitAnchorNav();
  },200);
});
function hexInitAnchorNav(){
  if(document.body.classList.contains('hex-staff-iframe-mode'))return;

  var source=document.querySelector('.hex-anchor-source');
  if(!source)return;
  var text=source.textContent||'';
  if(!text)return;
  var titles=text.split('|').map(function(item){
    return item.trim();
  }).filter(function(item){
    return item!=='';
  });
  if(!titles.length)return;
  var targets=document.querySelectorAll('h2, .hex-anchor-target');
  if(!targets.length)return;
  var nav=document.createElement('div');
  nav.className='hex-anchor-nav';
  if(source.id==='hex-anchor-auto-page'){
    nav.classList.add('hex-anchor-nav-auto-page');
  }
  var list=document.createElement('div');
  list.className='hex-anchor-nav-list';
  var pairs=[];
  var currentAnchorTarget=null;
  var hashAnchorTarget=null;

  if(location.hash){
    try{
      hashAnchorTarget=document.getElementById(
        decodeURIComponent(location.hash.substring(1))
      );
    }catch(e){}
  }

  titles.forEach(function(title){
    var target=null;
      targets.forEach(function(h2){
        if(target)return;
        if(h2.offsetParent===null)return;

        var targetText=(h2.textContent||'').trim();
        var targetId=(h2.id||'').trim();

        if(targetText===title||targetId===title){
          target=h2;
        }
      });
    if(!target)return;
    if(!target.id){
      target.id='hex-anchor-'+title.replace(/\s+/g,'-').replace(/[^\w\-ぁ-んァ-ヶ一-龯]/g,'');
    }
    var link=document.createElement('a');
    link.className='hex-anchor-nav-link';
    link.href='#'+target.id;
    link.textContent=title;

    link.addEventListener('click',function(e){
      e.preventDefault();

      currentAnchorTarget=target;

      var top=
        target.getBoundingClientRect().top+
        window.pageYOffset-
        getHexAnchorOffset();

      window.scrollTo({
        top:top,
        behavior:'smooth'
      });

      var correctScroll=function(){
        if(!currentAnchorTarget)return;

        var correctedTop=
          currentAnchorTarget.getBoundingClientRect().top+
          window.pageYOffset-
          getHexAnchorOffset();

        if(Math.abs(window.pageYOffset-correctedTop)>2){
          window.scrollTo({
            top:correctedTop,
            behavior:'auto'
          });
        }
      };

      window.addEventListener('scrollend',correctScroll,{once:true});
    });
    list.appendChild(link);
    pairs.push({
      target:target,
      link:link
    });
  });
  if(!list.children.length)return;
  nav.appendChild(list);
  source.parentNode.insertBefore(nav,source.nextSibling);
  var placeholder=document.createElement('div');
  placeholder.className='hex-anchor-nav-placeholder';
  nav.parentNode.insertBefore(placeholder,nav.nextSibling);
  var fixedStart=0;
  var originalParent=nav.parentNode;
  var originalNext=nav.nextSibling;
  function getHexAnchorHeaderHeight(){
    return 80;
  }
  function getHexAnchorOffset(){
    var scrollbarArea=0;
    var titleSpace=16;

    /* ゴールドバーと白い帯がある場合は36px追加 */
    if(
      window.innerWidth<=1000&&
      nav.classList.contains('has-anchor-scrollbar')
    ){
      scrollbarArea=scrollbarArea-36;
    }

    return(
      getHexAnchorHeaderHeight()+
      nav.offsetHeight+
      scrollbarArea+
      titleSpace
    );
  }
  function refreshHexAnchorNav(){
    var mobileAdjust=0;
    nav.classList.remove('is-fixed');
    placeholder.classList.remove('is-active');
    placeholder.style.height='0px';
    if(nav.parentNode!==originalParent){
      originalParent.insertBefore(nav,originalNext);
    }
    fixedStart=
      nav.getBoundingClientRect().top+
      window.pageYOffset+
      nav.offsetHeight-
      36-
      getHexAnchorHeaderHeight()-
      mobileAdjust;
    updateHexAnchorNav();
  }
  function updateHexAnchorNav(){
    var scrollTop=
      window.pageYOffset||
      document.documentElement.scrollTop;

    var fixedChanged=false;
    if(scrollTop>=fixedStart){
      if(!nav.classList.contains('is-fixed')){
        placeholder.style.height=nav.offsetHeight+'px';
        placeholder.classList.add('is-active');
        document.body.appendChild(nav);
        nav.classList.add('is-fixed');
        fixedChanged=true;
      }
    }else{
      if(nav.classList.contains('is-fixed')){
        nav.classList.remove('is-fixed');
        placeholder.classList.remove('is-active');
        placeholder.style.height='0px';
        originalParent.insertBefore(nav,originalNext);
        fixedChanged=true;
      }
    }
    updateHexAnchorActive(scrollTop);
    if(fixedChanged){
      refreshAnchorScrollbar();
    }
  }
  function updateHexAnchorActive(scrollTop){
    var activePair=null;
    var checkLine=scrollTop+getHexAnchorOffset()+36;
    pairs.forEach(function(pair){
      var targetTop=pair.target.getBoundingClientRect().top+window.pageYOffset;
      if(checkLine>=targetTop)activePair=pair;
    });
    pairs.forEach(function(pair){
      pair.link.classList.remove('is-active');
    });
    if(activePair){
      activePair.link.classList.add('is-active');
      if(
        window.innerWidth<=1000&&
        nav.classList.contains('is-fixed')&&
        anchorList
      ){
        var linkCenter=
          activePair.link.offsetLeft+
          activePair.link.offsetWidth/2;
        var listCenter=
          anchorList.clientWidth/2;
        var maxScroll=
          anchorList.scrollWidth-
          anchorList.clientWidth;
        var targetLeft=
          linkCenter-
          listCenter;
        targetLeft=Math.max(
          0,
          Math.min(targetLeft,maxScroll)
        );
        anchorList.scrollTo({
          left:targetLeft,
          behavior:'smooth'
        });
      }
    }
  }
  /* 別ページからのアンカー移動を補正 */
  function correctHashAnchorPosition(){
    if(!hashAnchorTarget)return;
    currentAnchorTarget=hashAnchorTarget;
    function correct(){
      updateHexAnchorNav();
      var top=
        hashAnchorTarget.getBoundingClientRect().top+
        window.pageYOffset-
        getHexAnchorOffset();
      window.scrollTo({
        top:top,
        behavior:'auto'
      });
    }
    /* 固定ナビとスクロールバーの状態確定後に補正 */
    requestAnimationFrame(function(){
      correct();
      requestAnimationFrame(function(){
        correct();
      });
    });
  }
  /* ゴールドスクロールインジケーター */
  var anchorList=nav.querySelector('.hex-anchor-nav-list');
  var anchorScrollbar=document.createElement('div');
  var anchorScrollbarThumb=document.createElement('span');
  anchorScrollbar.className='hex-anchor-scrollbar';
  anchorScrollbar.setAttribute('aria-hidden','true');
  anchorScrollbarThumb.className='hex-anchor-scrollbar-thumb';
  anchorScrollbar.appendChild(anchorScrollbarThumb);
  nav.appendChild(anchorScrollbar);

  function syncAnchorScrollbar(){
    if(!anchorList)return;

    var visibleWidth=anchorList.clientWidth;
    var totalWidth=anchorList.scrollWidth;
    var maxScroll=totalWidth-visibleWidth;

    /* 1001px以上、または横スクロール不要 */
    if(window.innerWidth>1000||maxScroll<=1){
      anchorScrollbar.classList.remove('is-visible');
      nav.classList.remove('has-anchor-scrollbar');
      anchorScrollbarThumb.style.width='100%';
      anchorScrollbarThumb.style.transform='translateX(0)';

      return;
    }

    /* 横スクロールが必要 */
    anchorScrollbar.classList.add('is-visible');
    nav.classList.add('has-anchor-scrollbar');
    var barWidth=anchorScrollbar.clientWidth;
    if(!barWidth)return;

    var thumbWidth=Math.max(
      barWidth*(visibleWidth/totalWidth),
      32
    );
    thumbWidth=Math.min(
      thumbWidth,
      barWidth
    );
    var scrollProgress=
      anchorList.scrollLeft/maxScroll;
    var moveWidth=
      (barWidth-thumbWidth)*scrollProgress;
    anchorScrollbarThumb.style.width=
      thumbWidth+'px';
    anchorScrollbarThumb.style.transform=
      'translateX('+moveWidth+'px)';
  }
  function refreshAnchorScrollbar(){
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        syncAnchorScrollbar();
      });
    });
  }
  anchorList.addEventListener(
    'scroll',
    syncAnchorScrollbar,
    {passive:true}
  );
  setTimeout(function(){
    refreshHexAnchorNav();
    refreshAnchorScrollbar();
    setTimeout(function(){
      correctHashAnchorPosition();
    },100);
  },100);
  if(document.fonts&&document.fonts.ready){
    document.fonts.ready.then(function(){
      refreshAnchorScrollbar();
    });
  }
  window.addEventListener('scroll',function(){
    updateHexAnchorNav();
  });
  window.addEventListener('resize',function(){
    refreshHexAnchorNav();
    refreshAnchorScrollbar();
  });
}

/* =======================================
   日付をYYYY/MM/DD形式に整形
======================================= */
hexReady(function(){
  function formatDateText(root){
    var walker=document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT
    );

    var nodes=[];
    var node;

    while(node=walker.nextNode()){
      nodes.push(node);
    }

    nodes.forEach(function(textNode){
      var parent=textNode.parentNode;
      if(!parent)return;

      if(
        parent.closest(
          'script,style,textarea,input,select,option'
        )
      )return;

      var text=textNode.nodeValue.trim();

      var match=text.match(
        /^(\d{4})\s*(?:年|[\/.\-])\s*(\d{1,2})\s*(?:月|[\/.\-])\s*(\d{1,2})\s*日?$/
      );

      if(!match)return;

      var year=match[1];
      var month=('0'+match[2]).slice(-2);
      var day=('0'+match[3]).slice(-2);

      textNode.nodeValue=
        textNode.nodeValue.replace(
          text,
          year+'/'+month+'/'+day
        );
    });
  }

  formatDateText(document.body);
});

/* =======================================
   記事パーツの末尾自動挿入改行を削除
======================================= */
hexReady(function(){
  var params=new URLSearchParams(location.search);

  /* 本番はp・k、開発環境はshortname・page_type */
  var shortname=params.get('p')||params.get('shortname')||'';
  var pageType=params.get('k')||params.get('page_type')||'';

  var excludedPages=[
    {
      shortname:'work',
      pageType:'work_item'
    },
    {
      shortname:'information',
      pageType:'information_item'
    },
    {
      shortname:'staffblog',
      pageType:'staffblog_item'
    }
  ];

  var isExcluded=excludedPages.some(function(page){
    return (
      shortname===page.shortname &&
      pageType===page.pageType
    );
  });

  /* 施工事例・お知らせ・スタッフブログの記事では削除しない */
  if(isExcluded)return;

  document.querySelectorAll(
    '[id^="PageMain_Txt_"] + br[clear="all"]'
  ).forEach(function(br){
    br.remove();
  });
});

/* =======================================
   テキストリンク サイト内URL自動生成
======================================= */
hexLoad(function(){
  document.querySelectorAll('a[data-shortname][data-pagetype]').forEach(function(link){
    var url=window.hexBuildUrl(link);
    if(!url)return;
    link.href=url;
  });
});

/* =======================================
   記事詳細タイトル整形
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var titles=document.querySelectorAll('.gc_auto_frame_post_item_title h2');
    Array.prototype.forEach.call(titles,function(title){
      if(title.classList.contains('hex-article-title-done'))return;
      title.textContent=title.textContent.replace(/【(?:スタッフブログ|重要なお知らせ)】[ \u00A0　]*/g,'').replace(/\s+/g,' ').trim();
      title.classList.add('hex-article-title-done');
    });
  },0);
});

/* =======================================
   本文リンク 外部リンクアイコン
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var links=document.querySelectorAll('.gc_auto_frame_post_item_body a');
    Array.prototype.forEach.call(links,function(link){
      if(link.classList.contains('hex-link-ready'))return;
      link.classList.add('hex-link-ready');
      var href=link.getAttribute('href')||'';
      if(!href)return;
      if(href.indexOf('http://')!==0&&href.indexOf('https://')!==0)return;
      try{
        var url=new URL(href);
        if(url.hostname===location.hostname)return;
        link.classList.add('hex-link-external');
        link.setAttribute('target','_blank');
        link.setAttribute('rel','noopener');
      }catch(e){}
    });
  },100);
});

/* =======================================
   一覧ページング整形
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var areas=document.querySelectorAll('.bg_page_button');
    Array.prototype.forEach.call(areas,function(area){
      if(area.classList.contains('hex-pager-done'))return;
      area.classList.add('hex-pager-done');
      var buttons=area.getElementsByClassName('page_button');
      Array.prototype.forEach.call(buttons,function(btn){
        var text=btn.textContent.replace(/\s+/g,' ').trim();
        while(btn.firstChild){
          btn.removeChild(btn.firstChild);
        }
        if(text.indexOf('前のページ')!==-1){
          btn.classList.add('hex-pager-prev');
          var leftIcon=document.createElement('i');
          var leftText=document.createElement('span');
          leftIcon.className='fa-solid fa-arrow-left';
          leftText.textContent='前へ';
          btn.appendChild(leftIcon);
          btn.appendChild(leftText);
        }else if(text.indexOf('次のページ')!==-1){
          btn.classList.add('hex-pager-next');
          var rightText=document.createElement('span');
          var rightIcon=document.createElement('i');
          rightText.textContent='次へ';
          rightIcon.className='fa-solid fa-arrow-right';
          btn.appendChild(rightText);
          btn.appendChild(rightIcon);
        }else{
          btn.textContent=text;
        }
      });
    });
  },100);
});

/* =======================================
   記事詳細ページング整形
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var pagers=document.querySelectorAll('.gc_auto_frame_post_item_pager_box');
    Array.prototype.forEach.call(pagers,function(pager){
      if(pager.classList.contains('hex-detail-pager-done'))return;
      var prevBox=pager.querySelector('.gc_auto_frame_post_item_pager_prev_box');
      var nextBox=pager.querySelector('.gc_auto_frame_post_item_pager_next_box');
      var separator=pager.querySelector('.gc_auto_frame_post_item_pager_separator');
      if(prevBox){
        var prevTitle=prevBox.querySelector('.gc_auto_frame_post_item_pager_prev_title');
        if(prevTitle&&prevTitle.textContent.trim()){
          hexBuildDetailPagerSide(prevBox,'prev');
        }else{
          prevBox.classList.add('hex-detail-pager-empty');
          while(prevBox.firstChild){
            prevBox.removeChild(prevBox.firstChild);
          }
        }
      }
      if(nextBox){
        var nextTitle=nextBox.querySelector('.gc_auto_frame_post_item_pager_next_title');
        if(nextTitle&&nextTitle.textContent.trim()){
          hexBuildDetailPagerSide(nextBox,'next');
        }else{
          nextBox.classList.add('hex-detail-pager-empty');
          while(nextBox.firstChild){
            nextBox.removeChild(nextBox.firstChild);
          }
        }
      }
      if(separator)separator.textContent='｜';
      pager.classList.add('hex-detail-pager-done');
    });
  },100);
});
function hexBuildDetailPagerSide(box,type){
  var titleEl=box.querySelector(type==='prev'?'.gc_auto_frame_post_item_pager_prev_title':'.gc_auto_frame_post_item_pager_next_title');
  var title=titleEl?hexCleanDetailPagerTitle(titleEl.textContent):'';
  while(box.firstChild){
    box.removeChild(box.firstChild);
  }
  var icon=document.createElement('i');
  var label=document.createElement('span');
  var titleSpan=document.createElement('span');
  titleSpan.className='hex-detail-pager-title';
  titleSpan.textContent=title;
  label.className='hex-detail-pager-label';
  if(type==='prev'){
    icon.className='fa-solid fa-arrow-left';
    label.appendChild(icon);
    label.appendChild(document.createTextNode('前へ'));
    box.classList.add('hex-detail-pager-prev');
    box.appendChild(label);
    box.appendChild(titleSpan);
  }else{
    icon.className='fa-solid fa-arrow-right';
    label.appendChild(document.createTextNode('次へ'));
    label.appendChild(icon);
    box.classList.add('hex-detail-pager-next');
    box.appendChild(titleSpan);
    box.appendChild(label);
  }
}
function hexCleanDetailPagerTitle(text){
  if(!text)return '';
  return text.replace(/【(?:スタッフブログ|重要なお知らせ)】[ \u00A0　]*/g,'').replace(/\s+/g,' ').trim();
}

/* =======================================
   ヘッダーメニュー採用情報URL・アイコン対応
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var recruitUrl=HEX_IS_PRODUCTION
      ?HEX_URLS.RECRUIT.PRODUCTION
      :HEX_URLS.RECRUIT.DEVELOPMENT;

    document.querySelectorAll('.headermenu_type8 .menu_sub .menu_inner').forEach(function(el){
      if(!el.querySelector('.hex-menu-icon')){
        var iconSpan=document.createElement('span');
        var icon=document.createElement('i');

        iconSpan.className='hex-menu-icon';
        icon.className='fa-solid fa-arrow-right';

        iconSpan.appendChild(icon);
        el.appendChild(iconSpan);
      }

      if(el.textContent.trim()==='採用情報'){
        el.classList.add('menu-external');

        var externalIcon=el.querySelector('.hex-menu-icon i');
        if(externalIcon){
          externalIcon.className='fa-solid fa-arrow-up-right-from-square';
        }

        el.removeAttribute('onclick');
        el.style.cursor='pointer';

        el.addEventListener('click',function(e){
          e.preventDefault();
          e.stopPropagation();
          window.open(recruitUrl,'_blank','noopener');
        },true);
      }
    });
  },100);
});

/* =======================================
   スマホメニュー変更
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var popup=document.getElementById(
      'gc_auto_frame_header_object_smartphone_hum_pupup'
    );
    if(!popup)return;

    var wrapper=popup.closest('.bg_contactbutton');
    var groups=Array.prototype.slice.call(
      popup.querySelectorAll('.menu_right > .menu_group')
    );

    /* ハンバーガーと×アイコンの切り替え */
    if(wrapper){
      function syncSmartphoneMenuState(){
        var isOpen=
          window.getComputedStyle(popup).display!=='none';

        wrapper.classList.toggle('hex-menu-open',isOpen);
      }

      var observer=new MutationObserver(function(){
        syncSmartphoneMenuState();
      });

      observer.observe(popup,{
        attributes:true,
        attributeFilter:['style','class']
      });

      syncSmartphoneMenuState();
    }

    /* 親メニューのアコーディオン制御 */
    var submenuDuration=350;
    var submenuEasing='cubic-bezier(.22,1,.36,1)';

    /* 動きを減らす端末設定への対応 */
    if(
      window.matchMedia(
        '(prefers-reduced-motion:reduce)'
      ).matches
    ){
      submenuDuration=0;
    }

    /* 実行中のアニメーションを停止 */
    function cancelSubmenuAnimation(submenu){
      if(!submenu.getAnimations)return;

      submenu.getAnimations().forEach(function(animation){
        animation.cancel();
      });
    }

    /* アニメーション用の一時スタイルを削除 */
    function clearSubmenuAnimationStyles(submenu){
      submenu.style.removeProperty('height');
      submenu.style.removeProperty('opacity');
      submenu.style.removeProperty('overflow');
    }

    /* 子メニューを開く */
    function openSubmenu(submenu){
      cancelSubmenuAnimation(submenu);

      var displayValue=
        window.getComputedStyle(submenu).display;

      if(displayValue==='none'){
        displayValue=
          submenu.dataset.hexOpenDisplay||'block';

        submenu.style.display=displayValue;
      }else{
        submenu.dataset.hexOpenDisplay=displayValue;
      }

      var endHeight=submenu.scrollHeight;

      submenu.style.overflow='hidden';

      var animation=submenu.animate(
        [
          {
            height:'0px',
            opacity:0
          },
          {
            height:endHeight+'px',
            opacity:1
          }
        ],
        {
          duration:submenuDuration,
          easing:submenuEasing
        }
      );

      animation.onfinish=function(){
        clearSubmenuAnimationStyles(submenu);
      };

      animation.oncancel=function(){
        clearSubmenuAnimationStyles(submenu);
      };
    }

    /* 子メニューを閉じる */
    function closeSubmenu(submenu){
      cancelSubmenuAnimation(submenu);

      var displayValue=
        submenu.dataset.hexOpenDisplay||'block';

      /*
       * CMSがdisplay:noneにした後でも、
       * 一度表示状態に戻して閉じる動きを再生
       */
      submenu.style.display=displayValue;
      submenu.style.overflow='hidden';

      var startHeight=submenu.scrollHeight;

      var animation=submenu.animate(
        [
          {
            height:startHeight+'px',
            opacity:1
          },
          {
            height:'0px',
            opacity:0
          }
        ],
        {
          duration:submenuDuration,
          easing:submenuEasing
        }
      );

      animation.onfinish=function(){
        submenu.style.display='none';
        clearSubmenuAnimationStyles(submenu);
      };

      animation.oncancel=function(){
        clearSubmenuAnimationStyles(submenu);
      };
    }

    /* 初期状態を同期 */
    function syncOpenMenu(){
      groups.forEach(function(group){
        var submenu=
          group.querySelector(':scope > .menu_sub');

        if(!submenu)return;

        var displayValue=
          window.getComputedStyle(submenu).display;

        var isOpen=displayValue!=='none';

        if(isOpen){
          submenu.dataset.hexOpenDisplay=displayValue;
        }

        group.classList.toggle(
          'hex-submenu-open',
          isOpen
        );
      });
    }

    /* 親メニューをクリックしたとき */
    groups.forEach(function(group){
      group.addEventListener('click',function(event){

        /* 子メニューのクリックでは開閉しない */
        if(event.target.closest('.menu_inner_group')){
          return;
        }

        /*
         * CMS側のdisplay切り替え完了後に
         * 開閉状態を取得
         */
        window.setTimeout(function(){
          var currentSubmenu=
            group.querySelector(':scope > .menu_sub');

          if(!currentSubmenu)return;

          var wasOpen=
            group.classList.contains(
              'hex-submenu-open'
            );

          var isOpen=
            window.getComputedStyle(
              currentSubmenu
            ).display!=='none';

          /* ほかの親メニューを閉じる */
          groups.forEach(function(otherGroup){
            if(otherGroup===group)return;

            var otherSubmenu=
              otherGroup.querySelector(
                ':scope > .menu_sub'
              );

            if(
              otherSubmenu&&
              otherGroup.classList.contains(
                'hex-submenu-open'
              )
            ){
              closeSubmenu(otherSubmenu);
            }

            otherGroup.classList.remove(
              'hex-submenu-open'
            );
          });

          /* 選択した子メニューを開く */
          if(isOpen&&!wasOpen){
            group.classList.add(
              'hex-submenu-open'
            );

            openSubmenu(currentSubmenu);
          }

          /* 選択した子メニューを閉じる */
          if(!isOpen&&wasOpen){
            group.classList.remove(
              'hex-submenu-open'
            );

            closeSubmenu(currentSubmenu);
          }
        },0);
      });
    });

    syncOpenMenu();

    /* PC・スマホのメニューアイコンと採用情報URL */
    var recruitUrl=HEX_IS_PRODUCTION
      ?HEX_URLS.RECRUIT.PRODUCTION
      :HEX_URLS.RECRUIT.DEVELOPMENT;

    var selector=[
      '.headermenu_type8 .menu_sub .menu_inner',
      '#gc_auto_frame_header_object_smartphone_hum_pupup .menu_inner_group'
    ].join(',');

    document.querySelectorAll(selector).forEach(function(el){
      var isSmartphoneItem=
        el.classList.contains('menu_inner_group');

      var iconSpan=el.querySelector('.hex-menu-icon');
      var icon=iconSpan
        ?iconSpan.querySelector('i')
        :null;

      /* 通常の内部リンクアイコン */
      if(!iconSpan){
        iconSpan=document.createElement('span');
        iconSpan.className='hex-menu-icon';
        iconSpan.setAttribute('aria-hidden','true');

        icon=document.createElement('i');
        icon.className='fa-solid fa-arrow-right';

        iconSpan.appendChild(icon);
        el.appendChild(iconSpan);
      }

      /* スマホの子メニューから親へのイベント伝播を停止 */
      if(
        isSmartphoneItem&&
        el.dataset.hexMenuPropagationReady!=='1'
      ){
        el.dataset.hexMenuPropagationReady='1';

        el.addEventListener('click',function(e){
          e.stopPropagation();
        });
      }

      /* 採用情報を外部リンクに変更 */
      if(el.textContent.trim()!=='採用情報')return;

      el.classList.add('menu-external');

      if(icon){
        icon.className='fa-solid fa-arrow-up-right-from-square';
      }

      el.removeAttribute('onclick');
      el.style.cursor='pointer';

      if(el.dataset.hexRecruitReady==='1')return;
      el.dataset.hexRecruitReady='1';

      el.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        window.open(recruitUrl,'_blank','noopener');
      },true);
    });

    /* ハンバーガーメニュー最下部に電話番号・カレンダーを複製 */
    var headerInfo=document.querySelector(
      '.headermenu_type8 .pc_menu > .hex-header-info'
    );

    var menuPopup=popup.querySelector('.menu_button_popup');

    if(
      headerInfo&&
      menuPopup&&
      !menuPopup.querySelector('.hex-header-info-menu')
    ){
      var headerInfoClone=headerInfo.cloneNode(true);
      headerInfoClone.classList.add('hex-header-info-menu');

      menuPopup.appendChild(headerInfoClone);

      var originalCalendar=
        headerInfo.querySelector('.hex-calendar-open');

      var cloneCalendar=
        headerInfoClone.querySelector('.hex-calendar-open');

      if(originalCalendar&&cloneCalendar){
        cloneCalendar.addEventListener('click',function(event){
          event.preventDefault();
          event.stopPropagation();

          originalCalendar.click();
        });
      }
    }
  },100);
});

/* =======================================
   共通パーツ ボタン・リンク
======================================= */
window.hexIconClass=function(hexType){
  return hexType==='external'?'fa-solid fa-arrow-up-right-from-square':'fa-solid fa-arrow-right';
};
window.hexSetExternal=function(hexAnchor,hexType){
  if(hexType==='external'){
    hexAnchor.target='_blank';
    hexAnchor.rel='noopener';
  }
};
window.hexGetDesignId=function(){
  var params=new URLSearchParams(location.search);
  var designId=params.get('gc_design_set_ID');
  var apiInput=null;
  var api='';
  var match=null;
  if(designId){
    return designId;
  }
  apiInput=document.getElementById('gc_index_url');
  api=apiInput?apiInput.value:'';
  if(api){
    try{
      designId=new URL(api).searchParams.get('gc_design_set_ID');
      if(designId){
        return designId;
      }
    }catch(e){
      match=api.match(/gc_design_set_ID=(\d+)/);
      if(match){
        if(match[1]){
          return match[1];
        }
      }
    }
  }
  match=document.body.innerHTML.match(/gc_design_set_ID=(\d+)/);
  if(match){
    if(match[1]){
      return match[1];
    }
  }
  return '';
};
window.hexAddAnchor=function(hexUrl,hexAnchor){
  if(!hexUrl){
    return '';
  }
  if(!hexAnchor){
    return hexUrl;
  }
  hexAnchor=String(hexAnchor).replace(/^#/,'');
  if(!hexAnchor){
    return hexUrl;
  }
  return hexUrl+'#'+encodeURIComponent(hexAnchor);
};
window.hexBuildUrl=function(hexView){
  var hexType=hexView.dataset.type||'internal';
  var origin=location.origin;
  var host=location.hostname;
  var shortname='';
  var pagetype='';
  var designId='';
  var anchor=hexView.dataset.anchor||'';
  var url='';
  if(hexType==='external'){
    shortname=hexView.dataset.shortname||'';
    /* 環境別URLが登録されている場合 */
    if(shortname&&HEX_URLS[shortname]){
      url=HEX_IS_PRODUCTION
        ?HEX_URLS[shortname].PRODUCTION
        :HEX_URLS[shortname].DEVELOPMENT;

      return window.hexAddAnchor(url,anchor);
    }

    /* 通常の外部リンク */
    return window.hexAddAnchor(
      hexView.dataset.url||'',
      anchor
    );
  }
  shortname=hexView.dataset.shortname||'';
  pagetype=hexView.dataset.pagetype||'';
  if(!shortname){
    return '';
  }
  if(!pagetype){
    return '';
  }
  if(HEX_IS_PRODUCTION){
    url=origin+'/?p='+encodeURIComponent(shortname)+'&k='+encodeURIComponent(pagetype);
    return window.hexAddAnchor(url,anchor);
  }
  if(host==='02sample28.hopweb.net'){
    designId=window.hexGetDesignId();
    if(!designId){
      return '';
    }
    url=origin+'/addon/gartencloud/ajax_gethtml_site_from_db.php?gc_design_set_ID='+encodeURIComponent(designId)+'&shortname='+encodeURIComponent(shortname)+'&page_type='+encodeURIComponent(pagetype);
    return window.hexAddAnchor(url,anchor);
  }
  return '';
};
window.hexBaseBlock=function(el){
  var current=el;
  while(current){
    if(current.id){
      if(current.id.indexOf('PageLayoutViewList_')===0){
        return current;
      }
    }
    current=current.parentElement;
  }
  return el;
};
window.hexNextBlock=function(el){
  var next=el.nextElementSibling;
  while(next){
    if(next.id){
      if(next.id.indexOf('PageLayoutViewList_')===0){
        return next;
      }
    }
    next=next.nextElementSibling;
  }
  return null;
};
hexReady(function(){
  document.querySelectorAll('.hex-button-view').forEach(function(hexView){
    var hexTitle=hexView.dataset.title||'';
    var hexUrl=window.hexBuildUrl(hexView);
    var hexType=hexView.dataset.type||'internal';
    var hexStyle=hexView.dataset.style||'light';
    var hexWidth=hexView.dataset.width||'100%';
    var hexAlign=hexView.dataset.align||'center';
    var hexWrap=document.createElement('div');
    var hexAnchor=document.createElement('a');
    var hexTitleSpan=document.createElement('span');
    var hexIconSpan=document.createElement('span');
    var hexIcon=document.createElement('i');
    if(!hexTitle)return;
    if(!hexUrl)return;
    hexWrap.className='hex-button-wrap hex-align-'+hexAlign;
    hexWrap.style.width=hexWidth;
    hexAnchor.className='hex-btn-main '+hexStyle;
    hexAnchor.href=hexUrl;
    window.hexSetExternal(hexAnchor,hexType);
    hexTitleSpan.className='hex-btn-main-title';
    hexTitleSpan.innerHTML=hexTitle;
    hexIconSpan.className='hex-btn-main-icon';
    hexIcon.className=window.hexIconClass(hexType);
    hexIconSpan.appendChild(hexIcon);
    hexAnchor.appendChild(hexTitleSpan);
    hexAnchor.appendChild(hexIconSpan);
    hexWrap.appendChild(hexAnchor);
    hexView.parentNode.insertBefore(hexWrap,hexView);
    hexView.style.display='none';
  });
  document.querySelectorAll('.hex-link-view').forEach(function(hexView){
    var hexTitle=hexView.dataset.title||'';
    var hexDetail=hexView.dataset.detail||'詳しく見る';
    var hexUrl=window.hexBuildUrl(hexView);
    var hexType=hexView.dataset.type||'internal';
    var hexStyle=hexView.dataset.style||'light';
    var hexCol=hexView.dataset.col||'1';
    var hexAlign=hexView.dataset.align||'center';
    var hexWrap=document.createElement('div');
    var hexAnchor=document.createElement('a');
    var hexTitleSpan=document.createElement('span');
    var hexDetailSpan=document.createElement('span');
    var hexIconSpan=document.createElement('span');
    var hexIcon=document.createElement('i');
    if(!hexTitle)return;
    if(!hexUrl)return;
    hexWrap.className='hex-link-wrap hex-align-'+hexAlign;
    hexWrap.style.width=hexWidth;
    hexAnchor.className='hex-link '+hexStyle;
    hexAnchor.href=hexUrl;
    window.hexSetExternal(hexAnchor,hexType);
    hexTitleSpan.className='hex-link-title';
    hexTitleSpan.innerHTML=hexTitle;
    hexIconSpan.className='hex-link-icon';
    hexIcon.className=window.hexIconClass(hexType);
    hexIconSpan.appendChild(hexIcon);
    hexAnchor.appendChild(hexTitleSpan);
    hexDetailSpan.className='hex-link-detail';
    hexDetailSpan.textContent=hexDetail;
    hexAnchor.appendChild(hexDetailSpan);
    hexAnchor.appendChild(hexIconSpan);
    hexWrap.appendChild(hexAnchor);
    hexView.parentNode.insertBefore(hexWrap,hexView);
    hexView.style.display='none';
  });
});

/* =======================================
   アクション見出しアコーディオン
======================================= */
(function(){

  var accordionObserver = null;

  function setupAccordion(action){

    /* 設定済みなら何もしない */
    if(action.dataset.hexAccordionReady === 'true'){
      return;
    }

    var trigger = action.querySelector('a');

    if(!trigger){
      return;
    }

    var grids = Array.from(
      document.querySelectorAll(
        '.hex-card-grid, .hex-image-grid'
      )
    );

    /*
     * actionより後にある
     * 最初のhex-card-gridを取得
     */
    var grid = grids.find(function(candidate){

      return Boolean(
        action.compareDocumentPosition(candidate) &
        Node.DOCUMENT_POSITION_FOLLOWING
      );

    });

    /*
     * CMSがまだgridを生成していない場合は
     * MutationObserverによる次回処理を待つ
     */
    if(!grid){
      return;
    }

    grid.classList.remove('hex-action-grid-debug');
    grid.classList.add('hex-action-grid');

    /* カードグリッドのmax-widthを見出しへ渡す */
    function syncActionMaxWidth(){

      var gridStyle = window.getComputedStyle(grid);
      var gridMaxWidth = gridStyle.maxWidth;

      /*
      * max-widthが指定されていない場合は
      * 実際に表示されている幅を使用
      */
      if(
        !gridMaxWidth ||
        gridMaxWidth === 'none'
      ){

        gridMaxWidth =
          grid.getBoundingClientRect().width + 'px';

      }

      action.style.setProperty(
        '--hex-action-grid-max-width',
        gridMaxWidth
      );

    }

    syncActionMaxWidth();

    window.addEventListener(
      'resize',
      syncActionMaxWidth
    );

    action.dataset.hexAccordionReady = 'true';

    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', function(event){
      event.preventDefault();

      var isOpen =
        grid.classList.contains('is-open');

      if(isOpen){

        grid.style.maxHeight =
          grid.scrollHeight + 'px';

        requestAnimationFrame(function(){

          grid.style.maxHeight = '0px';

          grid.classList.remove('is-open');
          action.classList.remove('is-open');

          trigger.setAttribute(
            'aria-expanded',
            'false'
          );

        });

      }else{

        grid.classList.add('is-open');
        action.classList.add('is-open');

        grid.style.maxHeight =
          grid.scrollHeight + 'px';

        trigger.setAttribute(
          'aria-expanded',
          'true'
        );

      }

    });

    /* 画像読み込み後の高さ調整 */
    grid.querySelectorAll('img').forEach(function(image){

      image.addEventListener('load', function(){

        if(grid.classList.contains('is-open')){

          grid.style.maxHeight =
            grid.scrollHeight + 'px';

        }

      });

    });

  }

  function initializeAccordions(){

    document
      .querySelectorAll(
        '.hex-section-action.action-on'
      )
      .forEach(setupAccordion);

  }

  function startAccordion(){

    initializeAccordions();

    /* CMSによる後からのHTML生成・置換を監視 */
    if(!accordionObserver){

      accordionObserver =
        new MutationObserver(function(){

          initializeAccordions();

        });

      accordionObserver.observe(
        document.body,
        {
          childList:true,
          subtree:true
        }
      );

    }

  }

  if(document.readyState === 'loading'){

    document.addEventListener(
      'DOMContentLoaded',
      startAccordion
    );

  }else{

    startAccordion();

  }

  /* 画面幅変更時に展開高さを再計算 */
  window.addEventListener('resize', function(){

    document
      .querySelectorAll('.hex-action-grid.is-open')
      .forEach(function(grid){

        grid.style.maxHeight =
          grid.scrollHeight + 'px';

      });

  });

})();

/* =======================================
   ギャラリー
======================================= */
hexReady(function(){
  document.querySelectorAll('.hex-gallery-start').forEach(function(galleryStart){
    var galleryStartBlock=window.hexBaseBlock(galleryStart);
    var galleryEndBlock=window.hexNextBlock(galleryStartBlock);
    var galleryEnd=null;
    while(galleryEndBlock){
      galleryEnd=galleryEndBlock.querySelector('.hex-gallery-end');
      if(galleryEnd)break;
      galleryEndBlock=window.hexNextBlock(galleryEndBlock);
    }
    if(!galleryEndBlock)return;
    var items=[];
    var currentBlock=window.hexNextBlock(galleryStartBlock);
    while(currentBlock){
      var bannerStart=currentBlock.querySelector('.hex-banner-start');
      if(bannerStart){
        var bannerEndBlock=window.hexNextBlock(currentBlock);
        var bannerEnd=null;
        while(bannerEndBlock){
          bannerEnd=bannerEndBlock.querySelector('.hex-banner-end');
          if(bannerEnd)break;
          if(bannerEndBlock===galleryEndBlock)break;
          bannerEndBlock=window.hexNextBlock(bannerEndBlock);
        }
        if(bannerEndBlock){
          var imageBlock=window.hexNextBlock(currentBlock);
          var image=null;
          while(imageBlock){
            if(imageBlock===bannerEndBlock)break;
            image=imageBlock.querySelector('img');
            if(image)break;
            imageBlock=window.hexNextBlock(imageBlock);
          }
          if(image){
            items.push({
              title:bannerStart.dataset.title||'',
              thumbTitle:bannerStart.dataset.thumbTitle||'',
              text:bannerStart.dataset.text||'',
              button:bannerStart.dataset.button||'',
              url:window.hexBuildUrl(bannerStart),
              type:bannerStart.dataset.type||'internal',
              style:bannerStart.dataset.style||'light',
              width:bannerStart.dataset.width||'100%',
              image:image.src,
              alt:image.alt||bannerStart.dataset.title||bannerStart.dataset.thumbTitle||''
            });
          }
        }
      }
      if(currentBlock===galleryEndBlock)break;
      currentBlock=window.hexNextBlock(currentBlock);
    }
    if(items.length===0)return;
    var gallery=document.createElement('div');
    var wrap=document.createElement('div');
    var mainSwiper=document.createElement('div');
    var mainWrapper=document.createElement('div');
    var pagination=document.createElement('div');
    var prev=document.createElement('div');
    var next=document.createElement('div');
    var thumbList=document.createElement('div');
    var activeIndex=0;
    gallery.className='hex-gallery';
    galleryStart.classList.forEach(function(className){
      if(className!=='hex-gallery-start'){
        gallery.classList.add(className);
      }
    });
    if(items.length===1){
      gallery.classList.add('is-single');
    }
    wrap.className='hex-gallery-wrap';
    mainSwiper.className='swiper hex-gallery-main-swiper';
    mainWrapper.className='swiper-wrapper';
    pagination.className='hex-gallery-pagination';
    prev.className='hex-gallery-main-nav hex-gallery-main-prev';
    next.className='hex-gallery-main-nav hex-gallery-main-next';
    thumbList.className='hex-gallery-thumb-list';
    prev.innerHTML='<i class="fa-solid fa-chevron-left"></i>';
    next.innerHTML='<i class="fa-solid fa-chevron-right"></i>';
    items.forEach(function(item){
      var slide=document.createElement('div');
      var banner=document.createElement('div');
      var imageBox=document.createElement('div');
      var image=document.createElement('img');
      var overlay=document.createElement('div');
      var inner=document.createElement('div');
      slide.className='swiper-slide';
      banner.className='hex-banner';
      imageBox.className='hex-banner-image';
      overlay.className='hex-banner-overlay';
      inner.className='hex-banner-inner';
      image.src=item.image;
      image.alt=item.alt;
      imageBox.appendChild(image);
      if(item.title){
        var title=document.createElement('h2');
        title.className='hex-banner-title';
        title.textContent=item.title;
        inner.appendChild(title);
      }
      if(item.text){
        var text=document.createElement('div');
        text.className='hex-banner-text';
        text.innerHTML=item.text;
        inner.appendChild(text);
      }
      if(item.button){
        if(item.url){
          var buttonWrap=document.createElement('div');
          var buttonEl=document.createElement('a');
          var buttonTitle=document.createElement('span');
          var buttonIcon=document.createElement('span');
          var buttonI=document.createElement('i');
          buttonWrap.className='hex-banner-button';
          buttonEl.className='hex-btn-main '+item.style;
          buttonEl.style.width=item.width;
          buttonEl.href=item.url;
          window.hexSetExternal(buttonEl,item.type);
          buttonTitle.className='hex-btn-main-title';
          buttonTitle.textContent=item.button;
          buttonIcon.className='hex-btn-main-icon';
          buttonI.className=window.hexIconClass(item.type);
          buttonIcon.appendChild(buttonI);
          buttonEl.appendChild(buttonTitle);
          buttonEl.appendChild(buttonIcon);
          buttonWrap.appendChild(buttonEl);
          inner.appendChild(buttonWrap);
        }
      }
      banner.appendChild(imageBox);
      if(item.button){
        banner.appendChild(overlay);
      }
      if(item.title||item.text||item.button){
        banner.appendChild(inner);
      }
      slide.appendChild(banner);
      mainWrapper.appendChild(slide);
    });
    mainSwiper.appendChild(mainWrapper);
    mainSwiper.appendChild(pagination);

    wrap.appendChild(mainSwiper);
    wrap.appendChild(prev);
    wrap.appendChild(next);
    if(items.length>1){
      wrap.appendChild(thumbList);
    }
    gallery.appendChild(wrap);
    galleryStartBlock.parentNode.insertBefore(gallery,galleryStartBlock);
    var removeBlock=galleryStartBlock;
    while(removeBlock){
      var nextRemoveBlock=window.hexNextBlock(removeBlock);
      removeBlock.remove();
      if(removeBlock===galleryEndBlock)break;
      removeBlock=nextRemoveBlock;
    }
    if(items.length===1)return;
    if(typeof Swiper==='undefined')return;
    var useLoop=items.length>=2;
    var gallerySwiper=null;
    function normalizeIndex(index){
      var max=items.length;
      var result=index%max;
      if(result<0){
        result=result+max;
      }
      return result;
    }
    function makeThumb(index){
      var realIndex=normalizeIndex(index);
      var item=items[realIndex];
      var thumb=document.createElement('div');
      var thumbImg=document.createElement('img');
      thumb.className='hex-gallery-thumb';
      if(item.thumbTitle){
        thumb.classList.add('has-thumb-title');
      }else{
        thumb.classList.add('no-thumb-title');
      }
      thumb.dataset.index=realIndex;
      thumbImg.src=item.image;
      thumbImg.alt=item.alt;
      thumb.appendChild(thumbImg);
      if(item.thumbTitle){
        var thumbTitle=document.createElement('div');
        thumbTitle.className='hex-gallery-thumb-title';
        thumbTitle.textContent=item.thumbTitle;
        thumb.appendChild(thumbTitle);
      }
      if(realIndex===activeIndex){
        thumb.classList.add('is-active');
      }
      thumb.addEventListener('click',function(){
        if(gallerySwiper){
          if(useLoop){
            gallerySwiper.slideToLoop(realIndex,500);
          }else{
            gallerySwiper.slideTo(realIndex,500);
          }
        }
      });
      return thumb;
    }
    function setActiveThumb(index){
      activeIndex=normalizeIndex(index);
      thumbList.textContent='';
      if(items.length<=4){
        items.forEach(function(item,i){
          thumbList.appendChild(makeThumb(i));
        });
      }else{
        thumbList.appendChild(makeThumb(activeIndex-2));
        thumbList.appendChild(makeThumb(activeIndex-1));
        thumbList.appendChild(makeThumb(activeIndex));
        thumbList.appendChild(makeThumb(activeIndex+1));
        thumbList.appendChild(makeThumb(activeIndex+2));
      }
    }
    gallerySwiper=new Swiper(mainSwiper,{
      slidesPerView:1,
      centeredSlides:false,
      loop:useLoop,
      speed:500,
      grabCursor:true,
      effect:'slide',
      navigation:{
        prevEl:prev,
        nextEl:next
      },
      pagination:{
        el:pagination,
        clickable:true
      },
      on:{
        init:function(){
          setActiveThumb(0);
        },
        slideChange:function(){
          setActiveThumb(this.realIndex);
        }
      }
    });
  });
});

/* =======================================
   バナー
======================================= */
hexReady(function(){
  document.querySelectorAll('.hex-banner-start').forEach(function(start){
    var startBlock=window.hexBaseBlock(start);
    var endBlock=window.hexNextBlock(startBlock);
    var end=null;
    while(endBlock){
      end=endBlock.querySelector('.hex-banner-end');
      if(end)break;
      endBlock=window.hexNextBlock(endBlock);
    }
    if(!end)return;
    if(!endBlock)return;
    var imageBlock=window.hexNextBlock(startBlock);
    var image=null;
    while(imageBlock){
      if(imageBlock===endBlock)break;
      image=imageBlock.querySelector('img');
      if(image)break;
      imageBlock=window.hexNextBlock(imageBlock);
    }
    var title=start.dataset.title||'';
    var text=start.dataset.text||'';
    var button=start.dataset.button||'';
    var buttonWidth=start.dataset.width||'100%';
    var buttonType=start.dataset.type||'internal';
    var buttonStyle=start.dataset.style||'light';
    var bannerUrl=window.hexBuildUrl(start);
    var banner=document.createElement('div');
    var imageBox=document.createElement('div');
    var imageClone=null;
    var overlay=document.createElement('div');
    var inner=document.createElement('div');
    banner.className='hex-banner';
    if(!image){
      banner.classList.add('hex-banner-no-image');
    }
    imageBox.className='hex-banner-image';
    overlay.className='hex-banner-overlay';
    inner.className='hex-banner-inner';
    if(image){
      var imageClone=image.cloneNode(true);

      if(bannerUrl&&!button){
        var imageLink=document.createElement('a');
        imageLink.className='hex-banner-image-link';
        imageLink.href=bannerUrl;
        window.hexSetExternal(imageLink,buttonType);
        imageLink.appendChild(imageClone);
        imageBox.appendChild(imageLink);
      }else{
        imageBox.appendChild(imageClone);
      }
    }
    if(title){
      var titleEl=document.createElement('h2');
      titleEl.className='hex-banner-title';
      titleEl.textContent=title;
      inner.appendChild(titleEl);
    }
    if(text){
      var textEl=document.createElement('div');
      textEl.className='hex-banner-text';
      textEl.innerHTML=text;
      inner.appendChild(textEl);
    }
    if(button){
      if(bannerUrl){
        var buttonWrap=document.createElement('div');
        var buttonEl=document.createElement('a');
        var buttonTitle=document.createElement('span');
        var buttonIcon=document.createElement('span');
        var buttonI=document.createElement('i');
        buttonWrap.className='hex-banner-button';
        buttonEl.className='hex-btn-main '+buttonStyle;
        buttonEl.style.width=buttonWidth;
        buttonEl.href=bannerUrl;
        window.hexSetExternal(buttonEl,buttonType);
        buttonTitle.className='hex-btn-main-title';
        buttonTitle.textContent=button;
        buttonIcon.className='hex-btn-main-icon';
        buttonI.className=window.hexIconClass(buttonType);
        buttonIcon.appendChild(buttonI);
        buttonEl.appendChild(buttonTitle);
        buttonEl.appendChild(buttonIcon);
        buttonWrap.appendChild(buttonEl);
        inner.appendChild(buttonWrap);
      }
    }
    banner.appendChild(imageBox);
    if(button){
      banner.appendChild(overlay);
    }
    if(title||text||button){
      banner.appendChild(inner);
    }
    startBlock.parentNode.insertBefore(banner,startBlock);
    var current=startBlock;
    while(current){
      var next=window.hexNextBlock(current);
      current.remove();
      if(current===endBlock)break;
      current=next;
    }
  });
});

/* =======================================
   画像グリッド
======================================= */
hexReady(function(){
  ['2','3','4','5','6'].forEach(function(col){
    document.querySelectorAll('.hex-image-grid'+col+'-start').forEach(function(start){
      var startBlock=window.hexBaseBlock(start);
      var endBlock=window.hexNextBlock(startBlock);
      var end=null;
      while(endBlock){
        end=endBlock.querySelector('.hex-image-grid'+col+'-end');
        if(end)break;
        endBlock=window.hexNextBlock(endBlock);
      }
      if(!end)return;
      if(!endBlock)return;
      var images=[];
      var currentBlock=window.hexNextBlock(startBlock);
      while(currentBlock){
        if(currentBlock===endBlock)break;
        currentBlock.querySelectorAll('img').forEach(function(img){
          images.push({
            img:img,
            link:img.closest('a')
          });
        });
        currentBlock=window.hexNextBlock(currentBlock);
      }
      if(images.length===0)return;
      var grid=document.createElement('div');
      grid.className='hex-image-grid hex-image-grid'+col;
      images.forEach(function(itemData){
        var item=document.createElement('div');
        var clone=itemData.img.cloneNode(true);
        item.className='hex-image-grid-item';
        if(itemData.link){
          var link=itemData.link.cloneNode(false);
          link.appendChild(clone);
          item.appendChild(link);
        }else{
          item.appendChild(clone);
        }
        grid.appendChild(item);
      });
      startBlock.parentNode.insertBefore(grid,startBlock);
      var removeBlock=startBlock;
      while(removeBlock){
        var nextRemoveBlock=window.hexNextBlock(removeBlock);
        removeBlock.remove();
        if(removeBlock===endBlock)break;
        removeBlock=nextRemoveBlock;
      }
    });
  });
});

/* =======================================
   カード
======================================= */
hexReady(function(){
  ['1','2','3','4','5','6'].forEach(function(col){
    document.querySelectorAll('.hex-card-grid'+col+'-start').forEach(function(gridStart){
      var gridStartBlock=window.hexBaseBlock(gridStart);
      var gridEndBlock=window.hexNextBlock(gridStartBlock);
      var gridEnd=null;
      while(gridEndBlock){
        gridEnd=gridEndBlock.querySelector('.hex-card-grid'+col+'-end');
        if(gridEnd)break;
        gridEndBlock=window.hexNextBlock(gridEndBlock);
      }
      if(!gridEnd)return;
      if(!gridEndBlock)return;
      var cards=[];
      var currentBlock=window.hexNextBlock(gridStartBlock);
      while(currentBlock){
        var cardStart=currentBlock.querySelector('.hex-card-start');
        if(cardStart){
          var cardEndBlock=window.hexNextBlock(currentBlock);
          var cardEnd=null;
          while(cardEndBlock){
            cardEnd=cardEndBlock.querySelector('.hex-card-end');
            if(cardEnd)break;
            if(cardEndBlock===gridEndBlock)break;
            cardEndBlock=window.hexNextBlock(cardEndBlock);
          }
          if(cardEndBlock){
            var imageBlock=window.hexNextBlock(currentBlock);
            var image=null;
            while(imageBlock){
              if(imageBlock===cardEndBlock)break;
              image=imageBlock.querySelector('img');
              if(image)break;
              imageBlock=window.hexNextBlock(imageBlock);
            }
            cards.push({
              title:cardStart.dataset.title||'',
              text:cardStart.dataset.text||'',
              button:cardStart.dataset.button||'',
              url:window.hexBuildUrl(cardStart),
              type:cardStart.dataset.type||'internal',
              style:cardStart.dataset.style||'light',
              col:cardStart.dataset.col||'4',
              image:image?image.src:'',
              alt:image?image.alt||cardStart.dataset.title||'':''
            });
          }
        }
        if(currentBlock===gridEndBlock)break;
        currentBlock=window.hexNextBlock(currentBlock);
      }
      if(cards.length===0)return;
      var grid=document.createElement('div');
      grid.className='hex-card-grid hex-card-grid'+col;
      Array.from(gridStart.classList).forEach(function(className){
        if(className!=='hex-card-grid'+col+'-start'){
          grid.classList.add(className);
        }
      });
      cards.forEach(function(cardData){
        var card=document.createElement('div');
        var body=document.createElement('div');
        var head=document.createElement('div');
        var title=document.createElement('h4');
        var text=document.createElement('p');
        card.className='hex-card '+cardData.style;
        if(cardData.image){
          card.classList.add('has-image');
        }else{
          card.classList.add('no-image');
        }
        body.className='hex-card-body';
        head.className='hex-card-head';
        title.className='hex-card-title';
        text.className='hex-card-text';
        text.innerHTML=cardData.title;
        text.innerHTML=cardData.text;
        if(cardData.image){
          var imageBox=document.createElement('div');
          var image=document.createElement('img');
          imageBox.className='hex-card-image';
          image.src=cardData.image;
          image.alt=cardData.alt;
          imageBox.appendChild(image);
          card.appendChild(imageBox);
        }
        if(cardData.title){
          if(cardData.url){
            if(!cardData.button){
              var titleLink=document.createElement('a');
              var titleText=document.createElement('span');
              var titleDetail=document.createElement('span');
              var titleIcon=document.createElement('span');
              var titleI=document.createElement('i');

              titleLink.className='hex-card-title-link';
              titleLink.href=cardData.url;
              window.hexSetExternal(titleLink,cardData.type);

              titleText.className='hex-card-title-text';
              titleText.innerHTML=cardData.title;

              titleDetail.className='hex-link-detail';
              titleDetail.textContent='詳しく見る';

              titleIcon.className='hex-link-icon';
              titleI.className=window.hexIconClass(cardData.type);

              titleIcon.appendChild(titleI);
              titleLink.appendChild(titleText);
              titleLink.appendChild(titleDetail);
              titleLink.appendChild(titleIcon);
              title.appendChild(titleLink);
            }else{
              title.innerHTML=cardData.title;
            }
          }else{
            title.innerHTML=cardData.title;
          }

          head.appendChild(title);
          body.appendChild(head);
        }
        if(cardData.text){
          body.appendChild(text);
        }
        if(cardData.button){
          if(cardData.url){
            var buttonWrap=document.createElement('div');
            var buttonEl=document.createElement('a');
            var buttonTitle=document.createElement('span');
            var buttonIcon=document.createElement('span');
            var buttonI=document.createElement('i');
            buttonWrap.className='hex-card-button hex-col-'+cardData.col;
            buttonEl.className='hex-btn-main '+cardData.style;
            buttonEl.href=cardData.url;
            window.hexSetExternal(buttonEl,cardData.type);
            buttonTitle.className='hex-btn-main-title';
            buttonTitle.textContent=cardData.button;
            buttonIcon.className='hex-btn-main-icon';
            buttonI.className=window.hexIconClass(cardData.type);
            buttonIcon.appendChild(buttonI);
            buttonEl.appendChild(buttonTitle);
            buttonEl.appendChild(buttonIcon);
            buttonWrap.appendChild(buttonEl);
            body.appendChild(buttonWrap);
          }
        }
        card.appendChild(body);
        grid.appendChild(card);
      });
      gridStartBlock.parentNode.insertBefore(grid,gridStartBlock);
      var removeBlock=gridStartBlock;
      while(removeBlock){
        var nextRemoveBlock=window.hexNextBlock(removeBlock);
        removeBlock.remove();
        if(removeBlock===gridEndBlock)break;
        removeBlock=nextRemoveBlock;
      }
    });
  });
});

/* =======================================
   Q&A記事アイコンをファイル記事から取得
======================================= */
hexReady(function(){
  document.querySelectorAll(
    '.kb_qanda_content .q_icon,' +
    '.kb_qanda_content .a_icon'
  ).forEach(function(element){
    var path=getComputedStyle(element)
      .getPropertyValue('--hex-bg-path')
      .trim()
      .replace(/^["']|["']$/g,'');

    if(!path)return;

    element.style.backgroundImage=
      'url("' + location.origin + path + '")';
  });
});

/* =======================================
   お知らせ・ブログ共通リスト整形
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var items=document.querySelectorAll('.gc_auto_frame_post_index_home_box_contents_cell_text_list,.gc_auto_frame_post_index_box_contents_cell_text_list');
    Array.prototype.forEach.call(items,function(item){
      var date=item.querySelector('.gc_auto_frame_post_index_home_box_contents_cell_date_list,.gc_auto_frame_post_index_box_contents_cell_date_list');
      var caption=item.querySelector('.gc_auto_frame_post_index_home_box_contents_cell_caption_list,.gc_auto_frame_post_index_box_contents_cell_caption_list');
      if(caption){
        caption.textContent=caption.textContent.replace(/【(?:スタッフブログ|重要なお知らせ)】[ \u00A0　]*/g,'');
      }
      if(date&&caption&&!item.querySelector('.hex-news-separator')){
        var separator=document.createElement('span');
        separator.className='hex-news-separator';
        separator.textContent='｜';
        item.insertBefore(separator,caption);
      }
      if(!item.querySelector('.hex-news-arrow')){
        var arrow=document.createElement('span');
        var icon=document.createElement('i');
        arrow.className='hex-news-arrow';
        icon.className='fa-solid fa-arrow-right';
        arrow.appendChild(icon);
        item.appendChild(arrow);
      }
    });
    document.body.classList.add('hex-news-list-ready');
  },100);
});

/* =======================================
   トップ お知らせセクション
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var newsSection=document.getElementById(HOME_SECTIONS.NEWS_SECTION);
    var news=document.getElementById(HOME_SECTIONS.NEWS);
    var blog=document.getElementById(HOME_SECTIONS.BLOG);
    if(!newsSection||!news||!blog)return;

    var start=newsSection.querySelector('.hex-news-start');
    var end=newsSection.querySelector('.hex-news-end');
    var tabsArea=newsSection.querySelector('.hex-news-tabs');
    var listArea=newsSection.querySelector('.hex-news-list');
    var buttonArea=newsSection.querySelector('.hex-news-button');
    if(!start||!end||!tabsArea||!listArea||!buttonArea)return;
    if(newsSection.classList.contains('hex-home-news-ready'))return;

    newsSection.classList.add('hex-home-news-section','hex-home-news-ready');
    tabsArea.classList.add('hex-home-news-tabs-area');
    listArea.classList.add('hex-home-news-list');
    buttonArea.classList.add('hex-home-news-button');

    [start,end].forEach(function(el){
      el.style.display='none';
    });

    while(listArea.firstChild){
      listArea.removeChild(listArea.firstChild);
    }

    [
      start,
      newsSection.querySelector('.hex-news-title'),
      tabsArea,
      listArea,
      buttonArea,
      end
    ].forEach(function(el){
      if(el){
        hexRemoveNewsOuterBr(el);
      }
    });

    while(tabsArea.firstChild){
      tabsArea.removeChild(tabsArea.firstChild);
    }

    var tabs=document.createElement('div');
    var tabNews=document.createElement('button');
    var tabBlog=document.createElement('button');

    tabs.className='hex-home-news-tabs';
    tabNews.type='button';
    tabBlog.type='button';
    tabNews.className='hex-home-news-tab is-active';
    tabBlog.className='hex-home-news-tab';
    tabNews.textContent='重要なお知らせ';
    tabBlog.textContent='スタッフブログ';
    tabNews.dataset.target='news';
    tabBlog.dataset.target='blog';

    tabs.appendChild(tabNews);
    tabs.appendChild(tabBlog);
    tabsArea.appendChild(tabs);

    listArea.appendChild(news);
    listArea.appendChild(blog);

    var newsButtons=news.querySelectorAll('.post_index_home_contents .bg_button,.bg_button');
    var blogButtons=blog.querySelectorAll('.post_index_home_contents .bg_button,.bg_button');

    Array.prototype.forEach.call(newsButtons,function(btn){
      btn.style.display='none';
    });
    Array.prototype.forEach.call(blogButtons,function(btn){
      btn.style.display='none';
    });

    news.classList.add('hex-home-news-panel','is-active');
    blog.classList.add('hex-home-news-panel');
    blog.style.display='none';

    hexHomeNewsUpdateButton(buttonArea,'information','information');

    tabNews.addEventListener('click',function(){
      hexHomeNewsSwitch(news,blog,tabNews,tabBlog,buttonArea,'information','information');
    });

    tabBlog.addEventListener('click',function(){
      hexHomeNewsSwitch(blog,news,tabBlog,tabNews,buttonArea,'staffblog','staffblog');
    });
  },100);
});

function hexRemoveNewsOuterBr(el){
  var next=el.nextSibling;
  while(next){
    var current=next;
    next=next.nextSibling;
    if(current.nodeType===1&&current.tagName==='BR'){
      current.remove();
      continue;
    }
    if(current.nodeType===3&&!current.textContent.trim()){
      continue;
    }
    break;
  }
}

function hexHomeNewsSwitch(showPanel,hidePanel,activeTab,inactiveTab,buttonArea,shortname,pagetype){
  showPanel.style.display='block';
  hidePanel.style.display='none';
  showPanel.classList.add('is-active');
  hidePanel.classList.remove('is-active');
  activeTab.classList.add('is-active');
  inactiveTab.classList.remove('is-active');
  hexHomeNewsUpdateButton(buttonArea,shortname,pagetype);
}

function hexHomeNewsUpdateButton(buttonArea,shortname,pagetype){
  var view=buttonArea.querySelector('.hex-link-view');
  if(!view)return;

  view.dataset.shortname=shortname;
  view.dataset.pagetype=pagetype;

  var url=window.hexBuildUrl(view);
  if(!url)return;

  var wrap=buttonArea.querySelector('.hex-home-news-link-wrap');
  var link=null;
  var title=null;
  var iconSpan=null;
  var icon=null;

  if(!wrap){
    wrap=document.createElement('div');
    link=document.createElement('a');
    title=document.createElement('span');
    iconSpan=document.createElement('span');
    icon=document.createElement('i');

    wrap.className='hex-link-wrap hex-align-'+(view.dataset.align||'center')+' hex-home-news-link-wrap';
    link.className='hex-link '+(view.dataset.style||'light');
    title.className='hex-link-title';
    iconSpan.className='hex-link-icon';
    icon.className=window.hexIconClass(view.dataset.type||'internal');

    iconSpan.appendChild(icon);
    link.appendChild(title);
    link.appendChild(iconSpan);
    wrap.appendChild(link);
    buttonArea.insertBefore(wrap,view);
    view.style.display='none';
  }else{
    link=wrap.querySelector('a');
    title=wrap.querySelector('.hex-link-title');
  }

  if(link){
    link.style.width=view.dataset.width||'100%';
    link.href=url;
    window.hexSetExternal(link,view.dataset.type||'internal');
  }

  if(title){
    title.textContent=view.dataset.title||'一覧を見る';
  }
}

/* =======================================
   PCヘッダー 電話情報・営業日カレンダーモーダル
======================================= */
hexLoad(function(){
  /* ---------------------------------------
     PCヘッダーへ電話情報とボタンを追加
  --------------------------------------- */
  var pcMenu=document.querySelector(
    '.bg_pc_menu .pc_menu'
  );

  if(
    pcMenu&&
    !pcMenu.querySelector('.hex-header-info')
  ){
    var headerInfo=document.createElement('div');

    headerInfo.className='hex-header-info';

    headerInfo.innerHTML=`
      <div class="hex-header-tel">
        <a href="tel:0762404200"
           class="hex-header-tel-link"
           aria-label="076-240-4200へ電話">
          <i class="fa-solid fa-phone"></i>
          <span>076-240-4200</span>
        </a>
        <span class="hex-header-hours">
          9:00〜18:00(日曜・祝日休)
        </span>
      </div>
      <button class="hex-calendar-open"
              type="button"
              aria-label="営業日カレンダーを開く"
              aria-haspopup="dialog"
              aria-expanded="false">
        <i class="fa-regular fa-calendar-check"
           aria-hidden="true"></i>
      </button>
    `;

    pcMenu.appendChild(headerInfo);
  }

  /* ---------------------------------------
     カレンダーモーダル
  --------------------------------------- */
  var calendarSection=document.querySelector(
    '.hex-calendar-section'
  );

  if(!calendarSection)return;

  var existingModal=document.querySelector(
    '.hex-calendar-modal'
  );

  if(existingModal)return;

  var modal=document.createElement('div');
  var dialog=document.createElement('div');
  var modalBody=document.createElement('div');
  var closeButton=document.createElement('button');
  var lastFocusedElement=null;

  /* モーダル背景 */
  modal.className='hex-calendar-modal';
  modal.setAttribute('aria-hidden','true');

  /* ダイアログ本体 */
  dialog.className='hex-calendar-modal-dialog';

  dialog.setAttribute('role','dialog');
  dialog.setAttribute('aria-modal','true');
  dialog.setAttribute(
    'aria-label',
    '営業日カレンダー'
  );

  /* 閉じるボタン */
  closeButton.className='hex-calendar-modal-close';
  closeButton.type='button';

  closeButton.setAttribute(
    'aria-label',
    '営業日カレンダーを閉じる'
  );

  closeButton.innerHTML=`
    <i class="fa-solid fa-xmark"
       aria-hidden="true"></i>
  `;

  /* カレンダー格納部分 */
  modalBody.className='hex-calendar-modal-body';

  dialog.appendChild(closeButton);
  dialog.appendChild(modalBody);
  modal.appendChild(dialog);
  document.body.appendChild(modal);

  /* ---------------------------------------
    カレンダー生成完了後に元の位置で非表示
  --------------------------------------- */
  var calendarArea=document.querySelector(
    '#hex-calendar-area'
  );

  function hideGeneratedCalendarSection(){
    if(
      calendarArea&&
      (
        calendarArea.classList.contains(
          'hex-calendar-ready'
        )||
        calendarArea.querySelector('.hex-calendar')
      )
    ){
      calendarSection.classList.add(
        'is-calendar-generated'
      );

      return true;
    }

    return false;
  }

  /* すでに生成済みか確認 */
  if(
    calendarArea&&
    !hideGeneratedCalendarSection()
  ){
    var calendarObserver=
      new MutationObserver(function(){

        if(hideGeneratedCalendarSection()){
          calendarObserver.disconnect();
        }

      });

    calendarObserver.observe(
      calendarArea,
      {
        childList:true,
        subtree:true,
        attributes:true,
        attributeFilter:['class']
      }
    );
  }

  /* ---------------------------------------
     モーダルを開く
  --------------------------------------- */
  function openCalendarModal(openButton){
    lastFocusedElement=
      openButton||
      document.activeElement;

    /*
     * 読込み時点では移動しない。
     * 既存のカレンダーJSが生成を終えたあと、
     * 初めて開くタイミングでセクション全体を移動する。
     */
    if(!modalBody.contains(calendarSection)){
      modalBody.appendChild(calendarSection);
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');

    document.documentElement.classList.add(
      'hex-calendar-modal-open'
    );

    document.body.classList.add(
      'hex-calendar-modal-open'
    );

    document
      .querySelectorAll('.hex-calendar-open')
      .forEach(function(button){
        button.setAttribute(
          'aria-expanded',
          'true'
        );
      });

    closeButton.focus();
  }

  /* ---------------------------------------
     モーダルを閉じる
  --------------------------------------- */
  function closeCalendarModal(){
    if(!modal.classList.contains('is-open')){
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');

    document.documentElement.classList.remove(
      'hex-calendar-modal-open'
    );

    document.body.classList.remove(
      'hex-calendar-modal-open'
    );

    document
      .querySelectorAll('.hex-calendar-open')
      .forEach(function(button){
        button.setAttribute(
          'aria-expanded',
          'false'
        );
      });

    if(
      lastFocusedElement&&
      typeof lastFocusedElement.focus==='function'
    ){
      lastFocusedElement.focus();
    }
  }

  /* ---------------------------------------
     クリック操作
  --------------------------------------- */
  document.addEventListener('click',function(event){
    var openButton=event.target.closest(
      '.hex-calendar-open'
    );

    if(openButton){
      event.preventDefault();
      openCalendarModal(openButton);

      return;
    }

    var closeTarget=event.target.closest(
      '.hex-calendar-modal-close'
    );

    if(closeTarget){
      event.preventDefault();
      closeCalendarModal();

      return;
    }

    /*
     * 白いダイアログの外側を押した場合だけ閉じる
     */
    if(event.target===modal){
      closeCalendarModal();
    }
  });

  /* ---------------------------------------
     キーボード操作
  --------------------------------------- */
  document.addEventListener('keydown',function(event){
    if(!modal.classList.contains('is-open')){
      return;
    }

    /* Escキーで閉じる */
    if(event.key==='Escape'){
      event.preventDefault();
      closeCalendarModal();

      return;
    }

    /* モーダル外へフォーカスが出ないようにする */
    if(event.key==='Tab'){
      var focusableElements=dialog.querySelectorAll(
        'button:not([disabled]),'+
        'a[href],'+
        'input:not([disabled]),'+
        'select:not([disabled]),'+
        'textarea:not([disabled]),'+
        '[tabindex]:not([tabindex="-1"])'
      );

      if(!focusableElements.length)return;

      var firstElement=focusableElements[0];
      var lastElement=
        focusableElements[
          focusableElements.length-1
        ];

      if(
        event.shiftKey&&
        document.activeElement===firstElement
      ){
        event.preventDefault();
        lastElement.focus();
      }
      else if(
        !event.shiftKey&&
        document.activeElement===lastElement
      ){
        event.preventDefault();
        firstElement.focus();
      }
    }
  });
});

/* =======================================
   トップ 開幕～ウェルカムアニメーション
======================================= */
hexReady(function(){
  "use strict";

  var STORAGE_KEY="hex_top_opening_v2_viewed";

  /* 制作中はtrue。本番公開時にfalseへ変更 */
  var FORCE_PLAY=true;

  var OPENING_START_DELAY=200;
  var PLASTER_COMPLETE_AT=2500;
  var LOGO_START_AT=2920;
  var HERO_REVEAL_AT=5270;
  var HERO_READY_AT=6370;
  var SAFETY_REMOVE_AT=9000;

  function isReducedMotion(){
    return(
      window.matchMedia&&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function getStandardHero(){
    return document.querySelector(
      "#gc_auto_frame_home_0 > .heroimage_type.heroimage_type1"
    );
  }

  function isTopPage(){
    return !!getStandardHero();
  }

  function getRegisteredHeroBackground(){
    var standardHero=getStandardHero();
    var source;
    var backgroundImage;

    if(!standardHero){
      return "";
    }

    source=standardHero.querySelector(
      ".bg_hero_image, .slideimage"
    );

    if(!source){
      return "";
    }

    backgroundImage=(
      source.style.backgroundImage||
      window.getComputedStyle(source).backgroundImage
    );

    return backgroundImage&&backgroundImage!=="none"
      ?backgroundImage
      :"";
  }

  function removeIds(element){
    element.removeAttribute("id");

    element.querySelectorAll("[id]").forEach(function(child){
      child.removeAttribute("id");
    });
  }

  function prepareHandoffCopy(){
    var source=document.querySelector(".hex-opening-copy-source");
    var fixedCopy;

    if(!source){
      fixedCopy=document.createElement("h1");
      fixedCopy.className="hex-handoff-copy hex-original-hero-catch";
      fixedCopy.innerHTML=
        '<span class="hex-opening-main">お客様の夢を追いかける</span>'+ 
        '<span class="hex-opening-sub">良きパートナー</span>';

      return{
        source:null,
        fixed:fixedCopy
      };
    }

    source.classList.add("hex-handoff-copy","hex-welcome-copy");
    source.setAttribute("data-hex-copy-handoff","welcome");

    fixedCopy=source.cloneNode(true);
    fixedCopy.classList.remove(
      "hex-opening-copy-source",
      "hex-welcome-copy",
      "is-copy-active"
    );
    fixedCopy.classList.add("hex-handoff-copy","hex-original-hero-catch");
    fixedCopy.removeAttribute("data-hex-copy-handoff");
    fixedCopy.setAttribute("aria-hidden","true");
    removeIds(fixedCopy);

    return{
      source:source,
      fixed:fixedCopy
    };
  }

  function createOriginalHero(backgroundImage,copyPair){
    var standardHero=getStandardHero();
    var existing=document.querySelector(".hex-original-hero");
    var hero;
    var image;

    if(existing){
      return existing;
    }

    if(!standardHero||!standardHero.parentNode){
      return null;
    }

    hero=document.createElement("section");
    hero.className="hex-original-hero";
    hero.setAttribute("aria-label","メインビジュアル");

    hero.innerHTML=
      '<div class="hex-original-hero-image" aria-hidden="true"></div>'+ 
      '<div class="hex-original-hero-shade" aria-hidden="true"></div>'+ 
      '<div class="hex-original-hero-copy"></div>';

    image=hero.querySelector(".hex-original-hero-image");
    image.style.backgroundImage=backgroundImage;

    hero.querySelector(".hex-original-hero-copy").appendChild(
      copyPair.fixed
    );

    if(copyPair.source){
      hero.classList.add("has-copy-handoff");
    }

    standardHero.parentNode.insertBefore(hero,standardHero);

    return hero;
  }

  function initCopyHandoff(hero,welcomeCopy){
    var fixedCopy;
    var frameRequested=false;

    if(!hero||!welcomeCopy){
      return;
    }

    fixedCopy=hero.querySelector(".hex-original-hero-copy");

    if(!fixedCopy){
      return;
    }

    function updateCopyHandoff(){
      var fixedRect;
      var welcomeRect;
      var isHandedOff;

      frameRequested=false;

      fixedRect=fixedCopy.getBoundingClientRect();
      welcomeRect=welcomeCopy.getBoundingClientRect();

      /* 同じサイズのコピー上端が重なった瞬間に入れ替える */
      isHandedOff=welcomeRect.top<=fixedRect.top+1;

      hero.classList.toggle("is-copy-handed-off",isHandedOff);
      welcomeCopy.classList.toggle("is-copy-active",isHandedOff);
    }

    function requestUpdate(){
      if(frameRequested){
        return;
      }

      frameRequested=true;
      window.requestAnimationFrame(updateCopyHandoff);
    }

    window.addEventListener("scroll",requestUpdate,{passive:true});
    window.addEventListener("resize",requestUpdate);
    window.addEventListener("orientationchange",requestUpdate);

    requestUpdate();
  }

  function createOpeningElement(backgroundImage){
    var opening=document.createElement("div");
    var reveal;

    opening.className="hex-opening";
    opening.setAttribute("aria-hidden","true");

    opening.innerHTML=
      '<div class="hex-opening-plaster">'+
        '<svg xmlns="http://www.w3.org/2000/svg" '+
          'viewBox="0 0 1600 900" '+
          'preserveAspectRatio="none" '+
          'aria-hidden="true">'+
          '<defs>'+ 
            '<filter id="hex-opening-trowel-roughness" '+
              'filterUnits="userSpaceOnUse" '+
              'x="-500" y="-400" width="2600" height="1800">'+
              '<feTurbulence type="fractalNoise" '+
                'baseFrequency="0.008 0.025" '+
                'numOctaves="2" seed="8" result="noise" />'+
              '<feDisplacementMap in="SourceGraphic" in2="noise" '+
                'scale="4" xChannelSelector="R" yChannelSelector="G" />'+
            '</filter>'+
            '<mask id="hex-opening-plaster-mask" '+
              'maskUnits="userSpaceOnUse" '+
              'x="-500" y="-400" width="2600" height="1800">'+
              '<rect x="-500" y="-400" width="2600" height="1800" fill="#000" />'+
              '<path class="hex-opening-path is-trowel is-line1" pathLength="1" '+
                'd="M260 150 C520 125 1010 125 1290 155" />'+
              '<path class="hex-opening-path is-trowel is-line2" pathLength="1" '+
                'd="M1320 270 C1040 275 590 275 310 300" />'+
              '<path class="hex-opening-path is-trowel is-line3" pathLength="1" '+
                'd="M280 415 C570 415 1010 415 1290 445" />'+
              '<path class="hex-opening-path is-trowel is-line4" pathLength="1" '+
                'd="M1320 560 C1040 560 590 560 310 590" />'+
              '<path class="hex-opening-path is-trowel is-line5" pathLength="1" '+
                'd="M280 705 C570 705 1060 705 1340 750" />'+
            '</mask>'+ 
          '</defs>'+ 
          '<rect class="hex-opening-white-cover" '+
            'x="-500" y="-400" width="2600" height="1800" '+
            'mask="url(#hex-opening-plaster-mask)" />'+
        '</svg>'+ 
      '</div>'+ 
      '<div class="hex-opening-logo-stage">'+
        '<svg class="hex-logo-story" xmlns="http://www.w3.org/2000/svg" '+
          'viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet" '+
          'role="img" aria-label="お客様と私たちが夢を受け止め、ロゴになるアニメーション">'+
          '<defs>'+ 
            '<mask id="hex-logo-front-left-mask" maskUnits="userSpaceOnUse" '+
              'x="-20" y="40" width="78" height="72">'+
              '<rect x="-20" y="40" width="78" height="72" fill="#000" />'+
              '<path class="hex-logo-front-left-mask-path" '+
                'd="M10 52 L17.386 55.094 C-4 64 -4 79 25.988 91.762 C35 95 45 97 55 98" '+
                'fill="none" stroke="#fff" stroke-width="40" '+
                'stroke-linecap="square" stroke-linejoin="round" />'+
            '</mask>'+ 
            '<mask id="hex-logo-front-center-mask" maskUnits="userSpaceOnUse" '+
              'x="48" y="76" width="82" height="32">'+
              '<rect x="48" y="76" width="82" height="32" fill="#000" />'+
              '<path class="hex-logo-front-center-mask-path" '+
                'd="M44 88 L51 91 C72 100 103 100 124 91" '+
                'fill="none" stroke="#fff" stroke-width="28" '+
                'stroke-linecap="square" stroke-linejoin="round" />'+
            '</mask>'+ 
            '<mask id="hex-logo-front-right-mask" maskUnits="userSpaceOnUse" '+
              'x="120" y="40" width="72" height="72">'+
              '<rect x="120" y="40" width="72" height="72" fill="#000" />'+
              '<path class="hex-logo-front-right-mask-path" '+
                'pathLength="1" '+
                'd="M114 99 L121 98 C132 97 141 95 148.887 92.648 C181 82 183 64 160.418 55.09" '+
                'fill="none" stroke="#fff" stroke-width="40" '+
                'stroke-linecap="square" stroke-linejoin="round" />'+
            '</mask>'+ 
            '<mask id="hex-logo-back-arm-mask" maskUnits="userSpaceOnUse" '+
              'x="45" y="34" width="85" height="25">'+
              '<rect x="45" y="34" width="85" height="25" fill="#000" />'+
              '<path class="hex-logo-back-arm-mask-path" '+
                'd="M129 50 L121.293 48.899 C101 46.2 75 46.2 53.664 49.277" '+
                'fill="none" stroke="#fff" stroke-width="16" '+
                'stroke-linecap="square" />'+
            '</mask>'+ 
            '<path id="hex-logo-front-left-path" '+
              'd="M -32.887113,10.258946 C -42.533616,6.0614317 -48.29727,0.90748595 -48.29727,-4.6868551 c 0,-7.0063119 8.931522,-13.3479159 23.370118,-17.9443369 h 0.0015 v -0.0015 l 0.0015,-0.0015 h 0.0015 c 0.0043,-0.0018 0.0086,-0.0031 0.01318,-0.0044 0.01068,-0.0031 0.02199,-0.0044 0.03369,-0.0044 h 0.03516 c 0.06655,0 0.120117,0.05357 0.120117,0.120117 v 0.213867 c 0,0.0333 -0.01341,0.06324 -0.03516,0.08496 h 0.215332 0.0015 0.0015 l 0.0015,0.0015 h 0.0015 l 0.0015,0.0015 h 0.0015 v 0.0015 l 0.0015,0.0015 v 0.0015 l 0.0015,0.0015 v 0.0015 0.0015 15.1069338 0.00146 0.00146 l -0.0015,0.00146 v 0.00146 l -0.0015,0.00146 -0.0015,0.00146 h -0.0015 v 0.00146 h -0.0015 -0.0015 v 0.00146 h -0.0015 -0.0015 -0.191895 c 0.0058,0.014123 0.0088,0.029143 0.0088,0.04541 v 0.1552734 c 0,0.066548 -0.05358,0.1201172 -0.120117,0.1201172 h -0.06592 v 0.020508 a 68.835687,18.587533 0 0 0 -8.802246,4.8925783 c -0.131146,0.1079292 -0.25256,0.2164039 -0.376465,0.3251953 a 68.835687,18.587533 0 0 0 -1.36084,1.36962895 c -0.380251,0.4579575 -0.696862,0.92296595 -0.947754,1.39306645 a 68.835687,18.587533 0 0 0 -0.310547,0.6679688 c -0.218727,0.5527081 -0.345157,1.1124523 -0.377929,1.6787109 a 68.835687,18.587533 0 0 0 -0.05566,0.2504883 68.835687,18.587533 0 0 0 0.04248,0.1918946 c 0.01854,0.5933076 0.154724,1.1785115 0.383789,1.7563477 a 68.835687,18.587533 0 0 0 0.209473,0.4760742 c 0.256541,0.5167858 0.597539,1.0268745 1.010742,1.5292969 a 68.835687,18.587533 0 0 0 0.764648,0.8393555 c 0.174899,0.173926 0.385907,0.3436831 0.578614,0.515625 a 68.835687,18.587533 0 0 0 1.26416,1.1249997 z" '+
              'transform="translate(53.664 66.605) scale(1.111111 -1.111111)" />'+
            '<path id="hex-logo-front-center-path" '+
              'd="m -0.14053032,-12.664394 c -0.04443,-0.0045 -0.0791016,-0.04224 -0.0791016,-0.08789 v -0.01465 c 0,-0.0065 1.4484e-4,-0.01296 0.001465,-0.01904 h -0.001465 -0.001465 l -0.001465,-0.0015 h -0.001465 -0.001465 v -0.0015 h -0.001465 v -0.0015 h -0.001465 v -0.0015 h -0.001465 v -0.0015 -0.0015 l -0.001465,-0.0015 v -0.0015 -14.610352 h -0.0351563 -0.001465 -0.001465 -0.001465 l -0.001465,-0.0015 h -0.001465 l -0.001465,-0.0015 -0.001465,-0.0015 v -0.0015 l -0.001465,-0.0015 v -0.0015 -0.0015 -0.0015 -0.587402 -0.0015 -0.0015 -0.0015 h 0.001465 v -0.0015 -0.0015 h 0.001465 v -0.0015 l 0.001465,-0.0015 h 0.001465 l 0.001465,-0.0015 h 0.001465 0.001465 0.001465 0.26806641 C 9.7273288,-29.353812 20.445299,-30.0975 31.713963,-30.0975 c 10.284931,0 20.10588,0.62314 29.137207,1.746094 h 0.128907 c 0.0089,0 0.01711,0.0036 0.02344,0.0088 0.0066,0.0066 0.01318,0.01769 0.01318,0.02783 v 0.117187 h 0.375 0.0015 0.0015 l 0.0015,0.0015 h 0.0015 l 0.0015,0.0015 h 0.0015 l 0.0015,0.0015 v 0.0015 l 0.0015,0.0015 v 0.0015 0.0015 0.0015 15.106934 0.0015 0.0015 0.0015 l -0.0015,0.0015 v 0.0015 h -0.0015 v 0.0015 h -0.0015 l -0.0015,0.0015 h -0.0015 l -0.0015,0.0015 h -0.0015 -0.0015 -0.495117 c 5.11e-4,7.39e-4 0.0025,0.0036 0.0029,0.0044 0.0022,0.0048 0.0029,0.01028 0.0029,0.01611 v 0.0044 c 0,0.0203 -0.01633,0.03662 -0.03662,0.03662 h -0.02197 c -0.0013,0 -0.0046,-6e-5 -0.0059,0 h -0.0015 c -7.87e-4,-1.6e-4 -0.0036,-0.0012 -0.0044,-0.0015 -0.0048,-0.0019 -0.0092,-0.0052 -0.01318,-0.0088 a 68.835687,18.587533 0 0 0 -29.12389,-1.746626 68.835687,18.587533 0 0 0 -31.69336047,2.087403 v -0.0029 c -0.01323824,0.008 -0.02876914,0.01318 -0.04541016,0.01318 h -0.08789062 c -0.003037,0 -0.005827,3e-4 -0.008789,0 z" '+
              'transform="translate(53.664 66.605) scale(1.111111 -1.111111)" />'+
            '<path id="hex-logo-front-right-path" '+
              'd="m 96.219824,10.299962 a 68.835687,18.587533 0 0 0 0.544922,-0.47168 C 97.227067,9.466488 97.653745,9.1006965 98.03623,8.7296491 a 68.835687,18.587533 0 0 0 0.552246,-0.5742187 c 0.49376,-0.545699 0.920428,-1.0978433 1.229004,-1.6611329 0.46969,-0.8574034 0.71631,-1.7345168 0.71631,-2.6279297 0,-0.1660474 -0.009,-0.3315911 -0.0249,-0.4965821 -0.0766,-0.7774693 -0.33307,-1.5418886 -0.757328,-2.2924805 A 68.835687,18.587533 0 0 0 99.591894,0.8268169 c -0.405573,-0.65633568 -0.928656,-1.30110537 -1.584961,-1.932129 a 68.835687,18.587533 0 0 0 -1.133789,-0.9433594 c -0.330378,-0.262017 -0.670557,-0.5226896 -1.042969,-0.7792969 A 68.835687,18.587533 0 0 0 85.70078,-7.7000388 v -0.00439 h -0.02344 c -0.0026,0 -0.0048,2.55e-4 -0.0073,0 -0.03776,-0.00381 -0.06736,-0.035902 -0.06738,-0.074707 v -0.064453 h -0.262207 -0.0015 -0.0015 l -0.0015,-0.00146 h -0.0015 l -0.0015,-0.00146 -0.0015,-0.00146 -0.0015,-0.00146 v -0.00146 h -0.0015 v -0.00146 -0.00146 -0.00146 -15.1069342 -0.0015 -0.0015 -0.0015 l 0.0015,-0.0015 0.0015,-0.0015 v -0.0015 h 0.0015 v -0.0015 h 0.0015 0.0015 v -0.0015 h 0.0015 0.0015 0.0015 0.188965 v -0.386719 c 0,-0.04139 0.03331,-0.07471 0.07471,-0.07471 h 0.06885 c 0.0098,0 0.01924,0.0024 0.02783,0.0059 v -0.01025 c 15.990642,4.646971 26.024422,11.327291 26.024422,18.7529303 0,5.61234702 -5.80178,10.7819733 -15.505378,14.9868167 z" '+
              'transform="translate(53.664 66.605) scale(1.111111 -1.111111)" />'+
            '<path id="hex-logo-back-arm-path" '+
              'd="M 31.78867 22.978185 A 36.49649 4.3751999 0.02299924 0 1 24.19199 22.88297 L 24.19199 22.881505 C 15.689317 22.639544 7.5453158 21.983517 0.0015595313 20.940587 L 0.0015595313 20.939122 L 9.4687502e-05 20.939122 C -0.018007081 20.939122 -0.033105041 20.92917 -0.040920939 20.91422 L -0.23281547 20.91422 L -0.23428032 20.91422 L -0.23574516 20.91422 L -0.23721001 20.912755 L -0.23867485 20.912755 L -0.23867485 20.91129 L -0.24013969 20.91129 L -0.24160454 20.909825 L -0.24160454 20.90836 L -0.24306938 20.90836 L -0.24306938 20.906896 L -0.24306938 20.905431 L -0.24453422 20.903966 L -0.24453422 20.902501 L -0.24453422 15.740391 L -0.24453422 15.738927 L -0.24453422 15.737462 L -0.24306938 15.735997 L -0.24306938 15.734532 L -0.24160454 15.733067 L -0.24160454 15.731602 L -0.24013969 15.731602 L -0.24013969 15.730138 L -0.23867485 15.730138 L -0.23867485 15.728673 L -0.23721001 15.728673 L -0.23574516 15.728673 L -0.23428032 15.728673 L -0.23281547 15.728673 L -0.081936565 15.728673 C -0.081984002 15.727458 -0.081936565 15.725508 -0.081936565 15.724278 L -0.081936565 15.680333 C -0.081936565 15.639757 -0.055803751 15.607091 -0.023342813 15.607091 C -0.014428007 15.607091 -0.0059904836 15.61 0.0015595313 15.614415 L 0.0015595313 15.595372 C 9.6903339 16.975292 20.451835 17.701817 31.712498 17.701817 C 41.95677 17.701817 51.805936 17.091988 60.814549 15.941075 C 60.821238 15.933728 60.831617 15.929356 60.842381 15.929356 L 60.884862 15.929356 C 60.90515 15.929356 60.921483 15.945689 60.921483 15.965977 L 60.921483 16.030431 L 61.057713 16.030431 L 61.059178 16.030431 L 61.060643 16.030431 L 61.062108 16.031895 L 61.063573 16.031895 L 61.065038 16.03336 L 61.066502 16.034825 L 61.066502 16.03629 L 61.067967 16.03629 L 61.067967 16.037755 L 61.067967 16.03922 L 61.069432 16.040684 L 61.069432 16.042149 L 61.069432 21.204259 L 61.069432 21.205724 L 61.067967 21.207188 L 61.067967 21.208653 L 61.067967 21.210118 L 61.066502 21.211583 L 61.065038 21.213048 L 61.065038 21.214513 L 61.063573 21.214513 L 61.062108 21.214513 L 61.062108 21.215978 L 61.060643 21.215978 L 61.059178 21.215978 L 61.057713 21.215978 L 60.906834 21.215978 C 60.907439 21.218624 60.908299 21.221932 60.908299 21.224767 C 60.908299 21.245055 60.891966 21.261388 60.871678 21.261388 L 60.862889 21.261388 L 60.862889 21.276036 C 54.045352 22.124921 46.77488 22.665522 39.234471 22.881505 L 39.235936 22.88297 L 39.235936 22.884435 L 39.2374 22.885899 A 36.49649 4.3751999 0.02299924 0 1 31.78867 22.978185 z" '+
              'transform="translate(53.664 66.605) scale(1.111111 -1.111111)" />'+
            '<path id="hex-logo-left-person" '+
              'd="M6.117 0H73.387V6.875C55.656 8.297 53.664 9.719 53.664 26.57V105.641C53.664 122.496 55.645 123.371 73.387 125.137V132.012H6.117V125.137C23.629 123.441 25.988 122.566 25.988 105.641V26.57C25.988 9.648 23.93 8.23 6.117 6.875Z" />'+
            '<path id="hex-logo-right-person" '+
              'd="M101.336 0H168.84V6.875C150.57 8.5 148.887 9.648 148.887 26.57V105.641C148.887 122.566 150.801 123.574 168.84 125.137V132.012H101.336V125.137C119.754 123.105 121.293 122.566 121.293 105.641V26.57C121.293 9.719 118.922 8.43 101.336 6.875Z" />'+
          '</defs>'+ 
          '<g class="hex-logo-build" transform="translate(370 225) scale(1.4623)">'+
            '<use class="hex-logo-body-layer" href="#hex-logo-left-person" />'+
            '<use class="hex-logo-body-layer" href="#hex-logo-right-person" />'+
            '<g class="hex-logo-front-left-layer" mask="url(#hex-logo-front-left-mask)">'+
              '<use href="#hex-logo-front-left-path" />'+
            '</g>'+
            '<g class="hex-logo-front-center-layer" mask="url(#hex-logo-front-center-mask)">'+
              '<use href="#hex-logo-front-center-path" />'+
            '</g>'+
            '<g class="hex-logo-front-right-layer" mask="url(#hex-logo-front-right-mask)">'+
              '<use href="#hex-logo-front-right-path" />'+
            '</g>'+
            '<g class="hex-logo-back-arm-layer" mask="url(#hex-logo-back-arm-mask)">'+
              '<use href="#hex-logo-back-arm-path" />'+
            '</g>'+
            '<circle class="hex-logo-front-hand" cx="88.902" cy="69.871" r="17.688" />'+
            '<circle class="hex-logo-back-hand" cx="88.902" cy="34.5" r="10.703" />'+
          '</g>'+ 
          '<g class="hex-logo-company-name">'+
            '<image x="288" y="447" width="424" height="37.2" '+
              'preserveAspectRatio="xMidYMid meet" '+
              'href="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjI1Mi4yMDMxMnB0IgogICBoZWlnaHQ9IjE1NS45NDE0MXB0IgogICB2aWV3Qm94PSIwIDEzMy44IDI1Mi4yMDMxMiAyMi4xNDE0IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcyOCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMzIiIC8+CiAgPHBhdGgKICAgICBmaWxsLXJ1bGU9Im5vbnplcm8iCiAgICAgZmlsbD0iIzFmMjc3NCIKICAgICBmaWxsLW9wYWNpdHk9IjEiCiAgICAgZD0ibSA5NC40Njg3NTIsNTkuOTQ1MzE0IHYgLTE1LjU5Mzc1IGMgOS42ODc0OTgsLTEuMzc4OTEgMjAuNDQ5MjE4LC0yLjEwOTM4IDMxLjcxMDkyOCwtMi4xMDkzOCAxMC4yNjU2MywwIDIwLjEyODkxLDAuNjEzMjggMjkuMTUyMzUsMS43Njk1MyB2IDI4LjgxMjUgYyAtNS42NTYyNSwwLjcxMDk0IC0xMS43MjY1NiwxLjIyMjY2IC0xOC4wOTM3NSwxLjUgMi45OTIxOSwtMi44OTQ1MyA0Ljg2MzI4LC02Ljk0NTMxIDQuODYzMjgsLTExLjQ0MTQgMCwtOC43ODkwNiAtNy4xMjg5MSwtMTUuOTE3OTcgLTE1LjkxNzk3LC0xNS45MTc5NyAtOC43OTI5NywwIC0xNS45MjE4Nyw3LjEyODkxIC0xNS45MjE4NywxNS45MTc5NyAwLDQuNDk2MDkgMS44NzEwOSw4LjU0Njg3IDQuODYzMjgsMTEuNDQxNCAtNy4zMzk4NSwtMC4zMjAzMSAtMTQuMjg5MDcsLTAuOTUzMTIgLTIwLjY1NjI0OCwtMS44Mzk4NCB6IG0gMTExLjcyMjY0OCw0LjY4NzUgYyAwLC01LjY0MDYzIC01Ljg1NTQ3LC0xMC44MzIwMyAtMTUuNjQ4NDMsLTE1LjA1MDc4IDIuODM1OTMsMi4wMjczNCA0LjQ1NzAzLDQuMjA3MDMgNC40NTcwMyw2LjQ5NjA5IDAsNC4zMjgxMyAtNS41NTQ2OSw4LjMwODU5IC0xNC44MzU5NCwxMS40NTcwMyB2IC00My42MjEwOSBjIDAsLTE1LjIzMDQ3IDEuNTE5NTMsLTE2LjI2MTcyIDE3Ljk2MDk0LC0xNy43MjY1NiBWIDRlLTYgaCAtNjAuNzUzOTEgdiA2LjE4NzUgYyAxNS44MjgxMywxLjM5ODQzIDE3Ljk2MDk0LDIuNTU4NTkgMTcuOTYwOTQsMTcuNzI2NTYgdiAxNC43NTc4MSBjIC02LjgyMDMxLC0wLjg1MTU2IC0xNC4wODk4NSwtMS4zOTA2MiAtMjEuNjI4OTEsLTEuNjA5MzcgMS4zMjAzMSwtMS42NDg0NCAyLjExMzI4LC0zLjczNDM4IDIuMTEzMjgsLTYuMDExNzIgMCwtNS4zMjAzMiAtNC4zMTY0LC05LjYzMjgyIC05LjYzMjgxLC05LjYzMjgyIC01LjMyMDMxLDAgLTkuNjM2NzIsNC4zMTI1IC05LjYzNjcyLDkuNjMyODIgMCwyLjI3NzM0IDAuNzkyOTcsNC4zNjMyOCAyLjExMzI4LDYuMDExNzIgLTguNTAzOSwwLjI0MjE4IC0xNi42NDg0MywwLjg5ODQzIC0yNC4xOTEzOTgsMS45NDE0IHYgLTE1LjA4OTg0IGMgMCwtMTUuMTY3OTcgMS43OTI5NywtMTYuNDQ1MzEgMTcuNzQ5OTk4LC0xNy43MjY1NiBWIDRlLTYgSCA1MS42NzU3ODIgdiA2LjE4NzUgYyAxNi4wMjczNCwxLjIyMjY1IDE3Ljg4NjcyLDIuNDk2MDkgMTcuODg2NzIsMTcuNzI2NTYgdiA0Mi42Njc5NyBjIC03LjY4NzUsLTIuOTg0MzggLTEyLjE5OTIyLC02LjYwMTU3IC0xMi4xOTkyMiwtMTAuNTAzOTEgMCwtMi4yODkwNiAxLjYyMTA5LC00LjQ2ODc1IDQuNDUzMTIsLTYuNDk2MDkgLTkuNzg5MDYsNC4yMTg3NSAtMTUuNjQ0NTMsOS40MTAxNSAtMTUuNjQ0NTMsMTUuMDUwNzggMCw3LjAxMTcyIDguOTM3NSwxMy4zNTU0NyAyMy4zOTA2MywxNy45NTMxMiB2IDEyLjQ4ODI4IGMgMCwxNS4yMzgyODYgLTIuMTI1LDE2LjAyMzQzNiAtMTcuODg2NzIsMTcuNTUwNzg2IHYgNi4xODc1IEggMTEyLjIxODc1IFYgMTEyLjYyNSBDIDk2LjI1MDAwMiwxMTEuMDM1MTUgOTQuNDY4NzUyLDExMC4yNSA5NC40Njg3NTIsOTUuMDc0MjE0IHYgLTcuMTA5MzcgYyA5LjcyNjU1OCwxLjMzNTk0IDIwLjQ0NTMwOCwyLjA3ODEyIDMxLjcxNDgzOCwyLjA3ODEyIDEwLjI4OTA2LDAgMjAuMTEzMjgsLTAuNjIxMDkgMjkuMTQ4NDQsLTEuNzQ2MDkgdiA2Ljc3NzM0IGMgMCwxNS4yMzgyODYgLTEuMzgyODEsMTUuNzIyNjU2IC0xNy45NjA5NCwxNy41NTA3ODYgdiA2LjE4NzUgSCAxOTguMTI1IHYgLTYuMTg3NSBjIC0xNi4yMzgyOCwtMS40MDYyNSAtMTcuOTYwOTQsLTIuMzEyNSAtMTcuOTYwOTQsLTE3LjU1MDc4NiB2IC0xMS42ODc1IGMgMTUuOTkyMTksLTQuNjQ4NDMgMjYuMDI3MzQsLTExLjMyODEyIDI2LjAyNzM0LC0xOC43NTM5IgogICAgIGlkPSJwYXRoMiIgLz4KICA8cGF0aAogICAgIGZpbGwtcnVsZT0ibm9uemVybyIKICAgICBmaWxsPSIjMWYyNzc0IgogICAgIGZpbGwtb3BhY2l0eT0iMSIKICAgICBkPSJtIDEuNDg0MzcyLDE1Mi44MTY0IDIuODQzNzUsLTE0Ljc4OTA2IGMgMC4wODIsLTAuMzU1NDcgMC4xMjUsLTAuNzY1NjMgMC4xMjUsLTEuMjMwNDcgMCwtMC43MTA5NCAtMC4xMzY3MiwtMS4zNDM3NSAtMC40MTAxNSwtMS44OTA2MiBoIDkuNzU3ODEgYyAtMC4zNTkzOCwwLjM5ODQzIC0wLjY2Nzk3LDAuODc4OSAtMC45Mjk2OSwxLjQzMzU5IC0wLjI2NTYyLDAuNTU0NjkgLTAuNDQ5MjIsMS4xMTcxOSAtMC41NTQ2OSwxLjY4MzU5IGwgLTEuMDQyOTcsNS40MTAxNiBoIDYuMTI4OTEgbCAxLjAzOTA2LC01LjQxMDE2IGMgMC4wODU5LC0wLjM1NTQ3IDAuMTI4OTEsLTAuNzY1NjIgMC4xMjg5MSwtMS4yMjY1NiAwLC0wLjcxNDg0IC0wLjEzNjcyLC0xLjM0Mzc1IC0wLjQxMDE2LC0xLjg5MDYyIGggOS43NTc4MiBjIC0wLjM1OTM4LDAuMzk4NDMgLTAuNjY3OTcsMC44Nzg5IC0wLjkzMzYsMS40Mzc1IC0wLjI2MTcyLDAuNTU0NjggLTAuNDQ1MzEsMS4xMTcxOCAtMC41NTA3OCwxLjY4MzU5IGwgLTIuODQzNzUsMTQuNzg5MDYgYyAtMC4wODIsMC4zNTkzOCAtMC4xMjUsMC43Njk1MyAtMC4xMjUsMS4yMzA0NyAwLDAuNzE0ODQgMC4xMzY3MiwxLjM0NzY2IDAuNDEwMTYsMS44OTQ1MyBoIC05Ljc1NzgyIGMgMC4zNTU0NywtMC40MDIzNCAwLjY2Nzk3LC0wLjg4MjgxIDAuOTI5NjksLTEuNDQxNCAwLjI2MTcyLC0wLjU2MjUgMC40NDkyMiwtMS4xMjUgMC41NTQ2OSwtMS42OTUzMiBsIDEuMTM2NzIsLTUuODk4NDMgaCAtNi4xMjg5MSBsIC0xLjEzNjcyLDUuODk4NDMgYyAtMC4wODIsMC4zNTU0NyAtMC4xMjUsMC43Njk1MyAtMC4xMjUsMS4yMzQzOCAwLDAuNzE4NzUgMC4xMzY3MiwxLjM1MTU2IDAuNDEwMTYsMS45MDIzNCBIIDJlLTYgYyAwLjI3MzQzLC0wLjMzNTk0IDAuNDcyNjUsLTAuNjIxMDkgMC41OTc2NSwtMC44NTE1NiAwLjQ0NTMyLC0wLjczODI4IDAuNzM4MjgsLTEuNDkyMTkgMC44ODY3MiwtMi4yNzM0NCIKICAgICBpZD0icGF0aDQiIC8+CiAgPHBhdGgKICAgICBmaWxsLXJ1bGU9Im5vbnplcm8iCiAgICAgZmlsbD0iIzFmMjc3NCIKICAgICBmaWxsLW9wYWNpdHk9IjEiCiAgICAgZD0ibSAzNi41MzkwNjIsMTQ1LjA0Mjk2IC0xLjE2Nzk3LDYuMTI4OTEgYyAtMC4wNDMsMC4xNjc5NyAtMC4wNjI1LDAuMzk4NDQgLTAuMDYyNSwwLjY5NTMxIDAsMC43NTc4MiAwLjUxNTYzLDEuMTM2NzIgMS41NDY4OCwxLjEzNjcyIGggMi4xNDg0MyBjIDAuNjcxODgsMCAxLjE3MTg4LC0wLjE1MjM0IDEuNDk2MSwtMC40NTcwMyAwLjMyODEyLC0wLjMwODU5IDAuNTU0NjgsLTAuNzk2ODcgMC42ODM1OSwtMS40NzI2NiBsIDEuMTAxNTYsLTUuODA4NTkgYyAwLjAyMzQsLTAuMTI1IDAuMDM5MSwtMC4yNTc4MSAwLjA0NjksLTAuMzk0NTMgMC4wMTE3LC0wLjEzNjcyIDAuMDE5NSwtMC4yMzgyOCAwLjAxOTUsLTAuMzAwNzggMCwtMC44Mzk4NSAtMC42MDE1NiwtMS4yNjE3MiAtMS44MDA3OCwtMS4yNjE3MiBoIC0xLjgzMjAzIGMgLTEuMTk5MjIsMCAtMS45MjU3OCwwLjU3ODEyIC0yLjE3OTY5LDEuNzM0MzcgbSAtMS40ODQzOCwtNC42NzE4NyBoIDEwLjA0Mjk3IGMgMS42NDA2MywwIDIuODUxNTcsMC4yMzA0NyAzLjYzMjgyLDAuNjk1MzEgMC45MDIzNCwwLjU0Mjk3IDEuMzU1NDYsMS40NTcwMyAxLjM1NTQ2LDIuNzM4MjggMCwwLjI3NzM1IC0wLjAwOCwwLjQ5MjE5IC0wLjAzMTIsMC42NDg0NCAtMC4wMTk1LDAuMTU2MjUgLTAuMDYyNSwwLjQzMzU5IC0wLjEyNSwwLjgzNTk0IGwgLTEuMTk5MjEsNi4xNzU3OCBjIC0wLjU3MDMyLDIuOTg0MzcgLTIuMzQ3NjYsNC40NzY1NiAtNS4zMzU5NCw0LjQ3NjU2IGggLTEwLjY0NDUzIGMgLTEuNzA3MDMsMCAtMi45NDkyMiwtMC4yMDMxMiAtMy43MjY1NywtMC42MDE1NiAtMC45OTIxOCwtMC41MDM5MSAtMS40ODQzNywtMS40MTc5NyAtMS40ODQzNywtMi43MzgyOCB2IC0wLjQ5MjE5IGMgMCwtMC4xMzY3MiAwLjA0MywtMC40MDIzNCAwLjEyNSwtMC44MDA3OCBsIDEuMjY1NjIsLTYuNTg5ODQgYyAwLjI1LC0xLjIzODI5IDAuODc4OTEsLTIuMjczNDQgMS44Nzg5MSwtMy4xMDU0NyAxLC0wLjgyODEzIDIuMTI4OTEsLTEuMjQyMTkgMy4zOTA2MywtMS4yNDIxOSB6IG0gMCwwIgogICAgIGlkPSJwYXRoNiIgLz4KICA8cGF0aAogICAgIGZpbGwtcnVsZT0ibm9uemVybyIKICAgICBmaWxsPSIjMWYyNzc0IgogICAgIGZpbGwtb3BhY2l0eT0iMSIKICAgICBkPSJtIDUyLjI2NTYyMiwxNTIuMzc4OSAyLjU4OTg1LC0xMy41NjI1IGMgMC4wODU5LC0wLjM5ODQ0IDAuMTY3OTYsLTAuODEyNSAwLjI1MzksLTEuMjQ2MDkgMC4wODIsLTAuNDI5NjkgMC4xMjUsLTAuODU1NDcgMC4xMjUsLTEuMjczNDQgMCwtMC40NjQ4NCAtMC4wODIsLTAuOTI1NzggLTAuMjUzOSwtMS4zOTA2MiBoIDguMjQ2MDkgbCAtMi4xMTcxOSwxMS4wNTQ2OCA0LjY0MDYzLC0zLjMxNjQgYyAwLjQ0NTMxLC0wLjMzNTk0IDAuODEyNSwtMC42NzU3OCAxLjEwNTQ3LC0xLjAxMTcyIDAuMzc4OSwtMC40NDE0MSAwLjYwOTM3LC0wLjg1OTM4IDAuNjk1MzEsLTEuMjYxNzIgaCA3LjA0Mjk3IGMgLTEuMDkzNzUsMC40MjE4NyAtMi4xMTcxOSwwLjkyNTc4IC0zLjA2MjUsMS41MTU2MiAtMC43NTc4MiwwLjQ2NDg1IC0xLjcwMzEzLDEuMTM2NzIgLTIuODM5ODUsMi4wMTk1NCBsIDMuNDcyNjYsOS4wOTc2NSBjIDAuMzk4NDQsMS4xMTcxOSAwLjk3NjU2LDIuMDkzNzUgMS43MzQzNywyLjkzNzUgaCAtOS40NDE0IGwgLTIuNDMzNiwtNy4yNjU2MiAtMS42NzE4NywxLjEzNjcyIC0wLjQxMDE2LDIuMjEwOTMgYyAtMC4xMjg5LDAuNTcwMzIgLTAuMjIyNjUsMS4wMzkwNyAtMC4yODUxNSwxLjQwNjI1IC0wLjA2MjUsMC4zNjcxOSAtMC4wOTM3LDAuNzQyMTkgLTAuMDkzNywxLjEyMTEgMCwwLjQ2MDkzIDAuMDgyLDAuOTI1NzggMC4yNSwxLjM5MDYyIGggLTguODcxMSBjIDAuMTI1LC0wLjE0ODQ0IDAuMjE4NzUsLTAuMjg1MTUgMC4yODEyNSwtMC40MTAxNSAwLjQ0MTQxLC0wLjc3NzM1IDAuNzg5MDcsLTEuODMyMDQgMS4wNDI5NywtMy4xNTIzNSIKICAgICBpZD0icGF0aDgiIC8+CiAgPHBhdGgKICAgICBmaWxsLXJ1bGU9Im5vbnplcm8iCiAgICAgZmlsbD0iIzFmMjc3NCIKICAgICBmaWxsLW9wYWNpdHk9IjEiCiAgICAgZD0ibSA3Ni4yMDMxMjIsMTUwLjUzOTA2IDEuMTk5MjIsLTYuMjUzOTEgYyAwLjE2Nzk3LC0wLjk0NTMxIDAuMjY5NTMsLTEuNTI3MzQgMC4zMDA3OCwtMS43MzQzNyAwLjAzMTIsLTAuMjEwOTQgMC4wNTA4LC0wLjQ3NjU3IDAuMDUwOCwtMC43ODkwNyAwLC0wLjU1MDc4IC0wLjA3NDIsLTEuMDExNzEgLTAuMjIyNjUsLTEuMzkwNjIgaCA4LjI0MjE4IGwgLTIuMDE5NTMsMTAuNTQ2ODcgYyAtMC4wODU5LDAuNDY0ODUgLTAuMTI4OSwwLjc4MTI1IC0wLjEyODksMC45NDkyMiAwLDAuMzk4NDQgMC4xMDE1NiwwLjY4NzUgMC4zMDA3OCwwLjg2NzE5IDAuMTk5MjIsMC4xNzk2OSAwLjU2MjUsMC4yNjk1MyAxLjA4OTg0LDAuMjY5NTMgaCAxLjgzMjAzIGMgMC43MzQzOCwwIDEuMjUzOTEsLTAuMTI4OSAxLjU0Njg4LC0wLjM3ODkgMC4yOTI5NywtMC4yNTM5MSAwLjUxNTYyLC0wLjc1NzgyIDAuNjY0MDYsLTEuNTE1NjMgbCAxLjMyNDIyLC02LjgyNDIyIGMgMC4xNzE4NywtMC45NDUzMSAwLjI2OTUzLC0xLjUyNzM0IDAuMzAwNzgsLTEuNzM0MzcgMC4wMzEyLC0wLjIxMDk0IDAuMDQ2OSwtMC40NzY1NyAwLjA0NjksLTAuNzg5MDcgMCwtMC4yMTA5MyAtMC4wMTU2LC0wLjQzNzUgLTAuMDQ2OSwtMC42Nzk2OCAtMC4wMzEyLC0wLjI0MjE5IC0wLjA4OTgsLTAuNDgwNDcgLTAuMTcxODcsLTAuNzEwOTQgaCA4LjI0MjE4IGwgLTIuMjQyMTgsMTEuNjUyMzQgYyAtMC4xMjUsMC41NzAzMiAtMC4yMTA5NCwwLjk5MjE5IC0wLjI1MzkxLDEuMjY1NjMgLTAuMTA1NDcsMC41MjM0NCAtMC4xNTYyNSwwLjk0NTMxIC0wLjE1NjI1LDEuMjYxNzIgMCwwLjI5Njg3IDAuMDE1NiwwLjUxMTcyIDAuMDQ2OSwwLjY0ODQzIDAuMDMxMiwwLjEzNjcyIDAuMTA5MzgsMC4zODI4MiAwLjIzODI5LDAuNzQyMTkgaCAtNy4yMDMxMyBsIC0wLjAzMTIsLTEuNDUzMTIgYyAtMC4zNzg5MSwwLjYwOTM3IC0wLjgzMjAzLDEuMDE5NTMgLTEuMzU1NDcsMS4yMzA0NyAtMC4zODI4MSwwLjE0ODQzIC0wLjk3MjY1LDAuMjIyNjUgLTEuNzY5NTMsMC4yMjI2NSBoIC01Ljg3NSBjIC0xLjUzOTA2LDAgLTIuNjIxMDksLTAuMjUzOSAtMy4yNTM5MSwtMC43NTc4MSAtMC42MzI4MSwtMC41MDc4MSAtMC45NDkyMSwtMS4zMTY0MSAtMC45NDkyMSwtMi40MzM1OSAwLC0wLjU2NjQxIDAuMDg1OSwtMS4zMDQ2OSAwLjI1MzksLTIuMjEwOTQiCiAgICAgaWQ9InBhdGgxMCIgLz4KICA8cGF0aAogICAgIGZpbGwtcnVsZT0ibm9uemVybyIKICAgICBmaWxsPSIjMWYyNzc0IgogICAgIGZpbGwtb3BhY2l0eT0iMSIKICAgICBkPSJtIDEwMS4wMjczNCwxNTIuMzcxMDkgMS41NDY4OCwtOC4wODU5NCBjIDAuMTcxODcsLTAuOTQ1MzEgMC4yNjk1MywtMS41MjczNCAwLjMwMDc4LC0xLjczNDM3IDAuMDMxMiwtMC4yMTA5NCAwLjA0NjksLTAuNDc2NTcgMC4wNDY5LC0wLjc4OTA3IDAsLTAuNTUwNzggLTAuMDc0MiwtMS4wMTE3MSAtMC4yMjI2NSwtMS4zOTA2MiBoIDcuNTUwNzggbCAtMC4zMTY0MSwyLjU1ODU5IGMgMC41MjczNCwtMS4wMTE3MiAxLjEyMTA5LC0xLjY5MTQgMS43ODEyNSwtMi4wMzkwNiAwLjY2Nzk3LC0wLjM0NzY2IDEuNTc4MTMsLTAuNTE5NTMgMi43MzQzOCwtMC41MTk1MyBoIDMuODIwMzEgbCAtMS4wMDc4MSw1LjE0ODQ0IGMgLTAuMzE2NDEsLTAuMzU5MzggLTAuNzIyNjYsLTAuNjAxNTcgLTEuMjE4NzUsLTAuNzI2NTcgLTAuNDkyMTksLTAuMTI4OSAtMS4wODU5NCwtMC4xOTE0IC0xLjc4NTE2LC0wLjE5MTQgaCAtMS41NDY4OCBjIC0wLjc3NzM0LDAgLTEuNDQxNCwwLjIwMzEyIC0xLjk4ODI4LDAuNjAxNTYgLTAuNTQ2ODcsMC4zOTg0NCAtMC44OTQ1MywwLjk4MDQ3IC0xLjA0Mjk3LDEuNzM4MjggbCAtMC45NzY1Niw1LjA4MjAzIGMgLTAuMTcxODcsMC45NDkyMiAtMC4yNjk1MywxLjUyNzM1IC0wLjMwMDc4LDEuNzM4MjggLTAuMDMxMiwwLjIxMDk0IC0wLjA0NjksMC40NzI2NiAtMC4wNDY5LDAuNzg5MDcgMCwwLjUwNzgxIDAuMDcwMywwLjk2ODc1IDAuMjE4NzUsMS4zOTA2MiBoIC04Ljg3NDk5OCBjIDAuMjczNDMsLTAuMzU5MzcgMC40ODQzNjgsLTAuNzI2NTYgMC42MzI4MDgsLTEuMTA1NDcgMC4yNzM0NCwtMC42OTUzMSAwLjUwNzgxLC0xLjUxNTYyIDAuNjk1MzEsLTIuNDY0ODQiCiAgICAgaWQ9InBhdGgxMiIgLz4KICA8cGF0aAogICAgIGZpbGwtcnVsZT0ibm9uemVybyIKICAgICBmaWxsPSIjMWYyNzc0IgogICAgIGZpbGwtb3BhY2l0eT0iMSIKICAgICBkPSJtIDEzMC4yNjk1MywxMzQuOTA2MjUgLTAuNzU3ODEsMy45NDkyMSBoIC03LjY0MDYzIGwgMC43NTc4MSwtMy45NDkyMSB6IG0gLTEwLjk4ODI4LDE3LjQ3MjY1IDEuNTQ2ODcsLTguMDcwMzEgYyAwLjE2Nzk3LC0wLjk0NTMxIDAuMjY1NjMsLTEuNTIzNDQgMC4zMDA3OCwtMS43MzA0NyAwLjAzMTIsLTAuMjEwOTQgMC4wNDY5LC0wLjQ3MjY2IDAuMDQ2OSwtMC43ODkwNiAwLC0wLjU0Njg4IC0wLjA3NDIsLTEuMDA3ODEgLTAuMjIyNjYsLTEuMzg2NzIgaCA4LjI3MzQ0IGwgLTIuMjM4MjgsMTEuNjI4OTEgYyAtMC4xMjg5MSwwLjU3MDMxIC0wLjIxNDg1LDAuOTg4MjggLTAuMjUzOTEsMS4yNjE3MSAtMC4xMDU0NywwLjUyMzQ0IC0wLjE2MDE1LDAuOTQ1MzIgLTAuMTYwMTUsMS4yNjE3MiAwLDAuMjkyOTcgMC4wMTU2LDAuNTA3ODIgMC4wNDY5LDAuNjQ0NTMgMC4wMzUyLDAuMTM2NzIgMC4xMTMyOCwwLjM4MjgyIDAuMjM4MjgsMC43NDIxOSBoIC04LjkwNjI1IGMgMC4yNzM0NCwtMC4zNzg5IDAuNDg0MzgsLTAuNzU3ODEgMC42MzI4MSwtMS4xMzY3MiAwLjI3MzQ0LC0wLjY5MTQgMC41MDM5MSwtMS41IDAuNjk1MzIsLTIuNDI1NzgiCiAgICAgaWQ9InBhdGgxNCIgLz4KICA8cGF0aAogICAgIGZpbGwtcnVsZT0ibm9uemVybyIKICAgICBmaWxsPSIjMWYyNzc0IgogICAgIGZpbGwtb3BhY2l0eT0iMSIKICAgICBkPSJtIDEzMC44Mzk4NCwxNTIuMzc4OSAyLjU4OTg0LC0xMy41NjI1IGMgMC4wODIsLTAuMzk4NDQgMC4xNjc5NywtMC44MTI1IDAuMjUzOTEsLTEuMjQ2MDkgMC4wODIsLTAuNDI5NjkgMC4xMjUsLTAuODU1NDcgMC4xMjUsLTEuMjczNDQgMCwtMC40NjQ4NCAtMC4wODIsLTAuOTI1NzggLTAuMjUzOTEsLTEuMzkwNjIgaCA4LjI0MjE5IGwgLTIuMTEzMjgsMTEuMDU0NjggNC42NDA2MywtMy4zMTY0IGMgMC40NDE0LC0wLjMzNTk0IDAuODA4NTksLTAuNjc1NzggMS4xMDU0NiwtMS4wMTE3MiAwLjM3ODkxLC0wLjQ0MTQxIDAuNjA5MzgsLTAuODU5MzggMC42OTUzMiwtMS4yNjE3MiBoIDcuMDQyOTcgYyAtMS4wOTc2NiwwLjQyMTg3IC0yLjExNzE5LDAuOTI1NzggLTMuMDYyNSwxLjUxNTYyIC0wLjc1NzgyLDAuNDY0ODUgLTEuNzA3MDQsMS4xMzY3MiAtMi44NDM3NSwyLjAxOTU0IGwgMy40NzI2NSw5LjA5NzY1IGMgMC40MDIzNSwxLjExNzE5IDAuOTgwNDcsMi4wOTM3NSAxLjczODI4LDIuOTM3NSBoIC05LjQ0NTMxIGwgLTIuNDI5NjksLTcuMjY1NjIgLTEuNjcxODcsMS4xMzY3MiAtMC40MTQwNiwyLjIxMDkzIGMgLTAuMTI1LDAuNTcwMzIgLTAuMjE4NzUsMS4wMzkwNyAtMC4yODEyNSwxLjQwNjI1IC0wLjA2NjQsMC4zNjcxOSAtMC4wOTc3LDAuNzQyMTkgLTAuMDk3NywxLjEyMTEgMCwwLjQ2MDkzIDAuMDg1OSwwLjkyNTc4IDAuMjUzOTEsMS4zOTA2MiBoIC04Ljg3NSBjIDAuMTI4OSwtMC4xNDg0NCAwLjIyMjY1LC0wLjI4NTE1IDAuMjg1MTUsLTAuNDEwMTUgMC40NDE0MSwtMC43NzczNSAwLjc4OTA2LC0xLjgzMjA0IDEuMDQyOTcsLTMuMTUyMzUiCiAgICAgaWQ9InBhdGgxNiIgLz4KICA8cGF0aAogICAgIGZpbGwtcnVsZT0ibm9uemVybyIKICAgICBmaWxsPSIjMWYyNzc0IgogICAgIGZpbGwtb3BhY2l0eT0iMSIKICAgICBkPSJtIDE1NC43NzczNCwxNTAuNTM5MDYgMS4xOTkyMiwtNi4yNTM5MSBjIDAuMTY3OTcsLTAuOTQ1MzEgMC4yNjk1MywtMS41MjczNCAwLjMwMDc4LC0xLjczNDM3IDAuMDMxMiwtMC4yMTA5NCAwLjA0NjksLTAuNDc2NTcgMC4wNDY5LC0wLjc4OTA3IDAsLTAuNTUwNzggLTAuMDc0MiwtMS4wMTE3MSAtMC4yMTg3NSwtMS4zOTA2MiBoIDguMjQyMTggbCAtMi4wMjM0MywxMC41NDY4NyBjIC0wLjA4NTksMC40NjQ4NSAtMC4xMjUsMC43ODEyNSAtMC4xMjUsMC45NDkyMiAwLDAuMzk4NDQgMC4wOTc2LDAuNjg3NSAwLjMwMDc4LDAuODY3MTkgMC4xOTkyMiwwLjE3OTY5IDAuNTYyNSwwLjI2OTUzIDEuMDg5ODQsMC4yNjk1MyBoIDEuODMyMDMgYyAwLjczNDM4LDAgMS4yNSwtMC4xMjg5IDEuNTQ2ODgsLTAuMzc4OSAwLjI5Mjk3LC0wLjI1MzkxIDAuNTE1NjIsLTAuNzU3ODIgMC42NjQwNiwtMS41MTU2MyBsIDEuMzI0MjIsLTYuODI0MjIgYyAwLjE2Nzk3LC0wLjk0NTMxIDAuMjY5NTMsLTEuNTI3MzQgMC4zMDA3OCwtMS43MzQzNyAwLjAzMTIsLTAuMjEwOTQgMC4wNDY5LC0wLjQ3NjU3IDAuMDQ2OSwtMC43ODkwNyAwLC0wLjIxMDkzIC0wLjAxNTYsLTAuNDM3NSAtMC4wNDY5LC0wLjY3OTY4IC0wLjAzMTIsLTAuMjQyMTkgLTAuMDg5OCwtMC40ODA0NyAtMC4xNzE4OCwtMC43MTA5NCBoIDguMjM4MjkgbCAtMi4yMzgyOSwxMS42NTIzNCBjIC0wLjEyODksMC41NzAzMiAtMC4yMTA5MywwLjk5MjE5IC0wLjI1MzksMS4yNjU2MyAtMC4xMDU0NywwLjUyMzQ0IC0wLjE2MDE2LDAuOTQ1MzEgLTAuMTYwMTYsMS4yNjE3MiAwLDAuMjk2ODcgMC4wMTU2LDAuNTExNzIgMC4wNDY5LDAuNjQ4NDMgMC4wMzUxLDAuMTM2NzIgMC4xMTMyOCwwLjM4MjgyIDAuMjM4MjgsMC43NDIxOSBoIC03LjE5OTIyIGwgLTAuMDMxMiwtMS40NTMxMiBjIC0wLjM3ODkxLDAuNjA5MzcgLTAuODMyMDMsMS4wMTk1MyAtMS4zNTkzOCwxLjIzMDQ3IC0wLjM3ODksMC4xNDg0MyAtMC45Njg3NSwwLjIyMjY1IC0xLjc2OTUzLDAuMjIyNjUgaCAtNS44NzExOCBjIC0xLjUzOTA2LDAgLTIuNjIxMDksLTAuMjUzOSAtMy4yNTM5MSwtMC43NTc4MSAtMC42MzI4MSwtMC41MDc4MSAtMC45NDkyMiwtMS4zMTY0MSAtMC45NDkyMiwtMi40MzM1OSAwLC0wLjU2NjQxIDAuMDg1OSwtMS4zMDQ2OSAwLjI1MzkxLC0yLjIxMDk0IgogICAgIGlkPSJwYXRoMTgiIC8+CiAgPHBhdGgKICAgICBmaWxsLXJ1bGU9Im5vbnplcm8iCiAgICAgZmlsbD0iIzFmMjc3NCIKICAgICBmaWxsLW9wYWNpdHk9IjEiCiAgICAgZD0ibSAxOTMuMjEwOTMsMTQyLjEyNSAtMC43NTc4MSwzLjk0NTMxIEggMTgxLjI0MjE4IEwgMTgyLDE0Mi4xMjUgWiBtIDAsMCIKICAgICBpZD0icGF0aDIwIiAvPgogIDxwYXRoCiAgICAgZmlsbC1ydWxlPSJub256ZXJvIgogICAgIGZpbGw9IiMxZjI3NzQiCiAgICAgZmlsbC1vcGFjaXR5PSIxIgogICAgIGQ9Im0gMTk1Ljc2OTUzLDE1Mi44MTY0IDIuODQzNzUsLTE0Ljc4OTA2IGMgMC4wODIsLTAuMzU1NDcgMC4xMjUsLTAuNzY1NjMgMC4xMjUsLTEuMjMwNDcgMCwtMC43MTA5NCAtMC4xMzY3MiwtMS4zNDM3NSAtMC40MTAxNiwtMS44OTA2MiBoIDE4LjUzOTA2IGwgLTAuMTYwMTUsMy45ODA0NiBjIC0wLjQ4NDM4LC0wLjE5MTQgLTEuMDI3MzUsLTAuMzIwMzEgLTEuNjI1LC0wLjM5NDUzIC0wLjYwMTU2LC0wLjA3NDIgLTEuMjU3ODEsLTAuMTA5MzcgLTEuOTcyNjYsLTAuMTA5MzcgaCAtNi41NzAzMSBsIC0wLjk4MDQ3LDUuMDgyMDMgSCAyMTIgYyAwLjY3NTc4LDAgMS4yMjI2NSwtMC4wMjM0IDEuNjQ0NTMsLTAuMDc4MSAwLjQyMTg3LC0wLjA1MDggMC45MDYyNSwtMC4xODM1OSAxLjQ1MzEyLC0wLjM5NDUzIGwgLTAuODUxNTYsNC40NTMxMyBjIC0wLjI3NzM0LC0wLjIzMDQ3IC0wLjYwMTU2LC0wLjM4MjgxIC0wLjk4MDQ3LC0wLjQ1NzAzIC0wLjM3ODksLTAuMDc0MiAtMC44MjAzMSwtMC4xMDkzOCAtMS4zMjgxMiwtMC4xMDkzOCBoIC03LjA0Mjk3IGwgLTEuMDcwMzEsNS41ODU5NCBoIDcuODAwNzggYyAwLjM3NSwwIDAuNzMwNDcsLTAuMDM1MiAxLjA1NDY4LC0wLjEwOTM4IDAuMzI4MTMsLTAuMDc0MiAxLjAyNzM1LC0wLjI3NzM0IDIuMTAxNTcsLTAuNjE3MTggbCAtMS41MTU2Myw0LjIwMzEyIGggLTE4Ljk4MDQ3IGMgMC4yNzM0NCwtMC4zNTkzNyAwLjQ3MjY2LC0wLjY1MjM0IDAuNTk3NjYsLTAuODgyODEgMC40NDUzMSwtMC43NTc4MSAwLjczODI4LC0xLjUwMzkxIDAuODg2NzIsLTIuMjQyMTkiCiAgICAgaWQ9InBhdGgyMiIgLz4KICA8cGF0aAogICAgIGZpbGwtcnVsZT0ibm9uemVybyIKICAgICBmaWxsPSIjMWYyNzc0IgogICAgIGZpbGwtb3BhY2l0eT0iMSIKICAgICBkPSJNIDI0MS4xNTIzNCwxNTUuOTQxNCBIIDIyOS44Nzg5IGwgMC4xODc1LC0wLjU2NjQgYyAwLjA0MywtMC4yNTM5MSAwLjA2MjUsLTAuNDMzNiAwLjA2MjUsLTAuNTM5MDcgMCwtMC4zNTU0NyAtMC4wNzAzLC0wLjY5OTIyIC0wLjIwMzEyLC0xLjAyMzQzIC0wLjEzNjcyLC0wLjMyNDIyIC0wLjMyMDMxLC0wLjY5OTIyIC0wLjU1MDc4LC0xLjEyMTEgbCAtMS45MTc5NywtMy40OTYwOSAtNS4yNDIxOSw0LjU3ODEyIGMgLTAuNDY0ODQsMC40MTc5NyAtMC43OTI5NywwLjc0MjE5IC0wLjk4NDM3LDAuOTcyNjYgLTAuMjkyOTcsMC4zNTU0NyAtMC41MjM0NCwwLjc1MzkxIC0wLjY5MTQxLDEuMTk1MzEgaCAtNS45ODA0NyBjIDEuMDc0MjIsLTAuNzM4MjggMi4xMTcxOSwtMS41NTA3OCAzLjEyODkxLC0yLjQzMzU5IGwgOC4yNDIxOCwtNy4yNjE3MiAtNC42NDA2MiwtOC4yMjI2NiBjIC0wLjQ4ODI4LC0wLjg3ODkgLTAuOTA2MjUsLTEuNTYyNSAtMS4yNjU2MywtMi4wNDY4NyAtMC4yNzM0MywtMC4zNzUgLTAuNjA5MzcsLTAuNzMwNDcgLTEuMDExNzEsLTEuMDcwMzEgaCAxMS41MzEyNSBjIC0wLjA0MywwLjE5MTQgLTAuMDY2NCwwLjQ0OTIxIC0wLjA2NjQsMC43ODUxNSAwLDAuNDQxNDEgMC4wNzAzLDAuODU5MzggMC4yMDcwMywxLjI1NzgxIDAuMTM2NzIsMC4zOTg0NCAwLjMzMjAzLDAuODI4MTMgMC41ODIwMywxLjI4OTA3IGwgMS40ODQzOCwyLjY5OTIyIDQuMTQ0NTMsLTMuNDk2MSBjIDAuNDYwOTQsLTAuMzk4NDQgMC44NTU0NywtMC43OTY4NyAxLjE4MzU5LC0xLjIwNzAzIDAuMzI0MjIsLTAuNDAyMzQgMC41ODIwMywtMC44NDc2NiAwLjc2OTUzLC0xLjMyODEyIGggNi4zNDc2NiBjIC0xLjAzMTI1LDAuNTM5MDYgLTIuMTA1NDcsMS4zMDA3OCAtMy4yMjI2NiwyLjI3MzQzIGwgLTcuNzA3MDMsNi42NjQwNyA0LjczODI4LDkgYyAwLjI1MzkxLDAuNTA3ODEgMC42NzE4OCwxLjE2MDE1IDEuMjYxNzIsMS45NjA5MyAwLjE5MTQxLDAuMjczNDQgMC40ODQzOCwwLjY1MjM1IDAuODg2NzIsMS4xMzY3MiIKICAgICBpZD0icGF0aDI0IiAvPgogIDxwYXRoCiAgICAgZmlsbC1ydWxlPSJub256ZXJvIgogICAgIGZpbGw9IiMxZjI3NzQiCiAgICAgZmlsbC1vcGFjaXR5PSIxIgogICAgIGQ9Im0gMjQ0LjI3NzM0LDE1MC4zMjAzMSBoIDcuOTI1NzggbCAtMS4wNzQyMiw1LjYyMTA5IGggLTcuOTI1NzggeiBtIDAsMCIKICAgICBpZD0icGF0aDI2IiAvPgo8L3N2Zz4K" />'+
          '</g>'+
        '</svg>'+ 
      '</div>'+ 
      '<div class="hex-opening-hero-reveal" aria-hidden="true"></div>';

    reveal=opening.querySelector(".hex-opening-hero-reveal");
    reveal.style.backgroundImage=backgroundImage;

    return opening;
  }

  function syncHeroRevealOrigin(opening){
    var frontHand=opening.querySelector(".hex-logo-front-hand");
    var rect;

    if(!frontHand){
      return;
    }

    rect=frontHand.getBoundingClientRect();

    opening.style.setProperty(
      "--hex-hero-origin-x",
      (rect.left+rect.width/2)+"px"
    );

    opening.style.setProperty(
      "--hex-hero-origin-y",
      (rect.top+rect.height/2)+"px"
    );
  }

  function finishOpening(opening,hero){
    document.documentElement.classList.remove("hex-opening-lock");

    if(hero){
      hero.classList.add("is-ready");

      window.setTimeout(function(){
        hero.classList.add("is-copy-swap-ready");
      },750);
    }

    if(opening&&opening.parentNode){
      opening.parentNode.removeChild(opening);
    }
  }

  function initOpening(){
    var backgroundImage;
    var copyPair;
    var hero;
    var opening;

    if(!isTopPage()){
      return;
    }

    backgroundImage=getRegisteredHeroBackground();
    copyPair=prepareHandoffCopy();
    hero=createOriginalHero(backgroundImage,copyPair);

    if(!hero){
      return;
    }

    initCopyHandoff(hero,copyPair.source);

    if(
      isReducedMotion()||
      (!FORCE_PLAY&&sessionStorage.getItem(STORAGE_KEY))
    ){
      hero.classList.add("is-ready","is-copy-swap-ready");
      return;
    }

    if(!FORCE_PLAY){
      sessionStorage.setItem(STORAGE_KEY,"1");
    }

    opening=createOpeningElement(backgroundImage);
    document.documentElement.classList.add("hex-opening-lock");
    document.body.insertBefore(opening,document.body.firstChild);

    window.setTimeout(function(){
      opening.classList.add("is-plaster-start");
    },OPENING_START_DELAY);

    window.setTimeout(function(){
      opening.classList.add("is-plaster-complete");
    },OPENING_START_DELAY+PLASTER_COMPLETE_AT);

    window.setTimeout(function(){
      opening.classList.add("is-logo-start");
    },OPENING_START_DELAY+LOGO_START_AT);

    window.setTimeout(function(){
      syncHeroRevealOrigin(opening);
      opening.offsetWidth;
      opening.classList.add("is-hero-reveal");
    },OPENING_START_DELAY+HERO_REVEAL_AT);

    window.setTimeout(function(){
      finishOpening(opening,hero);
    },OPENING_START_DELAY+HERO_READY_AT);

    /* 万一途中でエラーが起きても画面を塞ぎ続けない */
    window.setTimeout(function(){
      finishOpening(opening,hero);
    },SAFETY_REMOVE_AT);
  }

  initOpening();
});

/* =======================================
   トップ スクロールナビ
======================================= */
hexReady(function(){

  const scrollIndicator=document.querySelector('.hex-scroll-indicator');
  if(!scrollIndicator)return;

  function updateScrollIndicator(){

    const rect = scrollIndicator.getBoundingClientRect();

    const start = window.innerHeight;
    const end = window.innerHeight / 2;

    let opacity = (rect.top - end) / (start - end);

    opacity = Math.max(0, Math.min(1, opacity));

    scrollIndicator.style.opacity = opacity;
  }

  window.addEventListener('scroll',updateScrollIndicator,{passive:true});
  updateScrollIndicator();

});

/* =======================================
   トップ サービス案内
======================================= */
hexReady(function(){
  var serviceSection=document.getElementById(HOME_SECTIONS.SERVICE);
  if(!serviceSection)return;

  serviceSection.classList.add('hex-service-top-section');
});

/* =======================================
   下層ページタイトル共通
======================================= */
hexReady(function(){
  var enTitle=document.querySelector('.page-title-en');
  var heroTitle=document.querySelector('.gc_auto_frame_page_title h1');
  if(!enTitle||!heroTitle)return;
  heroTitle.appendChild(enTitle);
});

/* =======================================
   下層ページタイトル　文言差し替え
======================================= */
hexReady(function(){
  document.querySelectorAll(
    '.gc_auto_frame_page_title .title_font_big_headline'
  ).forEach(function(title){
    var text=title.textContent.trim();
    var label='';

    if(text==='個人のお客様'){
      /* label='個人のお客様'; */
      title.textContent='外構工事をご検討中の方';
    }

    if(text==='ビジネスのお客様'){
      /* label='ビジネスのお客様'; */
      title.textContent='外構パートナーをお探しの方';
    }

    if(label){
      var target=document.createElement('span');
      target.className='hex-page-target';
      target.textContent=label;
      title.parentNode.insertBefore(target,title);
    }
  });
});

/* =======================================
   導入文・アンカーナビをページタイトル内へ移動
======================================= */
hexLoad(function(){
  var hexIntro=document.querySelector('.hex-intro');
  var hexAnchorSource=document.querySelector('.hex-anchor-source');
  var pageTitleContents=document.querySelector(
    '.pagetitle_type.pagetitle_type4 > .contents'
  );

  if(!pageTitleContents)return;

  /* 導入文を移動 */
  if(hexIntro){
    pageTitleContents.appendChild(hexIntro);
  }

  /* 導入文の下にアンカーナビを移動 */
  if(hexAnchorSource){
    pageTitleContents.appendChild(hexAnchorSource);
  }
});

/* =======================================
   共通フッター レイアウト調整
======================================= */
hexReady(function(){
  hexReplaceTikTokSvgs(document);
  setTimeout(function(){
    hexReplaceTikTokSvgs(document);
  },100);
});
hexReady(function(){
  var hexFooterRetryCount=0;
  var hexFooterRetryLimit=20;

  function hexInitFooter(){
    var areaView=document.getElementById('footer-area-view');
    var footerFrame=document.querySelector('.gc_auto_frame_footer');
    var footerContents=footerFrame
      ?footerFrame.querySelector('.footer_contents')
      :null;
    var companyText=footerFrame
      ?footerFrame.querySelector('.footer_text')
      :null;
    var copyright=footerFrame
      ?footerFrame.querySelector('.footer_copyright')
      :null;

    /* 必要な要素がまだなければ50ms後に再確認 */
    if(
      !areaView||
      !footerFrame||
      !footerContents||
      !companyText||
      !copyright
    ){
      hexFooterRetryCount++;

      if(hexFooterRetryCount<hexFooterRetryLimit){
        setTimeout(hexInitFooter,50);
      }

      return;
    }

    /* Copyrightを英語表記へ変更 */
    copyright.textContent=copyright.textContent
      .replace(/^Copyright\s*/, '© ')
      .replace(
        /\s*\|\s*北陸エクステリア株式会社\s*$/,
        ' Hokuriku Exterior Co., Ltd.'
      );

    /* 生成済みなら終了 */
    if(footerContents.querySelector('.hex-footer-area')){
      return;
    }

    footerFrame.classList.add('hex-footer-frame');

    if(!companyText.querySelector('.footer-company-name')){
      var companyName=document.createElement('div');
      companyName.className='footer-company-name';
      companyName.textContent='北陸エクステリア株式会社';
      companyText.prepend(companyName);
    }

    areaView.textContent='';
    areaView.appendChild(hexCreateFooterArea());
    areaView.classList.add('hex-footer-area');
    footerContents.insertBefore(areaView,copyright);

    hexReplaceTikTokSvgs(document);
    hexCreateFooterSns();
    hexCreateHeaderSns();
    hexCreatePageTopButton();

    setTimeout(function(){
      hexReplaceTikTokSvgs(document);
    },500);
  }

  /* 待ち時間なしで最初の処理を実行 */
  hexInitFooter();

});
function hexCreateFooterSns(){
  var footerFrame=document.querySelector('.gc_auto_frame_footer');
  if(!footerFrame)return;
  var footerLogo=footerFrame.querySelector('.footer_logo');
  if(!footerLogo)return;
  if(footerLogo.querySelector('.hex-footer-sns'))return;
  var sns=hexCreateSnsLinks('hex-footer-sns');
  if(!sns)return;
  footerLogo.appendChild(sns);
}
function hexCreateHeaderSns(retryCount){
  retryCount=retryCount||0;

  /* PCヘッダー用 */
  if(!document.querySelector('.hex-header-sns')){
    var headerSns=hexCreateSnsLinks('hex-header-sns');

    if(headerSns){
      document.body.appendChild(headerSns);
    }
  }

  /* スマホハンバーガーメニュー用 */
  var menu=document.querySelector('.bg_menu_button_popup');

  if(!menu){
    if(retryCountCount<20){
      setTimeout(function(){
        hexCreateHeaderSns(retryCount+1);
      },50);
    }

    return;
  }

  if(!menu.querySelector('.hex-menu-sns')){
    var menuSns=hexCreateSnsLinks('hex-menu-sns');

    if(menuSns){
      menu.appendChild(menuSns);
    }
  }
}
function hexCreateSnsLinks(className){
  var source=document.querySelector('.ff_sns');
  if(!source)return null;
  var links=source.querySelectorAll('a');
  if(!links.length)return null;
  var wrap=document.createElement('div');
  wrap.className=className;
  for(var i=0;i<links.length;i++){
    var href=links[i].getAttribute('href')||'';
    if(!href)continue;
    if(href.indexOf('tiktok.com')===-1&&href.indexOf('instagram.com')===-1&&href.indexOf('youtube.com')===-1)continue;
    var a=links[i].cloneNode(true);
    a.removeAttribute('onclick');
    a.setAttribute('target','_blank');
    a.setAttribute('rel','noopener noreferrer');
    if(href.indexOf('tiktok.com')!==-1){
      a.setAttribute('aria-label','TikTok');
      a.removeAttribute('data-hex-tiktok-svg');
      hexReplaceTikTokSvg(a);
    }else if(href.indexOf('instagram.com')!==-1){
      a.setAttribute('aria-label','Instagram');
    }else if(href.indexOf('youtube.com')!==-1){
      a.setAttribute('aria-label','YouTube');
    }
    wrap.appendChild(a);
  }
  if(!wrap.children.length)return null;
  return wrap;
}
function hexReplaceTikTokSvgs(scope){
  var links=scope.querySelectorAll(
    '.bg_menu_button_popup .snsbutton_content a[href*="tiktok.com"],'+
    '.ff_contents .ff_sns a[href*="tiktok.com"],'+
    '.hex-header-sns a[href*="tiktok.com"],'+
    '.hex-menu-sns a[href*="tiktok.com"],'+
    '.hex-footer-sns a[href*="tiktok.com"]'
  );
  for(var i=0;i<links.length;i++){
    hexReplaceTikTokSvg(links[i]);
  }
}
function hexReplaceTikTokSvg(link){
  if(!link)return;
  if(link.getAttribute('data-hex-tiktok-svg')==='1')return;
  var holder=link.querySelector('.bg_svg');
  if(!holder){
    holder=document.createElement('div');
    holder.className='bg_svg';
    link.appendChild(holder);
  }
  while(holder.firstChild){
    holder.removeChild(holder.firstChild);
  }
  holder.appendChild(hexCreateTikTokSvg());
  link.setAttribute('data-hex-tiktok-svg','1');
}
function hexCreateTikTokSvg(){
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  var defs=document.createElementNS(ns,'defs');
  var mask=document.createElementNS(ns,'mask');
  var rect=document.createElementNS(ns,'rect');
  var path=document.createElementNS(ns,'path');
  var circle=document.createElementNS(ns,'circle');
  var maskId='hex-tiktok-cutout-'+Math.random().toString(36).slice(2);
  svg.setAttribute('viewBox','0 0 64 64');
  svg.setAttribute('aria-hidden','true');
  svg.setAttribute('focusable','false');
  mask.setAttribute('id',maskId);
  rect.setAttribute('width','64');
  rect.setAttribute('height','64');
  rect.setAttribute('fill','white');
  path.setAttribute('fill','black');
  path.setAttribute('d','M 33,14 V 29.203124 39 c 0,2.761424 -2.238576,5 -5,5 -2.761424,0 -5,-2.238576 -5,-5 0,-2.761424 2.238576,-5 5,-5 0.335898,1.78e-4 0.670924,0.0342 1,0.10156 V 28.054688 C 28.66767,28.021286 28.33399,28.003038 28,28 c -6.075132,0 -11,4.924868 -11,11 0,6.075132 4.924868,11 11,11 6.075132,0 11,-4.924868 11,-11 V 26.222656 C 41.36824,27.838956 43.91931,29 47,29 V 23.933594 22.625 c -1.612274,9.7e-4 -2.886708,-0.454074 -4.253906,-1.308594 v 0.004 C 40.923764,20.18348 39.575784,18.376927 39,16.253906 L 38.6,14 Z');
  circle.setAttribute('cx','32');
  circle.setAttribute('cy','32');
  circle.setAttribute('r','28');
  circle.setAttribute('fill','currentColor');
  circle.setAttribute('mask','url(#'+maskId+')');
  mask.appendChild(rect);
  mask.appendChild(path);
  defs.appendChild(mask);
  svg.appendChild(defs);
  svg.appendChild(circle);
  return svg;
}
function hexCreatePageTopButton(){
  if(document.querySelector('.hex-page-top'))return;
  var button=document.createElement('a');
  button.className='hex-page-top';
  button.href='#header';
  button.setAttribute('aria-label','ページ上部へ戻る');
  var icon=document.createElement('i');
  icon.className='fa-solid fa-arrow-up';
  icon.setAttribute('aria-hidden','true');
  button.appendChild(icon);
  button.addEventListener('click',function(e){
    e.preventDefault();
    window.scrollTo({
      top:0,
      behavior:'smooth'
    });
  });
  document.body.appendChild(button);
  hexTogglePageTopButton(button);
  window.addEventListener('scroll',function(){
    hexTogglePageTopButton(button);
  });
}
function hexTogglePageTopButton(button){
  var isVisible=(' '+button.className+' ').indexOf(' is-visible ')!==-1;
  if(window.scrollY>300&&!isVisible){
    button.className+=' is-visible';
  }else if(window.scrollY<=300&&isVisible){
    button.className=button.className.replace(/\bis-visible\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
  }
}
function hexCreateFooterArea(){
  var area=document.createElement('div');
  var title=document.createElement('h4');
  var text=document.createElement('div');
  var p1=document.createElement('p');
  var p2=document.createElement('p');
  var p3=document.createElement('p');
  var p4=document.createElement('p');
  area.className='footer-area';
  text.className='footer-area-text';
  title.textContent='工事対応エリア';
  var mark1=document.createElement('span');
  var mark2=document.createElement('span');
  mark1.className='footer-area-mark';
  mark2.className='footer-area-mark';
  p1.appendChild(mark1);
  p1.appendChild(document.createTextNode('石川県全域'));
  p2.appendChild(document.createTextNode('金沢市 / 野々市市 / 白山市 / 津幡町 / 内灘町'));
  p2.appendChild(document.createElement('br'));
  p2.appendChild(document.createTextNode('かほく市 / 能美市 / 川北町 / 小松市 / 加賀市'));
  p2.appendChild(document.createElement('br'));
  p2.appendChild(document.createTextNode('羽咋市 / 宝達志水町 / 志賀町 / 中能登町'));
  p2.appendChild(document.createElement('br'));
  p2.appendChild(document.createTextNode('七尾市 / 穴水町 / 能登町 / 輪島市 / 珠洲市'));
  p3.appendChild(mark2);
  p3.appendChild(
    document.createTextNode('富山県・福井県の一部')
  );
  p4.textContent='(状況によりご相談させていただきます)';
  text.appendChild(p1);
  text.appendChild(p2);
  text.appendChild(p3);
  text.appendChild(p4);
  area.appendChild(title);
  area.appendChild(text);
  return area;
}

/* =======================================
   会社情報ページ レイアウト調整
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var body=document.getElementById('gc_auto_body_company');
    var companyBox=null;
    var bgContents=null;
    var historyBlock=null;
    var accessBlock=null;
    var equipmentBlock=null;
    var licenseBlock=null;
    if(!body)return;
    if(body.classList.contains('hex-company-layout-done'))return;
    companyBox=document.querySelector('.publicinfo_company');
    if(!companyBox)return;
    bgContents=companyBox.querySelector('.bg_contents');
    if(!bgContents)return;
    function replaceTextOnly(el,from,to){
      el.childNodes.forEach(function(node){
        if(node.nodeType===3){
          if(node.textContent.trim()===from){
            node.textContent=to;
          }
        }
      });
    }
    function getTitleText(block){
      var title=block.querySelector('.content_title');
      if(!title)return '';
      return title.textContent.trim();
    }
    function makeSectionTitle(text){
      var title=document.createElement('h2');
      title.className='hex-section-title';
      title.textContent=text;
      return title;
    }
    function makeSection(text,type){
      var section=document.createElement('div');
      var title=makeSectionTitle(text);

      section.className=
        'hex-company-section ' +
        'hex-company-section-'+type+' ' +
        'rsp_spacer4';

      section.appendChild(title);
      bgContents.appendChild(section);

      return section;
    }
    function getTextLines(textBox){
      var lines=[];
      var current='';
      function pushLine(){
        var value=current.trim();
        if(value){
          lines.push(value);
        }
        current='';
      }
      function walk(node){
        if(node.nodeType===3){
          current+=node.textContent;
        }
        if(node.nodeType===1){
          if(node.tagName==='BR'){
            pushLine();
          }else{
            node.childNodes.forEach(function(child){
              walk(child);
            });
            if(node.tagName==='DIV'||node.tagName==='P'){
              pushLine();
            }
          }
        }
      }
      textBox.childNodes.forEach(function(node){
        walk(node);
      });
      pushLine();
      return lines;
    }
    function buildPairLayout(block){
      var textBox=block.querySelector('.content_text');
      var lines=[];
      var pairs=[];
      var grid=document.createElement('div');
      if(!textBox)return;
      lines=getTextLines(textBox);
      lines.forEach(function(line){
        var value=line.trim();
        var last=null;
        if(!value)return;
        if(value==='｜'||value==='|')return;
        if(value.indexOf('｜')!==-1||value.indexOf('|')!==-1){
          var parts=value.split(/[｜|]/);
          if(parts.length>1){
            pairs.push({name:parts[0].trim(),count:parts.slice(1).join('').trim()});
          }
        }else{
          if(pairs.length){
            last=pairs[pairs.length-1];
            if(last.name){
              if(!last.count){
                last.count=value;
              }else{
                pairs.push({name:value,count:''});
              }
            }
          }else{
            pairs.push({name:value,count:''});
          }
        }
      });
      grid.className='hex-company-pair-grid';
      pairs.forEach(function(pair){
        var item=document.createElement('div');
        var name=document.createElement('div');
        var count=document.createElement('div');
        if(!pair.name)return;
        item.className='hex-company-pair-item';
        name.className='hex-company-pair-name';
        count.className='hex-company-pair-count';
        name.textContent=pair.name;
        count.textContent=pair.count;
        item.appendChild(name);
        item.appendChild(count);
        grid.appendChild(item);
      });
      textBox.textContent='';
      textBox.appendChild(grid);
    }
    function getHistoryLines(block){
      var textBox=block.querySelector('.content_text');
      if(!textBox)return [];
      return getTextLines(textBox);
    }
    function makeHistoryRow(line){
      var row=document.createElement('div');
      var title=document.createElement('div');
      var text=document.createElement('div');
      var match=line.match(/^(.+?月)[\s　]+(.+)$/);
      row.className='content textcolor_black bordercolor_black';
      title.className='content_title';
      text.className='content_text';
      if(match){
        title.textContent=match[1];
        text.textContent=match[2];
      }else{
        title.textContent=line;
        text.textContent='';
      }
      row.appendChild(title);
      row.appendChild(text);
      return row;
    }
    companyBox.querySelectorAll('h2.title').forEach(function(title){
      title.classList.add('hex-section-title');
      if(title.textContent.trim()==='会社情報'){
        title.textContent='基本情報';
        if(title.nextElementSibling){
          title.nextElementSibling.classList.add('hex-company-main-first-line');
        }
      }
    });
    companyBox.querySelectorAll('.content_title').forEach(function(title){
      var text=title.textContent.trim();
      if(text==='商号'){
        replaceTextOnly(title,'商号','会社名');
      }
      if(text==='取引先'){
        replaceTextOnly(title,'取引先','役員');
      }
      if(text==='取扱いメーカー'){
        replaceTextOnly(title,'取扱いメーカー','創業・設立');
      }
      if(text==='保険'){
        replaceTextOnly(title,'保険','事業所・資材倉庫');
      }
      if(text==='取引先銀行'){
        replaceTextOnly(title,'取引先銀行','主要取引銀行');
      }
      if(text==='加盟団体'){
        replaceTextOnly(title,'加盟団体','設備');
      }
      if(text==='顧問弁護士'){
        replaceTextOnly(title,'顧問弁護士','資格');
      }
    });
    companyBox.querySelectorAll('.content').forEach(function(block){
      var text=getTitleText(block);
      if(text==='沿革'){
        historyBlock=block;
      }
      if(text==='アクセス'){
        accessBlock=block;
      }
      if(text==='設備'){
        equipmentBlock=block;
      }
      if(text==='資格'){
        licenseBlock=block;
      }
    });
    var order=['会社名','代表者','役員','創業・設立','資本金','従業員数','所在地','事業所・資材倉庫','電話番号','FAX','営業時間','定休日','主要取引銀行','適格事業者登録番号','事業内容','許認可','施工エリア'];
    var mainBlocks=[];
    var firstTitle=companyBox.querySelector('h2.hex-section-title');
    var afterNode=firstTitle;
    order.forEach(function(label){
      companyBox.querySelectorAll('.content').forEach(function(block){
        if(getTitleText(block)===label){
          mainBlocks.push(block);
        }
      });
    });
    if(firstTitle){
      if(mainBlocks.length){
        mainBlocks.forEach(function(block){
          afterNode.parentNode.insertBefore(block,afterNode.nextSibling);
          afterNode=block;
        });
      }
    }
    if(equipmentBlock||licenseBlock){
      var infoSection=makeSection('設備・資格情報','info');
      if(equipmentBlock){
        equipmentBlock.remove();
        buildPairLayout(equipmentBlock);
        infoSection.appendChild(equipmentBlock);
      }
      if(licenseBlock){
        licenseBlock.remove();
        buildPairLayout(licenseBlock);
        infoSection.appendChild(licenseBlock);
      }
    }
    if(historyBlock){
      var historyLines=getHistoryLines(historyBlock);
      var historySection=makeSection('沿革','history');
      historyBlock.remove();
      historyLines.forEach(function(line){
        historySection.appendChild(makeHistoryRow(line));
      });
    }
    if(accessBlock){
      var accessSection=makeSection('アクセス','access');
      accessBlock.remove();
      accessSection.appendChild(accessBlock);
      var oldTitle=accessBlock.querySelector('.content_title');
      if(oldTitle){
        oldTitle.style.display='none';
      }
      var mapLink=accessBlock.querySelector('a');
      if(mapLink){
        var mapWrap=document.createElement('div');
        var titleSpan=document.createElement('span');
        var iconSpan=document.createElement('span');
        var icon=document.createElement('i');
        mapWrap.className='hex-link-wrap hex-company-map-link';
        mapLink.className='hex-link light';
        mapLink.target='_blank';
        mapLink.rel='noopener';
        mapLink.textContent='';
        titleSpan.className='hex-link-title';
        titleSpan.textContent='Googleマップで見る';
        iconSpan.className='hex-link-icon';
        icon.className='fa-solid fa-arrow-up-right-from-square';
        iconSpan.appendChild(icon);
        mapLink.appendChild(titleSpan);
        mapLink.appendChild(iconSpan);
        mapLink.parentNode.insertBefore(mapWrap,mapLink);
        mapWrap.appendChild(mapLink);
      }
    }

    /* 施工エリアの■をライン用spanに置換 */
    companyBox.querySelectorAll('.content').forEach(function(block){
      if(getTitleText(block)!=='施工エリア')return;

      var textBox=block.querySelector('.content_text');
      if(!textBox)return;

      textBox.innerHTML=textBox.innerHTML.replace(
        /■/g,
        '<span class="hex-company-area-mark"></span>'
      );
    });

    body.classList.add('hex-company-layout-done');
  },100);
});

/* =======================================
   スタッフ紹介
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var original=document.querySelector('.bg_publicinfo_staff');
    if(!original)return;
    var frame=original.closest('[id^="gc_auto_frame_staff_"]')||original.parentNode;
    if(!frame)return;
    var staffNodes=Array.prototype.slice.call(original.querySelectorAll('.staff_content'));
    if(staffNodes.length<2)return;
    if(frame.querySelector('.hex-staff-wrap'))return;
    var anchorParam=new URLSearchParams(location.search).get('anchor')||'';
    var sample=staffNodes[0];
    var noImage=getStaffImage(sample);
    if(!noImage)noImage='';
    var groups=[];
    var groupMap={};
    staffNodes.slice(1).forEach(function(staff){
      var data=getStaffData(staff,noImage);
      if(!data.name)return;
      if(!data.department)return;
      if(!groupMap[data.department]){
        groupMap[data.department]={ name:data.department, description:'', members:[] };
        groups.push(groupMap[data.department]);
      }
      if(data.isLeader&&data.departmentDescription&&!groupMap[data.department].description){
        groupMap[data.department].description=data.departmentDescription;
      }
      groupMap[data.department].members.push(data);
    });
    if(!groups.length)return;
    var wrap=document.createElement('div');
    wrap.className='hex-staff-wrap';
    groups.forEach(function(group){
      var section=document.createElement('section');
      section.className='hex-staff-section';
      var heading=document.createElement('div');
      heading.className='hex-section-action hex-staff-section-heading';
      var title=document.createElement('h3');
      title.className='hex-section-action hex-anchor-target';
      title.textContent=group.name;
      heading.appendChild(title);
      if(group.description){
        var desc=document.createElement('h4');
        desc.className='hex-section-smalltitle';
        appendTextWithBreaks(desc,group.description);
        heading.appendChild(desc);
      }
      var leaderGrid=document.createElement('div');
      leaderGrid.className='hex-staff-grid hex-staff-leader-grid';
      var memberGrid=document.createElement('div');
      memberGrid.className='hex-staff-grid hex-staff-member-grid';
      var linkButton=createStaffLinkButton(group);
      var hasLeader=false;
      var groupTotal=String(group.members.length).padStart(2,'0');
      group.members.forEach(function(member,index){
        var currentNumber=String(index+1).padStart(2,'0');
        member.number=currentNumber+' | '+groupTotal;
        var card=createStaffCard(member);
        if(member.isLeader){
          hasLeader=true;
          leaderGrid.appendChild(card);
        }else{
          memberGrid.appendChild(card);
        }
      });
      section.appendChild(heading);
      section.appendChild(linkButton);
      if(hasLeader){
        section.className+=' has-leader';
        section.appendChild(leaderGrid);
      }
      if(memberGrid.children.length){
        section.appendChild(memberGrid);
      }
      wrap.appendChild(section);
    });
    original.insertAdjacentElement('afterend',wrap);
    hexInitStaffCards(wrap);
    hexStaffPostResize();
    if(anchorParam){
      setTimeout(function(){
        var sections=wrap.getElementsByClassName('hex-staff-section');

        for(var i=0;i<sections.length;i++){
          var title=sections[i].querySelector('.hex-anchor-target');
          if(!title)continue;
          if(title.textContent.trim()!==anchorParam)continue;

          var target=sections[i];

          function getOffset(){
            var nav=document.querySelector('.hex-anchor-nav');
            return 80+(nav?nav.offsetHeight:0);
          }

          var top=
            target.getBoundingClientRect().top+
            window.pageYOffset-
            getOffset();

          window.scrollTo({
            top:top,
            behavior:'smooth'
          });

          window.addEventListener('scrollend',function(){
            var correctedTop=
              target.getBoundingClientRect().top+
              window.pageYOffset-
              getOffset();

            if(Math.abs(window.pageYOffset-correctedTop)>2){
              window.scrollTo({
                top:correctedTop,
                behavior:'auto'
              });
            }
          },{once:true});

          break;
        }
      },500);
    }
    setTimeout(hexStaffPostResize,150);
    setTimeout(hexStaffPostResize,400);
  },100);
});
function createStaffLinkButton(group){
  var wrap=document.createElement('div');
  wrap.className='hex-staff-sp-button-wrap';
  var link=document.createElement('a');
  link.href=hexBuildStaffAnchorUrl(group.name);
  link.target='_parent';
  link.appendChild(document.createTextNode('メンバーを見る'));
  var icon=document.createElement('i');
  icon.className='fa-solid fa-arrow-right';
  icon.setAttribute('aria-hidden','true');
  link.appendChild(icon);
  wrap.appendChild(link);
  return wrap;
}
function hexBuildStaffAnchorUrl(anchorName){
  var host=location.hostname;
  var designSetId=hexGetStaffDesignSetId();
  if(host.indexOf('02sample28.hopweb.net')!==-1){
    if(designSetId){
      return '?gc_design_set_ID='+encodeURIComponent(designSetId)+'&shortname=staff&page_type=staff&anchor='+encodeURIComponent(anchorName);
    }
    return '?shortname=staff&page_type=staff&anchor='+encodeURIComponent(anchorName);
  }
  return '/?p=staff&k=staff&anchor='+encodeURIComponent(anchorName);
}
function hexGetStaffDesignSetId(){
  var match=location.href.match(/[?&]gc_design_set_ID=([^&]+)/);
  if(match&&match[1])return decodeURIComponent(match[1]);
  var links=document.getElementsByTagName('a');
  for(var i=0;i<links.length;i++){
    var href=links[i].getAttribute('href')||'';
    if(href.indexOf('gc_design_set_ID=')===-1)continue;
    var m=href.match(/[?&]gc_design_set_ID=([^&]+)/);
    if(m&&m[1])return decodeURIComponent(m[1]);
  }
  return '';
}
function getStaffImage(staff){
  var image='';
  var nodes=staff.querySelectorAll('*');
  Array.prototype.forEach.call(nodes,function(node){
    if(image)return;
    var style=window.getComputedStyle(node);
    if(!style)return;
    if(!style.backgroundImage)return;
    if(style.backgroundImage==='none')return;
    image=style.backgroundImage;
  });
  return image;
}
function getText(root,selector){
  var el=root.querySelector(selector);
  if(!el)return '';
  return el.textContent.replace(/\s+/g,' ').trim();
}
function getContent(root,selector){
  var el=root.querySelector(selector);
  if(!el)return '';
  return getNodeTextWithBreaks(el).replace(/\n\s*\n/g,'\n').trim();
}
function getNodeTextWithBreaks(node){
  var text='';
  var children=node.childNodes;
  for(var i=0;i<children.length;i++){
    var child=children[i];
    if(child.nodeType===3){
      text+=child.nodeValue;
    }else if(child.nodeType===1){
      if(child.tagName&&child.tagName.toLowerCase()==='br'){
        text+='\n';
      }else{
        text+=getNodeTextWithBreaks(child);
      }
    }
  }
  return text;
}
function removeStartLabel(text,label){
  if(!text)return '';
  if(!label)return text.trim();
  if(text.indexOf(label)===0)text=text.substring(label.length);
  return text.replace(/^\s+/,'').trim();
}
function getCleanText(root,selector,label){
  var text=getText(root,selector);
  return removeStartLabel(text,label);
}
function getCleanContent(root,selector,label){
  var text=getContent(root,selector);
  return removeStartLabel(text,label);
}
function splitLeaderStrength(strength,isLeader){
  var result={ departmentDescription:'', personalStrength:strength };
  if(!isLeader||!strength)return result;
  var parts=strength.split('|');
  if(parts.length>1){
    result.departmentDescription=parts[0].trim();
    result.personalStrength=parts.slice(1).join('|').trim();
  }
  return result;
}
function getStaffData(staff,noImage){
  var name=getText(staff,'.contents_staff_name');
  var rawDepartment=getText(staff,'.contents_staff_department');
  var strength=getCleanContent(staff,'.contents_staff_post','役割・資格');
  var joined=getCleanText(staff,'.contents_staff_hobby','趣味・特技');
  var license=getContent(staff,'.contents_staff_message');
  var parts=rawDepartment.split('|').map(function(v){ return v.trim(); });
  var department=parts[0]||'';
  var position=parts[1]||'';
  var attribute=parts[2]||'';
  var leader=parts[3]||'';
  var isLeader=leader==='代表';
  var leaderStrength=splitLeaderStrength(strength,isLeader);
  var ownImage=getStaffImage(staff);
  var image=ownImage;
  var isNoImage=false;
  if(!image){
    image=noImage;
    isNoImage=true;
  }
  return {
    name:name,
    department:department,
    position:position,
    attribute:attribute,
    isLeader:isLeader,
    departmentDescription:leaderStrength.departmentDescription,
    strength:leaderStrength.personalStrength,
    joined:joined,
    license:license,
    image:image,
    isNoImage:isNoImage
  };
}
function createStaffCard(data){
  var card=document.createElement('article');
  card.className=data.isLeader?'hex-staff-card is-leader':'hex-staff-card';
  if(data.isNoImage)card.className+=' is-noimage';
  var number=document.createElement('span');
  number.className='hex-staff-number';
  var parts=(data.number||'').split('|');
  var current=document.createElement('span');
  current.className='hex-staff-number-current';
  current.textContent=(parts[0]||'').trim();
  var separator=document.createElement('span');
  separator.className='hex-staff-number-separator';
  separator.textContent=' | ';
  var total=document.createElement('span');
  total.className='hex-staff-number-total';
  total.textContent=(parts[1]||'').trim();
  number.appendChild(current);
  number.appendChild(separator);
  number.appendChild(total);
  var photo=document.createElement('div');
  photo.className='hex-staff-photo';
  if(data.image)photo.style.backgroundImage=data.image;
  var body=document.createElement('div');
  body.className='hex-staff-body';
  var deptTag=document.createElement('p');
  deptTag.className='hex-staff-dept-tag';
  deptTag.textContent='['+data.department+']';
  var head=document.createElement('div');
  head.className='hex-staff-head';
  var name=document.createElement('div');
  name.className='hex-staff-name';
  var roleText=createRoleText(data.position,data.attribute);
  name.textContent=roleText?data.name+' ['+roleText+']':data.name;
  var toggle=document.createElement('button');
  toggle.className='hex-staff-toggle';
  toggle.type='button';
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','詳細を開く');
  var icon=document.createElement('i');
  icon.className='fa-solid fa-chevron-down';
  icon.setAttribute('aria-hidden','true');
  toggle.appendChild(icon);
  head.appendChild(name);
  head.appendChild(toggle);
  var joined=document.createElement('p');
  joined.className='hex-staff-joined';
  joined.textContent=data.joined;
  body.appendChild(deptTag);
  body.appendChild(head);
  if(data.joined)body.appendChild(joined);
  if(data.strength||data.license){
    var detail=document.createElement('div');
    detail.className='hex-staff-detail';
    if(data.strength)detail.appendChild(createSimpleTextBlock(data.strength));
    if(data.strength&&data.license)detail.appendChild(createDivider());
    if(data.license)detail.appendChild(createSimpleTextBlock(data.license));
    body.appendChild(detail);
  }
  card.appendChild(number);
  card.appendChild(photo);
  card.appendChild(body);
  return card;
}
function createRoleText(position,attribute){
  var arr=[];
  if(position)arr.push(position);
  if(attribute)arr.push(attribute);
  return arr.join('・');
}
function createDivider(){
  var divider=document.createElement('div');
  divider.className='hex-staff-divider';
  return divider;
}
function createSimpleTextBlock(bodyText){
  var block=document.createElement('div');
  block.className='hex-staff-detail-block';
  var text=document.createElement('p');
  text.className='hex-staff-detail-text';
  appendTextWithBreaks(text,bodyText);
  block.appendChild(text);
  return block;
}
function appendTextWithBreaks(el,text){
  var lines=String(text).split(/\n/);
  for(var i=0;i<lines.length;i++){
    if(i>0)el.appendChild(document.createElement('br'));
    el.appendChild(document.createTextNode(lines[i]));
  }
}
function hexOpenStaffDetail(card){
  var details=card.getElementsByClassName('hex-staff-detail');
  for(var i=0;i<details.length;i++){
    details[i].style.maxHeight='none';
    var height=details[i].scrollHeight;
    details[i].style.maxHeight='0px';
    details[i].offsetHeight;
    details[i].style.maxHeight=(height+60)+'px';
  }
}
function hexCloseStaffDetail(card){
  var details=card.getElementsByClassName('hex-staff-detail');
  for(var i=0;i<details.length;i++){
    details[i].style.maxHeight='0px';
  }
}
function hexInitStaffCards(scope){
  hexResetStaffToggle(scope);
  hexInitStaffToggle(scope);
}
function hexResetStaffToggle(scope){
  var cards=scope.getElementsByClassName('hex-staff-card');
  var isSp=window.innerWidth<=768;
  for(var i=0;i<cards.length;i++){
    cards[i].className=cards[i].className.replace(/\bis-open\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
    if(!isSp){
      cards[i].className+=' is-open';
      hexOpenStaffDetail(cards[i]);
    }else{
      hexCloseStaffDetail(cards[i]);
    }
    var toggle=cards[i].getElementsByClassName('hex-staff-toggle')[0];
    if(toggle){
      if(!isSp){
        toggle.setAttribute('aria-expanded','true');
        toggle.setAttribute('aria-label','詳細を閉じる');
      }else{
        toggle.setAttribute('aria-expanded','false');
        toggle.setAttribute('aria-label','詳細を開く');
      }
    }
  }
  hexStaffPostResize();
}
function hexInitStaffToggle(scope){
  var buttons=scope.getElementsByClassName('hex-staff-toggle');
  for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=function(){
      if(window.innerWidth>768)return;
      var card=hexClosestByClass(this,'hex-staff-card');
      if(!card)return;
      var isOpen=(' '+card.className+' ').indexOf(' is-open ')!==-1;
      if(isOpen){
        card.className=card.className.replace(/\bis-open\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
        this.setAttribute('aria-expanded','false');
        this.setAttribute('aria-label','詳細を開く');
        hexCloseStaffDetail(card);
      }else{
        card.className=card.className+' is-open';
        this.setAttribute('aria-expanded','true');
        this.setAttribute('aria-label','詳細を閉じる');
        hexOpenStaffDetail(card);
      }
      hexStaffPostResize();
      setTimeout(hexStaffPostResize,50);
      setTimeout(hexStaffPostResize,200);
    };
  }
}
function hexStaffPostResize(){
  try{
    var wrap=document.getElementsByClassName('hex-staff-wrap')[0];
    if(!wrap)return;
    var height=Math.max(wrap.scrollHeight,wrap.offsetHeight,document.body.scrollHeight,document.documentElement.scrollHeight);
    if(window.parent&&window.parent!==window){
      window.parent.postMessage({ type:'hexStaffResize', height:height },'*');
    }
  }catch(e){}
}
function hexClosestByClass(el,className){
  while(el&&el.nodeType===1){
    if((' '+el.className+' ').indexOf(' '+className+' ')!==-1)return el;
    el=el.parentNode;
  }
  return null;
}
var hexStaffWindowWidth=window.innerWidth;
window.addEventListener('resize',function(){
  if(window.innerWidth===hexStaffWindowWidth)return;
  hexStaffWindowWidth=window.innerWidth;
  var wraps=document.getElementsByClassName('hex-staff-wrap');
  for(var i=0;i<wraps.length;i++){
    hexResetStaffToggle(wraps[i]);
  }
});

/* =======================================
   私たちについて スタッフ紹介読込
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var target=document.getElementById('hex-staff-area');
    if(!target)return;
    var staffShortname='staff';
    var staffPageType='staff';
    var staffUrl=hexBuildStaffPageUrl(staffShortname,staffPageType);
    if(!staffUrl)return;
    while(target.firstChild){
      target.removeChild(target.firstChild);
    }
    var iframe=document.createElement('iframe');
    iframe.className='hex-staff-iframe';
    iframe.src=staffUrl;
    iframe.setAttribute('loading','eager');
    iframe.setAttribute('scrolling','no');
    iframe.style.width='100%';
    iframe.style.height='1px';
    iframe.style.border='0';
    iframe.style.overflow='hidden';
    iframe.dataset.hexStaffIframe='1';
    iframe.addEventListener('load',function(){
      hexPrepareStaffIframe(iframe);
    });
    target.appendChild(iframe);
  },100);
});
function hexPrepareStaffIframe(iframe){
  var count=0;
  var max=50;
  var timer=setInterval(function(){
    count++;
    try{
      var doc=iframe.contentDocument||iframe.contentWindow.document;
      if(!doc)return;
      var staff=doc.querySelector('.hex-staff-wrap');
      if(staff){
        doc.body.classList.add('hex-staff-iframe-mode');
        
        clearInterval(timer);
        setTimeout(function(){
          while(doc.body.firstChild){
            doc.body.removeChild(doc.body.firstChild);
          }
          doc.body.appendChild(staff);
          hexAdjustStaffIframeView(doc);
          doc.documentElement.style.margin='0';
          doc.documentElement.style.padding='0';
          doc.documentElement.style.overflow='hidden';
          doc.body.style.margin='0';
          doc.body.style.padding='0';
          doc.body.style.overflow='hidden';
          hexResizeStaffIframe(iframe);
          setTimeout(function(){ hexResizeStaffIframe(iframe); },150);
          setTimeout(function(){ hexResizeStaffIframe(iframe); },400);
          hexBindStaffIframeResize(iframe);
        },100);
        return;
      }
      if(count>=max){
        clearInterval(timer);
      }
    }catch(e){
      clearInterval(timer);
    }
  },100);
}
function hexAdjustStaffIframeView(doc){
  var sections=doc.getElementsByClassName('hex-staff-section');
  for(var i=0;i<sections.length;i++){
    var section=sections[i];
    var button=section.getElementsByClassName('hex-staff-sp-button-wrap')[0];
    var heading=section.getElementsByClassName('hex-staff-section-heading')[0];
    var leader=section.querySelector('.hex-staff-card.is-leader');

    if(button&&heading){
      var link=button.getElementsByTagName('a')[0];
      if(link&&!heading.getElementsByTagName('a')[0]){
        heading.insertBefore(link,heading.children[1]||null);
      }
      if(button.parentNode){
        button.parentNode.removeChild(button);
      }
    }

    if(!leader)continue;

    var head=leader.getElementsByClassName('hex-staff-head')[0];
    var joined=leader.getElementsByClassName('hex-staff-joined')[0];

    if(!head)continue;

    if(joined&&joined.parentNode!==head){
      head.appendChild(joined);
    }
  }
}
function hexBindStaffIframeResize(iframe){
  try{
    var doc=iframe.contentDocument||iframe.contentWindow.document;
    if(!doc)return;
    if(iframe.hexStaffResizeBound)return;
    iframe.hexStaffResizeBound=true;
    doc.addEventListener('click',function(){
      setTimeout(function(){ hexResizeStaffIframe(iframe); },50);
      setTimeout(function(){ hexResizeStaffIframe(iframe); },200);
      setTimeout(function(){ hexResizeStaffIframe(iframe); },400);
    },true);
    if(window.ResizeObserver){
      var staff=doc.querySelector('.hex-staff-wrap');
      var observer=new ResizeObserver(function(){
        hexResizeStaffIframe(iframe);
      });
      if(staff)observer.observe(staff);
      observer.observe(doc.body);
      iframe.hexStaffResizeObserver=observer;
    }else{
      iframe.hexStaffResizeTimer=setInterval(function(){
        hexResizeStaffIframe(iframe);
      },500);
    }
  }catch(e){}
}
function hexResizeStaffIframe(iframe){
  try{
    var doc=iframe.contentDocument||iframe.contentWindow.document;
    if(!doc)return;
    var staff=doc.querySelector('.hex-staff-wrap');
    var height=0;
    if(staff){
      height=Math.max(staff.scrollHeight,staff.offsetHeight);
    }else{
      height=Math.max(
        doc.body.scrollHeight,
        doc.documentElement.scrollHeight,
        doc.body.offsetHeight,
        doc.documentElement.offsetHeight
      );
    }
    if(height>0){
      var newHeight=height+4;
      var oldHeight=parseFloat(iframe.style.height)||0;
      if(height>0){
        iframe.style.height=(height+4)+'px';
      }
    }
  }catch(e){}
}
function hexBuildStaffPageUrl(shortname,pageType){
  var host=location.hostname;
  var designSetId=hexGetDesignSetId();
  if(host.indexOf('02sample28.hopweb.net')!==-1){
    if(!designSetId)return '';
    return '/addon/gartencloud/ajax_gethtml_site_from_db.php?gc_design_set_ID='+encodeURIComponent(designSetId)+'&shortname='+encodeURIComponent(shortname)+'&page_type='+encodeURIComponent(pageType);
  }
  return '/?p='+encodeURIComponent(shortname)+'&k='+encodeURIComponent(pageType);
}
function hexGetDesignSetId(){
  var match=location.href.match(/[?&]gc_design_set_ID=([^&]+)/);
  if(match&&match[1])return decodeURIComponent(match[1]);
  var links=document.getElementsByTagName('a');
  for(var i=0;i<links.length;i++){
    var href=links[i].getAttribute('href')||'';
    if(href.indexOf('gc_design_set_ID=')===-1)continue;
    var m=href.match(/[?&]gc_design_set_ID=([^&]+)/);
    if(m&&m[1])return decodeURIComponent(m[1]);
  }
  return '';
}

/* =======================================
   商品検索
======================================= */
hexReady(function(){
  var input=document.getElementById('hex-product-search-input');
  var button=document.getElementById('hex-product-search-button');
  if(!input||!button)return;

  function searchProduct(){
    var keyword=input.value.trim();
    if(!keyword)return;

    window.open(
      'https://kenzai-search.jp/products/search?q='+encodeURIComponent(keyword),
      '_blank',
      'noopener'
    );
  }

  button.addEventListener('click',searchProduct);

  input.addEventListener('keydown',function(e){
    if(e.key==='Enter'){
      e.preventDefault();
      searchProduct();
    }
  });
});

/* =======================================
   施工事例一覧
======================================= */
hexReady(function(){
  var params=new URLSearchParams(window.location.search);

  /* 本番はp・k、開発環境はshortname・page_type */
  var shortname=params.get('p')||params.get('shortname')||'';
  var pageType=params.get('k')||params.get('page_type')||'';

  /* 施工事例の一覧ページだけ実行 */
  if(shortname!=='work'||pageType!=='work')return;

  var fiveColumnQuery=window.matchMedia('(min-width:1600px)');

  fiveColumnQuery.addEventListener('change',function(){
    window.location.reload();
  });

  /* 1600px未満では何も変更しない */
  if(!fiveColumnQuery.matches)return;

  var root=document.querySelector('#gc_auto_frame_work_3');
  if(!root||root.dataset.hexWork25==='done')return;

  root.dataset.hexWork25='done';

  /* 組み替えが終わるまで一覧を隠す */
  root.classList.add('hex-work-loading');

  var CARD_SELECTOR=
    '.gc_auto_frame_post_index_box_contents_cell_tile';

  var LIST_SELECTOR='.post_index_contents';
  var PAGER_SELECTOR='.bg_page_button';

  var ORIGINAL_LIMIT=24;
  var DISPLAY_LIMIT=25;

  var currentUrl=new URL(window.location.href);
  var currentPage=parseInt(
    currentUrl.searchParams.get('page_no')||'1',
    10
  );

  if(!Number.isFinite(currentPage)||currentPage<1){
    currentPage=1;
  }

  var documentCache=new Map();
  documentCache.set(currentPage,document);

  function getPageNumberFromOnclick(value){
    var match=String(value||'').match(
      /gc_click_page_jump_page_no\([^)]*['"](\d+)['"]\s*\)/
    );

    return match?parseInt(match[1],10):null;
  }

  function getOriginalLastPage(doc){
    var numbers=[1];

    doc.querySelectorAll(
      PAGER_SELECTOR+' [onclick*="gc_click_page_jump_page_no"]'
    ).forEach(function(button){
      var number=getPageNumberFromOnclick(
        button.getAttribute('onclick')
      );

      if(number)numbers.push(number);
    });

    return Math.max.apply(null,numbers);
  }

  function getCards(doc){
    var workRoot=doc.querySelector('#gc_auto_frame_work_3');

    if(!workRoot)return [];

    return Array.from(
      workRoot.querySelectorAll(CARD_SELECTOR)
    );
  }

  function createPageUrl(page){
    var url=new URL(window.location.href);
    url.searchParams.set('page_no',String(page));
    return url;
  }

  function fetchPage(page){
    if(documentCache.has(page)){
      return Promise.resolve(documentCache.get(page));
    }

    return fetch(createPageUrl(page).href,{
      credentials:'same-origin'
    })
    .then(function(response){
      if(!response.ok){
        throw new Error(
          '施工事例ページの取得に失敗しました：'+page
        );
      }

      return response.text();
    })
    .then(function(html){
      var doc=new DOMParser().parseFromString(
        html,
        'text/html'
      );

      documentCache.set(page,doc);
      return doc;
    });
  }

  function goToPage(page){
    window.location.href=createPageUrl(page).href;
  }

  function createPagerButton(options){
    var button=document.createElement('div');
    button.className='page_button';

    if(options.current){
      button.classList.add('pagenow');
    }

    if(options.className){
      button.classList.add(options.className);
    }

    button.innerHTML=options.html;

    if(!options.current&&options.page){
      button.addEventListener('click',function(){
        goToPage(options.page);
      });
    }

    return button;
  }

  function getPagerNumbers(current,total){
    if(total<=7){
      return Array.from(
        {length:total},
        function(_,index){
          return index+1;
        }
      );
    }

    var numbers=[
      1,
      current-1,
      current,
      current+1,
      total
    ]
    .filter(function(number){
      return number>=1&&number<=total;
    })
    .filter(function(number,index,array){
      return array.indexOf(number)===index;
    })
    .sort(function(a,b){
      return a-b;
    });

    var result=[];

    numbers.forEach(function(number,index){
      if(index>0&&number-numbers[index-1]>1){
        result.push('…');
      }

      result.push(number);
    });

    return result;
  }

  function rebuildPager(totalPages){
    var pager=root.querySelector(PAGER_SELECTOR);
    if(!pager)return;

    pager.innerHTML='';

    if(totalPages<=1){
      pager.style.display='none';
      return;
    }

    pager.style.display='';

    if(currentPage>1){
      pager.appendChild(
        createPagerButton({
          page:currentPage-1,
          className:'hex-pager-prev',
          html:
            '<i class="fa-solid fa-arrow-left"></i>'+
            '<span>前へ</span>'
        })
      );
    }

    getPagerNumbers(currentPage,totalPages)
    .forEach(function(number){
      if(number==='…'){
        pager.appendChild(
          createPagerButton({
            className:'omission_button',
            html:'…'
          })
        );
        return;
      }

      pager.appendChild(
        createPagerButton({
          page:number,
          current:number===currentPage,
          html:String(number)
        })
      );
    });

    if(currentPage<totalPages){
      pager.appendChild(
        createPagerButton({
          page:currentPage+1,
          className:'hex-pager-next',
          html:
            '<span>次へ</span>'+
            '<i class="fa-solid fa-arrow-right"></i>'
        })
      );
    }
  }

  var originalLastPage=getOriginalLastPage(document);

  var startIndex=
    (currentPage-1)*DISPLAY_LIMIT;

  var firstOriginalPage=
    Math.floor(startIndex/ORIGINAL_LIMIT)+1;

  var firstOffset=
    startIndex%ORIGINAL_LIMIT;

  /*
  * 25件を表示するために必要な
  * 元ページの範囲を先に計算
  */
  var provisionalLastIndex=
    startIndex+DISPLAY_LIMIT;

  var lastOriginalPage=Math.min(
    Math.floor((provisionalLastIndex-1)/ORIGINAL_LIMIT)+1,
    originalLastPage
  );

  var requiredPages=[];

  for(
    var page=firstOriginalPage;
    page<=lastOriginalPage;
    page++
  ){
    requiredPages.push(page);
  }

  /*
  * 必要ページと最終ページを同時に取得開始
  */
  var cardsPromise=Promise.all(
    requiredPages.map(function(page){
      return fetchPage(page);
    })
  );

  var lastPagePromise=fetchPage(originalLastPage);

  /*
  * 25件分が揃った時点で一覧を表示
  * 最終ページの取得完了は待たない
  */
  cardsPromise
  .then(function(documents){
    var collectedCards=[];

    documents.forEach(function(doc){
      collectedCards=collectedCards.concat(
        getCards(doc)
      );
    });

    var displayCards=collectedCards.slice(
      firstOffset,
      firstOffset+DISPLAY_LIMIT
    );

    var list=root.querySelector(LIST_SELECTOR);
    var pager=root.querySelector(PAGER_SELECTOR);

    if(!list||!pager){
      root.classList.remove('hex-work-loading');
      return;
    }

    Array.from(
      list.querySelectorAll(':scope > '+CARD_SELECTOR)
    ).forEach(function(card){
      card.remove();
    });

    displayCards.forEach(function(card){
      list.insertBefore(
        document.importNode(card,true),
        pager
      );
    });

    /*
    * カードが揃ったらすぐ表示
    */
    root.classList.remove('hex-work-loading');
  })
  .catch(function(error){
    root.classList.remove('hex-work-loading');
    console.error(error);
  });

  /*
  * 最終件数が分かり次第ページャーを再構築
  */
  lastPagePromise
  .then(function(lastDocument){
    var lastPageCount=getCards(lastDocument).length;

    var totalItems=
      (originalLastPage-1)*ORIGINAL_LIMIT+
      lastPageCount;

    var totalDisplayPages=Math.ceil(
      totalItems/DISPLAY_LIMIT
    );

    if(currentPage>totalDisplayPages){
      goToPage(Math.max(totalDisplayPages,1));
      return;
    }

    rebuildPager(totalDisplayPages);
  })
  .catch(function(error){
    /*
    * ページャーはCMS標準の状態を維持
    */
    console.error(error);
  });
});

/* =======================================
   お問い合わせ
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var form=document.getElementById('form_lp_form');
    if(!form)return;

    var titleInput=form.querySelector('input[name="form_lp_title"]');
    var pageTitle=titleInput?titleInput.value:'';
    var validationStarted=false;
    var dialogLocked=false;
    var dialogScrollY=0;
    var dialogObserver=null;
    var dialogObserveTimer=null;
    var dialogCustomizeTimer=null;
    var dialogUnlocking=false;

    function isContactPage(){
      return (
        pageTitle.indexOf('お問い合わせ')!==-1||
        pageTitle.indexOf('お問合わせ')!==-1
      );
    }

    function getLabelText(label){
      if(!label)return'';
      return label.textContent.replace(/\s+/g,'').trim();
    }

    function getDisplayLabel(label){
      label=(label||'').replace(/\s+/g,'').replace('：','').replace(':','').replace('必須','').replace('任意','').trim();
      if(label==='氏名')return'お名前';
      if(label==='ふりがな')return'フリガナ';
      if(label==='〒')return'郵便番号';
      if(label==='建物等')return'建物名・部屋番号';
      if(label==='TEL')return'電話番号';
      if(label==='Eメール')return'メールアドレス';
      return label;
    }

    function isRequiredRow(row){
      if(!row||row.classList.contains('is-hidden'))return false;

      var label=row.getAttribute('data-label')||'';

      if(
        label.indexOf('ハウスメーカー')!==-1||
        label.indexOf('ご紹介者名')!==-1
      ){
        return true;
      }

      if(label.indexOf('必須')!==-1){
        return true;
      }

      var need=row.querySelector('input[type="hidden"][name*="_need"]');
      return need&&need.value==='1';
    }

    function applyFormLabelsAndPlaceholders(){
      var rows=form.querySelectorAll('.hex-form-row');
      rows.forEach(function(row){
        var label=row.getAttribute('data-label')||'';
        var displayLabel=getDisplayLabel(label);
        var labelEl=row.querySelector('.gc_form_lp_label');
        var field=row.querySelector('input:not([type="hidden"]),textarea');

        if(labelEl){
          var oldNeed=labelEl.querySelector('.gc_form_lp_label_need');
          if(oldNeed){
            oldNeed.remove();
          }

          var oldBadge=labelEl.querySelector('.hex-form-badge');
          if(oldBadge){
            oldBadge.remove();
          }

          var oldText=labelEl.querySelector('.hex-form-label-text');
          if(oldText){
            oldText.remove();
          }

          Array.prototype.slice.call(labelEl.childNodes).forEach(function(node){
            if(node.nodeType===3){
              node.remove();
            }
          });

          var required=isRequiredRow(row);

          var badge=document.createElement('span');
          badge.className=required?'hex-form-badge is-required':'hex-form-badge is-optional';
          badge.textContent=required?'必須':'任意';

          var text=document.createElement('span');
          text.className='hex-form-label-text';
          text.textContent=displayLabel;

          labelEl.appendChild(badge);
          labelEl.appendChild(text);
        }

        if(!field)return;

        if(label.indexOf('会社名')>-1){
          field.setAttribute('placeholder','法人の方のみご記入ください。');
        }

        if(label.indexOf('氏名')>-1){
          field.setAttribute('placeholder','山田　太郎');
        }

        if(label.indexOf('ふりがな')>-1){
          field.setAttribute('placeholder','ヤマダ　タロウ');
        }

        if(label.indexOf('〒')>-1){
          field.setAttribute('placeholder','123-4567');
        }

        if(label.indexOf('TEL')>-1){
          field.setAttribute('placeholder','090-1234-5678');
        }

        if(label.indexOf('Eメール')>-1){
          field.setAttribute('placeholder','sample@example.com');
        }

        if(label.indexOf('ハウスメーカー')>-1){
          field.setAttribute('placeholder','分からない場合は不明とご記入ください。');
        }

        if(label.indexOf('施工先住所')>-1){
          field.setAttribute('placeholder','現住所と異なる場合のみご記入ください。');
        }

        if(label.indexOf('新築引渡し予定時期')>-1){
          field.setAttribute('placeholder','例）2020年3月頃');
        }

        if(label.indexOf('ご紹介者名')>-1){
          field.setAttribute('placeholder','例）◯◯ホーム　山田様');
        }
      });
    }

    function wrapRows(){
      var children=Array.prototype.slice.call(form.children);
      children.forEach(function(el){
        if(!el.classList||!el.classList.contains('gc_form_lp_label'))return;
        if(el.parentNode.classList&&el.parentNode.classList.contains('hex-form-row'))return;
        var data=el.nextElementSibling;
        if(!data||!data.classList||!data.classList.contains('gc_form_lp_data'))return;
        var row=document.createElement('div');
        row.className='hex-form-row';
        row.setAttribute('data-label',getLabelText(el));
        form.insertBefore(row,el);
        row.appendChild(el);
        row.appendChild(data);
      });
    }

    function findRow(keyword){
      var rows=form.querySelectorAll('.hex-form-row');
      for(var i=0;i<rows.length;i++){
        var label=rows[i].getAttribute('data-label')||'';
        if(label.indexOf(keyword)!==-1)return rows[i];
      }
      return null;
    }

    function setRowVisible(row,visible){
      if(!row)return;
      row.classList.toggle('is-hidden',!visible);
      if(!visible)row.classList.remove('is-required-empty');
    }

    function getCheckedValue(row){
      if(!row)return'';
      var checked=row.querySelector('input[type="radio"]:checked');
      return checked?checked.value:'';
    }

    function setupRequirementSwitch(){
      if(!isContactPage())return;
      var requirementRow=findRow('ご要件');
      var houseMakerRow=findRow('ハウスメーカー');
      var yearsRow=findRow('入居年数');
      var addressRow=findRow('施工先住所');
      var deliveryRow=findRow('新築引渡し予定時期')||findRow('新築引渡し予定日');
      var drawingRow=findRow('図面');

      function update(){
        var value=getCheckedValue(requirementRow);
        var isNew=value.indexOf('新築')!==-1;
        var isReform=value.indexOf('部分')!==-1||value.indexOf('リフォーム')!==-1||value.indexOf('単体')!==-1;
        setRowVisible(houseMakerRow,isNew||isReform);
        setRowVisible(yearsRow,isNew||isReform);
        setRowVisible(addressRow,isNew||isReform);
        setRowVisible(drawingRow,isNew||isReform);
        setRowVisible(deliveryRow,isNew);
        updateRequiredEmptyState();
        applyFormLabelsAndPlaceholders();
      }

      if(requirementRow){
        var radios=requirementRow.querySelectorAll('input[type="radio"]');
        radios.forEach(function(radio){
          radio.addEventListener('change',update);
        });
      }
      update();
    }

    function setupReferralSwitch(){
      if(!isContactPage())return;
      var sourceRow=findRow('当社を知ったきっかけ');
      var nameRow=findRow('ご紹介');
      if(!sourceRow||!nameRow)return;

      function update(){
        var show=false;
        var checks=sourceRow.querySelectorAll('input[type="checkbox"]');
        checks.forEach(function(check){
          if(!check.checked)return;
          var label=check.parentNode?check.parentNode.textContent.replace(/\s+/g,'').trim():'';
          if(label.indexOf('ハウスメーカー')!==-1||label.indexOf('知人')!==-1||label.indexOf('友人')!==-1)show=true;
        });
        setRowVisible(nameRow,show);
        updateRequiredEmptyState();
        applyFormLabelsAndPlaceholders();
      }

      var checks=sourceRow.querySelectorAll('input[type="checkbox"]');
      checks.forEach(function(check){
        check.addEventListener('change',update);
      });
      update();
    }

    function setupHouseMakerNote(){
      var row=findRow('ハウスメーカー');
      if(!row)return;

      if(row.querySelector('.hex-housemaker-note'))return;

      var data=row.querySelector('.gc_form_lp_data');
      if(!data)return;

      var note=document.createElement('div');
      note.className='hex-housemaker-note';
      note.textContent='※ 弊社お取引先との関係上、場合によっては直接お請けできないことがあるため、ご記入をお願いいたします。';

      data.appendChild(note);
    }

    function setupFormNotice(){
      var row=findRow('確認事項');
      if(!row)return;

      if(row.querySelector('.hex-form-notice'))return;

      var data=row.querySelector('.gc_form_lp_data');
      if(!data)return;

      var notice=document.createElement('div');
      notice.className='hex-form-notice';

      notice.innerHTML=
        '<p>・内容によりご回答までお時間をいただく場合があります。</p>'+
        '<p>・必要に応じてお電話でご連絡させていただく場合があります。</p>';

      data.insertBefore(notice,data.firstChild);
    }

    function setupFileInputClickArea(){
      var files=form.querySelectorAll('.hex-form-row[data-label*="添付ファイル"] input[type="file"]');
      files.forEach(function(file){
        file.addEventListener('click',function(e){
          var rect=file.getBoundingClientRect();
          var x=e.clientX-rect.left;
          if(x>130){
            e.preventDefault();
            e.stopPropagation();
            if(e.stopImmediatePropagation)e.stopImmediatePropagation();
          }
        },true);
      });
    }

    function isRowEmpty(row){
      var data=row.querySelector('.gc_form_lp_data');
      if(!data)return false;

      var radios=data.querySelectorAll('input[type="radio"]:not(:disabled)');
      if(radios.length){
        for(var i=0;i<radios.length;i++){
          if(radios[i].checked)return false;
        }
        return true;
      }

      var checks=data.querySelectorAll('input[type="checkbox"]:not(:disabled)');
      if(checks.length){
        for(var j=0;j<checks.length;j++){
          if(checks[j].checked)return false;
        }
        return true;
      }

      var fields=data.querySelectorAll('input:not([type="hidden"]):not(:disabled),select:not(:disabled),textarea:not(:disabled)');
      for(var k=0;k<fields.length;k++){
        if((fields[k].value||'').trim()!=='')return false;
      }
      return true;
    }

    function getRequiredErrors(){
      var errors=[];
      var rows=form.querySelectorAll('.hex-form-row');
      rows.forEach(function(row){
        if(!isRequiredRow(row))return;
        if(!isRowEmpty(row))return;
        var label=row.getAttribute('data-label')||'';
        label=getDisplayLabel(label);
        errors.push({label:label,row:row});
      });
      return errors;
    }

    function updateRequiredEmptyState(){
      if(!validationStarted)return;
      var rows=form.querySelectorAll('.hex-form-row');
      rows.forEach(function(row){
        if(!isRequiredRow(row)){
          row.classList.remove('is-required-empty');
          return;
        }
        row.classList.toggle('is-required-empty',isRowEmpty(row));
      });
    }

    function setupRequiredEmptyState(){
      var rows=form.querySelectorAll('.hex-form-row');
      rows.forEach(function(row){
        var fields=row.querySelectorAll('input,select,textarea');
        fields.forEach(function(field){
          field.addEventListener('input',updateRequiredEmptyState);
          field.addEventListener('change',updateRequiredEmptyState);
        });
      });
    }

    function isDialogVisible(){
      var dialog=document.getElementById('gc_auto_frame_lp_form_dialog');
      var box=document.getElementById('gc_auto_frame_lp_form_dialog_box');
      if(!dialog||!box)return false;
      if(getComputedStyle(dialog).display==='none'||getComputedStyle(box).display==='none')return false;
      return !!box.querySelector('.gc_dialog_lp_form_line');
    }

    function lockDialogView(){
      if(dialogLocked||dialogUnlocking)return;
      if(!isDialogVisible())return;
      dialogLocked=true;
      dialogScrollY=window.pageYOffset||document.documentElement.scrollTop||0;
      document.body.classList.add('hex-form-dialog-open');
      document.body.style.position='fixed';
      document.body.style.top='-'+dialogScrollY+'px';
      document.body.style.left='0';
      document.body.style.right='0';
      document.body.style.width='100%';
    }

    function stopDialogWatch(){
      clearTimeout(dialogCustomizeTimer);
      clearTimeout(dialogObserveTimer);
      if(dialogObserver){
        dialogObserver.disconnect();
        dialogObserver=null;
      }
    }

    function unlockDialogView(){
      var scrollY=dialogScrollY||0;
      dialogLocked=false;
      dialogUnlocking=true;
      stopDialogWatch();
      var dialog=document.getElementById('gc_auto_frame_lp_form_dialog');
      if(dialog){
        dialog.classList.remove('hex-dialog-visible');
      }
      document.body.classList.remove('hex-form-dialog-open');
      document.body.style.position='';
      document.body.style.top='';
      document.body.style.left='';
      document.body.style.right='';
      document.body.style.width='';
      document.body.style.overflow='';
      window.scrollTo(0,scrollY);
      setTimeout(function(){
        document.body.classList.remove('hex-form-dialog-open');
        document.body.style.position='';
        document.body.style.top='';
        document.body.style.left='';
        document.body.style.right='';
        document.body.style.width='';
        document.body.style.overflow='';
      },300);
      setTimeout(function(){
        dialogUnlocking=false;
      },1000);
    }

    function normalizeDialogLines(box){
      var lines=box.querySelectorAll('.gc_dialog_lp_form_line');
      lines.forEach(function(line){
        var label=line.querySelector('.gc_dialog_lp_form_label');
        var value=line.querySelector('.gc_dialog_lp_form_value');
        if(!label||!value)return;
        var labelText=label.textContent.replace(/\s+/g,'').replace('：','').replace(':','').trim();
        var valueText=value.textContent.replace(/\s+/g,'').trim();
        label.textContent=getDisplayLabel(labelText);
        if(valueText===''||valueText==='選択されていません'){
          line.classList.add('is-empty');
        }else{
          line.classList.remove('is-empty');
        }
        if(labelText.indexOf('添付ファイル')!==-1&&valueText===''){
          line.classList.add('is-empty');
        }
      });
    }

    function ensureDialogHead(wrap){
      if(!wrap.querySelector('.hex-dialog-confirm-title')){
        var title=document.createElement('h3');
        title.className='hex-dialog-confirm-title';
        title.textContent='入力内容の確認';
        wrap.insertBefore(title,wrap.firstChild);
      }

      if(!wrap.querySelector('.hex-dialog-confirm-lead')){
        var lead=document.createElement('p');
        lead.className='hex-dialog-confirm-lead';
        lead.textContent='内容をご確認のうえ、問題がなければ送信してください。';
        var titleEl=wrap.querySelector('.hex-dialog-confirm-title');
        if(titleEl&&titleEl.nextSibling){
          wrap.insertBefore(lead,titleEl.nextSibling);
        }else{
          wrap.appendChild(lead);
        }
      }
    }

    function customizeDialog(){
      if(dialogUnlocking)return;
      var box=document.getElementById('gc_auto_frame_lp_form_dialog_box');
      if(!box)return;

      var existingWrap=box.querySelector('.hex-dialog-confirm');
      if(existingWrap){
        normalizeDialogLines(existingWrap);
        ensureDialogHead(existingWrap);
        box.classList.add('hex-dialog-ready');
        var dialog=document.getElementById('gc_auto_frame_lp_form_dialog');
        if(dialog){
          dialog.classList.add('hex-dialog-visible');
        }
        return;
      }

      var lines=box.querySelectorAll('.gc_dialog_lp_form_line');
      if(!lines.length)return;

      normalizeDialogLines(box);

      var wrap=document.createElement('div');
      wrap.className='hex-dialog-confirm';

      while(box.firstChild){
        wrap.appendChild(box.firstChild);
      }

      ensureDialogHead(wrap);
      box.appendChild(wrap);
      box.classList.add('hex-dialog-ready');
      var dialog=document.getElementById('gc_auto_frame_lp_form_dialog');
      if(dialog){
        dialog.classList.add('hex-dialog-visible');
      }
    }

    function scheduleDialogCustomize(){
      if(dialogUnlocking)return;
      clearTimeout(dialogCustomizeTimer);
      dialogCustomizeTimer=setTimeout(function(){
        if(dialogUnlocking)return;
        customizeDialog();
        if(isDialogVisible()){
          lockDialogView();
        }
      },10);
    }

    function observeDialog(){
      if(dialogObserver)return;
      var dialog=document.getElementById('gc_auto_frame_lp_form_dialog');
      var box=document.getElementById('gc_auto_frame_lp_form_dialog_box');
      var target=dialog||box;

      if(!target){
        dialogObserveTimer=setTimeout(observeDialog,80);
        return;
      }

      dialogObserver=new MutationObserver(function(){
        if(dialogUnlocking)return;
        scheduleDialogCustomize();
      });

      dialogObserver.observe(target,{
        childList:true,
        subtree:true,
        attributes:true
      });
    }

    function startDialogWatch(){
      dialogUnlocking=false;
      stopDialogWatch();
      observeDialog();
      scheduleDialogCustomize();
      setTimeout(scheduleDialogCustomize,80);
      setTimeout(scheduleDialogCustomize,240);
    }

    function setupRequiredMessage(){
      if(typeof gc_click_open_dialog_lp_form!=='function')return;
      if(gc_click_open_dialog_lp_form.hexWrapped)return;

      var original=gc_click_open_dialog_lp_form;

      gc_click_open_dialog_lp_form=function(){
        validationStarted=true;
        updateRequiredEmptyState();

        var errors=getRequiredErrors();

        if(errors.length){
          var message='<strong>未入力の必須項目があります。</strong><br><br>';
          errors.forEach(function(error){
            message+='・'+error.label+'<br>';
          });
          o7cms_show_message(message);
          setTimeout(function(){
            errors[0].row.scrollIntoView({
              behavior:'smooth',
              block:'center'
            });
          },50);
          return false;
        }

        var result=original();
        startDialogWatch();
        return result;
      };

      gc_click_open_dialog_lp_form.hexWrapped=true;
    }

    function blockInputOuterClick(e){
      var dialog=document.getElementById('gc_auto_frame_lp_form_dialog');
      var formBg=document.querySelector('.gc_auto_frame_lp_form_bg');
      var formBody=document.getElementById('gc_auto_frame_lp_form_body');
      var formEl=document.getElementById('form_lp_form');
      var formButton=document.getElementById('form_lp_form_button');

      if(!formEl)return;
      if(dialog&&dialog.classList.contains('hex-dialog-visible'))return;

      if(formEl.contains(e.target))return;
      if(formButton&&formButton.contains(e.target))return;

      if(e.target.closest('.o7cms_message_box'))return;
      if(e.target.closest('.o7cms_message'))return;
      if(e.target.closest('[id*="message"]'))return;
      if(e.target.closest('[class*="message"]'))return;
      if(e.target.closest('header'))return;
      if(e.target.closest('#header'))return;
      if(e.target.closest('[class*="header"]'))return;
      if(e.target.closest('.bg_menu_button_popup'))return;
      if(e.target.closest('a'))return;
      if(e.target.closest('button'))return;

      if(
        (formBg&&formBg.contains(e.target))||
        (formBody&&formBody.contains(e.target))
      ){
        e.preventDefault();
        e.stopPropagation();
        if(e.stopImmediatePropagation)e.stopImmediatePropagation();
      }
    }
    document.addEventListener('click',blockInputOuterClick,true);

    document.addEventListener('click',function(e){
      var dialog=document.getElementById('gc_auto_frame_lp_form_dialog');
      var box=document.getElementById('gc_auto_frame_lp_form_dialog_box');

      if(!dialog||!box)return;
      if(!dialog.classList.contains('hex-dialog-visible'))return;

      if(box.contains(e.target))return;
      if(e.target.closest('.gc_auto_frame_lp_form_dialog_buttons'))return;

      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    },true);

    document.addEventListener('click',function(e){
      var text=(e.target.textContent||'').replace(/\s+/g,'').trim();

      if(text.indexOf('修正')!==-1||text.indexOf('戻る')!==-1||text.indexOf('閉じる')!==-1){
        unlockDialogView();
        setTimeout(unlockDialogView,80);
        setTimeout(unlockDialogView,300);
        setTimeout(unlockDialogView,700);
        return;
      }

      if(dialogLocked&&!dialogUnlocking){
        setTimeout(scheduleDialogCustomize,10);
      }
    });

    window.addEventListener('pageshow',function(){
      unlockDialogView();
    });

    window.addEventListener('popstate',function(){
      setTimeout(unlockDialogView,80);
    });

    wrapRows();
    setupRequirementSwitch();
    setupReferralSwitch();
    setupHouseMakerNote();
    setupFormNotice();
    applyFormLabelsAndPlaceholders();
    setupFileInputClickArea();
    setupRequiredEmptyState();
    setupRequiredMessage();
    form.classList.add('hex-form-ready');
  },300);
});

/* =======================================
   よくある質問
======================================= */
hexLoad(function(){
  setTimeout(function(){
    var faq=document.querySelector('.publicinfo_qanda');
    if(!faq)return;
    var items=faq.querySelectorAll('.qanda_content');
    items.forEach(function(item){
      var inputs=item.getElementsByTagName('input');
      var answers=item.getElementsByClassName('bg_answer_qa');
      if(!inputs.length)return;
      if(!answers.length)return;
      var input=inputs[0];
      var answer=answers[0];
      answer.style.overflow='hidden';
      answer.style.transition='height .75s cubic-bezier(.22,1,.36,1),opacity .55s ease';
      function updateArrow(){
        if(input.checked){
          item.classList.add('is-open');
        }else{
          item.classList.remove('is-open');
        }
      }
      function openAnswer(){
        updateArrow();
        answer.style.height='0px';
        answer.style.opacity='0';
        requestAnimationFrame(function(){
          answer.style.height=answer.scrollHeight+'px';
          answer.style.opacity='1';
        });
      }
      function closeAnswer(){
        updateArrow();
        answer.style.height='0px';
        answer.style.opacity='0';
      }
      if(input.checked){
        item.classList.add('is-open');
        answer.style.height='auto';
        answer.style.opacity='1';
      }else{
        item.classList.remove('is-open');
        answer.style.height='0px';
        answer.style.opacity='0';
      }
      input.addEventListener('change',function(){
        if(input.checked){
          openAnswer();
        }else{
          closeAnswer();
        }
      });
      answer.addEventListener('transitionend',function(e){
        if(e.propertyName!=='height')return;
        if(input.checked){
          answer.style.height='auto';
        }
      });
    });
  },100);
});

/* =======================================
   旧お問い合わせリンク書き換え
======================================= */
hexReady(function(){
  var contactView={
    dataset:{
      type:'internal',
      shortname:'contact',
      pagetype:'contact',
      anchor:''
    }
  };

  var contactUrl=window.hexBuildUrl(contactView);
  if(!contactUrl)return;

  document.querySelectorAll('a[href]').forEach(function(link){
    var url=null;

    try{
      url=new URL(link.getAttribute('href'),location.origin);
    }catch(e){
      return;
    }

    if(
      url.searchParams.get('blogid')==='6'&&
      url.searchParams.get('catid')==='29'
    ){
      link.href=contactUrl;
    }
  });
});

/* =======================================
   営業日カレンダー
======================================= */
hexLoad(function(){
  var target=document.getElementById('hex-calendar-area');
  if(!target)return;
  if(target.classList.contains('hex-calendar-ready'))return;

  var weekLabels=['日','月','火','水','木','金','土'];

  var config={
    startMonth:'',
    endMonth:'',
    closedDates:[],
    closedRanges:[],
    events:[]
  };

  /* 全角数字を半角数字に変換 */
  function normalizeNumbers(value){
    return String(value||'').replace(/[０-９]/g,function(character){
      return String.fromCharCode(
        character.charCodeAt(0)-0xFEE0
      );
    });
  }

  /* 年月をYYYY-MM形式に変換 */
  function normalizeMonth(value){
    var normalized=normalizeNumbers(value)
      .replace(/\s+/g,'')
      .trim();

    var match=normalized.match(/^(\d{4})\/(\d{1,2})$/);
    if(!match)return '';

    var year=Number(match[1]);
    var month=Number(match[2]);

    if(month<1||month>12)return '';

    return (
      year+'-'+
      String(month).padStart(2,'0')
    );
  }

  /* 日付をYYYY-MM-DD形式に変換 */
  function normalizeDate(value){
    var normalized=normalizeNumbers(value)
      .replace(/\s+/g,'')
      .trim();

    var match=normalized.match(
      /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/
    );

    if(!match)return '';

    var year=Number(match[1]);
    var month=Number(match[2]);
    var date=Number(match[3]);
    var testDate=new Date(year,month-1,date);

    if(
      testDate.getFullYear()!==year||
      testDate.getMonth()!==month-1||
      testDate.getDate()!==date
    ){
      return '';
    }

    return (
      year+'-'+
      String(month).padStart(2,'0')+'-'+
      String(date).padStart(2,'0')
    );
  }

  /* 期間を開始・終了に分割 */
  function parseRange(value,normalizer){
    var normalized=normalizeNumbers(value).trim();

    var values=normalized.split(/\s*[-－]\s*/);
    if(values.length!==2)return null;

    var start=normalizer(values[0]);
    var end=normalizer(values[1]);

    if(!start||!end)return null;
    if(start>end)return null;

    return {
      start:start,
      end:end
    };
  }

  /* 設定文を行単位で取得 */
  function getSettingLines(){
    var lines=[];
    var paragraphs=target.querySelectorAll('p');

    if(paragraphs.length){
      paragraphs.forEach(function(paragraph){
        var paragraphText=
          paragraph.innerText||
          paragraph.textContent||
          '';

        paragraphText.split(/\r?\n/).forEach(function(line){
          var value=line.trim();

          if(value){
            lines.push(value);
          }
        });
      });

      return lines;
    }

    var targetText=
      target.innerText||
      target.textContent||
      '';

    targetText.split(/\r?\n/).forEach(function(line){
      var value=line.trim();

      if(value){
        lines.push(value);
      }
    });

    return lines;
  }

  /* DIV内の設定を読み取る */
  function parseCalendarSettings(){
    var lines=getSettingLines();

    lines.forEach(function(line){
      var parts=line.split(/[｜|]/).map(function(part){
        return part.trim();
      });

      var type=parts[0];

      if(type==='表示期間'){
        var monthRange=parseRange(
          parts[1]||'',
          normalizeMonth
        );

        if(monthRange){
          config.startMonth=monthRange.start;
          config.endMonth=monthRange.end;
        }

        return;
      }

      if(type==='定休日'){
        parts.slice(1).forEach(function(value){
          var dateKey=normalizeDate(value);

          if(
            dateKey&&
            config.closedDates.indexOf(dateKey)===-1
          ){
            config.closedDates.push(dateKey);
          }
        });

        return;
      }

      if(type==='大型連休'){
        var closedRange=parseRange(
          parts[1]||'',
          normalizeDate
        );

        if(!closedRange)return;

        config.closedRanges.push({
          start:closedRange.start,
          end:closedRange.end,
          label:parts.slice(2).join('｜').trim()||
            '大型連休'
        });

        return;
      }

      if(type==='イベント'){
        var eventDate=normalizeDate(parts[1]||'');

        if(!eventDate)return;

        config.events.push({
          date:eventDate,
          label:parts.slice(2).join('｜').trim()||
            'イベント'
        });
      }
    });

    config.closedDates.sort();

    config.closedRanges.sort(function(a,b){
      return a.start.localeCompare(b.start);
    });

    config.events.sort(function(a,b){
      return a.date.localeCompare(b.date);
    });
  }

  parseCalendarSettings();

  /* 表示期間が未設定の場合 */
  if(!config.startMonth||!config.endMonth){
    target.textContent=
      '営業日カレンダーの表示期間が設定されていません。';

    target.classList.add('hex-calendar-setting-error');
    return;
  }

  function parseMonth(value){
    var parts=value.split('-');

    return (
      Number(parts[0])*12+
      Number(parts[1])-1
    );
  }

  function getMonthData(monthIndex){
    return {
      year:Math.floor(monthIndex/12),
      month:monthIndex%12
    };
  }

  function formatDateKey(year,month,date){
    return (
      year+'-'+
      String(month+1).padStart(2,'0')+'-'+
      String(date).padStart(2,'0')
    );
  }

  function formatShortDate(value){
    var parts=value.split('-');

    return (
      Number(parts[1])+'/'+
      Number(parts[2])
    );
  }

  function formatRange(range){
    return (
      formatShortDate(range.start)+
      '〜'+
      formatShortDate(range.end)
    );
  }

  function getClosedRange(dateKey){
    for(var i=0;i<config.closedRanges.length;i++){
      var range=config.closedRanges[i];

      if(dateKey>=range.start&&dateKey<=range.end){
        return range;
      }
    }

    return null;
  }

  function getEvent(dateKey){
    for(var i=0;i<config.events.length;i++){
      if(config.events[i].date===dateKey){
        return config.events[i];
      }
    }

    return null;
  }

  function isClosedDate(dateKey){
    return config.closedDates.indexOf(dateKey)!==-1;
  }

  function isRangeInMonth(range,year,month){
    var monthStart=formatDateKey(year,month,1);
    var lastDate=new Date(year,month+1,0).getDate();
    var monthEnd=formatDateKey(year,month,lastDate);

    return (
      range.start<=monthEnd&&
      range.end>=monthStart
    );
  }

  function isEventInMonth(event,year,month){
    var prefix=
      year+'-'+
      String(month+1).padStart(2,'0')+'-';

    return event.date.indexOf(prefix)===0;
  }

  function createLegendItem(type,text){
    var item=document.createElement('li');
    var symbol=document.createElement('span');
    var label=document.createElement('span');

    item.className='hex-calendar-legend-item';
    symbol.className=
      'hex-calendar-legend-symbol '+type;
    label.className='hex-calendar-legend-label';
    label.textContent=text;

    item.appendChild(symbol);
    item.appendChild(label);

    return item;
  }

  var startMonth=parseMonth(config.startMonth);
  var endMonth=parseMonth(config.endMonth);
  var today=new Date();

  var currentMonth=
    today.getFullYear()*12+
    today.getMonth();

  if(currentMonth<startMonth){
    currentMonth=startMonth;
  }

  if(currentMonth>endMonth){
    currentMonth=endMonth;
  }

  target.textContent='';
  target.classList.add('hex-calendar-ready');

  var calendar=document.createElement('div');
  var header=document.createElement('div');
  var prevButton=document.createElement('button');
  var monthTitle=document.createElement('div');
  var nextButton=document.createElement('button');
  var weekdays=document.createElement('div');
  var days=document.createElement('div');
  var legend=document.createElement('ul');

  calendar.className='hex-calendar';
  header.className='hex-calendar-header';
  prevButton.className=
    'hex-calendar-button hex-calendar-prev';
  monthTitle.className='hex-calendar-title';
  nextButton.className=
    'hex-calendar-button hex-calendar-next';
  weekdays.className='hex-calendar-weekdays';
  days.className='hex-calendar-days';
  legend.className='hex-calendar-legend';

  prevButton.type='button';
  nextButton.type='button';

  prevButton.setAttribute(
    'aria-label',
    '前月を表示'
  );

  nextButton.setAttribute(
    'aria-label',
    '翌月を表示'
  );

  var prevIcon=document.createElement('i');
  var nextIcon=document.createElement('i');

  prevIcon.className='fa-solid fa-angle-left';
  nextIcon.className='fa-solid fa-angle-right';

  prevButton.appendChild(prevIcon);
  nextButton.appendChild(nextIcon);

  weekLabels.forEach(function(labelText,index){
    var label=document.createElement('div');

    label.className='hex-calendar-weekday';

    if(index===0){
      label.classList.add('is-sunday');
    }

    if(index===6){
      label.classList.add('is-saturday');
    }

    label.textContent=labelText;
    weekdays.appendChild(label);
  });

  header.appendChild(prevButton);
  header.appendChild(monthTitle);
  header.appendChild(nextButton);

  calendar.appendChild(header);
  calendar.appendChild(weekdays);
  calendar.appendChild(days);
  calendar.appendChild(legend);

  target.appendChild(calendar);

  function renderCalendar(){
    var monthData=getMonthData(currentMonth);
    var year=monthData.year;
    var month=monthData.month;
    var firstDay=new Date(year,month,1).getDay();
    var lastDate=new Date(year,month+1,0).getDate();

    monthTitle.textContent=
      year+'年'+
      (month+1)+'月';

    prevButton.disabled=currentMonth<=startMonth;
    nextButton.disabled=currentMonth>=endMonth;

    days.textContent='';
    legend.textContent='';

    for(
      var blankIndex=0;
      blankIndex<firstDay;
      blankIndex++
    ){
      var blank=document.createElement('div');

      blank.className=
        'hex-calendar-day is-empty';

      days.appendChild(blank);
    }

    for(var date=1;date<=lastDate;date++){
      var dateObject=new Date(year,month,date);
      var dayOfWeek=dateObject.getDay();
      var dateKey=formatDateKey(year,month,date);
      var range=getClosedRange(dateKey);
      var event=getEvent(dateKey);
      var closed=isClosedDate(dateKey);
      var day=document.createElement('div');
      var number=document.createElement('span');

      day.className='hex-calendar-day';
      number.className='hex-calendar-number';
      number.textContent=date;

      if(dayOfWeek===0){
        day.classList.add('is-sunday');
      }

      if(dayOfWeek===6){
        day.classList.add('is-saturday');
      }

      /*
       * 表示優先順位
       * イベント → 大型連休 → 定休日
       */
      if(event){
        number.classList.add('is-event');
        number.title=event.label;
      }else if(range){
        number.classList.add('is-long-holiday');
        number.title=range.label;
      }else if(closed){
        number.classList.add('is-closed');
        number.title='定休日';
      }

      day.appendChild(number);
      days.appendChild(day);
    }

    legend.appendChild(
      createLegendItem(
        'is-closed',
        '定休日'
      )
    );

    config.closedRanges.forEach(function(range){
      if(!isRangeInMonth(range,year,month))return;

      legend.appendChild(
        createLegendItem(
          'is-long-holiday',
          range.label+
          '（'+
          formatRange(range)+
          '）'
        )
      );
    });

    config.events.forEach(function(event){
      if(!isEventInMonth(event,year,month))return;

      legend.appendChild(
        createLegendItem(
          'is-event',
          event.label+
          '（'+
          formatShortDate(event.date)+
          '）'
        )
      );
    });
  }

  prevButton.addEventListener('click',function(){
    if(currentMonth<=startMonth)return;

    currentMonth--;
    renderCalendar();
  });

  nextButton.addEventListener('click',function(){
    if(currentMonth>=endMonth)return;

    currentMonth++;
    renderCalendar();
  });

  renderCalendar();
});