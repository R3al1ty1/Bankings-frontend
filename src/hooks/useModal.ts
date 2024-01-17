import { useEffect, useRef, useState} from "react";

export function useModal() {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOutside = (event: Event) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return {
        modalRef,
        buttonRef,
        isOpen,
        setIsOpen
    };
}
