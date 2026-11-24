/**
 * Google Ads starts in this head script, before first paint, so the gclid is
 * stored before a click. GA4 still loads on idle after the load event.
 * GTM, HubSpot, Clarity, Factors, and reb2b load on the first interaction,
 * or 5s after load.
 */
export function deferredMarketingScriptsHtml(ids: {
  ga4Id: string;
  googleAdsId: string;
  gtmId: string;
  hubspotPortalId: string;
  reb2bKey: string;
  factorsToken: string;
  clarityId: string;
}): string {
  const cfg = JSON.stringify(ids);
  return `(function(){
var cfg=${cfg};
window.dataLayer=window.dataLayer||[];
var started=false;
function inject(src,id){
  var s=document.createElement("script");
  s.async=true;
  s.src=src;
  if(id)s.id=id;
  document.head.appendChild(s);
}
function load(){
  if(started)return;
  started=true;
  var path=location.pathname||"";
  if(path==="/admin"||path.indexOf("/admin/")===0||path==="/auth"||path.indexOf("/auth/")===0)return;
  window.dataLayer.push({"gtm.start":new Date().getTime(),event:"gtm.js"});
  inject("https://www.googletagmanager.com/gtm.js?id="+cfg.gtmId);
  inject("https://js.hs-scripts.com/"+cfg.hubspotPortalId+".js","hs-script-loader");
  if(!window.reb2b){
    window.reb2b={loaded:true};
    inject("https://ddwl4m2hdecbv.cloudfront.net/b/"+cfg.reb2bKey+"/"+cfg.reb2bKey+".js.gz");
  }
  window.faitracker=window.faitracker||function(){this.q=[];var t=new CustomEvent("FAITRACKER_QUEUED_EVENT");return this.init=function(t,e,a){this.TOKEN=t,this.INIT_PARAMS=e,this.INIT_CALLBACK=a,window.dispatchEvent(new CustomEvent("FAITRACKER_INIT_EVENT"))},this.call=function(){var e={k:"",a:[]};if(arguments&&arguments.length>=1){for(var a=1;a<arguments.length;a++)e.a.push(arguments[a]);e.k=arguments[0]}this.q.push(e),window.dispatchEvent(t)},this.message=function(){window.addEventListener("message",function(t){"faitracker"===t.data.origin&&this.call("message",t.data.type,t.data.message)})},this.message(),this.init(cfg.factorsToken,{host:"https://api.factors.ai"}),this}(),function(){var t=document.createElement("script");t.type="text/javascript",t.src="https://app.factors.ai/assets/factors.js",t.async=!0,document.head.appendChild(t)}();
  (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;(l.head||l.documentElement).appendChild(t);})(window,document,"clarity","script",cfg.clarityId);
}
function isPrivate(){
  var path=location.pathname||"";
  return path==="/admin"||path.indexOf("/admin/")===0||path==="/auth"||path.indexOf("/auth/")===0;
}
function loadAds(){
  if(isPrivate())return;
  window.gtag=function(){window.dataLayer.push(arguments);};
  window.gtag("js", new Date());
  window.gtag("config", cfg.googleAdsId);
  inject("https://www.googletagmanager.com/gtag/js?id="+cfg.googleAdsId);
}
loadAds();
var gaStarted=false;
function loadGa(){
  if(gaStarted)return;
  gaStarted=true;
  if(isPrivate())return;
  if(!window.gtag){
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag("js", new Date());
    inject("https://www.googletagmanager.com/gtag/js?id="+cfg.ga4Id);
  }
  window.gtag("config", cfg.ga4Id, {send_page_view:true});
}
function arm(){
  ["pointerdown","keydown","touchstart"].forEach(function(evt){
    window.addEventListener(evt,load,{once:true,passive:true});
  });
  var afterLoad=function(){
    setTimeout(load,5000);
    if(window.requestIdleCallback) window.requestIdleCallback(loadGa,{timeout:2000});
    else setTimeout(loadGa,1);
  };
  if(document.readyState==="complete")afterLoad();
  else window.addEventListener("load",afterLoad,{once:true});
}
arm();
})();`;
}
