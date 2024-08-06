//@ts-nocheck

import { EventEmitter } from 'events';
import { v4 as uuid } from 'uuid';

class ModalBoxes extends EventEmitter {
    constructor() {
        super();
        this.modalBoxes = [];
    }

    #create(modalBox) {
        const id = uuid();
        const defaultModalBox = {
            id,
            close: () => {
                this.close(id);
            }
        };
        const modalBoxObject = Object.assign(defaultModalBox, modalBox);
        this.modalBoxes.push(modalBoxObject);
        this.emitChange();

        return modalBoxObject;
    }

    open({ component, onClose, className, ...rest }) {
        return this.#create({
            component,
            onCloseCallback: onClose,
            className,
            ...rest
        });
    }

    confirm({ content, className, title, cancelButton, confirmButton } = {}) {
        return new Promise((resolve, reject) => {
            const id = uuid();
            const defaultModalBox = { id };
            const modalBoxObject = Object.assign(defaultModalBox, {
                component: (
                    <div
                        cancel={(data) => {
                reject(data);
                this.close(id);
            }}
            confirm={(data) => {
                resolve(data);
                this.close(id);
            }}
            title={title}
            cancelButton={cancelButton}
            confirmButton={confirmButton}
                >
                {content}
                </div>
        ),
            className: cx('eds-modal-box-confirm', className)
        });
            this.modalBoxes.push(modalBoxObject);
            this.emitChange();
        });
    }

    close(id) {
        this.modalBoxes = this.modalBoxes.filter((n) => id !== n.id);
        this.emitChange();
    }

    closeAll() {
        this.modalBoxes = [];
        this.emitChange();
    }

    emitChange() {
        this.emit('change', [...this.modalBoxes]);
    }

    addChangeListener(callback) {
        this.addListener('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
}

export default new ModalBoxes();
