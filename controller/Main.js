import { POSApplication } from './POSApplication.js';


$(document).ready(function() {
    try {
        new POSApplication();
    } catch (error) {
        console.error("Main.js: Error initializing POS Application:", error);
    }
});