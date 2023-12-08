import React from 'react'
import MobileToggle from './MobileToggle'
import Library from '../Sidebar/LibrarySidebar'



const Header = ({ userId, userImage }: { userImage: string, userId: any }) => {

    return (
        <MobileToggle userId={userId} userImage={userImage}>
            <Library userId={userId} />
        </MobileToggle>
    )
}

export default Header