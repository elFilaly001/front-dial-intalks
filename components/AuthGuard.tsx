"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const allowedPaths = ["/", "/login", "/register"];

type AuthContextValue = {
    isAuthenticated: boolean | undefined;
    refresh: () => void;
};

const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: undefined,
    refresh: () => { },
});

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const currentPath = pathname || "/";
        const isAllowedPath = allowedPaths.includes(currentPath);

        // console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT" , session?.user);
        

        // While next-auth is resolving, show nothing
        if (status === "loading") {
            setIsAuthenticated(undefined);
            return;
        }

        // If path is allowed, set state but don't redirect
        if (isAllowedPath) {
            setIsAuthenticated(!!session?.user?.id);
            return;
        }

        // If there is no session id, redirect
        if (!session?.user?.id) {
            setIsAuthenticated(false);
            // router.push("/login");
            return;
        }

        // If authenticated (session id exists), allow
        setIsAuthenticated(true);
    }, [status, session, pathname, router]);

    if (isAuthenticated === undefined) {
        return null; // or loading indicator
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            refresh: () => {
                // Force a re-evaluation by updating state based on current session
                setIsAuthenticated(status === "authenticated" && !!session?.user);
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}