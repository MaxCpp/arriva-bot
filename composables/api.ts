import iss from '~/api/iss';
import {useNuxtApp} from '#app';

export const useApi = (url: string, options: object) => {
    const app = useNuxtApp();
    // const user = useUser();
    let requestOptions = {};

    // console.log('api composable', userStore.token);

    // if (user.token) {
    //     requestOptions = {
    //         token: user.token
    //     }
    // }

    return {
        iss: iss(app, requestOptions),
    };
}
