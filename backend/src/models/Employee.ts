import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  employeeId: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema: Schema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IEmployee>("User", employeeSchema);
