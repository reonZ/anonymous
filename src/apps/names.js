import { formatUnknown, getSavedNames } from '../api'
import { localize, setSetting, subLocalize, templatePath } from '../module'

export class AnonymousNamesMenu extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: 'anonymous-names-menu',
            title: localize('templates.names.title'),
            template: templatePath('names.html'),
            width: 400,
        })
    }

    getData(options) {
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

    activateListeners(html) {
        super.activateListeners(html)
        html.find('[data-action=cancel]').on('click', () => this.close())
    }

    async _updateObject(event, formData) {
        setSetting('names', formData)
    }
}
