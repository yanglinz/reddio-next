function healthCheckView(request, reply) {
  return reply({ status: 'OK' });
}

module.exports = { healthCheckView };
