export const getUserUuidFromLink = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userUuid = urlParams.get("user_uuid");
  return userUuid;
};
