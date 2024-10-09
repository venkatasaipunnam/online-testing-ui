// src/services/AuthService.js
// export const login = async (email, password) => {
//     // Simulating a dummy API call
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (email === "test@example.com" && password === "password123") {
//                 resolve({ message: "Login successful" });
//             } else {
//                 reject({ message: "Invalid email or password" });
//             }
//         }, 1000);
//     });
// };

// src/services/AuthService.js
export const login = async (email, password) => {
    const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email, 
            password: password,
        }),
        // credentials: 'include' 
    });

    if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
    }

    return await response.json(); // Return the response data
};
