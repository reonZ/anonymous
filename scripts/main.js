var $1623e5e7c705b7c7$export$2e2bcd8739ae039 = "anonymous";


function $f13521bdeed07ab3$export$90835e7e06f4e75b(id) {
    return game.modules.get(id);
}
function $f13521bdeed07ab3$export$afac0fc6c5fe0d6() {
    return $f13521bdeed07ab3$export$90835e7e06f4e75b((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039));
}
function $f13521bdeed07ab3$export$d60ce5b76fc8cf55(id) {
    return $f13521bdeed07ab3$export$90835e7e06f4e75b(id)?.api;
}




function $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc(...path) {
    return `${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}.settings.${path.join(".")}`;
}
function $ee65ef5b7d5dd2ef$export$79b67f6e2f31449(...path) {
    return `flags.${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}.${path.join("/")}`;
}
function $ee65ef5b7d5dd2ef$export$bdd507c72609c24e(...path) {
    return `modules/${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}/templates/${path.join("/")}`;
}
function $ee65ef5b7d5dd2ef$export$6d1a79e7c04100c2(...path) {
    return `modules/${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}/images/${path.join("/")}`;
}


function $b29eb7e0eb12ddbc$export$8206e8d612b3e63(key) {
    return game.settings.get((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), key);
}
function $b29eb7e0eb12ddbc$export$61fd6f1ddd0c20e2(key, value) {
    return game.settings.set((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), key, value);
}
function $b29eb7e0eb12ddbc$export$3bfe3819d89751f0(options) {
    const name = options.name;
    options.scope = options.scope ?? "world";
    options.config = options.config ?? false;
    if (options.config) {
        options.name = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)(name, "name");
        options.hint = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)(name, "hint");
    }
    game.settings.register((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), name, options);
}
function $b29eb7e0eb12ddbc$export$cd2f7161e4d70860(options) {
    const name = options.name;
    options.name = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)("menus", name, "name");
    options.label = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)("menus", name, "label");
    options.hint = (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)("menus", name, "hint");
    options.restricted = options.restricted ?? true;
    options.icon = options.icon ?? "fas fa-cogs";
    game.settings.registerMenu((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), name, options);
}
function $b29eb7e0eb12ddbc$export$8cb4a6769fa1780e() {
    return game.settings.get("core", "combatTrackerConfig");
}


function $d3c956a52a17449c$export$7d75da6d34f1a955() {
    const data = game.data;
    const user = data.users.find((x)=>x._id === data.userId);
    return !!user && user.role >= CONST.USER_ROLES.GAMEMASTER;
}
function $d3c956a52a17449c$export$148de59b68ce26ae(doc, connected = false) {
    if (connected) return game.users.filter((x)=>x.active && doc.testUserPermission(x, "OWNER"));
    return game.users.filter((x)=>doc.testUserPermission(x, "OWNER"));
}
function $d3c956a52a17449c$export$5f4ed0d56c2c0edf(doc, connected = false) {
    if (connected) return game.users.find((x)=>x.active && doc.testUserPermission(x, "OWNER"));
    return game.users.find((x)=>doc.testUserPermission(x, "OWNER"));
}
function $d3c956a52a17449c$export$31d9ed870e9f0a1d(connected = false) {
    if (connected) return game.users.find((x)=>x.active && x.isGM);
    return game.users.find((x)=>x.isGM);
}



const $90eb2d5b4bfcd8b9$var$CAMEL_CASE_REGEX = /[_ -]+([a-zA-Z0-9])/g;
const $90eb2d5b4bfcd8b9$var$SNAKE_CASE_REGEX = / +/g;
function $90eb2d5b4bfcd8b9$export$9a00dee1beb8f576(str) {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
}
function $90eb2d5b4bfcd8b9$export$8a7688a96d852767(str) {
    return str.replace($90eb2d5b4bfcd8b9$var$CAMEL_CASE_REGEX, (_, c)=>c.toUpperCase());
}
function $90eb2d5b4bfcd8b9$export$feae9a740c003485(str) {
    return str.toLowerCase().replace($90eb2d5b4bfcd8b9$var$SNAKE_CASE_REGEX, "-");
}


