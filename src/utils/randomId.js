const max = 10000;
const min = 1;
export const randomValueGenrator = () =>{
    return Math.floor(Math.random() * (max-min)+min);
}