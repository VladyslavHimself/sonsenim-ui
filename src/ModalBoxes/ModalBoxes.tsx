//@ts-nocheck

import { EventEmitter } from 'events';
import { v4 as uuid } from 'uuid';
import {Button, ButtonProps} from "@/components/ui/button.tsx";
import React from "react";

type ConfirmFooterProps = {
    closeButtonProperties?: {
        label: string | Element,
        action?: () => void,
        restProps?: ButtonProps & React.RefAttributes<HTMLButtonElement>
    },
    submitButtonProperties: {
        label: string | Element,
        formId: string,
        action?: () => void,
        restProps?: ButtonProps & React.RefAttributes<HTMLButtonElement>
    }
}

class ModalBoxes extends EventEmitter {
    ConfirmFooter: any;
    Body: any;

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


ModalBoxes.prototype.Footer = function ({ children }) {
    return <div className="modal-box-footer">{children}</div>
}


// TODO: Rename close button to more clearly naming (later)
ModalBoxes.prototype.ConfirmFooter = function ({ closeButtonProperties, submitButtonProperties }: ConfirmFooterProps) {
    return <div className="modal-box-footer">
        {
            closeButtonProperties && <Button
                onClick={closeButtonProperties.action}
                className="modal-box-cancel-button"
                {...closeButtonProperties.restProps}
            >{closeButtonProperties.label}</Button>
        }
        <Button
            form={submitButtonProperties.formId}
            type="submit"
            className="modal-box-confirm-button"
            {...submitButtonProperties.restProps}
        >{submitButtonProperties.label}</Button>
    </div>
}

ModalBoxes.prototype.Body = function ({ children }) {
    return <div className="modal-box-body">{children}</div>
}

// TODO: Add context API to pass the data

export default new ModalBoxes();
