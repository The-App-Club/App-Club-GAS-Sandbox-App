import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const requestUrl = `${process.env.PUBLISHED_REST_API_URL}?email=${btoa(
  'hogehoge@hoge.com'
)}&userName=${btoa(encodeURIComponent('テスト太郎'))}&organization=${btoa(
  encodeURIComponent('テスト会社')
)}&department=${btoa(
  encodeURIComponent('テスト部署')
)}&accountExpireDate=${btoa('2020-01-30')}`;

(async () => {
  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
    });

    const json = await response.json();

    console.log(json);
  } catch (error) {
    console.log(error);
  }
})();
