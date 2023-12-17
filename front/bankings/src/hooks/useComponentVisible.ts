import { useEffect, useRef } from 'react';

export default function useComponentVisible(setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>) {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        const handleClickOutsideRef = (event: MouseEvent) => handleClickOutside(event);
        document.addEventListener('click', handleClickOutsideRef, true);

        return () => {
            document.removeEventListener('click', handleClickOutsideRef, true);
        };
    }, [handleClickOutside]);

    return { ref };
}
