import { getActorTokens } from './@utils/foundry/actor'
import { getSetting } from './@utils/foundry/settings'
import { playersSeeName, toggleSeeName } from './api'

export function updateActorTokens(actor: Actor, showName: boolean) {
    if (actor.token) changeDisplayName(actor.token, showName)
    else getActorTokens(actor, true).forEach(x => changeDisplayName(x, showName))
}

function changeDisplayName(token: TokenDocument, showName: boolean) {
    if (showName) showTokenName(token)
    else hideTokenName(token)
}

function isHidding(displayName: TokenDisplayMode) {
    return !isShowing(displayName)
}

function isShowing(displayName: TokenDisplayMode) {
    return displayName === CONST.TOKEN_DISPLAY_MODES.HOVER || displayName === CONST.TOKEN_DISPLAY_MODES.ALWAYS
}

function swapToHide(displayName: TokenDisplayMode) {
    if (displayName === CONST.TOKEN_DISPLAY_MODES.HOVER) return CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
    if (displayName === CONST.TOKEN_DISPLAY_MODES.ALWAYS) return CONST.TOKEN_DISPLAY_MODES.OWNER
    return displayName
}

function hideTokenName(token: TokenDocument) {
    const displayName = token.displayName
    if (isHidding(displayName)) return
    const swap = swapToHide(displayName)
    token.update({ displayName: swap })
}

function showTokenName(token: TokenDocument) {
    const displayName = token.displayName
    if (isShowing(displayName) || !getSetting('token')) return

    let swap = displayName
    if (swap === CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER) swap = CONST.TOKEN_DISPLAY_MODES.HOVER
    else if (swap === CONST.TOKEN_DISPLAY_MODES.OWNER) swap = CONST.TOKEN_DISPLAY_MODES.ALWAYS

    token.update({ displayName: swap })
}

export function renderTokenHUD(hud: TokenHUD, html: JQuery) {
    const actor = hud.object.actor
    if (!actor || actor.hasPlayerOwner) return

    const toggle = createToggle(actor)
    toggle.addEventListener('click', () => toggleSeeName(actor))
    html.find('.col.right').append(toggle)
}

function createToggle(actor: Actor) {
    const tmp = document.createElement('template')
    const toggled = playersSeeName(actor)

    tmp.innerHTML = `<div class="control-icon${toggled ? ' active' : ''}" data-action="anonymous-toggle">
    <i class="fa-solid fa-signature"></i>
</div>`

    return tmp.content.firstChild as HTMLDivElement
}

export function preCreateToken(token: TokenDocument) {
    if (token.actor?.hasPlayerOwner) return
    const displayName = token.displayName
    const swap = swapToHide(displayName)
    if (swap !== displayName) token._source.displayName = swap
}
