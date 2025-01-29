import React from 'react';
import ButtonLarge from '@/components/ButtonLarge';
import { StatusButton } from '@/models/enums';
import ButtonLargeSecondary from '@/components/ButtonLargeSeconday';


interface ModalComponentProps {
  children: React.ReactNode;
  title: string
  onCancelAction?: () => void;
  onConfirmAction?: () => void;
  childConfirmButton?: React.ReactNode;
  cancelButton?: boolean
}


const ModalComponent: React.FC<ModalComponentProps> = ({ children,
  title, childConfirmButton, cancelButton = true, onCancelAction, onConfirmAction }) => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-hintColor">
      (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-background rounded-lg shadow-lg w-96">
          {/* Encabezado */}
          <div className="px-4 py-2 text-lg font-semibold text-colorText border-b">
            {title}
          </div>

          {/* Contenido */}
          <div className="px-4 py-6 text-gray-600">
            {children}
          </div>

          {/* Footer */}
          <div className="flex justify-end px-4 py-2 border-t space-x-1">
            {cancelButton && <div>
              <ButtonLargeSecondary type="button" onClick={onCancelAction} status={StatusButton.Enabled}>Cerrar</ButtonLargeSecondary>
            </div>}
            {childConfirmButton === undefined ? <div>
              <ButtonLarge type="button"
                onClick={onConfirmAction}
                status={StatusButton.Enabled}>Aceptar</ButtonLarge>
            </div> : childConfirmButton}
          </div>

        </div>
      </div>
      )
    </div>
  );
};

export default ModalComponent;