"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    fullName: string;
    email: string;
    role: "host" | "influencer";
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    signup: (fullName: string, email: string, password: string, role: "host" | "influencer") => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in on mount
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            setUser(JSON.parse(currentUser));
            setIsAuthenticated(true);
        }
    }, []);

    const signup = (fullName: string, email: string, password: string, role: "host" | "influencer"): boolean => {
        try {
            // Get existing users
            const usersData = localStorage.getItem("users");
            const users = usersData ? JSON.parse(usersData) : [];

            // Check if email already exists
            if (users.some((u: any) => u.email === email)) {
                alert("Email already registered!");
                return false;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                fullName,
                email,
                password, // In production, this should be hashed
                role,
            };

            // Save to users array
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            // Set as current user
            const userWithoutPassword = { id: newUser.id, fullName, email, role };
            setUser(userWithoutPassword);
            setIsAuthenticated(true);
            localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

            return true;
        } catch (error) {
            console.error("Signup error:", error);
            return false;
        }
    };

    const login = (email: string, password: string): boolean => {
        try {
            // Get users from localStorage
            const usersData = localStorage.getItem("users");
            if (!usersData) {
                alert("No users found. Please sign up first.");
                return false;
            }

            const users = JSON.parse(usersData);
            const foundUser = users.find((u: any) => u.email === email && u.password === password);

            if (!foundUser) {
                alert("Invalid email or password!");
                return false;
            }

            // Set current user (without password)
            const userWithoutPassword = {
                id: foundUser.id,
                fullName: foundUser.fullName,
                email: foundUser.email,
                role: foundUser.role,
            };

            setUser(userWithoutPassword);
            setIsAuthenticated(true);
            localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("currentUser");
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
