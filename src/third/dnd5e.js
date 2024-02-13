import { getSetting, replaceHTMLText } from '../module'

export function dnd5ParseChat({ message, $html, isAnonymous, actor }) {
    if (!isAnonymous) return

    if (message.rolls.length && getSetting('criticals')) {
        const critical = game.i18n.localize('DND5E.CriticalHit')
        const powerful = game.i18n.localize('DND5E.PowerfulCritical')
        const regexp = new RegExp(` (\\(([\\w ]*)?(?:${critical}|${powerful})([\\w ]*)?\\))$`, 'igm')
        const $flavor = $html.find('header .flavor-text')
        if (game.user.isGM) replaceHTMLText($flavor, regexp, ' <span class="anonymous-replaced">$1</span>', true)
        replaceHTMLText($flavor, regexp, '', true)
    }
}

export function isDnD3() {
    return game.system.id === 'dnd5e' && isNewerVersion(game.system.version, '2.999.0')
}
