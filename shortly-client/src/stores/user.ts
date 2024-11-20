import { BASE_API_URL } from '@/constants'
import { defineStore } from 'pinia'
import { ref } from 'vue'
type UserData = {
    id: string
    email: string
    firstName: string
    lastName: string
}
export const useUserStore = defineStore('user', () => {
    const user = ref<UserData | null>(null);
    const isLoading = ref<boolean>(false);
    // actions
    const fetchUser = async () => {
        isLoading.value = true;
        try {
            console.log("fetching user")
            const response = await fetch(`/api/users/me`, {
                credentials: 'include'
            });
            const data = await response.json();
            console.log("the data", data)
            if (data.isLoggedIn) {
                user.value = data.user;
                isLoading.value = false;
                return true;
            }
            isLoading.value = false;
            return false;
        } catch (err) {
            isLoading.value = false;
            return false;
        }
    }
    // login user
    const loginUser = async (email: string, password: string) => {
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        console.log("the response", response)
        const data = await response.json();
        console.log("the data:", data);
        if (response.status === 400 || !response.ok) {
            throw new Error(data.error);
        }
        user.value = data.user;
        return true;
    }
    // logout user
    const logoutUser = async () => {
        const res = await fetch(`/api/auth/signout`, { credentials: 'include', method: 'POST' });
        if (!res.ok) {
            throw new Error('Failed to logout');
        }
        user.value = null;
        return true
    }
    // signup user
    const signupUser = async (firstName: string, lastName: string, email: string, password: string) => {
        const response = await fetch(`/api/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        console.log("the response", response)
        console.log("the data:", data);
        if (response.status === 400 || !response.ok) {
            throw new Error(data.error);
        }
        user.value = data.user;
        return true;
    }
    return {
        user,
        isLoading,
        fetchUser,
        loginUser,
        logoutUser,
        signupUser
    }
})