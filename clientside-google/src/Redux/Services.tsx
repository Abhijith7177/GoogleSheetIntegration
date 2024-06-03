import { Axios } from "../ServerConfig/Axios";

class User {
  Register(req: any) {
    return Axios.post("user/register", req);
  }

  Login(req: any) {
    return Axios.post("user/login", req);
  }

  generateToken() {
    return Axios.get("generate-access-token");
  }

  accessList() {
    return Axios.get("access/get");
  }

  createAccess(req: any) {
    return Axios.put("access/create", req);
  }

  deleteAccess(req: any) {
    return Axios.delete(`access/delete?id=${req}`);
  }

  deleteSheet(req: any) {
    return Axios.delete(`sheet/delete?id=${req}`);
  }

  fetchSheets(req: any) {
    return Axios.get(`sheet/get?accessId=${req}`);
  }

  createSheet(req: any) {
    return Axios.post("sheet/create", req);
  }

  editSheet(req: any, id: any) {
    console.log("🚀 ~ User ~ editSheet ~ id:", req);
    return Axios.put(`access/edit?id=${req.accessId}`, req.values);
  }
}

export default new User();
