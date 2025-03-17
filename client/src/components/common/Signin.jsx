import React, { useEffect } from 'react';
import { SignIn, useUser } from '@clerk/clerk-react';
import axios from 'axios';

function Signin() {
    const { isSignedIn, user } = useUser();

    useEffect(() => {
        if (isSignedIn && user) {
            checkBlockedStatus(user.id);
        }
    }, [isSignedIn, user]);

    async function checkBlockedStatus(clerkId) {
        try {
            const res = await axios.get(`http://localhost:3000/admin-api/all-users`);
            const foundUser = res.data.find(u => u.clerkId === clerkId);

            if (foundUser?.isBlocked) {
                alert("Your account is blocked. Please contact admin.");
                window.location.href = "/"; // Redirect to homepage
            }
        } catch (error) {
            console.error("Error checking blocked status", error);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-100'>
            <SignIn />
        </div>
    );
}

export default Signin;
