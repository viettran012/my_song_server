var admin = require('firebase-admin');

var serviceAccount = require('./tdc-notification-firebase-adminsdk.json');
const makeid = require('./utils/makeId');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendMessage = async ({ title, body, token, image = '', data = {}, type = 'info' }) => {
    if (!title || !body || !token?.length) {
        return 'false';
    }
    const notificationId = makeid(20);
    try {
        await admin.messaging().send({
            notification: {
                title: title,
                body: body,
            },

            data: {
                ...data,
                type: type,
                title: title,
                body: body,
                notificationId,
            },

            android: {
                notification: {
                    sound: 'default',
                    image: image,
                },
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                    },
                },
            },
            token: token,
        });

        return notificationId;
    } catch (error) {
        console.log(error?.message);
        return notificationId;
    }
};

module.exports = { sendMessage };

// useage

// try {
//     sendMessage({
//         type: 'info',
//         data: {
//             navigation: 'Notification',
//             type: 'info',
//         },
//         title: 'Xe 62A13743 sắp hết hạn phí', // ngày hết hạn phí
//         body: 'Thông báo',
//         token: 'fH0cxyZRRpCJsEcfS55dL6:APA91bF4ttxzDNAuXEi1kNPOG4dvxsgmHSTYnvDfrmVT_-E8haefXlAWurkHI1UxbkuWvxWl6BLRPXYUIRVGbDJwda49noL_MSWjFXS__t3B8R873DCMiRxgM2z-ZDpGmKZsLL7-32BQ',
//     }).then((notificationId) => {
//         console.log(notificationId);
//     });

//     console.log('Đã gửi thông báo');
// } catch (error) {
//     console.log(error);
// }
