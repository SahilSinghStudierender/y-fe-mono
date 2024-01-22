import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {

    setItem(key: string, value: any): void {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }

    getItem<T>(key: string): T | null {
        try {
            const serializedItem = localStorage.getItem(key);
            if (serializedItem === null) {
                return null;
            }
            return JSON.parse(serializedItem) as T;
        } catch (e) {
            console.error("Error getting data from localStorage", e);
            return null;
        }
    }

    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error("Error removing item from localStorage", e);
        }
    }

    clear(): void {
        try {
            localStorage.clear();
        } catch (e) {
            console.error("Error clearing localStorage", e);
        }
    }
}
