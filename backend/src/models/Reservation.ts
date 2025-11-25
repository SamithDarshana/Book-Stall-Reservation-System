import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  reservationId: string;
  userId: string;
  roomId: string;
  genre: string;
  startDate: Date;
  endDate: Date;
  status: "pending" | "confirmed" | "cancelled";
  size: "small" | "medium" | "large";
  createdAt: Date;
  updatedAt: Date;
}

const reservationSchema: Schema = new Schema(
  {
    reservationId: { type: String, required: true, unique: true },
    userId: { type: String, default: "" },
    roomId: { type: String, required: true },
    genre: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReservation>("Reservation", reservationSchema);
