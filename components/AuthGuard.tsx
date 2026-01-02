"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const allowedPaths = ["/", "/login", "/register"];

type AuthContextValue = {
    isAuthenticated: boolean | undefined;
    refresh: () => void;
    updateSession: () => Promise<void>;
    forceUpdate: () => void;
};

const AuthContext = createContext<AuthContextValue>({
    isAuthenticated: undefined,
    refresh: () => { },
    updateSession: async () => { },
    forceUpdate: () => { }
});

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status, update } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [forceUpdateCounter, setForceUpdateCounter] = useState(0);

    useEffect(() => {
        const currentPath = pathname || "/";
        const isAllowedPath = allowedPaths.includes(currentPath);

        // Check localStorage token first (more reliable after login)
        const hasToken = typeof window !== "undefined" ? !!localStorage.getItem("token") : false;
        const hasSession = !!session?.user?.id;
        const isAuth = hasToken || hasSession;

        if (status === "loading" && !hasToken) {
            setIsAuthenticated(undefined);
            return;
        }

        if (isAllowedPath) {
            setIsAuthenticated(isAuth);
            return;
        }

        // For protected paths
        if (!isAuth) {
            setIsAuthenticated(false);
            return;
        }

        setIsAuthenticated(true);
    }, [status, session, pathname, router, forceUpdateCounter]);

    if (isAuthenticated === undefined) {
        return null; // or loading indicator
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            refresh: () => {
                // Force a re-evaluation by updating state based on current session and token
                const hasSession = status === "authenticated" && !!session?.user;
                const hasToken = typeof window !== "undefined" ? !!localStorage.getItem("token") : false;
                setIsAuthenticated(hasSession || hasToken);
            },
            updateSession: update,
            forceUpdate: () => setForceUpdateCounter(prev => prev + 1)
        }}>
            {children}
        </AuthContext.Provider>
    );
}