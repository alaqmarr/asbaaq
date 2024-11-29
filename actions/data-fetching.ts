"use server"
import { db } from "@/lib/db";

export const getAssignedSabaq = async (id: string) => {
  const sabaqs = await db.sabaq.findMany({
    where: {
      admins: {
        some: {
          id: id,
        },
      },
    },
    select: {
      id: true,
      name: true,
      nisaab: true,
      time: true,
      total_enrollments: true,
      mode: true,
      startTime: true,
      endTime: true,
      status: true,
    },
  });

  return sabaqs;
};

export const getOngoingSabaq = async () => {
  const sabaqs = await db.sabaq.findMany({
    where: {
      status: "ongoing",
    },
  });

  return sabaqs;
};

export const getCompletedSabaq = async () => {
  const sabaqs = await db.sabaq.findMany({
    where: {
      status: "completed",
    },
  });

  return sabaqs;
};

export const allSabaq = async () => {
  const sabaqs = await db.sabaq.findMany();

  return sabaqs;
};

export const getSingleSabaq = async (id: string) => {
  const sabaq = await db.sabaq.findUnique({
    where: {
      id,
    },
  });

  return sabaq;
};

export const getSabaqBasedOnNisaab = async (nisaab: string) => {
  const sabaqs = await db.sabaq.findMany({
    where: {
      nisaab,
    },
  });

  return sabaqs;
};

export const getPadhawnaars = async () => {
  const padhawnaars = await db.padhawnaar.findMany();

  return padhawnaars;
};

export const getSinglePadhawnaar = async (id: string) => {
  const padhawnaar = await db.padhawnaar.findUnique({
    where: {
      id,
    },
  });

  return padhawnaar;
};

export const getAdmins = async () => {
  try {
    const admins = await db.user.findMany({
      where: {
        role: {
          in: ["ADMIN", "SUPERADMIN"],
        },
      },
    });
    return admins;
  } catch (error) {
    console.error("Error fetching admins:", error);
    return [];
  }
};

