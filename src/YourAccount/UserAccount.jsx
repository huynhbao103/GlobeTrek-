import React from 'react'
import ProfileUser from './ProfileUser';
import AddEmail from './AddEmail';
import AddPhone from './AddPhone';

function UserAccount() {
  return (
    <div >
        <ProfileUser /><AddEmail /><AddPhone />
    </div>
  )
}

export default UserAccount