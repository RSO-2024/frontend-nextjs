'use server';


export async function postCarToServer(formData: any, token: string) {
    console.log(formData);
  const response = await fetch('http://rso.poklikaj.si/api/p2p/listings/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return response.json();
}