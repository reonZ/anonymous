import { addSelectContextEntry } from '@utils/foundry/context'
import { localize } from '@utils/foundry/localize'
import { flagsUpdatePath } from '@utils/foundry/path'
import { playersSeeName, toggleSeeName } from './api'
import { updateActorTokens } from './token'
import { refresh } from './utils'

export function getActorDirectoryEntryContext(html: JQuery, entries: ContextMenuEntry[]) {
    addSelectContextEntry({
        entries,
        defaultData: {
            name: choice => localize(`context.${choice}`),
            icon: 'fa-solid fa-signature',
            callback: $li => {
                const id = $li.attr('data-document-id') as string
                const actor = game.actors.get(id)
                if (actor) toggleSeeName(actor)
            },
            condition: ($li, choice) => {
                const id = $li.attr('data-document-id') as string
                const actor = game.actors.get(id)
                return !!actor && !actor.hasPlayerOwner && (choice === 'show' ? !playersSeeName(actor) : playersSeeName(actor))
            },
        },
        choices: ['show', 'hide'],
    })
}

export function onActorUpdate(actor: Actor, data: Record<string, any>) {
    let needsRefresh = getProperty(data, flagsUpdatePath('showName')) !== undefined

    if ('ownership' in data) {
        updateActorTokens(actor, actor.hasPlayerOwner)
        needsRefresh = true
    }

    if (needsRefresh) refresh()
}
