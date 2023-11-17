import axios from "axios";

export const getUser = async (id: string) => {
    const user = await axios.get(`http://localhost:8080/api/users/${id}`)
        .then((res) => { return res.data; }).catch((err) => { console.log(err); });
    return user;
}