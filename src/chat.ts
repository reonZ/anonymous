import { getSetting } from '@utils/foundry/settings'
import { replaceHTMLText } from '@utils/jquery'
import { getName, playersSeeName } from './api'
import { thirdPartyChatParse } from './third'

const ESCAPE = /(["'\(\)\[\]])/gm

export function renderChatMessage(message: ChatMessage, html: JQuery) {
    if (message.blind) return

    const isGM = game.user.isGM
    const speaker = message.speaker
    const actor = ChatMessage.getSpeakerActor(speaker)
    const playersCanSee = !actor || playersSeeName(actor)

    if (actor && !playersCanSee) {
        changeNames(message, actor, html)
        if (!isGM) {
            if (message.rolls.length && getSetting('rolls')) {
                const $result = html.find('.message-content .dice-roll .dice-result')
                $result.find('.dice-formula, .dice-tooltip').remove()
                if (getSetting('criticals')) $result.find('.dice-total').removeClass('critical fumble')
            }
            if (getSetting('footer')) html.find('.message-content footer.card-footer').remove()
            if (getSetting('cardContent')) html.find('.message-content .card-content').remove()
        }
    }

    thirdPartyChatParse({ message, actor, $html: html, playersCanSee })
}

function changeNames(message: ChatMessage, actor: Actor, html: JQuery) {
    const speaker = message.speaker
    const names: Set<string> = new Set()

    if (speaker.alias) names.add(speaker.alias)
    if (actor.name) names.add(actor.name)

    if (speaker.token && speaker.scene) {
        const scene = game.scenes.get(speaker.scene)
        const token = scene?.tokens.get(speaker.token)
        if (token?.name) names.add(token.name)
    }

    if (!names.size) return

    const escaped = Array.from(names).map(x => RegExp.escape(x))
    const joined = escaped.join('|')
    const regexp = new RegExp(`(${joined})`, 'gmi')
    const renamed = getName(actor)
    const replacement = game.user.isGM ? `<span class="anonymous-replaced" title="${renamed}">$1</span>` : renamed

    replaceHTMLText(html, regexp, replacement)
}
