import "./GeneralButton.css";

interface GeneralButtonProps {
    text: string;
    onClick: (formData: any) => Promise<void>;
}

const GeneralButton: React.FC<GeneralButtonProps> = ({ text, onClick }) => {
    return (
        <div className="general-button" onClick={onClick}>
            <span>{text}</span>
        </div>
    );
};

export default GeneralButton;
