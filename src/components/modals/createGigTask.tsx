import QuickTaskForm from '../tasks/quickTaskForm';
import BaseModal from './baseModal';

export interface CreateGigTaskProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  gigId: string;
}

const CreateGigTaskModal = ({ isOpen, setIsOpen, gigId }: CreateGigTaskProps) => {
  return (
    <BaseModal title="Create Task" setIsOpen={setIsOpen} isOpen={isOpen}>
      <div className="mt-2">
        <QuickTaskForm gigId={gigId} />
      </div>
    </BaseModal>
  );
};

export default CreateGigTaskModal;
