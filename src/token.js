import { playersSeeName, toggleSeeName } from './api'
import { getActorTokens, getSetting, localize } from './module'

export function updateActorTokens(actor, showName) {
    if (actor.token) changeDisplayName(actor.token, showName)
    else getActorTokens(actor, true).forEach(x => changeDisplayName(x, showName))
}

export function renderTokenHUD(hud, html) {
    const actor = hud.object.actor
    if (!actor || actor.hasPlayerOwner) return

    const toggle = createToggle(actor)
    toggle.addEventListener('click', () => toggleSeeName(actor))
    html.find('.col.right').append(toggle)
}

export function preCreateToken(token) {
    if (token.actor?.hasPlayerOwner) return
    const displayName = token.displayName
    const swap = swapToHide(displayName)
    if (swap !== displayName) token._source.displayName = swap
}

function createToggle(actor) {
    const tmp = document.createElement('template')
    const toggled = playersSeeName(actor)

    tmp.innerHTML = `<div class="control-icon${toggled ? ' active' : ''}" data-action="anonymous-toggle">
    <i class="fa-solid fa-signature" title="${localize('hud.title')}"></i>
</div>`

    return tmp.content.firstChild
}

function changeDisplayName(token, showName) {
    if (showName) showTokenName(token)
    else hideTokenName(token)
}

function showTokenName(token) {
    const displayName = token.displayName
    if (isShowing(displayName) || !getSetting('token')) return

    let swap = displayName
    if (swap === CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER) swap = CONST.TOKEN_DISPLAY_MODES.HOVER
    else if (swap === CONST.TOKEN_DISPLAY_MODES.OWNER) swap = CONST.TOKEN_DISPLAY_MODES.ALWAYS

    token.update({ displayName: swap })
}

function hideTokenName(token) {
    const displayName = token.displayName
    if (isHidding(displayName)) return
    const swap = swapToHide(displayName)
    token.update({ displayName: swap })
}

function isHidding(displayName) {
    return !isShowing(displayName)
}

function isShowing(displayName) {
    return displayName === CONST.TOKEN_DISPLAY_MODES.HOVER || displayName === CONST.TOKEN_DISPLAY_MODES.ALWAYS
}

function swapToHide(displayName) {
    if (displayName === CONST.TOKEN_DISPLAY_MODES.HOVER) return CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
    if (displayName === CONST.TOKEN_DISPLAY_MODES.ALWAYS) return CONST.TOKEN_DISPLAY_MODES.OWNER
    return displayName
}
