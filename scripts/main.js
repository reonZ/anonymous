(()=>{var ce=Object.defineProperty;var r=(e,t)=>ce(e,"name",{value:t,configurable:!0});var g="anonymous";function I(...e){return e=e.filter(t=>typeof t=="string"),`modules/${g}/templates/${e.join("/")}`}r(I,"templatePath");function z(){let e=game.data,t=e.users.find(n=>n._id===e.userId);return!!t&&t.role>=CONST.USER_ROLES.GAMEMASTER}r(z,"isGM");function R(e,t,n){return e.getFlag(g,t)??n}r(R,"getFlag");function b(e,t,n){return e.setFlag(g,t,n)}r(b,"setFlag");function u(...e){let[t,n]=e;return t=`${g}.${t}`,n?game.i18n.format(t,n):game.i18n.localize(t)}r(u,"localize");function U(e){let t=r((...n)=>u(`${e}.${n[0]}`,n[1]),"fn");return Object.defineProperties(t,{warn:{value:(...n)=>P(`${e}.${n[0]}`,n[1],n[2]),enumerable:!1,configurable:!1},info:{value:(...n)=>le(`${e}.${n[0]}`,n[1],n[2]),enumerable:!1,configurable:!1},error:{value:(...n)=>me(`${e}.${n[0]}`,n[1],n[2]),enumerable:!1,configurable:!1},has:{value:n=>hasLocalization(`${e}.${n}`),enumerable:!1,configurable:!1},path:{value:n=>localizePath(`${e}.${n}`),enumerable:!1,configurable:!1},template:{value:(n,{hash:o})=>t(n,o),enumerable:!1,configurable:!1}}),t}r(U,"subLocalize");function G(e){return e.combat.turns.filter(t=>t.actorId===e.actorId)}r(G,"getSameCombatants");function l(e){return game.settings.get(g,e)}r(l,"getSetting");function Y(e,t){return game.settings.set(g,e,t)}r(Y,"setSetting");function fe(e,t,n=!1){return e.tokens.filter(o=>o.actorId===t.id&&(!n||o.actorLink))}r(fe,"getActorSceneTokens");function j(e,t=!1){return game.scenes.map(n=>fe(n,e,t)).flat()}r(j,"getActorTokens");function F(e){return e?e[0].toUpperCase()+e.slice(1):""}r(F,"capitalize");function y(e){let t=e.name;e.scope=e.scope??"world",e.config=e.config??!1,e.config&&(e.name=p(t,"name"),e.hint=p(t,"hint")),Array.isArray(e.choices)&&(e.choices=e.choices.reduce((n,o)=>(n[o]=p(t,"choices",o),n),{})),game.settings.register(g,t,e)}r(y,"registerSetting");function V(e){let t=e.name;e.name=p("menus",t,"name"),e.label=p("menus",t,"label"),e.hint=p("menus",t,"hint"),e.restricted=e.restricted??!0,e.icon=e.icon??"fas fa-cogs",game.settings.registerMenu(g,t,e)}r(V,"registerSettingMenu");function p(...e){return`${g}.settings.${e.join(".")}`}r(p,"getSettingLocalizationPath");function O(){return game.modules.get(g)}r(O,"getCurrentModule");function v(e,t,n,o){let a=typeof t=="string"?t:"info",s=typeof t=="object"?t:typeof n=="object"?n:void 0,c=typeof t=="boolean"?t:typeof n=="boolean"?n:o??!1;ui.notifications.notify(u(e,s),a,{permanent:c})}r(v,"notify");function P(...e){let[t,n,o]=e;v(t,"warning",n,o)}r(P,"warn");function le(...e){let[t,n,o]=e;v(t,"info",n,o)}r(le,"info");function me(...e){let[t,n,o]=e;v(t,"error",n,o)}r(me,"error");function S(e,t,n,o=!1){let a=e.find("*");o&&(a=a.addBack()),a.contents().each((s,c)=>{c.nodeType===Node.TEXT_NODE&&c.textContent?.trim()&&$(c).replaceWith(c.textContent.replace(t,n))})}r(S,"replaceHTMLText");function E(e,t){e.token?W(e.token,t):j(e,!0).forEach(n=>W(n,t))}r(E,"updateActorTokens");function B(e,t){let n=e.object.actor;if(!n||n.hasPlayerOwner)return;let o=ue(n);o.addEventListener("click",()=>h(n)),t.find(".col.right").append(o)}r(B,"renderTokenHUD");function K(e){let t=e.actor;if(!t||t?.hasPlayerOwner)return;let n=e.displayName,o=m(e.actor),a=M(n),s=n;o&&!a&&l("token")?s=X(n):!o&&a&&(s=q(n)),s!==n&&e.updateSource({displayName:s})}r(K,"preCreateToken");function ue(e){let t=document.createElement("template"),n=m(e);return t.innerHTML=`<div class="control-icon${n?" active":""}" data-action="anonymous-toggle">
    <i class="fa-solid fa-signature" title="${u("hud.title")}"></i>
</div>`,t.content.firstChild}r(ue,"createToggle");function W(e,t){t?ge(e):de(e)}r(W,"changeDisplayName");function ge(e){let t=e.displayName;if(M(t)||!l("token"))return;let n=X(t);n!==t&&e.update({displayName:n})}r(ge,"showTokenName");function de(e){let t=e.displayName;if(pe(t))return;let n=q(t);e.update({displayName:n})}r(de,"hideTokenName");function pe(e){return!M(e)}r(pe,"isHidding");function M(e){return e===CONST.TOKEN_DISPLAY_MODES.HOVER||e===CONST.TOKEN_DISPLAY_MODES.ALWAYS}r(M,"isShowing");function q(e){return e===CONST.TOKEN_DISPLAY_MODES.HOVER?CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER:e===CONST.TOKEN_DISPLAY_MODES.ALWAYS?CONST.TOKEN_DISPLAY_MODES.OWNER:e}r(q,"swapToHide");function X(e){return e===CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER?CONST.TOKEN_DISPLAY_MODES.HOVER:e===CONST.TOKEN_DISPLAY_MODES.OWNER?CONST.TOKEN_DISPLAY_MODES.ALWAYS:e}r(X,"swapToShow");function m(e){return e instanceof Combatant&&e.actor&&(e=e.actor),e instanceof Actor&&e.hasPlayerOwner?!0:!!R(e,"showName")}r(m,"playersSeeName");async function h(e){let t=!m(e);e instanceof Actor||!e.actor?await b(e,"showName",t):await b(e.actor,"showName",t),canvas.tokens.hud?.rendered&&canvas.tokens.hud.render();let n=e instanceof Actor?e:e.actor;return n&&E(n,t),t}r(h,"toggleSeeName");function d(e){let t=u("unknown"),n=e instanceof Actor?e.type:e.actor?.type;return n?(A()[n]??"").trim()||D(t,n):t}r(d,"getName");function C(){ui.combat.render()}r(C,"refresh");function A(){return l("names")}r(A,"getSavedNames");function D(e,t){return`${e} ${F(t)}`}r(D,"formatUnknown");function J(e,t){ye({entries:t,defaultData:{name:n=>u(`context.${n}`),icon:"fa-solid fa-signature",callback:n=>{let o=n.attr("data-document-id"),a=game.actors.get(o);a&&h(a)},condition:(n,o)=>{let a=n.attr("data-document-id"),s=game.actors.get(a);return!!s&&!s.hasPlayerOwner&&(o==="show"?!m(s):m(s))}},choices:["show","hide"]})}r(J,"getActorDirectoryEntryContext");function Q(e,t){let n=foundry.utils.getProperty(t,`flags.${g}.showName}`)!==void 0;"ownership"in t&&(E(e,e.hasPlayerOwner),n=!0),n&&C()}r(Q,"onActorUpdate");function ye({entries:e,choices:t,defaultData:n={}}){Array.isArray(t)&&(t=t.reduce((o,a)=>(o[a]={},o),{}));for(let o in t){let a=t[o],s=a.name??(typeof n.name=="function"?n.name(o):n.name)??"",c=a.icon??(typeof n.icon=="function"?n.icon(o):n.icon)??"";if(!$(c).length){let i=$("<i></i>");i.addClass(c),c=i[0].outerHTML}e.unshift({name:s,icon:c,callback:i=>{a.callback?a.callback(i):n.callback&&n.callback(i,o)},condition:i=>a.condition?.(i)??n.condition?.(i,o)??!0})}}r(ye,"addSelectContextEntry");var x=class extends FormApplication{static get defaultOptions(){return foundry.utils.mergeObject(super.defaultOptions,{id:"anonymous-names-menu",title:u("templates.names.title"),template:I("names.html"),width:400})}getData(t){let n=u("unknown"),o=A(),a=Object.keys(game.system.documentTypes.Actor).map(s=>({type:s,value:(o[s]??"").trim(),placeholder:D(n,s)}));return{...super.getData(t),types:a,i18n:U("templates.names")}}activateListeners(t){super.activateListeners(t),t.find("[data-action=cancel]").on("click",()=>this.close())}async _updateObject(t,n){Y("names",n)}};r(x,"AnonymousNamesMenu");function Z({message:e,$html:t,isAnonymous:n,actor:o}){if(n&&e.rolls.length&&l("criticals")){let a=game.i18n.localize("DND5E.CriticalHit"),s=game.i18n.localize("DND5E.PowerfulCritical"),c=new RegExp(` (\\(([\\w ]*)?(?:${a}|${s})([\\w ]*)?\\))$`,"igm"),i=t.find("header .flavor-text");game.user.isGM&&S(i,c,' <span class="anonymous-replaced">$1</span>',!0),S(i,c,"",!0)}}r(Z,"dnd5ParseChat");function ee(){return game.system.id==="dnd5e"&&foundry.utils.isNewerVersion(game.system.version,"2.999.0")}r(ee,"isDnD3");function te(e){y({name:"pf2e.traits",type:String,default:"never",config:!0,choices:{never:p("pf2e.traits.choices.never"),rolls:p("pf2e.traits.choices.rolls"),always:p("pf2e.traits.choices.always")}})}r(te,"pf2eInitHook");function ne(e){e&&he()}r(ne,"pf2eReadyHook");function he(){let e="";if(game.settings.settings.has("pf2e.metagame.tokenSetsNameVisibility")?e="metagame.tokenSetsNameVisibility":game.settings.settings.has("pf2e.metagame_tokenSetsNameVisibility")&&(e="metagame_tokenSetsNameVisibility"),!e||!game.settings.get("pf2e",e))return;let t=O().title,n=game.i18n.localize("PF2E.SETTINGS.Metagame.TokenSetsNameVisibility.Name");game.settings.set("pf2e",e,!1),P("pf2e.disabled",{module:t,setting:n},!0)}r(he,"disableSettings");function re({message:e,isAnonymous:t,$html:n}){let o=game.user.isGM,a=e.target?.actor,s=l("criticals"),c=l("rolls");if(a&&!a.hasPlayerOwner&&!m(a)){let i=n.find('.flavor-text .target-dc [data-whose="target"]');if(i.length){let f=i.first();o?f.attr("data-visibility","gm"):f.text(u("pf2e.target",{name:d(a)}))}}if(!o&&t){let i=l("pf2e.traits");if(e.rolls.length)if(c){let f=n.find(".flavor-text hr + .tags");f.length&&(f.prev("hr").remove(),f.remove()),s&&n.find(".message-content .dice-roll .dice-result .dice-total").css("color","var(--color-text-dark-primary)"),i!=="never"&&n.find(".flavor-text .tags").remove()}else i==="always"&&n.find(".flavor-text .tags").first().remove();else i==="always"&&n.find(".message-content section.tags").remove()}if(t&&e.rolls.length&&c&&s){let i=game.i18n.localize("PF2E.Check.Result.Degree.Attack.criticalSuccess"),f=game.i18n.localize("PF2E.Check.Result.Degree.Attack.success"),k=new RegExp(`(\\((${i}|${f})\\))`,"gmi"),w=o?'<span class="anonymous-replaced">$1</span>':"",T=n.find("header .flavor-text");S(T,k,w,!0)}}r(re,"pf2eParseChat");var Se=/\(dc \d+\)/gim;function oe({message:e,isAnonymous:t,$html:n}){if(game.user.isGM)return;if(t&&l("rolls")){let i=n.find(".dice-tooltip");i.empty(),i.css("padding-top",0),l("criticals")&&n.find(".dice-total").removeClass("critical fumble");let f=n.find(".phase-saving-throws .phase-heading");f.text(f.text().replace(Se,""))}let o=n.find(".phase-attack .token-info .token-name"),a=e.getFlag("wire","activation.attack.targetActorUuid");if(o.length&&a)try{let i=fromUuidSync(a)?.actor;i&&!i.hasPlayerOwner&&!m(i)&&o.text(d(i))}catch(i){console.error(i)}let s=n.find(".phase-saving-throws .saving-throw-target:has(.target-name)"),c=e.getFlag("wire","activation.targetUuids");if(s.length&&c?.length)try{for(let i of c){let f=fromUuidSync(i)?.actor;f&&!f.hasPlayerOwner&&!m(f)&&s.filter(`[data-actor-id="${i}"]`).find(".target-name").text(d(f))}}catch(i){console.error(i)}}r(oe,"wireParseChat");var L=_(),H=_(),N=_();function ae(){switch(game.system.id){case"pf2e":L.add(te),H.add(ne),N.add(re);break;case"dnd5e":N.add(Z);break}game.modules.get("wire")?.active&&N.add(oe)}r(ae,"thirdPartyInitialization");function _(){let e=[],t=r(function(...n){e.forEach(o=>o(...n))},"f");return t.add=n=>e.push(n),t}r(_,"createThirdPartyListener");function ie(e,t){if(e.blind)return;t=t instanceof HTMLElement?$(t):t;let n=game.user.isGM,o=e.speaker,a=ChatMessage.getSpeakerActor(o),s=!a||m(a),c=!!a&&!a.hasPlayerOwner;if(a&&!s&&ke(e,a,t),!n&&c){if(e.rolls.length&&l("rolls")){let i=t.find(".message-content .dice-roll .dice-result");i.find(".dice-formula, .dice-tooltip").remove(),l("criticals")&&i.find(".dice-total").removeClass("critical fumble")}l("footer")&&t.find(".message-content footer.card-footer").remove(),l("cardContent")&&t.find(".message-content .card-content").remove()}N({message:e,actor:a,$html:t,playersCanSee:s,isAnonymous:c})}r(ie,"renderChatMessage");function ke(e,t,n){let o=e.speaker,a=new Set;if(o.alias&&a.add(o.alias),t.name&&a.add(t.name),o.token&&o.scene){let T=game.scenes.get(o.scene)?.tokens.get(o.token);T?.name&&a.add(T.name)}if(!a.size)return;let c=Array.from(a).map(w=>RegExp.escape(w)).join("|"),i=new RegExp(`(^|\\P{L})(${c})(?=\\P{L}|$)`,"gmu"),f=d(t),k=game.user.isGM?`$1 <span class="anonymous-replaced" title="${f}">$2</span>`:` ${f}`;S(n,i,k)}r(ke,"changeNames");function se(e,t){let n=ui.combat.viewed?.combatants;!n||!n.size||t.find("#combat-tracker .combatant").each(function(){let o=this.dataset.combatantId,a=n.get(o);if(!a||!a.actor||a.actor.hasPlayerOwner)return;let s=m(a);if(game.user.isGM){let c=this.querySelector(".combatant-controls"),i=c.querySelector('.combatant-control[data-control="toggleHidden"]'),f=Ne(s);f.addEventListener("click",k=>xe(k,a)),i?i.after(f):c.appendChild(f)}else if(!s){let c=this.querySelector("h4");c.textContent=d(a)}})}r(se,"renderCombatTracker");function xe(e,t){e.preventDefault(),e.stopPropagation(),e.shiftKey&&t.actor&&t.actor.isToken&&game.combat?.scene?G(t).forEach(h):h(t)}r(xe,"toggleCombatantName");function Ne(e){let t=document.createElement("template"),n=e?"context.hide":"context.show";return t.innerHTML=`<a
    class="combatant-control${e?" active":""}"
    data-control="toggle-name-visibility"
    data-tooltip="${u(n)}"
>
    <i class="fa-solid fa-signature"></i>
</a>`,t.content.firstChild}r(Ne,"createToggle");Hooks.once("init",()=>{y({name:"version",type:String,default:""}),y({name:"names",type:Object,default:{},onChange:C}),y({name:"token",type:Boolean,default:!0,config:!0}),y({name:"rolls",type:Boolean,default:!0,config:!0}),y({name:"criticals",type:Boolean,default:!0,config:!0}),y({name:"cardContent",type:Boolean,default:!1,config:!0}),y({name:"footer",type:Boolean,default:!1,config:!0}),V({name:"namesMenu",type:x}),O().api={playersSeeName:m,toggleSeeName:h,getName:d};let e=z();e&&(Hooks.on("getActorDirectoryEntryContext",J),Hooks.on("renderTokenHUD",B)),ae(),L(e),Hooks.on("renderCombatTracker",se),Hooks.on(ee()?"dnd5e.renderChatMessage":"renderChatMessage",ie),Hooks.on("preCreateToken",K),Hooks.on("updateActor",Q)});Hooks.once("ready",()=>{H(game.user.isGM)});})();
//# sourceMappingURL=main.js.map
