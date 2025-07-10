import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='auth-layout'>
            {children}
        </div>
    )
}

export default AuthLayout

//note: this is layout where you will render childern, which are page components.