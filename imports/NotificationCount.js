import axios, { all } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';
import Config from "./Config/Config";

export default async function NotificationCount(type = 'number') {

    let allNotificationLength = 0;

    const user = JSON.parse(await AsyncStorage.getItem('User'));

    let url = `${Config.BASE_URL}api/notification`;

    const bodyData = new FormData();

    bodyData.append('username', user.UserInfo.UserName);
    bodyData.append('token', user.Token);

    const res = await axios({
        method: 'POST',
        url: url,
        data: bodyData,
        headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.AllNotification) {
        res.data.AllNotification.map((item) => {
            if (!item.Readed) {
                allNotificationLength++;
            } else {
                return;
            }
        })
    }

    if (res.data.UserNotification) {
        res.data.UserNotification.map((item) => {
            if (!item.Readed) {
                allNotificationLength++;
            } else {
                return;
            }
        });
    }


    if (type === 'number') {
        return allNotificationLength;
    } else if (type === 'notification') {
        return res.data;
    } else {
        return null;
    }
}