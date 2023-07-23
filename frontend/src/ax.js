import axios from "axios";

const ax = axios.create({
    baseURL: 'http://localhost:7100',
})

export default ax;