function $df27718be4198c7c$export$6c37cca2e10544cd(name, fn) {
    if (Handlebars.helpers[name]) return;
    Handlebars.registerHelper(name, fn);
}
function $df27718be4198c7c$export$a4dc1d8054f0768() {
    const name = (0, $90eb2d5b4bfcd8b9$export$8a7688a96d852767)((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039));
    $df27718be4198c7c$export$6c37cca2e10544cd(name, function(key, options) {
        key = `${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}.templates.${key}`;
        const data = options.hash;
        return isEmpty(data) ? game.i18n.localize(key) : game.i18n.format(key, data);
    });
}


/**
 * icons can be classes instead of html element
 */ function $9568b121fc04b4b0$export$aeed257e47db9925({ entries: entries , choices: choices , defaultData: defaultData = {}  }) {
    if (Array.isArray(choices)) choices = choices.reduce((acc, curr)=>{
        acc[curr] = {};
        return acc;
    }, {});
    for(const key in choices){
        const choice = choices[key];
        const name = choice.name ?? (typeof defaultData.name === "function" ? defaultData.name(key) : defaultData.name) ?? "";
        let icon = choice.icon ?? (typeof defaultData.icon === "function" ? defaultData.icon(key) : defaultData.icon) ?? "";
        if (!$(icon).length) {
            const $icon = $("<i></i>");
            $icon.addClass(icon);
            icon = $icon[0].outerHTML;
        }
        entries.unshift({
            name: name,
            icon: icon,
            callback: ($li)=>{
                if (choice.callback) choice.callback($li);
                else if (defaultData.callback) defaultData.callback($li, key);
            },
            condition: ($li)=>choice.condition?.($li) ?? defaultData.condition?.($li, key) ?? true
        });
    }
}



function $889355b5c39241f1$export$b3bd0bc58e36cd63(key, data) {
    key = `${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}.${key}`;
    if (data) return game.i18n.format(key, data);
    return game.i18n.localize(key);
}
function $889355b5c39241f1$export$a2435eff6fb7f6c1(subKey) {
    return (key, data)=>$889355b5c39241f1$export$b3bd0bc58e36cd63(`${subKey}.${key}`, data);
}




function $53cf1f1c9c92715e$export$eb8e976fd8646538(doc) {
    // @ts-ignore
    return !!doc.flags && (0, $1623e5e7c705b7c7$export$2e2bcd8739ae039) in doc.flags;
}
function $53cf1f1c9c92715e$export$a19b74191e00c5e(doc, key, ...keys) {
    keys.unshift(key);
    return doc.getFlag((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), keys.join("."));
}
function $53cf1f1c9c92715e$export$5e165df1e30a1331(doc, key, value) {
    return doc.setFlag((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), key, value);
}



function $2498048dd39926c2$export$99925ce9e702f588(actor, linkedOnly = false) {
    return game.scenes.map((scene)=>scene.tokens.filter((token)=>token.actorId === actor.id && (!linkedOnly || token.actorLink))).flat();
}
function $2498048dd39926c2$export$b64e7dcb984d6faa(actor, connected = false) {
    if (connected) return game.users.find((x)=>x.active && x.character === actor);
    return game.users.find((x)=>x.character === actor);
}




