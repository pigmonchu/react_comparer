import React, {useState} from 'react'
import './Selector.scss'

export const Selector = ({onSelect, leftLabel, rightLabel, selName}) => {

    const [stateSelector, setStateSelector] = useState(false)
    


    const changeSelect = (event) => {
        setStateSelector(event.target.checked)
        onSelect(event.target.checked)
    }

    const changeSelectManual = (event) => {
        const checked = !stateSelector
        setStateSelector(checked)
        onSelect(checked)
    }

    return(
    <div className="selector">
        <span name="selector__label-left" className="label selector__label-left" onClick={changeSelectManual}>{leftLabel}</span>
        <div className="selector__switch">
            <input id={`_selector__switch--${selName}`} className="selector__switch-checkbox" onChange={changeSelectManual} checked={stateSelector} type="checkbox"/>
            <div className="selector__switch-button"></div>
            <label htmlFor={`_selector__switch--${selName}`} className="selector__switch-label"></label>
        </div>
        <span name="selector__label-right" className="label selector__label-right" onClick={changeSelectManual}>{rightLabel}</span>
    </div>

)}
