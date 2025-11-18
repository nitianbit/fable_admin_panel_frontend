import { baseApi } from "../helpers/auth";
import useAuthApi from "../helpers/authHook";

export const operatorService = {
  getAll,
  getById,
  create,
  update,
  delete: deleteOperator,
  verify,
  changeStatus,
  uploadDocument,
  getProfile,
  updateProfile,
  getDashboard,
  login,
  sendPasswordReset,
  resetPassword,
  tranform,
};

// Admin CRUD Operations
async function getAll(Objparams) {
  try {
    console.log("Operator service getAll called with params:", Objparams);
    const privateAuth = useAuthApi();
    console.log("Making API call to operators/search");
    const response = await privateAuth.get("operators/search", {
      params: Objparams,
    });
    console.log("API response received:", response);
    return response.data;
  } catch (e) {
    console.error("API call failed:", e);
    return e.response;
  }
}

async function getById(id) {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.get(`operators/${id}`);
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function create(operatorData) {
  try {
    console.log("Operator service create called with data:", operatorData);
    const privateAuth = useAuthApi();
    console.log("Making API call to operators POST");
    const response = await privateAuth.post("operators", operatorData);
    console.log("Create API response received:", response);
    return response.data;
  } catch (e) {
    console.error("Create API call failed:", e);
    return e.response;
  }
}

async function update(id, operatorData) {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.patch(`operators/${id}`, operatorData);
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function deleteOperator(id) {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.delete(`operators/${id}`);
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function verify(id) {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.patch(`operators/${id}/verify`);
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function changeStatus(id, status) {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.patch(`operators/${id}/status`, {
      status,
    });
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function uploadDocument(id, documentType, file) {
  try {
    const privateAuth = useAuthApi();
    const formData = new FormData();
    formData.append("file", file);

    const response = await privateAuth.patch(
      `operators/${id}/${documentType}`,
      formData,
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

// Operator Self-Service Operations
async function getProfile() {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.get("operators/profile");
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function updateProfile(profileData, operatorId = null) {
  try {
    const privateAuth = useAuthApi();
    // If operatorId is provided, use the ID-based endpoint (PATCH /v1/operator/:operatorId)
    // Otherwise, use the profile endpoint (singular: operator/profile)
    if (operatorId) {
      const response = await privateAuth.patch(
        `operators/profile`,
        profileData
      );
      return response.data;
    } else {
      const response = await privateAuth.patch(
        "operators/profile",
        profileData
      );
      return response.data;
    }
  } catch (e) {
    return e.response;
  }
}

async function getDashboard() {
  try {
    const privateAuth = useAuthApi();
    const response = await privateAuth.get("operators/dashboard");
    return response.data;
  } catch (e) {
    return e.response;
  }
}

// Operator Authentication
function login(email, password) {
  try {
    return baseApi
      .post("/auth/operator-login", {
        email,
        password,
      })
      .then((response) => {
        let operator = response.data;
        return operator;
      });
  } catch (e) {
    if (e.response.status === 401) {
      return e.response.data;
    }
  }
}

async function sendPasswordReset(email) {
  try {
    const response = await baseApi.post("auth/operator-send-password-reset", {
      email,
    });
    return response.data;
  } catch (e) {
    return e.response;
  }
}

async function resetPassword(email, password, resetToken) {
  try {
    const response = await baseApi.post("auth/operator-reset-password", {
      email,
      password,
      resetToken,
    });
    return response.data;
  } catch (e) {
    return e.response;
  }
}

// Utility function for Excel export
function tranform(operators) {
  if (!operators || !Array.isArray(operators)) {
    return [];
  }
  return operators.map((operator) => ({
    "Company Name": operator.companyName,
    "Company Code": operator.companyCode,
    "Business Type": operator.businessType,
    Email: operator.email,
    Phone: operator.phone,
    "Contact Person": operator.contactPerson?.name || "",
    Status: operator.status,
    Verified: operator.isVerified ? "Yes" : "No",
    "Fleet Size": operator.fleetSize,
    "Max Fleet Size": operator.maxFleetSize,
    "Max Seats": operator.maxNoOfSeats,
    "Commission Rate": operator.commissionRate,
    "Payment Terms": operator.paymentTerms,
    "Created At": operator.createdAt,
  }));
}