function $66d137fe0087513e$export$be34e5e3e46994ad(actor, showName) {
    if (actor.token) $66d137fe0087513e$var$changeDisplayName(actor.token, showName);
    else (0, $2498048dd39926c2$export$99925ce9e702f588)(actor, true).forEach((x)=>$66d137fe0087513e$var$changeDisplayName(x, showName));
}
function $66d137fe0087513e$var$changeDisplayName(token, showName) {
    if (showName) $66d137fe0087513e$var$showTokenName(token);
    else $66d137fe0087513e$var$hideTokenName(token);
}
function $66d137fe0087513e$var$isHidding(displayName) {
    return !$66d137fe0087513e$var$isShowing(displayName);
}
function $66d137fe0087513e$var$isShowing(displayName) {
    return displayName === CONST.TOKEN_DISPLAY_MODES.HOVER || displayName === CONST.TOKEN_DISPLAY_MODES.ALWAYS;
}
function $66d137fe0087513e$var$swapToHide(displayName) {
    if (displayName === CONST.TOKEN_DISPLAY_MODES.HOVER) return CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER;
    if (displayName === CONST.TOKEN_DISPLAY_MODES.ALWAYS) return CONST.TOKEN_DISPLAY_MODES.OWNER;
    return displayName;
}
function $66d137fe0087513e$var$hideTokenName(token) {
    const displayName = token.displayName;
    if ($66d137fe0087513e$var$isHidding(displayName)) return;
    const swap = $66d137fe0087513e$var$swapToHide(displayName);
    token.update({
        displayName: swap
    });
}
function $66d137fe0087513e$var$showTokenName(token) {
    const displayName = token.displayName;
    if ($66d137fe0087513e$var$isShowing(displayName) || !(0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("token")) return;
    let swap = displayName;
    if (swap === CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER) swap = CONST.TOKEN_DISPLAY_MODES.HOVER;
    else if (swap === CONST.TOKEN_DISPLAY_MODES.OWNER) swap = CONST.TOKEN_DISPLAY_MODES.ALWAYS;
    token.update({
        displayName: swap
    });
}
function $66d137fe0087513e$export$42b0bd17e532cdc8(hud, html) {
    const actor = hud.object.actor;
    if (!actor || actor.hasPlayerOwner) return;
    const toggle = $66d137fe0087513e$var$createToggle(actor);
    toggle.addEventListener("click", ()=>(0, $8435b8d847fb3eb7$export$bc948612f77bd16a)(actor));
    html.find(".col.right").append(toggle);
}
function $66d137fe0087513e$var$createToggle(actor) {
    const tmp = document.createElement("template");
    const toggled = (0, $8435b8d847fb3eb7$export$7fd1aaec5430227)(actor);
    tmp.innerHTML = `<div class="control-icon${toggled ? " active" : ""}" data-action="anonymous-toggle">
    <i class="fa-solid fa-signature"></i>
</div>`;
    return tmp.content.firstChild;
}
function $66d137fe0087513e$export$11b98ebb95bc750d(token) {
    if (token.actor?.hasPlayerOwner) return;
    const displayName = token.displayName;
    const swap = $66d137fe0087513e$var$swapToHide(displayName);
    if (swap !== displayName) token._source.displayName = swap;
}




function $fab42eb3dee39b5b$export$2d6e9b4c68afb6c8() {
    ui.combat.render();
}
function $fab42eb3dee39b5b$export$55e1a7855fc6175e() {
    return (0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("names");
}
function $fab42eb3dee39b5b$export$cd50fa6b5facbf50(unknown, type) {
    return `${unknown} ${(0, $90eb2d5b4bfcd8b9$export$9a00dee1beb8f576)(type)}`;
}


function $8435b8d847fb3eb7$export$7fd1aaec5430227(doc) {
    if (doc instanceof Actor || !doc.actor) return !!(0, $53cf1f1c9c92715e$export$a19b74191e00c5e)(doc, "showName");
    return !!(0, $53cf1f1c9c92715e$export$a19b74191e00c5e)(doc.actor, "showName");
}
async function $8435b8d847fb3eb7$export$bc948612f77bd16a(doc) {
    const showName = !$8435b8d847fb3eb7$export$7fd1aaec5430227(doc);
    if (doc instanceof Actor || !doc.actor) await (0, $53cf1f1c9c92715e$export$5e165df1e30a1331)(doc, "showName", showName);
    else await (0, $53cf1f1c9c92715e$export$5e165df1e30a1331)(doc.actor, "showName", showName);
    if (canvas.tokens.hud?.rendered) canvas.tokens.hud.render();
    const actor = doc instanceof Actor ? doc : doc.actor;
    if (actor) (0, $66d137fe0087513e$export$be34e5e3e46994ad)(actor, showName);
    return showName;
}
function $8435b8d847fb3eb7$export$7d9f7e9c1c02b41e(doc) {
    const unknown = (0, $889355b5c39241f1$export$b3bd0bc58e36cd63)("unknown");
    const type = doc instanceof Actor ? doc.type : doc.actor?.type;
    if (!type) return unknown;
    const saved = ((0, $fab42eb3dee39b5b$export$55e1a7855fc6175e)()[type] ?? "").trim();
    return saved || (0, $fab42eb3dee39b5b$export$cd50fa6b5facbf50)(unknown, type);
}




function $d2969b5a047bb891$export$f6fe816dc3e996b0(html, entries) {
    (0, $9568b121fc04b4b0$export$aeed257e47db9925)({
        entries: entries,
        defaultData: {
            name: (choice)=>(0, $889355b5c39241f1$export$b3bd0bc58e36cd63)(`context.${choice}`),
            icon: "fa-solid fa-signature",
            callback: ($li)=>{
                const id = $li.attr("data-document-id");
                const actor = game.actors.get(id);
                if (actor) (0, $8435b8d847fb3eb7$export$bc948612f77bd16a)(actor);
            },
            condition: ($li, choice)=>{
                const id = $li.attr("data-document-id");
                const actor = game.actors.get(id);
                return !!actor && !actor.hasPlayerOwner && (choice === "show" ? !(0, $8435b8d847fb3eb7$export$7fd1aaec5430227)(actor) : (0, $8435b8d847fb3eb7$export$7fd1aaec5430227)(actor));
            }
        },
        choices: [
            "show",
            "hide"
        ]
    });
}
function $d2969b5a047bb891$export$8f37cf2254e40534(actor, data) {
    let needsRefresh = getProperty(data, (0, $ee65ef5b7d5dd2ef$export$79b67f6e2f31449)("showName")) !== undefined;
    if ("ownership" in data) {
        (0, $66d137fe0087513e$export$be34e5e3e46994ad)(actor, actor.hasPlayerOwner);
        needsRefresh = true;
    }
    if (needsRefresh) (0, $fab42eb3dee39b5b$export$2d6e9b4c68afb6c8)();
}






function $6794b3ccea49c96d$export$bf316bfda23dc5ca() {
    return game.system.documentTypes.Actor;
}



class $24729960e4a01579$export$6d2a6bcfaaec5f64 extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "anonymous-names-menu",
            title: (0, $889355b5c39241f1$export$b3bd0bc58e36cd63)("templates.names.title"),
            template: (0, $ee65ef5b7d5dd2ef$export$bdd507c72609c24e)("names.html"),
            width: 400
        });
    }
    getData(options) {
        const unknown = (0, $889355b5c39241f1$export$b3bd0bc58e36cd63)("unknown");
        const saved = (0, $fab42eb3dee39b5b$export$55e1a7855fc6175e)();
        const types = (0, $6794b3ccea49c96d$export$bf316bfda23dc5ca)().map((x)=>({
                type: x,
                value: (saved[x] ?? "").trim(),
                placeholder: (0, $fab42eb3dee39b5b$export$cd50fa6b5facbf50)(unknown, x)
            }));
        return {
            ...super.getData(options),
            types: types
        };
    }
    activateListeners(html) {
        super.activateListeners(html);
        html.find("[data-action=cancel]").on("click", ()=>this.close());
    }
    async _updateObject(event, formData) {
        (0, $b29eb7e0eb12ddbc$export$61fd6f1ddd0c20e2)("names", formData);
    }
}



