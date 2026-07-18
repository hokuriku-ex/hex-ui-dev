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
  HERO:'gc_auto_frame_home_0', /* ヒーロー画像 */
  WELCOME:'gc_auto_frame_home_1', /* Welcomeメッセージ */
  ABOUT:'gc_auto_frame_home_2', /* 私たちについて */
  SERVICE:'gc_auto_frame_home_3', /* サービス案内 */
  PICKUP:'gc_auto_frame_home_4', /* 注目アイテム */
  NEWS_SECTION:'gc_auto_frame_home_5', /* お知らせセクション */
  NEWS:'gc_auto_frame_home_6', /* 重要なお知らせ */
  BLOG:'gc_auto_frame_home_7', /* スタッフブログ */
  BANNER:'gc_auto_frame_home_8', /* バナー */
  MOVIE:'gc_auto_frame_home_9', /* プロモーション動画 */
  RECRUIT:'gc_auto_frame_home_10', /* 採用情報 */
  CALENDAR:'gc_auto_frame_home_11', /* 営業日カレンダー */
  AREA:'gc_auto_frame_home_12', /* 施工エリア */
  FOOTER:'gc_auto_frame_home_13', /* フッター */
  FIXED_FOOTER:'gc_auto_frame_home_14' /* 固定フッター */
};

