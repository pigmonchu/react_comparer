import React from 'react'
import {Header} from './Header'
import {Footer} from './Footer'

import './Layout.scss'

export const Layout = ({children}) => (
    <div className="Layout">
        <Header>dithlab - simulador </Header>
        <div className="container">
            {children}
        </div>
        <Footer>
        hecha en Alcublas por dithlab.com
        </Footer>
    </div>
)
