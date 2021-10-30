export const useValidateEnvs = () => {
  const requiredEnvs = [
    'REACT_APP_CONTRACT_ADDRESS'
  ];

  requiredEnvs.forEach(env => {
    if (typeof process.env[env] === 'undefined') {
      throw Error(`${env} must be defined`);
    }
  });
}
