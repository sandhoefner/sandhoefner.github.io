!function t(e,a,o){function n(r,i){if(!a[r]){if(!e[r]){var s="function"==typeof require&&require;if(!i&&s)return s(r,!0);if(l)return l(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var u=a[r]={exports:{}};e[r][0].call(u.exports,function(t){var a=e[r][1][t];return n(a?a:t)},u,u.exports,t,e,a,o)}return a[r].exports}for(var l="function"==typeof require&&require,r=0;r<o.length;r++)n(o[r]);return n}({1:[function(t,e,a){function o(t,e){"0"!==e&&l.find(t).text(e)}function n(t){GD.ga&&GD.ga.trackEvent&&GD.ga.trackEvent(r,i,t,null,!0)}var l=$(".social-share-btns, .share-callout-btn, .share-callout-inline"),r="social-share-review",i="click-to-share";!function(t,e,a){var o,n=t.getElementsByTagName(e)[0];t.getElementById(a)||(o=t.createElement(e),o.id=a,o.src="//connect.facebook.net/en_US/sdk.js",n.parentNode.insertBefore(o,n))}(document,"script","facebook-jssdk"),$(".facebook-share",l).on("click tap",function(t){t.preventDefault(),t.stopImmediatePropagation();var e=$(this);n(e.data("label")),FB.ui({method:"share",href:e.data("url")},function(){})}),$("a[href!=#]",l).on("click tap",function(t){if(t.preventDefault(),t.stopImmediatePropagation(),n($(this).data("label")),$(this).hasClass("link-share")){var e=this.href,a="copy-share-link",o=document.createElement("textarea");o.id=a,$(o).css({position:"fixed",top:"-1",left:"-1",width:"1px",height:"1px",border:"0"}),$("body").append(o);var l=document.getElementById(a);if(l){l.value=e,l.select();var r=document.execCommand("copy");r&&$(this).parents("ul").find(".linkCopySuccess").css({display:"table-cell"}).fadeOut(3e3),$("body").remove("#"+a)}}else window.open(this.href,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600")});var s=$(".social-share-btns").data("url");s&&$.ajax({url:"/getSocialButtonCount.htm",data:{url:s},success:function(t){o(".total-share-count",t.total)}}),$(".share-callout-btn > a").on("click tap",function(t){var e=$(this).closest(".share-callout-btn");GD.ga&&GD.ga.trackEvent&&!e.find(".callout-container").hasClass("callout-visible")&&GD.ga.trackEvent(r,"show-tooltip","tooltip",null,!0),t.preventDefault(),t.stopImmediatePropagation(),e.find(".callout-container").toggleClass("callout-visible")}),$(".share-callout-btn > a, .share-callout-btn .social-share-icon-list").on("mouseover",function(){var t=$(this).closest(".share-callout-btn");GD.ga&&GD.ga.trackEvent&&!t.find(".callout-container").hasClass("callout-visible")&&GD.ga.trackEvent(r,"show-tooltip","tooltip",null,!0),t.find(".callout-container").addClass("callout-visible");var e=t.data("callout-timer");e&&(window.clearTimeout(e),t.data("callout-timer",null))}).on("mouseout",function(){var t=$(this).closest(".share-callout-btn");t.data("callout-timer")||t.data("callout-timer",setTimeout(function(){t.find(".callout-container").removeClass("callout-visible").data("callout-timer",null)},500))})},{}]},{},[1]);
//# sourceMappingURL=gd-social-share-btns.js.map