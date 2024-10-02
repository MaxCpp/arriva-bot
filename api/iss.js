import fetchWrapper from '~/api/fetchWrapper';

export default (app, params) => ({
    async fetchNftCollections(params) {
        // console.log('API collections.fetchNftCollections', params);
		const data = {};

		if (params?.page) {
			data.page = params.page;
		}

		if (params?.filterId?.length) {
			data.filter_id = params.filterId;
		}

		if (params?.search?.length) {
			data.search = params.search;
		}

		if (params?.approves?.length) {
			data.approves = params.approves;
		}

		if (params?.blockchains?.length) {
			data.blockchains = params.blockchains;
		}

		if (params?.arts?.length) {
			data.arts = params.arts;
		}

		if (params?.utilities?.length) {
			data.utilities = params.utilities;
		}

		if (params?.studios?.length) {
			data.studios = params.studios;
		}

		if (params?.complaints) {
			data.complaints = params.complaints;
		}

		if (params?.feedback) {
			data.feedback = params.feedback;
		}

		if (params?.sortBy) {
			data.sort_by = params.sortBy;
		}

		if (params?.orderBy) {
			data.order_by = params.orderBy;
		}

        const response = await fetchWrapper(app,app.$config.public.API_DOXXY_NFT_URL + `/nft-collections/`,{
            method: 'POST',
            body: data,
        });

        if (response) {
            return response;
        }

        return response;
    },
	async fetchNftCollectionsAutocomlete(data) {
		// console.debug('API entities.fetchNftCollections');
		const params = {}

		if (data.ids?.length) {
			params.ids = data.ids
		}

		if (data.page) {
			params.page = data.page
		}

		if (data.search?.length) {
			params.search = data.search
		}

		const response = await fetchWrapper(app,app.$config.public.API_DOXXY_NFT_URL + `/nft-collections/autocomplete/`,{
			method: 'GET',
			params
		});

		return response;
	},
	async fetchRecentCollections(params = {}) {
		// console.debug('API collections.fetchRecentCollections');
		const response = await fetchWrapper(app,app.$config.public.API_DOXXY_NFT_URL + `/nft-collections/recent/`,{
			method: 'GET',
			params
		});

		return response;
	},
	async fetchCollectionBySlug(slug) {
		// console.debug('API studios.fetchStudioBySlug');
		const response = await fetchWrapper(app,app.$config.public.API_DOXXY_NFT_URL + `/nft-collections/${slug}/`,{
			method: 'GET',
			params
		});

		return response;
	},
});
