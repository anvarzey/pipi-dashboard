export const fetcher = async (resource: RequestInfo, init: RequestInit): Promise<void> => {
  return await fetch(resource, init).then(async res => await res.json()).catch(error => error)
}
