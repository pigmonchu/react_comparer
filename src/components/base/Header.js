import React from 'react'
import logo from '../../images/logo.png'
import './Header.scss'

export const Header = ({children}) => (
    <header className="header" data-testid='header'>
        <figure className="header__logo" data-testid="logo">
            <img src={logo} alt="Logo digestiveThinking" className="header__img"/>
            <span className="header__text">{children}</span>
        </figure>
    </header>
)
