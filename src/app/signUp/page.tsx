import React from 'react';
import {Header} from "@/components/Header/header";
import RegisterForm from "@/components/auth/RegisterForm";
import Footer from "@/components/footer/Footer";

function SignUpPage() {
    return (
        <>
            <Header/>
            <main>
                <RegisterForm/>
            </main>
            <Footer/>
        </>
    );
}

export default SignUpPage;