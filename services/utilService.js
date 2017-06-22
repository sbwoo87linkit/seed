app.factory('utilService', utilService);

utilService.$inject = [];

function utilService() {
    var obj = {};
    obj.formatDate = function(date) {
        return date.getFullYear() + '.' + (Number(date.getMonth())+1) + '.' + date.getDate()
    }
    return obj;
}

