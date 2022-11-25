import { localize } from '~src/@utils/foundry/i18n'
import { templatePath } from '~src/@utils/foundry/path'
import { setSetting } from '~src/@utils/foundry/settings'
import { getActorsTypes } from '~src/@utils/foundry/types'
import { formatUnknown, getSavedNames } from '~src/utils'

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
        const types = getActorsTypes().map(x => ({
            type: x,
            value: (saved[x] ?? '').trim(),
            placeholder: formatUnknown(unknown, x),
        }))
        return {
            ...super.getData(options),
            types,
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
