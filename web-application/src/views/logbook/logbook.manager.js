LogbookManager.$inject = ["$resource", "baseURL"];
export default function LogbookManager($resource, baseURL) {

    return $resource(baseURL + "dives/", null, {
        'update': {
            method: 'PUT'
        }
    });
}