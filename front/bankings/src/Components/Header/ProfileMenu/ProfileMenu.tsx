import "./ProfileMenu.css"
//import user_avatar from "../Avatar.jpeg";
import { FaChevronRight, FaQuestionCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className={"profile-menu-wrapper"}>
            <div className={"user-avatar-container"}>
                <div className={"user-avatar"} onClick={() => {setIsOpen(!isOpen)}} />
                <span></span>
            </div>

            <div className={"sub-menu-wrapper " + (isOpen ? "open" : "")}>
                <div className={"sub-menu"}>
                    <div className={"user-info"}>
                        {/* <img src={user_avatar} className={"user-avatar"} /> */}
                        <span>Коновалов Илья</span>
                    </div>

                    <hr/>

                    <a href="/" className={"sub-menu-link"}>
                        <CgProfile className={"left-icon"}/>
                        <span> Профиль</span>
                        <FaChevronRight className={"right-icon"} />
                    </a>


                    <a href="/" className={"sub-menu-link"}>
                        <FaQuestionCircle className={"left-icon"}/>
                        <span> Помощь</span>
                        <FaChevronRight className={"right-icon"} />
                    </a>


                    <a href="/" className={"sub-menu-link"}>
                        <BiLogOut className={"left-icon"}/>
                        <span> Выйти</span>
                        <FaChevronRight className={"right-icon"} />
                    </a>

                </div>
            </div>
        </div>

    )
}

export default ProfileMenu;