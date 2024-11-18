export const MODULE_ID = "anonymous";

export function templatePath(...path) {
    path = path.filter((x) => typeof x === "string");
    return `modules/${MODULE_ID}/templates/${path.join("/")}`;
}

export function isGM() {
    const data = game.data;
    const user = data.users.find((x) => x._id === data.userId);
    return !!user && user.role >= CONST.USER_ROLES.GAMEMASTER;
}

export function getFlag(doc, key, fallback) {
    return doc.getFlag(MODULE_ID, key) ?? fallback;
}

export function setFlag(doc, key, value) {
    return doc.setFlag(MODULE_ID, key, value);
}

export function localize(...args) {
    let [key, data] = args;
    key = `${MODULE_ID}.${key}`;
    if (data) return game.i18n.format(key, data);
    return game.i18n.localize(key);
}

export function subLocalize(subKey) {
    const fn = (...args) => localize(`${subKey}.${args[0]}`, args[1]);

    Object.defineProperties(fn, {
        warn: {
            value: (...args) => warn(`${subKey}.${args[0]}`, args[1], args[2]),
            enumerable: false,
            configurable: false,
        },
        info: {
            value: (...args) => info(`${subKey}.${args[0]}`, args[1], args[2]),
            enumerable: false,
            configurable: false,
        },
        error: {
            value: (...args) => error(`${subKey}.${args[0]}`, args[1], args[2]),
            enumerable: false,
            configurable: false,
        },
        has: {
            value: (key) => hasLocalization(`${subKey}.${key}`),
            enumerable: false,
            configurable: false,
        },
        path: {
            value: (key) => localizePath(`${subKey}.${key}`),
            enumerable: false,
            configurable: false,
        },
        template: {
            value: (key, { hash }) => fn(key, hash),
            enumerable: false,
            configurable: false,
        },
    });

    return fn;
}

export function getSameCombatants(combatant) {
    return combatant.combat.turns.filter((x) => x.actorId === combatant.actorId);
}

export function getSetting(key) {
    return game.settings.get(MODULE_ID, key);
}

export function setSetting(key, value) {
    return game.settings.set(MODULE_ID, key, value);
}

export function getActorSceneTokens(scene, actor, linkedOnly = false) {
    return scene.tokens.filter(
        (token) => token.actorId === actor.id && (!linkedOnly || token.actorLink)
    );
}

export function getActorTokens(actor, linkedOnly = false) {
    return game.scenes.map((scene) => getActorSceneTokens(scene, actor, linkedOnly)).flat();
}

export function capitalize(str) {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
}

export function registerSetting(options) {
    const name = options.name;
    options.scope = options.scope ?? "world";
    options.config = options.config ?? false;
    if (options.config) {
        options.name = getSettingLocalizationPath(name, "name");
        options.hint = getSettingLocalizationPath(name, "hint");
    }
    if (Array.isArray(options.choices)) {
        options.choices = options.choices.reduce((choices, choice) => {
            choices[choice] = getSettingLocalizationPath(name, "choices", choice);
            return choices;
        }, {});
    }
    game.settings.register(MODULE_ID, name, options);
}

export function registerSettingMenu(options) {
    const name = options.name;
    options.name = getSettingLocalizationPath("menus", name, "name");
    options.label = getSettingLocalizationPath("menus", name, "label");
    options.hint = getSettingLocalizationPath("menus", name, "hint");
    options.restricted = options.restricted ?? true;
    options.icon = options.icon ?? "fas fa-cogs";
    game.settings.registerMenu(MODULE_ID, name, options);
}

export function getSettingLocalizationPath(...path) {
    return `${MODULE_ID}.settings.${path.join(".")}`;
}

export function getCurrentModule() {
    return game.modules.get(MODULE_ID);
}

function notify(str, arg1, arg2, arg3) {
    const type = typeof arg1 === "string" ? arg1 : "info";
    const data = typeof arg1 === "object" ? arg1 : typeof arg2 === "object" ? arg2 : undefined;
    const permanent =
        typeof arg1 === "boolean" ? arg1 : typeof arg2 === "boolean" ? arg2 : arg3 ?? false;

    ui.notifications.notify(localize(str, data), type, { permanent });
}

export function warn(...args) {
    const [str, arg1, arg2] = args;
    notify(str, "warning", arg1, arg2);
}

export function info(...args) {
    const [str, arg1, arg2] = args;
    notify(str, "info", arg1, arg2);
}

export function error(...args) {
    const [str, arg1, arg2] = args;
    notify(str, "error", arg1, arg2);
}

export function replaceHTMLText(html, regexp, replacement, addSelf = false) {
    let nodes = html.find("*");
    if (addSelf) nodes = nodes.addBack();
    nodes.contents().each((_, el) => {
        if (el.nodeType === Node.TEXT_NODE && el.textContent?.trim()) {
            $(el).replaceWith(el.textContent.replace(regexp, replacement));
        }
    });
}