function $f89c90010a6c8f0b$export$5ba7e9d04e0f19d(html, regexp, replacement, addSelf = false) {
    let $nodes = html.find("*");
    if (addSelf) $nodes = $nodes.addBack();
    $nodes.contents().each((_, el)=>{
        if (el.nodeType === Node.TEXT_NODE && el.textContent?.trim()) $(el).replaceWith(el.textContent.replace(regexp, replacement));
    });
}





function $befe1a89932b5fb0$export$1cab9c19b5d4cfd9({ message: message , $html: $html , playersCanSee: playersCanSee  }) {
    if (playersCanSee) return;
    const isGM = game.user.isGM;
    if (message.rolls.length && (0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("criticals")) {
        const critical = game.i18n.localize("DND5E.CriticalHit");
        const powerful = game.i18n.localize("DND5E.PowerfulCritical");
        const regexp = new RegExp(` (\\(([\\w ]*)?(?:${critical}|${powerful})([\\w ]*)?\\))$`, "igm");
        const $flavor = $html.find("header .flavor-text");
        if (isGM) (0, $f89c90010a6c8f0b$export$5ba7e9d04e0f19d)($flavor, regexp, ' <span class="anonymous-replaced">$1</span>', true);
        (0, $f89c90010a6c8f0b$export$5ba7e9d04e0f19d)($flavor, regexp, "", true);
    }
}
function $befe1a89932b5fb0$export$ef839143460864c8(isGM) {}




function $d20bc07084c62caf$export$5e14cdade93d6f7b(str, arg1, arg2, arg3) {
    const type = typeof arg1 === "string" ? arg1 : "info";
    const data = typeof arg1 === "object" ? arg1 : typeof arg2 === "object" ? arg2 : undefined;
    const permanent = typeof arg1 === "boolean" ? arg1 : typeof arg2 === "boolean" ? arg2 : arg3 ?? false;
    ui.notifications.notify((0, $889355b5c39241f1$export$b3bd0bc58e36cd63)(str, data), type, {
        permanent: permanent
    });
}
function $d20bc07084c62caf$export$c106dd0671a0fc2d(str, arg1, arg2) {
    $d20bc07084c62caf$export$5e14cdade93d6f7b(str, "warning", arg1, arg2);
}
function $d20bc07084c62caf$export$a80b3bd66acc52ff(str, arg1, arg2) {
    $d20bc07084c62caf$export$5e14cdade93d6f7b(str, "info", arg1, arg2);
}
function $d20bc07084c62caf$export$a3bc9b8ed74fc(str, arg1, arg2) {
    $d20bc07084c62caf$export$5e14cdade93d6f7b(str, "error", arg1, arg2);
}






function $6c597d232d6f5f12$export$a0f2b21598221a1e(isGM) {
    (0, $b29eb7e0eb12ddbc$export$3bfe3819d89751f0)({
        name: "pf2e.traits",
        type: String,
        default: "never",
        config: true,
        choices: {
            never: (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)("pf2e.traits.choices.never"),
            rolls: (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)("pf2e.traits.choices.rolls"),
            always: (0, $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc)("pf2e.traits.choices.always")
        }
    });
}
function $6c597d232d6f5f12$export$f5188df7f3573bdf(isGM) {
    if (isGM) $6c597d232d6f5f12$var$disableSettings();
}
function $6c597d232d6f5f12$var$disableSettings() {
    let key = "";
    if (game.settings.settings.has("pf2e.metagame.tokenSetsNameVisibility")) key = "metagame.tokenSetsNameVisibility";
    else if (game.settings.settings.has("pf2e.metagame_tokenSetsNameVisibility")) key = "metagame_tokenSetsNameVisibility";
    if (!key || !game.settings.get("pf2e", key)) return;
    const module = (0, $f13521bdeed07ab3$export$afac0fc6c5fe0d6)().title;
    const setting = game.i18n.localize("PF2E.SETTINGS.Metagame.TokenSetsNameVisibility.Name");
    game.settings.set("pf2e", key, false);
    (0, $d20bc07084c62caf$export$c106dd0671a0fc2d)("pf2e.disabled", {
        module: module,
        setting: setting
    }, true);
}
function $6c597d232d6f5f12$export$92c83b7d19bc5f58({ message: message , playersCanSee: playersCanSee , $html: $html  }) {
    const isGM = game.user.isGM;
    const target = message.target?.actor;
    const criticals = (0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("criticals");
    const rolls = (0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("rolls");
    if (target && !target.hasPlayerOwner && !(0, $8435b8d847fb3eb7$export$7fd1aaec5430227)(target)) {
        const $targets = $html.find('header .flavor-text .target-dc [data-whose="target"]');
        if ($targets.length) {
            const $target = $targets.first();
            if (isGM) $target.attr("data-visibility", "gm");
            else $target.remove();
        }
    }
    if (!isGM && !playersCanSee) {
        const traits = (0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("pf2e.traits");
        if (message.rolls.length) {
            if (rolls) {
                const $tags = $html.find("header .flavor-text hr + .tags");
                if ($tags.length) {
                    $tags.prev("hr").remove();
                    $tags.remove();
                }
                if (criticals) $html.find(".message-content .dice-roll .dice-result .dice-total").removeClass("success failure");
                if (traits !== "never") $html.find("header .flavor-text .tags").remove();
            } else if (traits === "always") $html.find("header .flavor-text .tags").first().remove();
        } else if (traits === "always") $html.find(".message-content section.tags").remove();
    }
    if (!playersCanSee && message.rolls.length && rolls && criticals) {
        const critical = game.i18n.localize("PF2E.Check.Result.Degree.Attack.criticalSuccess");
        const hit = game.i18n.localize("PF2E.Check.Result.Degree.Attack.success");
        const regex = new RegExp(`(\\((${critical}|${hit})\\))`, "gmi");
        const str = isGM ? '<span class="anonymous-replaced">$1</span>' : "";
        const flavor = $html.find("header .flavor-text");
        (0, $f89c90010a6c8f0b$export$5ba7e9d04e0f19d)(flavor, regex, str, true);
    }
}


const $7dfb009370bda395$export$e881906e723788e4 = $7dfb009370bda395$var$createThirdPartyListener();
const $7dfb009370bda395$export$8bb131958b3f64d = $7dfb009370bda395$var$createThirdPartyListener();
const $7dfb009370bda395$export$9f8da9d492856387 = $7dfb009370bda395$var$createThirdPartyListener();
function $7dfb009370bda395$export$3f54c3168907b251() {
    switch(game.system.id){
        case "pf2e":
            $7dfb009370bda395$export$e881906e723788e4.add((0, $6c597d232d6f5f12$export$a0f2b21598221a1e));
            $7dfb009370bda395$export$8bb131958b3f64d.add((0, $6c597d232d6f5f12$export$f5188df7f3573bdf));
            $7dfb009370bda395$export$9f8da9d492856387.add((0, $6c597d232d6f5f12$export$92c83b7d19bc5f58));
            break;
        case "dnd5e":
            // thirdPartyInitHooks.add(dnd5InitHook)
            $7dfb009370bda395$export$9f8da9d492856387.add((0, $befe1a89932b5fb0$export$1cab9c19b5d4cfd9));
            break;
    }
}
function $7dfb009370bda395$var$createThirdPartyListener() {
    const a = [];
    const f = function(...args) {
        a.forEach((x)=>x(...args));
    };
    f.add = (fn)=>a.push(fn);
    return f;
}


function $cf4c32f03d9bb335$export$e34687540c625f04(message, html) {
    if (message.blind) return;
    const isGM = game.user.isGM;
    const speaker = message.speaker;
    const actor = ChatMessage.getSpeakerActor(speaker);
    const playersCanSee = !!actor && (actor.hasPlayerOwner || (0, $8435b8d847fb3eb7$export$7fd1aaec5430227)(actor));
    if (actor && !playersCanSee) {
        $cf4c32f03d9bb335$var$changeNames(message, actor, html);
        if (!isGM) {
            if (message.rolls.length && (0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("rolls")) {
                const $result = html.find(".message-content .dice-roll .dice-result");
                $result.find(".dice-formula, .dice-tooltip").remove();
                if ((0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("criticals")) $result.find(".dice-total").removeClass("critical fumble");
            }
            if ((0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("footer")) html.find(".message-content footer.card-footer").remove();
            if ((0, $b29eb7e0eb12ddbc$export$8206e8d612b3e63)("cardContent")) html.find(".message-content .card-content").remove();
        }
    }
    (0, $7dfb009370bda395$export$9f8da9d492856387)({
        message: message,
        actor: actor,
        $html: html,
        playersCanSee: playersCanSee
    });
}
function $cf4c32f03d9bb335$var$changeNames(message, actor, html) {
    const speaker = message.speaker;
    const names = new Set();
    names.add(speaker.alias);
    names.add(actor.name);
    if (speaker.token && speaker.scene) {
        const scene = game.scenes.get(speaker.scene);
        const token = scene?.tokens.get(speaker.token);
        if (token) names.add(token.name);
    }
    const joined = Array.from(names).join("|");
    const regexp = new RegExp(`(${joined})`, "gmi");
    const renamed = (0, $8435b8d847fb3eb7$export$7d9f7e9c1c02b41e)(actor);
    const replacement = game.user.isGM ? `<span class="anonymous-replaced" title="${renamed}">$1</span>` : renamed;
    (0, $f89c90010a6c8f0b$export$5ba7e9d04e0f19d)(html, regexp, replacement);
}





function $99e5415e8dd284c4$export$bcf8b28967963762(tracker, html) {
    const combatants = ui.combat.viewed?.combatants;
    if (!combatants || !combatants.size) return;
    html.find("#combat-tracker .combatant").each(function() {
        const id = this.dataset.combatantId;
        const combatant = combatants.get(id);
        if (!combatant || combatant.hasPlayerOwner) return;
        const showName = (0, $8435b8d847fb3eb7$export$7fd1aaec5430227)(combatant);
        if (game.user.isGM) {
            const controls = this.querySelector(".combatant-controls");
            const hidden = controls.querySelector('.combatant-control[data-control="toggleHidden"]');
            const toggle = $99e5415e8dd284c4$var$createToggle(showName);
            toggle.addEventListener("click", (event)=>$99e5415e8dd284c4$var$toggleCombatantName(event, combatant));
            if (hidden) hidden.after(toggle);
            else controls.appendChild(toggle);
        } else if (!showName) {
            const h4 = this.querySelector("h4");
            h4.textContent = (0, $8435b8d847fb3eb7$export$7d9f7e9c1c02b41e)(combatant);
        }
    });
}
function $99e5415e8dd284c4$var$createToggle(active) {
    const tmp = document.createElement("template");
    tmp.innerHTML = `<a
    class="combatant-control${active ? " active" : ""}"
    data-control="toggle-name-visibility"
>
    <i class="fa-solid fa-signature"></i>
</a>`;
    return tmp.content.firstChild;
}
function $99e5415e8dd284c4$var$toggleCombatantName(event, combatant) {
    event.preventDefault();
    event.stopPropagation();
    (0, $8435b8d847fb3eb7$export$bc948612f77bd16a)(combatant);
}



Hooks.once("init", ()=>{
    (0, $df27718be4198c7c$export$a4dc1d8054f0768)();
    (0, $b29eb7e0eb12ddbc$export$3bfe3819d89751f0)({
        name: "version",
        type: String,
        default: ""
    });
    (0, $b29eb7e0eb12ddbc$export$3bfe3819d89751f0)({
        name: "names",
        type: Object,
        default: {},
        onChange: (0, $fab42eb3dee39b5b$export$2d6e9b4c68afb6c8)
    });
    (0, $b29eb7e0eb12ddbc$export$3bfe3819d89751f0)({
        name: "token",
        type: Boolean,
        default: true,
        config: true
    });
    (0, $b29eb7e0eb12ddbc$export$3bfe3819d89751f0)({
        name: "rolls",
        type: Boolean,
        default: true,
        config: true
    });
    (0, $b29eb7e0eb12ddbc$export$3bfe3819d89751f0)({
        name: "criticals",
        type: Boolean,
        default: true,
        config: true
    });
    (0, $b29eb7e0eb12ddbc$export$3bfe3819d89751f0)({
        name: "cardContent",
        type: Boolean,
        default: false,
        config: true
    });
    (0, $b29eb7e0eb12ddbc$export$3bfe3819d89751f0)({
        name: "footer",
        type: Boolean,
        default: false,
        config: true
    });
    (0, $b29eb7e0eb12ddbc$export$cd2f7161e4d70860)({
        name: "namesMenu",
        type: (0, $24729960e4a01579$export$6d2a6bcfaaec5f64)
    });
    (0, $f13521bdeed07ab3$export$afac0fc6c5fe0d6)().api = {
        playersSeeName: $8435b8d847fb3eb7$export$7fd1aaec5430227,
        toggleSeeName: $8435b8d847fb3eb7$export$bc948612f77bd16a,
        getName: $8435b8d847fb3eb7$export$7d9f7e9c1c02b41e
    };
    const gm = (0, $d3c956a52a17449c$export$7d75da6d34f1a955)();
    if (gm) {
        Hooks.on("getActorDirectoryEntryContext", (0, $d2969b5a047bb891$export$f6fe816dc3e996b0));
        Hooks.on("renderTokenHUD", (0, $66d137fe0087513e$export$42b0bd17e532cdc8));
    }
    (0, $7dfb009370bda395$export$3f54c3168907b251)();
    (0, $7dfb009370bda395$export$e881906e723788e4)(gm);
});
Hooks.once("ready", ()=>{
    (0, $7dfb009370bda395$export$8bb131958b3f64d)(game.user.isGM);
});
Hooks.on("renderCombatTracker", (0, $99e5415e8dd284c4$export$bcf8b28967963762));
Hooks.on("renderChatMessage", (0, $cf4c32f03d9bb335$export$e34687540c625f04));
Hooks.on("preCreateToken", (0, $66d137fe0087513e$export$11b98ebb95bc750d));
Hooks.on("updateActor", (0, $d2969b5a047bb891$export$8f37cf2254e40534));


//# sourceMappingURL=main.js.map
