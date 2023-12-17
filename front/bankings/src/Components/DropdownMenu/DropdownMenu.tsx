import {useState} from "react";
import {FaCaretDown} from "react-icons/fa";
import {DropdownMenuList} from "../../Types";
import "./DropdownMenu.css"
import useComponentVisible from "../../hooks/useComponentVisible";
// import styled from "styled-components";


const DropdownMenu = ({ options, defaultTitle, appendDefaultTitle, setSelectedOption, isDisabled = false }: DropdownMenuList) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(defaultTitle)

    const {ref} = useComponentVisible(setIsExpanded)

    const selectBtnClick = (e: React.MouseEvent) => {
        e.preventDefault()

        if (!isDisabled)
        {
            setIsExpanded(!isExpanded)
        }
    }

    const items = options.map(option => {
        return (
            <div key={option.id} onClick={() => {
                setIsExpanded(false)
                setSelectedOption(option.id)
                setTitle(option.name + (appendDefaultTitle ? (" " + defaultTitle.toLowerCase()) : ""))
            }}>
                {option.name}
            </div>
        )
    })

    return (
        <div className={"dropdown " + (isExpanded ? 'show' : '')} ref={ref}>

            <div className={"select"} onClick={selectBtnClick} >
                <span className={"selected"}>{title}</span>
                <FaCaretDown className={"caret"} />
            </div>

            <ul className={"menu"} >

                { items }

            </ul>

        </div>
    );
}

//
// const SelectButton = styled.button<{ $disabled: boolean }>`
//     background-color: ${( props ) => props.$disabled ? props.theme : "#2a2f3b"};
//     cursor: ${( props ) => props.$disabled ? "default" : "pointer"};
//     &:hover {
//         background-color: ${( props ) => props.$disabled ? props.theme : "#323741"};
//     }
// `
//
// const DropDownItem = styled.li<{ $disabled: boolean }>`
//     cursor: ${( props ) => props.$disabled ? "default" : "pointer"};
// `

export default DropdownMenu;