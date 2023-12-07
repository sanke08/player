import React from 'react'
import MobileToggle from './MobileToggle'
import Library from '../Sidebar/LibrarySidebar'



const Header = ({token}:{token:{ name: string, value: any } | null | undefined }) => {

    return (
        <MobileToggle token={token}>
            <Library  token={token}/>
        </MobileToggle>
    )
}

export default Header