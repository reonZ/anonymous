import { getName, playersSeeName, toggleSeeName } from './api'
import { getSameCombatants, localize } from './module'

export function renderCombatTracker(tracker, html) {
    const combatants = ui.combat.viewed?.combatants
    if (!combatants || !combatants.size) return

    html.find('#combat-tracker .combatant').each(function () {
        const id = this.dataset.combatantId
        const combatant = combatants.get(id)
        if (!combatant || !combatant.actor || combatant.actor.hasPlayerOwner) return

        const showName = playersSeeName(combatant)

        if (game.user.isGM) {
            const controls = this.querySelector('.combatant-controls')
            const hidden = controls.querySelector('.combatant-control[data-control="toggleHidden"]')
            const toggle = createToggle(showName)

            toggle.addEventListener('click', event => toggleCombatantName(event, combatant))

            if (hidden) hidden.after(toggle)
            else controls.appendChild(toggle)
        } else if (!showName) {
            const h4 = this.querySelector('h4')
            h4.textContent = getName(combatant)
        }
    })
}

function toggleCombatantName(event, combatant) {
    event.preventDefault()
    event.stopPropagation()

    if (event.shiftKey && combatant.actor && combatant.actor.isToken && game.combat?.scene) {
        getSameCombatants(combatant).forEach(toggleSeeName)
    } else {
        toggleSeeName(combatant)
    }
}

function createToggle(active) {
    const tmp = document.createElement('template')
    const tooltip = active ? 'context.hide' : 'context.show'

    tmp.innerHTML = `<a
    class="combatant-control${active ? ' active' : ''}"
    data-control="toggle-name-visibility"
    data-tooltip="${localize(tooltip)}"
>
    <i class="fa-solid fa-signature"></i>
</a>`

    return tmp.content.firstChild
}
