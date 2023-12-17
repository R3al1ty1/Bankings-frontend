import "./DeleteButton.css"
import {FaTrash} from "react-icons/fa6";

const DeleteButton = ({ onClick }: {onClick: () => void}) => {
    return (
        <div className="delete-button" onClick={onClick}>
            <span>Удалить</span>
            <FaTrash />
        </div>
    )
}

export default DeleteButton;