import ky from 'ky';
// import { auth } from '@clerk/nextjs/server';

const kyWithAuth = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  retry: {
    limit: 1,
    statusCodes: [401, 403, 500, 504],
  },
  // hooks: {
  //   beforeRequest: [
  //     async request => {
  //       const { getToken } = await auth();
  //       const token = await getToken();

  //       if (token) {
  //         request.headers.set('Authorization', `Bearer ${token}`);
  //         request.headers.set('x-apikey', process.env.SUPERVISOR_API_KEY!);
  //       }
  //     }
  //   ]
  // }
})

export { kyWithAuth as ky };

