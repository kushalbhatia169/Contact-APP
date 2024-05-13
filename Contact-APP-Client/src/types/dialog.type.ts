export interface dialogBoxProps {
  content: string;
  id: number;
  onDelete: (id: number) => void;
  setIsOpenBox: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}