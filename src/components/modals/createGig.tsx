import CreateGigForm from '../dashboard/forms/createGig';
import BaseModal from './baseModal';

export interface CreateGigModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateGigModal = ({ isOpen, setIsOpen }: CreateGigModalProps) => {
  return (
    <BaseModal title="Create Payment" setIsOpen={setIsOpen} isOpen={isOpen}>
      <div className="mt-2">
        <CreateGigForm />
      </div>
    </BaseModal>
  );
};

export default CreateGigModal;
