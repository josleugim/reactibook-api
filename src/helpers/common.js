'use strict';

const formatDate = (date) => {
    const splitDate = date.split('-');
    return `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}.00Z`;
};

module.exports = {
    formatDate
};