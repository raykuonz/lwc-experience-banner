import { LightningElement, api } from 'lwc';

export default class SidePanel extends LightningElement {

    @api
    get recordData() {
        return this._recordData;
    }
    set recordData(data) {
        this._recordData = data;
    }
    _recordData;

    get show() {
        return !!this.recordData;
    }

    get title() {
        return `${this.recordData?.isEdit ? 'Edit' : 'Add' } ${this.recordData.type}`;
    }

    get nameValue() {
        return this.recordData?.name ?? '';
    }

    get descriptionValue() {
        return this.recordData?.description ?? '';
    }

    get showDeleteButton() {
        return this.recordData?.isEdit ?? false;
    }

    handleSave() {
        const detail = {
            ...this.recordData,
            name: this.template.querySelector('input[name=name]').value,
            description: this.template.querySelector('input[name=description]').value,
        }

        if (!this.recordData.isEdit) {
            detail.id = Date.now();
        }

        this.dispatchEvent(new CustomEvent('save', {
            detail
        }));
    }

    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }

    handleDelete() {
        const detail = {
            ...this.recordData,
        }

        this.dispatchEvent(new CustomEvent('delete', {
            detail
        }));
    }
}