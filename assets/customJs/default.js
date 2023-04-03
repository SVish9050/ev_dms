// const backEndBaseURL = 'http://localhost:4000/';
const backEndBaseURL = 'http://54.144.160.175:4000/';

async function requestServer(url, method = 'GET', data = '', type = 'raw') {
    try {
        const options = {
            method: method
        }
        if (data) {
            options.body = type == 'raw' ? JSON.stringify(data) : data;
            if (type == 'raw')
                options.headers = {
                    'Content-Type': 'application/json'
                }
        }
        url = backEndBaseURL + url;
        console.log('fetch options : ', url, options);
        const response = await fetch(url, options);
        console.log('fetch response  : ', response);
        if (response.status != 200) {
            return {
                status: 500
            }
        }
        const resJSON = await response.json();
        console.log('response JSON : ', resJSON);
        return resJSON;

    } catch (err) {
        console.log(err);
        return errorHandler(err);
    }
}


const parseJSON = text => {
    try {
        return JSON.parse(text);
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            data: text
        }
    }
}

function errorHandler(err) {
    const errString = err.toString();
    if (errString === "AbortError: The user aborted a request.") {
        console.log('REQUEST_ABORTED');
        return {
            status: 0
        };
    }
    if (!err.status)
        console.log('error : ', err);
    return {
        status: 500,
        message: 'FETCH_SERVER_ERROR',
        error: err.toString()
    }
}

function fDate(date) {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var defDate = new Date(date);
    var newDate = defDate.getDate() + ' ' + month[defDate.getMonth()] + ' ' + defDate.getFullYear() + ' ' + defDate.getHours() + ':' + (defDate.getMinutes() / 10 < 1 ? '0' + defDate.getMinutes() : defDate.getMinutes()) + ':' + (defDate.getSeconds() / 10 < 1 ? '0' + defDate.getSeconds() : defDate.getSeconds());
    return newDate;
}

function fDateOnly(date) {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var defDate = new Date(date);
    var newDate = defDate.getDate() + ' ' + month[defDate.getMonth()] + ' ' + defDate.getFullYear();
    return newDate;
}

const defautAvatar = 'assets/images/404-error.png';

// choose file image GUI js
function chooseFile(parent = '') {
    try {
        const realFileBtn = $(parent + ' input');
        const customBtn = $(parent + ' button');
        const previewImage = $(parent + ' img');
        // console.log(previewImage[0], realFileBtn[0], customBtn[0]);
        customBtn.off().on('click', e => realFileBtn.click());
        realFileBtn.off().change(function(e) {
            try {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function() {
                        previewImage.attr('src', this.result);
                    }
                    reader.readAsDataURL(this.files[0]);
                    previewImage.show();
                } else {
                    previewImage.attr('src', defautAvatar).show();
                }

            } catch (err) {
                return errorHandler(err);
            }

        });
        previewImage.on('error', arg => {
            try {
                previewImage.attr('src', defautAvatar);
                realFileBtn.val('');

            } catch (err) {
                return errorHandler(err);
            }
        });

    } catch (err) {
        return errorHandler(err);
    }
}


const setPagination = e => {
    try {
        const parent = '#pagination ';

        // adding funtion on buttons
        const preBtn = pagination.preBtn;
        const postBtn = pagination.postBtn;
        pagination.limitPerPage = Number(pagination.limitPerPage);

        // defaults values zeros
        const label = $(parent + '#paginationLabel');
        if (pagination.total == 0) {
            label.text(0 + ' - ' + 0 + ' of ' + 0);
            preBtn.attr('disabled', true);
            postBtn.attr('disabled', true);
            return;
        }

        // page 1 button disable
        const activePage = Number(pagination.activeIndex)+ 1;
        if (activePage <= 1)
            preBtn.attr('disabled', true);
        else
            preBtn.removeAttr('disabled');

        // last page post button disable
        const fromPage = (activePage - 1) * pagination.limitPerPage + 1;
        if (activePage >= Math.ceil(pagination.total / pagination.limitPerPage)) {
            postBtn.attr('disabled', true);
            label.text(fromPage + ' - ' + pagination.total + ' of ' + pagination.total);
        } else {
            postBtn.removeAttr('disabled');
            label.text(fromPage + ' - ' + activePage * pagination.limitPerPage + ' of ' + pagination.total);
        }

    } catch (err) {
        errorHandler(err);
    }
}
const setGetFn = fn => {
    pagination.preBtn.off().click(e => {
        pagination.activeIndex--;
        fn();
    });
    pagination.postBtn.off().click(e => {
        pagination.activeIndex++;
        fn();
    });

}

const pagination = {
    activeIndex: 0,
    total: 0,
    limitPerPage: 0,
    preBtn: $('#preBtn'),
    postBtn: $('#postBtn'),
    getFn: setGetFn,
    paginationFn: setPagination
}
const activeSidebar = (dropdown, menu) => {
    $('#' + dropdown + '').addClass('active');
    $('#' + menu + '').addClass('active');
}

let abortController = null;

const callAPI = async( URL = '', method = 'GET', body = '', bodyType = 'raw' ) => {
    try {
        // window.$('#pageSpinner').show();
        if (method === 'GET' && URL.includes('get')) {
            abortController && abortController.abort();
        }
        const options = {
            method
        }
        // adding body
        if (body) {
            options.body = bodyType === 'raw' ? JSON.stringify(body) : body;
            if (bodyType === 'raw')
                options.headers = {
                    'Content-Type': 'application/json'
                }
        }
        // adding auth token
        // if (!URL.includes('auth') && getIsLoggedIn()) {
        //     if (!options.headers)
        //         options.headers = {};
        //     options.headers.authToken = getUser('authToken');
        //     options.headers.userId = getUser('_id');
        // }
        // // URL = backendbaseURL + URL;
        // console.log('FETCH_OPTIONS : ', URL, options);
        // abort controller
        abortController = new AbortController();
        options.signal = abortController.signal;
        // fetching
        const response = await fetch(URL, options);
        // getting response
        // console.log('FETCH_RESPONSE  : ', response);
        // window.$('#pageSpinner').hide();
        if (response.status !== 200) {
            console.log(await response.text())
            return {
                status: 500
            }
        }
        const resJSON = parseJSON(await response.text());
        // console.log('FETCH_RESULT : ', resJSON);
        return resJSON;
    } catch (err) {
        return errorHandler(err);
    }
}