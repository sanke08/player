import React from 'react'
import MobileToggle from './MobileToggle'
import Library from '../Sidebar/LibrarySidebar'



const Header = ({ user }: { user: { email?: string | undefined | null, name?: string | undefined | null, _id?: string | undefined | null } | null | undefined }) => {

    return (
        <MobileToggle user={user}>
            <Library  user={user}/>
        </MobileToggle>
    )
}

export default Header