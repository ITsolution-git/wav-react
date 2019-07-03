import DistrictConstants from '../constants/reducerConstants/DistrictConstants';
import districtService from '../services/DistrictService';

export {
	getDistrictByAddress,
	selectDistrict
}

function getDistrictByAddress(address) {
	return dispatch => {
	    dispatch(actionRequest());
	    return districtService.getDistrictByAddress(address).then(
	        response => {
	            dispatch(actionSuccess(response));
	        },
	        error => {
	            dispatch(actionError(error.response.data.message));
	        });
	};

	function actionRequest() {
	    return { type: DistrictConstants.DISTRICT_LIST_REQUEST };
	}
	function actionError(error) {
	    return { type: DistrictConstants.DISTRICT_LIST_ERROR, error };
	}

	function actionSuccess(data) {
	    return { type: DistrictConstants.DISTRICT_LIST_SUCCESS, data };
	}
}

function selectDistrict(data) {
	return { type: DistrictConstants.SELECTED_DISTRICT_ITEM, data };
}
