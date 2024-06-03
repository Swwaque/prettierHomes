import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ConfirmPopup } from 'primereact/confirmpopup';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const toastRef = useRef(null);

    const showToast = (options) => {
        toastRef.current.show(options);
    };

    return (
        <PopupContext.Provider value={{ showToast }}>
            {children}
            <Toast ref={toastRef} />
            <ConfirmPopup />
            <ConfirmDialog />
        </PopupContext.Provider>
    );
};

export const useToast = () => {
    return useContext(PopupContext);
};
