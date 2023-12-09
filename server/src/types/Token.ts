import { JwtPayload } from "jsonwebtoken";

export default interface Token extends JwtPayload {
  id: string;
  username: string;
}
