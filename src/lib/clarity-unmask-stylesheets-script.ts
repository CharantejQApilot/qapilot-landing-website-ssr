/**
 * Inline bootstrap for Clarity session replay.
 *
 * Clarity strict masking can strip `href` from `<link rel="stylesheet">` in the
 * captured DOM, so replays render unstyled HTML even when the live site is fine.
 * Mark stylesheet (and font preload) links before Clarity initializes.
 *
 * @see https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
 * @see https://learn.microsoft.com/en-sg/answers/questions/5648504/how-to-fix-problem-in-clarity-styles-not-loading
 */
export const CLARITY_UNMASK_STYLESHEETS_SCRIPT = `(function(){function u(l){if(l.hasAttribute("data-clarity-unmask"))return;l.setAttribute("data-clarity-unmask","true");}function m(r){r.querySelectorAll('link[rel="stylesheet"][href],link[rel="preload"][as="font"][href]').forEach(u);}m(document.documentElement);if(typeof MutationObserver!=="undefined"){new MutationObserver(function(ms){ms.forEach(function(mu){mu.addedNodes.forEach(function(n){if(n.nodeType!==1)return;if(n.tagName==="LINK"){var rel=n.getAttribute("rel"),href=n.getAttribute("href");if(href&&(rel==="stylesheet"||(rel==="preload"&&n.getAttribute("as")==="font")))u(n);}else if(n.querySelectorAll){m(n);}});});}).observe(document.documentElement,{childList:true,subtree:true});}})();`;
