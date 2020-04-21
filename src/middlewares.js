export const isAuthenticated = request => {
    if(!request.user) {
        throw Error("You need to log in");
    }
    return;
};

// export const isPayed = request => {
//     if(!request.buyer) {
//         throw Error("you need to buy");
//     }
//     return
// }