/* トップページ交互背景対象 */
const HOME_DISPLAY_SECTIONS=[
  HOME_SECTIONS.WELCOME,
  HOME_SECTIONS.ABOUT,
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
   SP用左右余白範囲指定
======================================= */
hexLoad(function(){
  document.querySelectorAll('.hex-sp-padding-inline-start').forEach(function(start){
    var box=start.closest('.gc_auto_frame_spotitem_box');
    if(!box)return;

    var end=box.querySelector('.hex-sp-padding-inline-end');
    if(!end)return;

    box.classList.add('hex-sp-padding-inline');
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
  titles.forEach(function(title){
    var target=null;
      targets.forEach(function(h2){
        if(target)return;
        if(h2.offsetParent===null)return;
        var h2Text=(h2.textContent||'').trim();
        if(h2Text===title)target=h2;
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
      var top=target.getBoundingClientRect().top+window.pageYOffset-getHexAnchorOffset();
      window.scrollTo({
        top:top,
        behavior:'smooth'
      });
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
    return window.innerWidth<=768?70:80;
  }
  function getHexAnchorOffset(){
    return getHexAnchorHeaderHeight()+nav.offsetHeight+40;
  }
  function refreshHexAnchorNav(){
    var mobileAdjust=window.innerWidth<=768?10:0;
    nav.classList.remove('is-fixed');
    placeholder.classList.remove('is-active');
    placeholder.style.height='0px';
    if(nav.parentNode!==originalParent){
      originalParent.insertBefore(nav,originalNext);
    }
    fixedStart=
      nav.getBoundingClientRect().top+
      window.pageYOffset-
      getHexAnchorHeaderHeight()-
      mobileAdjust;
    updateHexAnchorNav();
  }
  function updateHexAnchorNav(){
    var scrollTop=window.pageYOffset||document.documentElement.scrollTop;
    if(scrollTop>=fixedStart){
      if(!nav.classList.contains('is-fixed')){
        placeholder.style.height=nav.offsetHeight+'px';
        placeholder.classList.add('is-active');
        document.body.appendChild(nav);
        nav.classList.add('is-fixed');
      }
    }else{
      if(nav.classList.contains('is-fixed')){
        nav.classList.remove('is-fixed');
        placeholder.classList.remove('is-active');
        placeholder.style.height='0px';
        originalParent.insertBefore(nav,originalNext);
      }
    }
    updateHexAnchorActive(scrollTop);
  }
  function updateHexAnchorActive(scrollTop){
    var activePair=null;
    var checkLine=scrollTop+getHexAnchorOffset()+10;
    pairs.forEach(function(pair){
      var targetTop=pair.target.getBoundingClientRect().top+window.pageYOffset;
      if(checkLine>=targetTop)activePair=pair;
    });
    pairs.forEach(function(pair){
      pair.link.classList.remove('is-active');
    });
    if(activePair){
      activePair.link.classList.add('is-active');
      if(window.innerWidth<=768&&nav.classList.contains('is-fixed')){
        activePair.link.scrollIntoView({
          behavior:'smooth',
          inline:'center',
          block:'nearest'
        });
      }
    }
  }
  /* アンカーナビ右スクロール案内 */
  var anchorList=nav.querySelector('.hex-anchor-nav-list');
  function syncAnchorScrollHint(){
    if(!anchorList)return;
    var hasMore=
      anchorList.scrollLeft+
      anchorList.clientWidth<
      anchorList.scrollWidth-1;
    nav.classList.toggle('has-scroll-right',hasMore);
  }
  function refreshAnchorScrollHint(){
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        syncAnchorScrollHint();
      });
    });
  }
  if(anchorList){
    anchorList.addEventListener(
      'scroll',
      syncAnchorScrollHint,
      {passive:true}
    );
  }
  setTimeout(function(){
    refreshHexAnchorNav();
    refreshAnchorScrollHint();
  },100);
  if(document.fonts&&document.fonts.ready){
    document.fonts.ready.then(function(){
      refreshAnchorScrollHint();
    });
  }
  window.addEventListener('scroll',function(){
    updateHexAnchorNav();
  });
  window.addEventListener('resize',function(){
    refreshHexAnchorNav();
    refreshAnchorScrollHint();
  });
}

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

    /*
     * ハンバーガーと×アイコンの切り替え
     */
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

    /*
     * 親メニューのアコーディオン制御
     */
    function syncOpenMenu(){
      groups.forEach(function(group){
        var submenu=group.querySelector(':scope > .menu_sub');
        if(!submenu)return;

        var isOpen=
          window.getComputedStyle(submenu).display!=='none';

        group.classList.toggle('hex-submenu-open',isOpen);
      });
    }

    groups.forEach(function(group){
      group.addEventListener('click',function(event){
        if(event.target.closest('.menu_inner_group'))return;

        window.setTimeout(function(){
          var currentSubmenu=
            group.querySelector(':scope > .menu_sub');

          if(!currentSubmenu)return;

          var isOpen=
            window.getComputedStyle(currentSubmenu).display!=='none';

          groups.forEach(function(otherGroup){
            if(otherGroup===group)return;

            var otherSubmenu=
              otherGroup.querySelector(':scope > .menu_sub');

            if(otherSubmenu){
              otherSubmenu.style.display='none';
            }

            otherGroup.classList.remove('hex-submenu-open');
          });

          group.classList.toggle('hex-submenu-open',isOpen);
        },0);
      });
    });

    syncOpenMenu();

    /*
     * PC・スマホのメニューアイコンと採用情報URL
     */
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

      /*
       * 通常の内部リンクアイコン
       */
      if(!iconSpan){
        iconSpan=document.createElement('span');
        iconSpan.className='hex-menu-icon';
        iconSpan.setAttribute('aria-hidden','true');

        icon=document.createElement('i');
        icon.className='fa-solid fa-arrow-right';

        iconSpan.appendChild(icon);
        el.appendChild(iconSpan);
      }

      /*
       * スマホの子メニューから親へのイベント伝播を停止
       */
      if(
        isSmartphoneItem&&
        el.dataset.hexMenuPropagationReady!=='1'
      ){
        el.dataset.hexMenuPropagationReady='1';

        el.addEventListener('click',function(e){
          e.stopPropagation();
        });
      }

      /*
       * 採用情報を外部リンクに変更
       */
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
  },100);
});

