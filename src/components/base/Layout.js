import React from 'react'
import {Header} from './Header'
import {Footer} from './Footer'

import './Layout.scss'

export const Layout = ({children}) => (
    <div className="Layout">
        <Header>dithlab - comparador </Header>
        <div className="container">
            {children}
        </div>
        <Footer>
        hecha en Alcubas por dithlab.com
        </Footer>
    </div>
)
