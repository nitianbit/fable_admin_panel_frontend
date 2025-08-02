import useAuthApi from "../helpers/authHook";

export const settingService = {
  get,
  find,
  update,
  updateNotification,
};

async function get() {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.get("settings/");
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function find(type) {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.get("settings/" + type);
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function update(id, Objparams) {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.patch("settings/" + id, Objparams);
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function updateNotification(id, Objparams) {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.patch(
      `settings/${id}/notifications`,
      Objparams,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    return e.response;
  }
}
