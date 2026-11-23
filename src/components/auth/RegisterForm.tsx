'use client';

import React from 'react';
import Link from 'next/link';
import Form from "next/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

function RegisterForm() {
    const handleRegister = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("username") as string;

        await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "/",
        }, {
            onSuccess: () => {
                window.location.href = "/";
            },
            onError: (ctx) => {
                alert(ctx.error.message);
            },
        });
    };

    const signInWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-8 md:px-12 bg-blue font-sans">
            <div className="flex h-[80vh] overflow-hidden rounded-3xl bg-white shadow-2xl p-4 gap-4 md:gap-12 flex-col-reverse md:flex-row">
                <div className={"m-auto w-full md:w-xl"}>
                    <p className="text-xl font-Geist font-bold text-blue">Pocket Monster</p>
                    <h2 className={"font-Geist text-2xl font-extrabold"}>Inscription</h2>

                    <Form action={handleRegister} className="flex flex-col gap-6 mt-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="sacha@bourg-palette.com"
                                name="email"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                name="password"
                                required
                            />
                        </div>

                        <Button type="submit" className="mt-4 w-full text-lg">
                            Se Connecter
                        </Button>

                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-gray-500">Ou continuer avec</span></div>
                        </div>

                        <Button onClick={signInWithGoogle} type="button" variant="outline" className="w-full">
                            Google
                        </Button>
                    </Form>

                    <div className="mt-3 md:mt-12 text-center text-sm text-gray-600">
                        Pas de compte ?{" "}
                        <Link href="/login" className="font-semibold text-blue hover:text-blue/700">
                            Inscrivez-vous
                        </Link>
                    </div>
                </div>
                <Image src="/assets/images/SignUp.webp" width={612} height={778} alt="" className="object-cover rounded-sm flex-1 min-h-0 w-full md:flex-none md:w-auto md:h-full" />
            </div>
        </div>
    );
}

export default RegisterForm;