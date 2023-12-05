import React, { useEffect, useState } from "react";
import Context from './Context'

const Statedata = (props) => {
    const [background_color, setBackground_color] = useState('#F3F2ED');
    const [text_color, setText_color] = useState('#1B1B1B');
    const [settingsColor, setSettingsColor] = useState('grey');
    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isliked, setIsliked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const changeColor = () => {
        if (background_color === '#F3F2ED') {
            setBackground_color('#1B1B1B')
            setText_color('#F3F2ED')
            setSettingsColor('#C2B46E')
            setOpen(true)
        } else {
            setBackground_color('#F3F2ED')
            setText_color('#1B1B1B')
            setSettingsColor('#E2DFD2')
            setOpen(false)
        }
    }
    const showVisible = () => {
        setIsVisible(!isVisible)
    }
    const ShowLiked = () => {
        setIsliked(!isliked)
    }
    const changfollow = () => {
        setIsFollowing((prevFollow) => !prevFollow);
      };
    return (
        <Context.Provider value={{ background_color, text_color, changeColor, open, settingsColor, isFollowing,changfollow, setIsFollowing, showVisible, isVisible, isliked, ShowLiked }}>
            {props.children}
        </Context.Provider>
    )
}
export default Statedata