import { modalState } from "@/atom/modalAtom";
import { XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";

export default function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        
      </>
    </MuiModal>
  );
}
