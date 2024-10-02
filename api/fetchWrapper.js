import { useStore } from '@/stores/store';
// import {createError} from 'nuxt/app';
// import {useNuxtApp} from '#app';
import { md5 } from 'js-md5';
import crypto from "crypto";

function generateMD5Hash(payload) {
    let data = 'xbXFICOkW!^wRxR%vKV3uAF5iRR@f9dt_' + new Date().toISOString().substring(0, 13);

    if (payload) {
        data += `_${JSON.stringify(payload, null, 0)}`;
    }

    return md5(data);
}

export default async (app, url, options) => {
    try {
        const store = useStore();
        const nuxtApp = useNuxtApp();
        // const localenuxtApp.$i18n.locale
        const { locale } = nuxtApp.$i18n;
        // console.log('$i18n.locale:', locale.value)
        // const token = md5('xbXFICOkW!^wRxR%vKV3uAF5iRR@f9dt_' + new Date().toISOString().substring(0, 10))
        const token = generateMD5Hash(options.body)

        // console.log('date1', new Date().toISOString().substring(0, 13))
        // console.log('token', token)

        options = {
            headers: {
                'Language': locale.value,
                'X-API-KEY': token
            },
            ...options,
        }
        return await $fetch(url, options);
    } catch (err) {
        console.log('api.fetchWrapper', err);
        // app.$sentry.captureException(err);

        // if (err.status === 400 && err.data.message === 'Invalid Token') {
        //     app.$toast.error(`Unknown error occurred, please contact support`);
        //     const user = useUserStore();
        //     user.logout();
        //
        //     throw createError({statusCode: 403, statusMessage: 'Unknown error occurred, please contact support'});
        // } else if (err?.data?.message) {
        if (err?.data?.message) {
            app.$toast.error(`${err.status}: ${err.data.message}`);
        } else {
            app.$toast.error(err.message);
        }

        throw err;
    }
};
