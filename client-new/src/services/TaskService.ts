import axios from "axios";

export const getTasks = async (id: string) => {
    const user = await axios.get(`http://localhost:8080/api/users/${id}/tasks`)
        .then((res) => { return res.data; }).catch((err) => { console.log(err); });
    return user;
}