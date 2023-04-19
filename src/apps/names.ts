import { formatUnknown, getSavedNames } from '@src/utils'
import { localize, subLocalize } from '@utils/foundry/localize'
import { templatePath } from '@utils/foundry/path'
import { setSetting } from '@utils/foundry/settings'

export class AnonymousNamesMenu extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: 'anonymous-names-menu',
            title: localize('templates.names.title'),
            template: templatePath('names.html'),
            width: 400,
        })
    }

    getData(options?: Partial<FormApplicationOptions> | undefined) {
        const unknown = localize('unknown')
        const saved = getSavedNames()
        const types = game.system.documentTypes.Actor.map(x => ({
            type: x,
            value: (saved[x] ?? '').trim(),
            placeholder: formatUnknown(unknown, x),
        }))
        return {
            ...super.getData(options),
            types,
            i18n: subLocalize('templates.names'),
        }
    }

    activateListeners(html: JQuery) {
        super.activateListeners(html)
        html.find('[data-action=cancel]').on('click', () => this.close())
    }

    protected async _updateObject(event: Event, formData: Record<string, unknown>) {
        setSetting('names', formData)
    }
}
