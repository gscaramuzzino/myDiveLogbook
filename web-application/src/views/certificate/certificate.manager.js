CertificateManager.$inject = ["$resource", "baseURL"];
export default function CertificateManager($resource, baseURL) {

  return $resource(baseURL + "licences/",
    {
      query: {
        method: 'GET',
        isArray: true
      }
    });
}