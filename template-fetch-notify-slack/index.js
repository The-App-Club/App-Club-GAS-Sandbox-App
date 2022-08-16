import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const requestUrl = `${process.env.PUBLISHED_REST_API_URL}`;

(async () => {
  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
    });

    const json = await response.json();

    console.log(JSON.stringify(json));
  } catch (error) {
    console.log(error);
  }
})();
