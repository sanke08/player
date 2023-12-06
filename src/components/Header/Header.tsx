import React from 'react'
import MobileToggle from './MobileToggle'
import Library from '../Sidebar/LibrarySidebar'



const Header = () => {

    return (
        <MobileToggle >
            <Library  />
        </MobileToggle>
    )
}

export default Header