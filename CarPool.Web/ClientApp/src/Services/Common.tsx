export async function postData(url: string, data: any = "") {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  });
  if (response.status === 500) {
    throw Error("Server not reachable");
  }
  const json = await response.json();
  if (json.error) {
    debugger;
    throw json;
  } else {
    return json;
  }
}

export async function GetData(url: string) {
  const response = await fetch(url);
  if (response.status === 500) {
    throw Error("Server not reachable");
  }
  const json = await response.json();
  if (json.error) {
    debugger;
    throw json;
  } else {
    return json;
  }
}

export const createAction = (actionType: string, data: any = "") => {
  return { type: actionType, payload: data };
};
