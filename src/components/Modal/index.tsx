import { MouseEvent } from "react";

interface IModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  close: Function;
}

export const Modal = ({ title, description, isOpen, close }: IModalProps) => {
  const handleClose = (e: MouseEvent) => {
    e.preventDefault();

    close();
  }

  return isOpen ? (
    <div className="fixed w-[100%] h-[100%] top-0 left-0 flex items-center justify-center bg-modalOverlay" onClick={handleClose}>
      <div className={`relative w-auto h-auto rounded bg-[white] p-6 shadow`}>
        <span className="absolute top-6 right-6 text-[#333] text-[20px] cursor-pointer" onClick={handleClose}>X</span>
        <div className="text-[36px] text-[red]">
          {title}
        </div>
        <div className="text-[20px] text-[#333]">
          {description}
        </div>
      </div>
    </div>
  ) : null
}

export default Modal;
