const ISS_BASE_API = 'https://economia.awesomeapi.com.br';

const getCurrentIssCurrencies = async () => {
  const response = await fetch(`${ISS_BASE_API}/json/all`);
  const json = await response.json();
  // console.log(json);
  return json;
};

export default getCurrentIssCurrencies;
