"use server";
import { db } from "@/lib/db";

export const newSabaq = async (data: any) => {
  try {
    // Validate required fields
    if (
      !data.name ||
      !data.nisaab ||
      !data.startTime ||
      !data.endTime ||
      !data.mode ||
      !data.padhawnaar
    ) {
      return { error: "Please fill in all required fields." };
    }

    if (
      !data.admins ||
      !Array.isArray(data.admins) ||
      data.admins.length === 0
    ) {
      return { error: "At least one admin must be assigned." };
    }

    console.log("Input Data:", data);

    // Generate ID
    var generatedId =
      data.name.trim().toLowerCase().replace(/\s+/g, "-") +
      "_" +
      data.nisaab.trim().replace(/\s+/g, "").toLowerCase();

    //check if generated id already exists then add another _ and a random number
    const sabaq = await db.sabaq.findUnique({
      where: {
        id: generatedId,
      },
    });

    if (sabaq) {
      generatedId = generatedId + "_" + Math.floor(Math.random() * 1000);
    }

    // Prepare `admins` data
    const adminData = data.admins.map((admin: string) => ({ id: admin }));
    const adminCount = data.admins.length;

    // Debugging Logs
    console.log("Generated ID:", generatedId);
    console.log("Admin Data:", adminData);

    // Create Sabaq
    const result = await db.sabaq.create({
      data: {
        id: generatedId,
        name: data.name,
        nisaab: data.nisaab,
        time: data.time || "00:00", // Default time if not provided
        total_enrollments: 0,
        admincount: adminCount,
        mode: data.mode,
        startTime: data.startTime,
        endTime: data.endTime,
        startDate: new Date(data.startDate).toISOString(),
        status: "pending",
        padhawnaarId: data.padhawnaar, // Ensure this is a valid Padhawnaar ID
        admins: { connect: adminData }, // Ensure this array contains valid User IDs
      },
    });

    console.log("Creation Result:", result);

    return { success: "Sabaq created successfully" };
  } catch (error: any) {
    console.error("Error creating Sabaq:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
};
