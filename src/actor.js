import { playersSeeName, refresh, toggleSeeName } from "./api";
import { MODULE_ID, localize } from "./module";
import { updateActorTokens } from "./token";

export function getActorDirectoryEntryContext(html, entries) {
    addSelectContextEntry({
        entries,
        defaultData: {
            name: (choice) => localize(`context.${choice}`),
            icon: "fa-solid fa-signature",
            callback: ($li) => {
                const id = $li.attr("data-document-id");
                const actor = game.actors.get(id);
                if (actor) toggleSeeName(actor);
            },
            condition: ($li, choice) => {
                const id = $li.attr("data-document-id");
                const actor = game.actors.get(id);
                return (
                    !!actor &&
                    !actor.hasPlayerOwner &&
                    (choice === "show" ? !playersSeeName(actor) : playersSeeName(actor))
                );
            },
        },
        choices: ["show", "hide"],
    });
}

export function onActorUpdate(actor, data) {
    let needsRefresh =
        foundry.utils.getProperty(data, `flags.${MODULE_ID}.showName}`) !== undefined;

    if ("ownership" in data) {
        updateActorTokens(actor, actor.hasPlayerOwner);
        needsRefresh = true;
    }

    if (needsRefresh) refresh();
}

function addSelectContextEntry({ entries, choices, defaultData = {} }) {
    if (Array.isArray(choices)) {
        choices = choices.reduce((acc, curr) => {
            acc[curr] = {};
            return acc;
        }, {});
    }

    for (const key in choices) {
        const choice = choices[key];
        const name =
            choice.name ??
            (typeof defaultData.name === "function" ? defaultData.name(key) : defaultData.name) ??
            "";

        let icon =
            choice.icon ??
            (typeof defaultData.icon === "function" ? defaultData.icon(key) : defaultData.icon) ??
            "";
        if (!$(icon).length) {
            const $icon = $("<i></i>");
            $icon.addClass(icon);
            icon = $icon[0].outerHTML;
        }

        entries.unshift({
            name,
            icon,
            callback: ($li) => {
                if (choice.callback) choice.callback($li);
                else if (defaultData.callback) defaultData.callback($li, key);
            },
            condition: ($li) =>
                choice.condition?.($li) ?? defaultData.condition?.($li, key) ?? true,
        });
    }
}