/* =======================================
   共通パーツ
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
    return hexView.dataset.url||'';
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
    var hexCol=hexView.dataset.col||'1';
    var hexAlign=hexView.dataset.align||'center';
    var hexWrap=document.createElement('div');
    var hexAnchor=document.createElement('a');
    var hexTitleSpan=document.createElement('span');
    var hexIconSpan=document.createElement('span');
    var hexIcon=document.createElement('i');
    if(!hexTitle)return;
    if(!hexUrl)return;
    hexWrap.className='hex-button-wrap hex-col-'+hexCol+' hex-align-'+hexAlign;
    hexAnchor.className='hex-btn-main '+hexStyle;
    hexAnchor.href=hexUrl;
    window.hexSetExternal(hexAnchor,hexType);
    hexTitleSpan.className='hex-btn-main-title';
    hexTitleSpan.textContent=hexTitle;
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
    hexWrap.className='hex-link-wrap hex-col-'+hexCol+' hex-align-'+hexAlign;
    hexAnchor.className='hex-link '+hexStyle;
    hexAnchor.href=hexUrl;
    window.hexSetExternal(hexAnchor,hexType);
    hexTitleSpan.className='hex-link-title';
    hexTitleSpan.textContent=hexTitle;
    hexIconSpan.className='hex-link-icon';
    hexIcon.className=window.hexIconClass(hexType);
    hexIconSpan.appendChild(hexIcon);
    hexAnchor.appendChild(hexTitleSpan);
    hexDetailSpan.className='hex-link-detail';
    hexDetailSpan.textContent='詳しく見る';
    hexAnchor.appendChild(hexDetailSpan);
    hexAnchor.appendChild(hexIconSpan);
    hexWrap.appendChild(hexAnchor);
    hexView.parentNode.insertBefore(hexWrap,hexView);
    hexView.style.display='none';
  });
});

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
              col:bannerStart.dataset.col||'4',
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
    prev.textContent='‹';
    next.textContent='›';
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
        text.textContent=item.text;
        inner.appendChild(text);
      }
      if(item.button){
        if(item.url){
          var buttonWrap=document.createElement('div');
          var buttonEl=document.createElement('a');
          var buttonTitle=document.createElement('span');
          var buttonIcon=document.createElement('span');
          var buttonI=document.createElement('i');
          buttonWrap.className='hex-banner-button hex-col-'+item.col;
          buttonEl.className='hex-btn-main '+item.style;
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
    mainSwiper.appendChild(prev);
    mainSwiper.appendChild(next);
    mainSwiper.appendChild(pagination);
    wrap.appendChild(mainSwiper);
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
    if(!image)return;
    var title=start.dataset.title||'';
    var text=start.dataset.text||'';
    var button=start.dataset.button||'';
    var buttonCol=start.dataset.col||'4';
    var buttonType=start.dataset.type||'internal';
    var buttonStyle=start.dataset.style||'light';
    var bannerUrl=window.hexBuildUrl(start);
    var banner=document.createElement('div');
    var imageBox=document.createElement('div');
    var imageClone=image.cloneNode(true);
    var overlay=document.createElement('div');
    var inner=document.createElement('div');
    banner.className='hex-banner';
    imageBox.className='hex-banner-image';
    overlay.className='hex-banner-overlay';
    inner.className='hex-banner-inner';
    if(bannerUrl){
      if(!button){
        var imageLink=document.createElement('a');
        imageLink.className='hex-banner-image-link';
        imageLink.href=bannerUrl;
        window.hexSetExternal(imageLink,buttonType);
        imageLink.appendChild(imageClone);
        imageBox.appendChild(imageLink);
      }else{
        imageBox.appendChild(imageClone);
      }
    }else{
      imageBox.appendChild(imageClone);
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
      textEl.textContent=text;
      inner.appendChild(textEl);
    }
    if(button){
      if(bannerUrl){
        var buttonWrap=document.createElement('div');
        var buttonEl=document.createElement('a');
        var buttonTitle=document.createElement('span');
        var buttonIcon=document.createElement('span');
        var buttonI=document.createElement('i');
        buttonWrap.className='hex-banner-button hex-col-'+buttonCol;
        buttonEl.className='hex-btn-main '+buttonStyle;
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
  ['1','2','3','4'].forEach(function(col){
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

    wrap.className='hex-link-wrap hex-col-'+(view.dataset.col||'3')+' hex-align-center hex-home-news-link-wrap';
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
    link.href=url;
    window.hexSetExternal(link,view.dataset.type||'internal');
  }
  if(title){
    title.textContent=view.dataset.title||'一覧を見る';
  }
}

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
hexLoad(function(){
  document.querySelectorAll('#gc_auto_frame_home_2 .hex-link-wrap').forEach(function(item){

    var title=item.querySelector('.hex-link-title');
    var detail=item.querySelector('.hex-link-detail');

    if(!title||!detail)return;

    if(title.textContent.trim()==='外構をご検討中の方'){
      detail.textContent='初めての方へ';
    }

    if(title.textContent.trim()==='ハウスメーカー・工務店の方'){
      detail.textContent='初めての方へ';
    }
  });
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
   共通フッター レイアウト調整
======================================= */
hexReady(function(){
  hexReplaceTikTokSvgs(document);
  setTimeout(function(){
    hexReplaceTikTokSvgs(document);
  },100);
});
hexReady(function(){
  setTimeout(function(){
    var areaView=document.getElementById('footer-area-view');
    var footerFrame=document.querySelector('.gc_auto_frame_footer');
    var footerContents=footerFrame?footerFrame.querySelector('.footer_contents'):null;
    var companyText=footerFrame?footerFrame.querySelector('.footer_text'):null;
    var copyright=footerFrame?footerFrame.querySelector('.footer_copyright'):null;
    if(!areaView||!footerFrame||!footerContents||!companyText||!copyright)return;
    if(footerContents.querySelector('.hex-footer-area'))return;
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
    setTimeout(function(){ hexReplaceTikTokSvgs(document); },500);
  },300);
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
function hexCreateHeaderSns(){
  if(document.querySelector('.hex-header-sns'))return;
  var sns=hexCreateSnsLinks('hex-header-sns');
  if(!sns)return;
  document.body.appendChild(sns);
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
  if(window.innerWidth<=768){
    button.className=button.className.replace(/\bis-visible\b/g,'').replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'');
    return;
  }
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
  p1.textContent='■ 石川県全域';
  p2.appendChild(document.createTextNode('金沢市 / 野々市市 / 白山市 / 津幡町 / 内灘町'));
  p2.appendChild(document.createElement('br'));
  p2.appendChild(document.createTextNode('かほく市 / 能美市 / 川北町 / 小松市 / 加賀市'));
  p2.appendChild(document.createElement('br'));
  p2.appendChild(document.createTextNode('羽咋市 / 宝達志水町 / 志賀町 / 中能登町'));
  p2.appendChild(document.createElement('br'));
  p2.appendChild(document.createTextNode('七尾市 / 穴水町 / 能登町 / 輪島市 / 珠洲市'));
  p3.textContent='■ 富山県・福井県の一部';
  p4.textContent='状況によりご相談させていただきます';
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
      section.className='hex-company-section hex-company-section-'+type;
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
      title.className='hex-section-subtitle hex-anchor-target';
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
      group.members.forEach(function(member,index){
        member.number=('0'+(index+1)).slice(-2);
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
          var offset=window.innerWidth<=768?160:190;
          var top=sections[i].getBoundingClientRect().top+window.pageYOffset-offset;
          window.scrollTo({
            top:top,
            behavior:'smooth'
          });
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
  number.textContent=data.number||'';
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
      iframe.style.height=(height+4)+'px';
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
        '<p class="hex-form-notice-warning">営業・セールスを目的としたお問い合わせはご遠慮ください。</p>'+
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