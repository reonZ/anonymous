import { localize } from './@utils/foundry/i18n'
import { getName, playersSeeName, toggleSeeName } from './api'

export function renderCombatTracker(tracker: CombatTracker<Combat>, html: JQuery) {
    const combatants = ui.combat.viewed?.combatants
    if (!combatants || !combatants.size) return

    html.find('#combat-tracker .combatant').each(function () {
        const id = this.dataset.combatantId as string
        const combatant = combatants.get(id)
        if (!combatant || combatant.hasPlayerOwner) return

        const showName = playersSeeName(combatant)

        if (game.user.isGM) {
            const controls = this.querySelector('.combatant-controls') as HTMLElement
            const hidden = controls.querySelector('.combatant-control[data-control="toggleHidden"]')
            const toggle = createToggle(showName)

            toggle.addEventListener('click', event => toggleCombatantName(event, combatant))

            if (hidden) hidden.after(toggle)
            else controls.appendChild(toggle)
        } else if (!showName) {
            const h4 = this.querySelector('h4') as HTMLElement
            h4.textContent = getName(combatant)
        }
    })
}

function createToggle(active: boolean) {
    const tmp = document.createElement('template')
    const tooltip = active ? 'context.hide' : 'context.show'

    tmp.innerHTML = `<a
    class="combatant-control${active ? ' active' : ''}"
    data-control="toggle-name-visibility"
    data-tooltip="${localize(tooltip)}"
>
    <i class="fa-solid fa-signature"></i>
</a>`

    return tmp.content.firstChild as HTMLAnchorElement
}

function toggleCombatantName(event: MouseEvent, combatant: Combatant) {
    event.preventDefault()
    event.stopPropagation()
    toggleSeeName(combatant)
}
