import axios from "axios";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "./Config/Config";

export default async function useTokenControl({ username, token }) {

    let url = `${Config.BASE_URL}api/tokenCheck`;

    const bodyData = new FormData();
    bodyData.append('username', username);
    bodyData.append('token', token);

    try {
        let res = await axios({
            method: 'POST',
            url: url,
            data: bodyData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        console.log(res.data.Message);
        return res.data;
    } catch (err) {
        return err;
    }

}