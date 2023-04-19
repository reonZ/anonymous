import { getSetting, registerSetting } from '@utils/foundry/settings'
import { getCurrentModule } from '@utils/foundry/module'
import { getSettingLocalizationPath } from '@utils/foundry/path'
import { warn } from '@utils/foundry/notification'
import { playersSeeName } from '@src/api'
import { replaceHTMLText } from '@utils/jquery'

export function pf2eInitHook(isGM: boolean) {
    registerSetting({
        name: 'pf2e.traits',
        type: String,
        default: 'never',
        config: true,
        choices: {
            never: getSettingLocalizationPath('pf2e.traits.choices.never'),
            rolls: getSettingLocalizationPath('pf2e.traits.choices.rolls'),
            always: getSettingLocalizationPath('pf2e.traits.choices.always'),
        },
    })
}

/** @type {ThirdPartyHook} */
export function pf2eReadyHook(isGM: boolean) {
    if (isGM) disableSettings()
}

function disableSettings() {
    let key = ''
    if (game.settings.settings.has('pf2e.metagame.tokenSetsNameVisibility')) key = 'metagame.tokenSetsNameVisibility'
    else if (game.settings.settings.has('pf2e.metagame_tokenSetsNameVisibility')) key = 'metagame_tokenSetsNameVisibility'
    if (!key || !game.settings.get('pf2e', key)) return

    const module = getCurrentModule().title
    const setting = game.i18n.localize('PF2E.SETTINGS.Metagame.TokenSetsNameVisibility.Name')

    game.settings.set('pf2e', key, false)
    warn('pf2e.disabled', { module, setting }, true)
}

export function pf2eParseChat({ message, playersCanSee, $html }: ThirdPartyChatParseArgs) {
    const isGM = game.user.isGM
    const target = (message as ChatMessage & { target: { actor: Actor } | null }).target?.actor
    const criticals = getSetting('criticals')
    const rolls = getSetting('rolls')

    if (target && !target.hasPlayerOwner && !playersSeeName(target)) {
        const $targets = $html.find('.flavor-text .target-dc [data-whose="target"]')
        if ($targets.length) {
            const $target = $targets.first()
            if (isGM) $target.attr('data-visibility', 'gm')
            else $target.remove()
        }
    }

    if (!isGM && !playersCanSee) {
        const traits = getSetting('pf2e.traits')

        if (message.rolls.length) {
            if (rolls) {
                const $tags = $html.find('.flavor-text hr + .tags')

                if ($tags.length) {
                    $tags.prev('hr').remove()
                    $tags.remove()
                }

                if (criticals) {
                    $html
                        .find('.message-content .dice-roll .dice-result .dice-total')
                        .css('color', 'var(--color-text-dark-primary)')
                }

                if (traits !== 'never') {
                    $html.find('.flavor-text .tags').remove()
                }
            } else if (traits === 'always') {
                $html.find('.flavor-text .tags').first().remove()
            }
        } else if (traits === 'always') {
            $html.find('.message-content section.tags').remove()
        }
    }

    if (!playersCanSee && message.rolls.length && rolls && criticals) {
        const critical = game.i18n.localize('PF2E.Check.Result.Degree.Attack.criticalSuccess')
        const hit = game.i18n.localize('PF2E.Check.Result.Degree.Attack.success')
        const regex = new RegExp(`(\\((${critical}|${hit})\\))`, 'gmi')
        const str = isGM ? '<span class="anonymous-replaced">$1</span>' : ''
        const flavor = $html.find('header .flavor-text')
        replaceHTMLText(flavor, regex, str, true)
    }
}
